import { handleWhenException, isExistError, formatErrorMessage } from '../exception';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';
import { storageKey } from '../../constants/application/client-storage';

const reloadMock = jest.fn();
const hrefSetterMock = jest.fn();
jest.mock('../../tracking/google-analytic/ga-event-tracking');
jest.mock('../../tracking/sentry');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

Object.defineProperty(window, 'location', { value: { reload: reloadMock }, writable: true, configurable: true });
Object.defineProperty(window.location, 'href', {
  get: jest.fn(() => 'http://localhost/'),
  set: hrefSetterMock
});

describe('handleWhenException', () => {
  const error = Error('Test error');
  const info = { contextInfo: 'Test context info' };

  describe(`when ${storageKey.FORCE_RELOAD} entry in localStorage is not valid or present`, () => {
    test(`sets reload stage 4`, () => {
      handleWhenException({ error, info });
      expect(localStorage.getItem(storageKey.FORCE_RELOAD)).toBe('4');
      expect(gaEventTracking).toHaveBeenCalledTimes(1);
      expect(reloadMock).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(reloadMock).toHaveBeenCalled();
    });
  });

  describe(`when ${storageKey.FORCE_RELOAD} entry in localStorage is '1'`, () => {
    test(`sets reload stage 2`, () => {
      localStorage.setItem(storageKey.FORCE_RELOAD, '1');
      handleWhenException({ error, info });
      expect(localStorage.getItem(storageKey.FORCE_RELOAD)).toBe('2');
      expect(gaEventTracking).toHaveBeenCalledTimes(1);
      expect(reloadMock).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(reloadMock).toHaveBeenCalled();
    });
  });

  describe(`when ${storageKey.FORCE_RELOAD} entry in localStorage is '2'`, () => {
    test(`sets reload stage 3`, () => {
      localStorage.setItem(storageKey.FORCE_RELOAD, '2');
      handleWhenException({ error, info });
      expect(localStorage.getItem(storageKey.FORCE_RELOAD)).toBe('3');
      expect(gaEventTracking).toHaveBeenCalledTimes(1);
      expect(reloadMock).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(reloadMock).toHaveBeenCalled();
    });
  });

  describe(`when ${storageKey.FORCE_RELOAD} entry in localStorage is '3'`, () => {
    test(`sets reload stage 4`, () => {
      localStorage.setItem(storageKey.FORCE_RELOAD, '3');
      handleWhenException({ error, info });
      expect(localStorage.getItem(storageKey.FORCE_RELOAD)).toBe('4');
      expect(gaEventTracking).toHaveBeenCalledTimes(1);
      expect(reloadMock).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(reloadMock).toHaveBeenCalled();
    });
  });

  describe(`when ${storageKey.FORCE_RELOAD} entry in localStorage is '4'`, () => {
    test(`sets reload stage 5`, () => {
      localStorage.setItem(storageKey.FORCE_RELOAD, '4');
      handleWhenException({ error, info });
      expect(localStorage.getItem(storageKey.FORCE_RELOAD)).toBe('5');
      expect(gaEventTracking).toHaveBeenCalledTimes(1);
      expect(hrefSetterMock).toHaveBeenCalledWith('/');
    });
  });
});

describe('isExistError', () => {
  describe(`when only 'error' contains valid error message`, () => {
    test(`detects error is present`, () => {
      expect(isExistError('error message', [])).toBe(true);
    });
  });

  describe(`when only 'errors' contains valid error message(s)`, () => {
    test(`detects error is present`, () => {
      expect(isExistError('', ['error message'])).toBe(true);
    });
  });

  describe(`when 'error' and 'errors' both contains valid error messages`, () => {
    test(`detects error is present`, () => {
      expect(isExistError('error message', ['another error message'])).toBe(true);
    });
  });

  describe(`when 'error' and 'errors' neither contains valid error message`, () => {
    test(`detects no error`, () => {
      expect(isExistError('', [])).toBe(false);
      expect(isExistError(null, [])).toBe(false);
      expect(isExistError(null, null)).toBe(false);
    });
  });
});

describe('formatErrorMessage', () => {
  describe(`when 'errorMessage' is invalid`, () => {
    test(`returns predefined error message`, () => {
      ['', null, []].forEach((errorMessage) =>
        expect(formatErrorMessage(errorMessage)).toBe('Đã có lỗi xảy ra. Vui lòng thử lại')
      );
    });
  });

  describe(`when 'errorMessage' is valid`, () => {
    test(`message is returns as a string`, () => {
      const errorMessage = 'Sample error message';
      expect(formatErrorMessage(errorMessage)).toBe(errorMessage);
      expect(formatErrorMessage([errorMessage])).toBe(errorMessage);
    });
  });
});
