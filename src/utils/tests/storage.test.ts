import { set, get, check, createCookie, readCookie, eraseCookie } from '../storage';

describe('set', () => {
  describe('with simple data types', () => {
    [1, true, 1.1, 'data'].forEach((data) => {
      test(`sets entry to localStorage with corresponding key (${data})`, () => {
        set('data', data);
        expect(localStorage.getItem('data')).toBe(JSON.stringify(data));
      });
    });
  });

  describe('with complex data', () => {
    test('sets entry to localStorage with corresponding key', () => {
      const data = {
        data1: 1,
        data2: 'data2 val'
      };
      set('data', data);

      expect(localStorage.getItem('data')).toBe(JSON.stringify(data));
    });
  });
});

describe('get', () => {
  describe("when key doesn't exist", () => {
    test('returns empty string', () => {
      const returnVal = get('data');
      expect(returnVal).toEqual('');
    });
  });

  describe('when key exists', () => {
    describe('with valid data', () => {
      const data = { data1: 11, data2: 'data2 val' };
      beforeEach(() => {
        localStorage.setItem('data', JSON.stringify(data));
      });

      test('returns parsed data', () => {
        const retrievedData = get('data');

        expect(typeof retrievedData).toEqual('function');
        if (typeof retrievedData === 'function') {
          expect(retrievedData()).toEqual(data);
        }
      });
    });

    describe('with invalid data', () => {
      beforeEach(() => {
        localStorage.setItem('data', '{dat');
      });

      test('returns empty string', () => {
        const retrievedData = get('data');
        expect(typeof retrievedData).toEqual('function');
        if (typeof retrievedData === 'function') {
          expect(retrievedData()).toEqual('');
        }
      });
    });
  });
});

describe('check', () => {
  describe("when key doesn't exist", () => {
    test('returns `false`', () => {
      const returnVal = check('data');
      expect(returnVal).toEqual(false);
    });
  });

  describe('when key exists', () => {
    beforeEach(() => {
      localStorage.setItem('data', '1');
    });

    test('returns `true`', () => {
      expect(check('data')).toEqual(true);
    });
  });
});

describe('createCookie', () => {
  describe('for valid parameters', () => {
    describe('with expiry', () => {
      beforeEach(() => {
        createCookie('testCookie', 'testValue', 1);
      });

      afterEach(() => {
        createCookie('testCookie', 'testValue', -1);
      });

      test('set cookie', () => {
        expect(document.cookie).toContain('testCookie');
      });
    });

    describe('without expiry', () => {
      beforeEach(() => {
        createCookie('testCookie', 'testValue', undefined);
      });

      afterEach(() => {
        createCookie('testCookie', 'testValue', -1);
      });

      test('set cookie', () => {
        expect(document.cookie).toContain('testCookie');
      });
    });
  });

  describe('for invalid parameters', () => {
    beforeEach(() => {
      createCookie('testCookie', 'testValue', -1);
    });

    test("doesn't set cookie", () => {
      expect(document.cookie).not.toContain('testCookie');
    });
  });
});

describe('readCookie', () => {
  describe('when cookie exists', () => {
    beforeEach(() => {
      createCookie('testCookie', 'testValue', 1);
      createCookie('testCookie1', 'testValue1', 1);
    });

    afterEach(() => {
      createCookie('testCookie', 'testValue', -1);
      createCookie('testCookie1', 'testValue1', -1);
    });

    test('returns cookie value', () => {
      expect(readCookie('testCookie1')).toEqual('testValue1');
    });
  });

  describe("when cookie doesn't exist", () => {
    test('returns `null`', () => {
      expect(readCookie('testCookie')).toBeNull();
    });
  });
});

describe('eraseCookie', () => {
  describe('when target cookie exists', () => {
    beforeEach(() => {
      createCookie('testCookie', 'testValue', 1);
      eraseCookie('testCookie');
    });

    test('removes cookie', () => {
      expect(document.cookie).not.toContain('testCookie');
    });
  });

  describe('when target cookie doesn not exist', () => {
    test("doesn't set cookie", () => {
      expect(() => {
        eraseCookie('aCookie');
      }).not.toThrow();
    });
  });
});
