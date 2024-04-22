jest.mock('../../app/init-react-app', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));
import { store } from '../../app/init-react-app';
import {
  getCsrfToken,
  auth,
  redirectHomepage,
  redirectURL,
  loginFacebookProcess,
  loginGoogleProcess,
  getSessionExpiryTime
} from '../auth';
import { TOKEN_TYPE } from '../../constants/application/global';
import { SIGN_IN_STATE } from '../../constants/application/global';
import { storageKey } from '../../constants/application/client-storage';

const backupEnv = process.env;
const reloadMock = jest.fn();
const hrefSetterMock = jest.fn();
jest.mock('../../tracking/google-analytic/ga-event-tracking');
jest.mock('../../tracking/sentry');
Object.defineProperty(window, 'location', { value: { reload: reloadMock }, writable: true, configurable: true });
Object.defineProperty(window.location, 'href', {
  get: jest.fn(() => 'http://localhost/'),
  set: hrefSetterMock
});

beforeEach(() => {
  process.env = { ...backupEnv }; //REFACTOR
});

afterEach(() => {
  process.env = { ...backupEnv }; //REFACTOR
});

describe('getCsrfToken', () => {
  const token = 'test_token';

  afterEach(() => {
    document.cookie = `${TOKEN_TYPE.CSRF_TOKEN}=${token}; expires=${new Date().toUTCString()} path=/`;
  });

  describe(`when token exists`, () => {
    test(`token is retrieved`, () => {
      document.cookie = `${TOKEN_TYPE.CSRF_TOKEN}=${token}; path=/`;
      expect(getCsrfToken()).toEqual(token);
    });
  });

  describe(`when token does not exist`, () => {
    test(`'null' is returned`, () => {
      expect(getCsrfToken()).toEqual(null);
    });
  });
});

describe('auth', () => {
  it(`is an object with specific keys`, () => {
    expect(typeof auth).toBe('object');
    expect(Object.keys(auth)).toEqual(expect.arrayContaining(['clearSession', 'loggedIn']));
  });

  describe(`.loggedIn`, () => {
    describe(`when 'state' contains auth info`, () => {
      describe(`where the info is valid`, () => {
        test(`retrives status: logged in`, () => {
          (store.getState as any).mockReturnValue({ auth: { signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS } });
          expect(auth.loggedIn()).toBe(true);
        });
      });

      describe(`where the info is invalid`, () => {
        test(`retrives status: not logged in`, () => {
          expect(auth.loggedIn()).toBe(false);
        });
      });
    });

    describe(`when 'state' doesn't contain any auth info`, () => {
      test(`retrives status: not logged in`, () => {
        expect(auth.loggedIn()).toBe(false);
      });
    });
  });
});

describe('redirectHomepage', () => {
  test(`sets path to root`, () => {
    redirectHomepage();
    expect(hrefSetterMock).toHaveBeenCalledWith('/');
  });
});

describe('redirectURL', () => {
  describe(`when 'url' is provided`, () => {
    test(`sets path to 'url'`, () => {
      redirectURL('/test/path');
      expect(hrefSetterMock).toHaveBeenCalledWith('/test/path');
    });
  });

  describe(`when 'url' is not provided`, () => {
    test(`sets path to root`, () => {
      redirectURL();
      expect(hrefSetterMock).toHaveBeenCalledWith('/');
    });
  });
});

describe('loginFacebookProcess', () => {
  describe(`when no params are provided`, () => {
    test(`OAuth redirection is performed with scope`, () => {
      loginFacebookProcess();
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.stringContaining('/oauth'));
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.not.stringContaining('scope='));
    });
  });

  describe(`when 'referrer' param is not provided`, () => {
    test(`OAuth redirection is performed with scope`, () => {
      loginFacebookProcess({ facebookAuthScope: 'email' });
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.stringContaining('/oauth'));
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.stringContaining('scope=email'));
    });
  });

  describe(`when 'referrer' param is not provided`, () => {
    test(`OAuth redirection is performed with scope`, () => {
      loginFacebookProcess({ facebookAuthScope: 'email', referrer: '/forgot-password' });
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.stringContaining('/oauth'));
      expect(hrefSetterMock).toHaveBeenCalledWith(expect.stringContaining('scope=email'));
      expect(localStorage.getItem(storageKey.REFERRAL_REDIRECT)).toBe('/forgot-password');
    });
  });
});

describe('loginGoogleProcess', () => {
  describe(`when 'referrer' is provided`, () => {
    beforeEach(() => {
      loginGoogleProcess({ referrer: '/' });
    });

    test(`${storageKey.REFERRAL_REDIRECT} key is set on localStorage`, () => {
      expect(localStorage.getItem(storageKey.REFERRAL_REDIRECT)).toBe('/');
    });

    test(`a redirection is performed to google oauth route`, () => {
      expect(hrefSetterMock).toHaveBeenCalled();
      expect(hrefSetterMock.mock.calls[0][0]).toMatch(/^https:\/\/accounts.google.com\/o\/oauth2\/auth/i);
    });
  });

  describe(`when 'referrer' is not provided`, () => {
    beforeEach(() => {
      loginGoogleProcess({});
    });

    test(`${storageKey.REFERRAL_REDIRECT} key is not set on localStorage`, () => {
      expect(localStorage.getItem(storageKey.REFERRAL_REDIRECT)).not.toBe('/');
    });

    test(`a redirection is performed to google oauth route`, () => {
      expect(hrefSetterMock).toHaveBeenCalled();
      expect(hrefSetterMock.mock.calls[0][0]).toMatch(/^https:\/\/accounts.google.com\/o\/oauth2\/auth/i);
    });
  });
});

describe('getSessionExpiryTime', () => {
  beforeAll(() => {
    (jest as any).useFakeTimers('modern');
    (jest as any).setSystemTime(new Date('1970-01-01T00:00:00.000Z'));
  });

  describe(`when cookie is not set / expired`, () => {
    test(`returns the current time as expiry time`, () => {
      expect(getSessionExpiryTime()).toEqual(new Date('1970-01-01T00:00:00.000Z'));
    });
  });

  describe(`when cookie is set / is not expired`, () => {
    test(`returns the parsed expiry time from cookie value`, () => {
      const expiryTimeStr = '2090-01-01T00:00:00.000Z';
      const expiryTime = new Date(expiryTimeStr);
      document.cookie = `auth_expires_at=${encodeURIComponent(
        expiryTimeStr
      )}; expires=${expiryTime.toUTCString()}; path=/`;

      expect(getSessionExpiryTime()).toEqual(expiryTime);
    });
  });
});
