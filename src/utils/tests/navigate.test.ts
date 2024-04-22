jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn().mockReturnValue({}) }
}));
import { storageKey } from 'constants/application/client-storage';
import {
  navigateFreeLink,
  navigateMagazine,
  navigateLixicointConvert,
  navigateExpert,
  navigateAdmin,
  setReferrer,
  setCustomReferrer
} from '../navigate';

let hrefSetter;

beforeAll(() => {
  hrefSetter = jest.fn();
  Object.defineProperty(window, 'location', { value: {}, writable: true, configurable: true });
  Object.defineProperty(window.location, 'href', {
    get: jest.fn(() => 'http://localhost/'),
    set: hrefSetter
  });
});

afterEach(() => {
  hrefSetter.mockClear();
});

describe('navigateFreeLink', () => {
  test('navigates to the specified link', () => {
    navigateFreeLink('/link1');
    expect(hrefSetter).toHaveBeenCalledWith('/link1');
  });
});

describe('navigateMagazine', () => {
  test(`navigates to '/magazine'`, () => {
    navigateMagazine();
    expect(hrefSetter).toHaveBeenCalledWith('/magazine');
  });
});

describe('navigateLixicointConvert', () => {
  test(`navigates to '/lixicoin'`, () => {
    navigateLixicointConvert();
    expect(hrefSetter).toHaveBeenCalledWith('/lixicoin');
  });
});

describe('navigateExpert', () => {
  test(`navigates to "expert" route`, () => {
    navigateExpert();
    expect(hrefSetter).toHaveBeenCalledWith(process.env.REACT_APP_EXPERT_FQDN);
  });
});

describe('navigateAdmin', () => {
  test(`navigates to "admin" route`, () => {
    navigateAdmin();
    expect(hrefSetter).toHaveBeenCalledWith(process.env.REACT_APP_ADMIN_FQDN);
  });
});

describe('setReferrer', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
    delete window.location;
  });

  test('should set the referrer with default storage key', () => {
    const uri = 'https://www.example.com/';
    window.location = new URL(uri) as any;
    setReferrer();
    expect(localStorage.getItem(storageKey.REFERRAL_REDIRECT)).toEqual('/');
  });

  test('should set the referrer with custom storage key', () => {
    const key = 'CUSTOM_REFERRAL_REDIRECT';
    const uri = 'https://www.example.com/path';
    window.location = new URL(uri) as any;
    setReferrer(key);
    expect(localStorage.getItem(key)).toEqual('/path');
  });
});

describe('setCustomReferrer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should set the custom referrer with default storage key', () => {
    const value = 'https://example.com';
    setCustomReferrer({ value });
    expect(localStorage.getItem(storageKey.REFERRAL_REDIRECT)).toEqual(value);
  });

  test('should set the custom referrer with custom storage key', () => {
    const key = 'CUSTOM_REFERRAL_REDIRECT';
    const value = 'https://example.com';
    setCustomReferrer({ key, value });
    expect(localStorage.getItem(key)).toEqual(value);
  });
});
