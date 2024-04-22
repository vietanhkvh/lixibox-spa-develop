import { DATETIME_TYPE_FORMAT } from '../../constants/application/global';
import {
  decodeEntities,
  objectToHash,
  objectHash,
  stringToHash,
  convertUnixTimeYYYYMMDD,
  convertUnixTimeDDMMYYYY,
  convertUnixTimeHHMM,
  getHourMinuteNumber,
  checkOpenStore,
  convertDateToDDMMYYY,
  safeEncodeURIComponent,
  safeDecodeURIComponent,
  decodeRouteParam
} from '../encode';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('decodeEntities', () => {
  describe(`when 'str' is inalid`, () => {
    test(`an empty string is returned`, () => {
      [null, undefined].forEach((str) => expect(decodeEntities(str)).toEqual(''));
    });
  });

  describe(`when 'str' is valid`, () => {
    test(`normalizes some HTML escape characters`, () => {
      expect(decodeEntities('a&amp;simple&lt;text&gt;line&quot;with&quot;symbols')).toEqual(
        `a&simple<text>line"with"symbols`
      );
    });
  });
});

describe('objectToHash', () => {
  it(`generates hash of an object`, () => {
    expect(objectToHash({})).toBe('3938');
    expect(objectToHash({ a: 1, b: 2 })).toBe('1268505936');
    expect(objectToHash([1, 2, 3, 4, 5])).toBe('969755921');
    expect(objectToHash({ a: 'data1', b: 'data2' })).toBe('864228006');
    // WARNING: Unsafe function (following test will fail)
    // expect(objectToHash({ a: 'data1', b: 'data2' })).toBe(objectToHash({ b: 'data2', a: 'data1' }));
  });
});

describe('objectHash', () => {
  it(`generates safe hash of an object`, () => {
    expect(objectHash({})).toBe('3938');
    expect(objectHash({ a: 1, b: 2 })).toBe('1268505936');
    expect(objectHash([1, 2, 3, 4, 5])).toBe('432686711');
    expect(objectHash({ a: 'data1', b: 'data2' })).toBe('864228006');
    expect(objectHash({ a: 'data1', b: 'data2' })).toBe(objectHash({ b: 'data2', a: 'data1' }));
  });
});

describe('stringToHash', () => {
  it(`generates hash of a string`, () => {
    expect(stringToHash('')).toBe('0');
    expect(stringToHash('abcdefghijk')).toBe('1810989158');
    expect(stringToHash('12345678990')).toBe('745463308');
  });
});

describe('convertUnixTimeYYYYMMDD', () => {
  describe(`when format is 'DATETIME_TYPE_FORMAT.SHORT_DATE'`, () => {
    test(`custom formats the timestamp`, () => {
      const time1 = Math.round(new Date('2020-01-01 10:37').getTime() / 1000);
      const time2 = Math.round(new Date('2020-12-24 10:37').getTime() / 1000);
      expect(convertUnixTimeYYYYMMDD(time1, DATETIME_TYPE_FORMAT.SHORT_DATE)).toEqual('2020-01-01');
      expect(convertUnixTimeYYYYMMDD(time2, DATETIME_TYPE_FORMAT.SHORT_DATE)).toEqual('2020-12-24');
    });
  });

  describe(`when format is anything else`, () => {
    test(`returns an empty string`, () => {
      const time = Math.round(new Date('2019-10-04 13:29').getTime() / 1000);
      expect(convertUnixTimeYYYYMMDD(time, 'MM/DD/YY')).toEqual('');
    });
  });
});

describe('convertUnixTimeDDMMYYYY', () => {
  describe(`when format is 'DATETIME_TYPE_FORMAT.SHORT_DATE'`, () => {
    test(`custom formats the timestamp`, () => {
      const time1 = Math.round(new Date('2020-01-01 10:37').getTime() / 1000);
      const time2 = Math.round(new Date('2020-12-24 10:37').getTime() / 1000);
      expect(convertUnixTimeDDMMYYYY(time1, DATETIME_TYPE_FORMAT.SHORT_DATE)).toEqual('01/01/2020');
      expect(convertUnixTimeDDMMYYYY(time2, DATETIME_TYPE_FORMAT.SHORT_DATE)).toEqual('24/12/2020');
    });
  });

  describe(`when format is anything else`, () => {
    test(`returns an empty string`, () => {
      const time = Math.round(new Date('2019-10-04 13:29').getTime() / 1000);
      expect(convertUnixTimeDDMMYYYY(time, 'MM/DD/YY')).toEqual('04/10/2019');
    });
  });
});

describe('convertUnixTimeHHMM', () => {
  it(`formats UNIX time to 'HH:MM'`, () => {
    const time = Math.round(new Date('2019-10-04 13:29').getTime() / 1000);
    expect(convertUnixTimeHHMM(time)).toEqual('13:29');
  });
});

describe('getHourMinuteNumber', () => {
  it(`custom formats 'date' to 'HHMM'`, () => {
    const date = new Date('2020-12-22 22:10');
    expect(getHourMinuteNumber(date)).toEqual(2210);
  });
});

describe('checkOpenStore', () => {
  const openTime = Math.round(new Date('2020-02-13 08:00').getTime() / 1000);
  const closeTime = Math.round(new Date('2020-02-13 21:00').getTime() / 1000);

  describe(`when current time is within store open time range`, () => {
    test(`idicates store as open`, () => {
      jest.setSystemTime(new Date('2020-02-13 10:00'));
      expect(checkOpenStore(openTime, closeTime)).toBe(true);
    });
  });

  describe(`when current time is outside of the store open time range`, () => {
    test(`idicates store as closed`, () => {
      jest.setSystemTime(new Date('2020-02-13 21:01'));
      expect(checkOpenStore(openTime, closeTime)).toBe(false);
    });
  });
});

describe('convertDateToDDMMYYY', () => {
  describe(`when 'strDate' is inalid`, () => {
    test(`an empty string is returned`, () => {
      expect(convertDateToDDMMYYY('')).toEqual('');
    });
  });

  describe(`when 'strDate' is valid`, () => {
    test(`custom encodes the provided string`, () => {
      expect(convertDateToDDMMYYY('2012-12-22')).toEqual('22/12/2012 ');
    });
  });
});

describe('safeEncodeURIComponent', () => {
  describe(`when data type is string`, () => {
    test(`URI is encoded as expected`, () => {
      [
        { data: '', expected: '' },
        { data: 'cat ', expected: 'cat%20' },
        { data: 'cat %&', expected: 'cat%20%25%26' }
      ].forEach(({ data, expected }) => expect(safeEncodeURIComponent(data)).toEqual(expected));
    });
  });

  describe(`when data type is something else`, () => {
    test(`empty string is returned`, () => {
      [{}, [], undefined, null, 1, true, 1.2].forEach((data) => {
        expect(safeEncodeURIComponent(data)).toEqual('');
      });
    });
  });
});

describe('safeDecodeURIComponent', () => {
  describe(`when data type is string`, () => {
    test(`URI is decoded as expected`, () => {
      [
        { data: '', expected: '' },
        { data: 'cat%20', expected: 'cat ' },
        { data: 'cat%20%25%26', expected: 'cat %&' },
        { data: 'cat?/<>', expected: 'cat?/<>' }
      ].forEach(({ data, expected }) => expect(safeDecodeURIComponent(data)).toEqual(expected));
    });
    test(`Malformed URIs are not processed and passed as is, by default`, () => {
      [{ data: 'cat%', expected: 'cat%' }].forEach(({ data, expected }) =>
        expect(safeDecodeURIComponent(data)).toEqual(expected)
      );
    });
    test(`Malformed URIs are not processed and empty string is returned, when 'sanitize' option is set to 'true'`, () => {
      [{ data: 'cat%', expected: '' }].forEach(({ data, expected }) =>
        expect(safeDecodeURIComponent(data, { sanitize: true })).toEqual(expected)
      );
    });
  });

  describe(`when data type is something else`, () => {
    test(`empty string is returned`, () => {
      [{}, [], undefined, null, 1, true, 1.2].forEach((data) => {
        expect(safeDecodeURIComponent(data)).toEqual('');
      });
    });
  });
});

describe('decodeRouteParam', () => {
  describe(`when data type is string`, () => {
    const encoded = `~%60%40%23%24%5E%26*()_-%2B%3D[]%2F%7B%7D%7C%3B%3A'"%2F%3F.%2C<>"'`;
    const decodedByHistory = decodeURI(encoded);

    test(`URI is decoded as expected`, () => {
      [
        { data: '', expected: '' },
        { data: 'cat%20', expected: 'cat ' },
        { data: 'cat%20%25%26', expected: 'cat %&' },
        { data: 'cat?/<>', expected: 'cat?/<>' },
        { data: decodedByHistory, expected: `~\`@#$^&*()_-+=[]/{}|;:'"/?.,<>"'` }
      ].forEach(({ data, expected }) => expect(decodeRouteParam(data)).toEqual(expected));
    });

    test(`Malformed URIs are not processed and passed as is, by default`, () => {
      [{ data: 'cat%', expected: 'cat%' }].forEach(({ data, expected }) =>
        expect(decodeRouteParam(data)).toEqual(expected)
      );
    });
  });
});
