jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn(), dispatch: jest.fn() }
}));
import { store } from '../../app/init-react-app';
import { ALERT_SESSION_ENDED_WARNING } from '../../constants/application/alert';
import { storageKey } from '../../constants/application/client-storage';
import { dispatchDueAlert } from '../alert';

describe('dispatchDueAlert', () => {
  describe(`when alert is due`, () => {
    beforeEach(() => {
      const val = JSON.stringify(ALERT_SESSION_ENDED_WARNING);
      sessionStorage.setItem(storageKey.DUE_ALERT, val);
    });

    test(`entry is removed from sessionStorage`, () => {
      dispatchDueAlert();
      expect(sessionStorage.getItem(storageKey.DUE_ALERT)).toEqual(null);
    });

    test(`'openAlert' action is dispatched`, () => {
      dispatchDueAlert();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe(`when alert is not due`, () => {
    test(`'openAlert' action is not dispatched`, () => {
      dispatchDueAlert();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
