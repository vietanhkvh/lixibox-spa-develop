import { getDeviceVersion, isMobileVersion, isMobileDevice, mergeStyle, combineStyle } from '../responsive';
import * as VARIABLE from '../../style/variable';

describe('getDeviceVersion', () => {
  describe('when device version is mobile', () => {
    test(`identifies as 'MOBILE'`, () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 - 1
      });
      expect(getDeviceVersion()).toEqual('MOBILE');
    });
  });

  describe('when device version is non mobile', () => {
    test(`identifies as 'DESKTOP'`, () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 + 1
      });
      expect(getDeviceVersion()).toEqual('DESKTOP');
    });
  });
});

describe('isMobileVersion', () => {
  beforeAll(() => {
    global['userAgent'] = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  afterAll(() => {
    delete global['userAgent'];
  });

  describe('when window inner width is within the breakpoint threshold', () => {
    test(`identifies as a mobile version`, () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 - 1
      });
      expect(isMobileVersion()).toEqual(true);
    });
  });

  describe('when window inner width is beyond the breakpoint threshold', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 + 1
      });
    });

    describe('when client is identified with a mobile user agent', () => {
      test(`identifies as a mobile version`, () => {
        global['userAgent'].mockReturnValue(
          'Mozilla/5.0 (Linux; Android 7.0; SM-G610M Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
        );

        expect(isMobileVersion()).toEqual(true);
      });
    });

    describe('when client is identified with a non mobile user agent', () => {
      test(`identifies as a non mobile version`, () => {
        global['userAgent'].mockReturnValue(
          'Mozilla/5.0 (X11; Datanyze; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        );

        expect(isMobileVersion()).toEqual(false);
      });
    });
  });
});

describe('isMobileDevice', () => {
  beforeAll(() => {
    global['userAgent'] = jest.spyOn(window.navigator, 'userAgent', 'get');
  });

  afterAll(() => {
    delete global['userAgent'];
  });

  describe('when user agent is present', () => {
    describe('and is a known mobile user agent', () => {
      beforeEach(() => {
        global['userAgent'].mockReturnValue(
          'Mozilla/5.0 (Linux; Android 7.0; SM-G610M Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
        );
      });

      test(`identifies device as a mobile device`, () => {
        expect(isMobileDevice()).toEqual(true);
      });
    });

    describe('and is not a known mobile user agent', () => {
      beforeEach(() => {
        global['userAgent'].mockReturnValue(
          'Mozilla/5.0 (X11; Datanyze; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        );
      });

      test(`identifies device as a non-mobile device`, () => {
        expect(isMobileDevice()).toEqual(false);
      });
    });
  });

  describe('when user agent is absent', () => {
    beforeEach(() => {
      global['userAgent'].mockReturnValue(null);
    });

    test('identifies device as a non-mobile device', () => {
      expect(isMobileDevice()).toEqual(false);
    });
  });
});

describe('mergeStyle', () => {
  let firstStyle;
  let restStyle;
  describe('when firstStyle is an array of objects', () => {
    beforeAll(() => {
      firstStyle = [{ data1: 'data1' }];
    });

    describe('where restStyle is an object', () => {
      test(`styles are merged as expected`, () => {
        restStyle = { data2: 'data2' };
        expect(mergeStyle(firstStyle, restStyle)).toEqual({ data1: 'data1', data2: 'data2' });
      });
    });

    describe('where restStyle is an array of objects', () => {
      test(`styles are merged as expected`, () => {
        restStyle = [{ data2: 'data2' }];
        expect(mergeStyle(firstStyle, restStyle)).toEqual({ data1: 'data1', data2: 'data2' });
      });
    });

    describe('where restStyle is a mix of object and array of object', () => {
      test(`styles are merged as expected`, () => {
        restStyle = [{ data2: 'data2' }, [{ data3: 'data3' }]];
        expect(mergeStyle(firstStyle, ...restStyle)).toEqual({ data1: 'data1', data2: 'data2', data3: 'data3' });
      });
    });
  });

  describe('when firstStyle is an object', () => {
    test('styles are merged as expected', () => {
      firstStyle = { data1: 'data1' };
      restStyle = { data2: 'data2' };
      expect(mergeStyle(firstStyle, restStyle)).toEqual({ data1: 'data1', data2: 'data2' });
    });
  });
});

describe('combineStyle', () => {
  let style = {
    DESKTOP: [{ style1: 'style1' }],
    MOBILE: [{ style2: 'style2' }],
    GENERAL: [{ style3: 'style3' }]
  };

  describe('for a mobile version', () => {
    test(`generates style by merging 'MOBILE' and 'GENERAL' style`, () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 - 1
      });
      expect(combineStyle(style)).toEqual({ style2: 'style2', style3: 'style3' });
    });
  });

  describe('for a desktop version', () => {
    test(`generates style by merging 'DESKTOP' and 'GENERAL' style`, () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: VARIABLE.breakPoint960 + 1
      });
      expect(combineStyle(style)).toEqual({ style1: 'style1', style3: 'style3' });
    });
  });
});
