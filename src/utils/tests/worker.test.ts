jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { store } from '../../app/init-react-app';

import { workerPostMessageCreator } from '../worker';

const timeNow = '2020-02-13 10:00';
const timeTomorrow = '2020-02-14 10:00';
const timeYesterday = '2020-02-12 10:00';
const postMessageMock = jest.fn();
Object.defineProperty(window, 'webWorker', {
  value: { postMessage: postMessageMock },
  writable: true,
  configurable: true
});

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(timeNow));
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('workerPostMessageCreator', () => {
  const data = {
    data1: 'val1',
    data2: 'val2'
  };

  describe(`when worker is initiated`, () => {
    beforeEach(() => {
      global['WORKER_INIT'] = true;
    });

    describe(`when 'state' contains 'tracking' data`, () => {
      describe(`when 'utmId' or 'utmExpiredTime' is not found in 'tracking' data`, () => {
        describe(`when 'utmId' is not found`, () => {
          test(`a post call is made without UTM params`, () => {
            (store.getState as any).mockReturnValue({
              tracking: {
                utmExpiredTime: new Date(timeTomorrow).getTime(),
                utmSource: 'utm_source',
                utmMedium: 'utm_medium',
                utmCampaign: 'utm_campaign'
              }
            });
            workerPostMessageCreator({ worker: 'AJAX', data });
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock).toHaveBeenCalledWith({
              worker: 'AJAX',
              data: {
                addOnHeader: {
                  referrerUrl: '',
                  uuid: ''
                },
                ...data
              }
            });
          });
        });

        describe(`when 'utmExpiredTime' is not found`, () => {
          test(`a post call is made without UTM params`, () => {
            (store.getState as any).mockReturnValue({
              tracking: {
                utmId: 'id1',
                utmSource: 'utm_source',
                utmMedium: 'utm_medium',
                utmCampaign: 'utm_campaign'
              }
            });
            workerPostMessageCreator({ worker: 'AJAX', data });
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock).toHaveBeenCalledWith({
              worker: 'AJAX',
              data: {
                addOnHeader: {
                  referrerUrl: '',
                  uuid: ''
                },
                ...data
              }
            });
          });
        });
      });

      describe(`when UTM data is expired`, () => {
        test(`a post call is made without UTM params`, () => {
          (store.getState as any).mockReturnValue({
            tracking: {
              utmId: 'id1',
              utmExpiredTime: new Date(timeYesterday).getTime(),
              utmSource: 'utm_source',
              utmMedium: 'utm_medium',
              utmCampaign: 'utm_campaign'
            }
          });
          workerPostMessageCreator({ worker: 'AJAX', data });
          expect(postMessageMock).toHaveBeenCalledTimes(1);
          expect(postMessageMock).toHaveBeenCalledWith({
            worker: 'AJAX',
            data: {
              addOnHeader: {
                referrerUrl: '',
                uuid: ''
              },
              ...data
            }
          });
        });
      });

      describe(`when UTM contains a valid set of data`, () => {
        test(`a post call is made with UTM params`, () => {
          (store.getState as any).mockReturnValue({
            tracking: {
              utmId: 'id1',
              utmExpiredTime: new Date(timeTomorrow).getTime(),
              utmSource: 'utm_source',
              utmMedium: 'utm_medium',
              utmCampaign: 'utm_campaign'
            }
          });
          workerPostMessageCreator({ worker: 'AJAX', data });
          expect(postMessageMock).toHaveBeenCalledTimes(1);
          expect(postMessageMock).toHaveBeenCalledWith({
            worker: 'AJAX',
            data: {
              addOnHeader: {
                referrerUrl: '',
                uuid: '',
                utmData: {
                  utmId: 'id1',
                  utmSource: 'utm_source',
                  utmMedium: 'utm_medium',
                  utmCampaign: 'utm_campaign'
                }
              },
              ...data
            }
          });
        });
      });
    });

    describe(`when 'state' does not contain 'tracking' data`, () => {
      test(`a post call is made without UTM params`, () => {
        (store.getState as any).mockReturnValue(undefined);
        workerPostMessageCreator({ worker: 'AJAX', data });
        expect(postMessageMock).toHaveBeenCalledTimes(1);
        expect(postMessageMock).toHaveBeenCalledWith({
          worker: 'AJAX',
          data: {
            addOnHeader: {
              referrerUrl: '',
              uuid: ''
            },
            ...data
          }
        });
      });
    });
  });

  describe(`when worker is not initiated`, () => {
    test(`post call attempts are made at a time interval, until 'WORKER_INIT' is set`, () => {
      global['WORKER_INIT'] = false;
      const state = {
        tracking: {
          utmId: 'id1',
          utmExpiredTime: new Date(timeTomorrow).getTime(),
          utmSource: 'utm_source',
          utmMedium: 'utm_medium',
          utmCampaign: 'utm_campaign'
        }
      };
      (store.getState as any).mockReturnValue(state);

      expect(store.getState()).toEqual(state);
      workerPostMessageCreator({ worker: 'AJAX', data });
      expect(postMessageMock).toHaveBeenCalledTimes(0);
      jest.runOnlyPendingTimers();
      expect(postMessageMock).toHaveBeenCalledTimes(0);
      global['WORKER_INIT'] = true;
      jest.runOnlyPendingTimers();
      expect(postMessageMock).toHaveBeenCalledTimes(1);
      expect(postMessageMock).toHaveBeenCalledWith({
        worker: 'AJAX',
        data: {
          addOnHeader: {
            referrerUrl: '',
            uuid: '',
            utmData: {
              utmId: 'id1',
              utmSource: 'utm_source',
              utmMedium: 'utm_medium',
              utmCampaign: 'utm_campaign'
            }
          },
          ...data
        }
      });
    });
  });
});
