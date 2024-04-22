import { DISCOUNT_CODE_TAB } from '../../constants/application/discount-code';
import { setTabQueryString, getInitialTabId } from '../discount-code';

beforeAll(() => {
  (global as any).window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      search: '?',
      pathname: '/'
    }
  });
  Object.defineProperty(window, 'history', {
    value: {
      replace: jest.fn()
    }
  });
});

afterEach(() => {
  window.location.search = '?';
  window.location.pathname = '/';
  (window.history as any).replace.mockClear();
});

describe('setTabQueryString', () => {
  describe(`when tab is set to 'suggestion discount codes'`, () => {
    test(`'suggestion discount codes' slug is set in the query string`, () => {
      setTabQueryString({
        tabSlug: DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug,
        history: window.history,
        location: window.location
      });
      expect((window.history as any).replace).toHaveBeenCalledWith('/?tab=suggestion-discount-codes');
    });
    test(`'unrelevant query params are appended to the query string`, () => {
      window.location.search = '?some-param=true';
      setTabQueryString({
        tabSlug: DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug,
        history: window.history,
        location: window.location
      });
      expect((window.history as any).replace).toHaveBeenCalledWith('/?some-param=true&tab=suggestion-discount-codes');
    });
  });

  describe(`when tab is set to 'user discount codes'`, () => {
    test(`'user discount codes' slug is set in the query string`, () => {
      setTabQueryString({
        tabSlug: DISCOUNT_CODE_TAB.UserDiscountCodes.slug,
        history: window.history,
        location: window.location
      });
      expect((window.history as any).replace).toHaveBeenCalledWith('/?tab=my-discount-codes');
    });
    test(`'unrelevant query params are appended to the query string`, () => {
      window.location.search = '?some-param=true';
      setTabQueryString({
        tabSlug: DISCOUNT_CODE_TAB.UserDiscountCodes.slug,
        history: window.history,
        location: window.location
      });
      expect((window.history as any).replace).toHaveBeenCalledWith('/?some-param=true&tab=my-discount-codes');
    });
  });

  describe(`when tab is not set'`, () => {
    test(`query string remains untouched`, () => {
      setTabQueryString({ tabSlug: '', history: window.history, location: window.location });
      expect((window.history as any).replace).toHaveBeenCalledWith('/?');
    });
  });
});

describe('getInitialTabId', () => {
  describe(`when tab is set to 'suggestion discount codes'`, () => {
    test(`'suggestion discount codes' slug is returned as tab ID`, () => {
      window.location.search = '?tab=suggestion-discount-codes';
      expect(getInitialTabId({ location: window.location })).toEqual('suggestion-discount-codes');
    });
  });

  describe(`when tab is set to 'user discount codes'`, () => {
    test(`'user discount codes' slug is returned as tab ID`, () => {
      window.location.search = '?tab=my-discount-codes';
      expect(getInitialTabId({ location: window.location })).toEqual('my-discount-codes');
    });
  });

  describe(`when tab is not set`, () => {
    test(`'vouchers' slug is returned as tab ID`, () => {
      expect(getInitialTabId({ location: window.location })).toEqual('vouchers');
    });
  });
});
