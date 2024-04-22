jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn().mockReturnValue({}) }
}));
import {
  numberFormat,
  getUrlParameter,
  getUrlQuery,
  getQueryString,
  getUrl,
  changeAlias,
  formatPhoneNumber,
  createBreakDownLine,
  tripHtmlTag,
  formatPhoneNumberWithCountryPrefix,
  convertVietnamese,
  prettifyPhoneNumber
} from '../format';

test('[Utils Function] Format number with dot letter', () => {
  /** With number */
  expect(numberFormat(0)).toBe('0');
  expect(numberFormat(999)).toBe('999');
  expect(numberFormat(1000000)).toBe('1.000.000');
  expect(numberFormat(-1000000)).toBe('-1.000.000');

  /** Without number */
  expect(numberFormat('abcd')).toBe('0');
  expect(numberFormat({})).toBe('0');
});

describe('getUrlParameter', () => {
  describe(`when 'key' doesn't exist`, () => {
    test(`an empty string is returned`, () => {
      expect(getUrlParameter(`http://google.com?q=example`, 'q1')).toEqual('');
    });
  });

  describe(`when 'key' exists`, () => {
    test(`associated value is returned`, () => {
      expect(getUrlParameter(`http://google.com?q=example`, 'q')).toEqual('example');
      expect(getUrlParameter(`http://google.com?q[name]=example`, 'q[name]')).toEqual('example');
      expect(getUrlParameter(`http://google.com?q=example+products`, 'q')).toEqual('example products');
      expect(getUrlParameter(`http://google.com?q=example%20products`, 'q')).toEqual('example products');
    });
  });
});

describe('getUrlQuery', () => {
  test(`returns JS object equivalence to the provided query string`, () => {
    expect(getUrlQuery('?key=val')).toEqual({ key: 'val' });
    expect(getUrlQuery('?key=val&anotherKey=anotherVal&yetAnother[key]=val%201')).toEqual({
      key: 'val',
      anotherKey: 'anotherVal',
      'yetAnother[key]': 'val 1'
    });
  });
});

describe('getQueryString', () => {
  test(`returns the provided JS object into a query string`, () => {
    expect(getQueryString({ key: 'val' })).toEqual('key=val');
    expect(getQueryString({ key: 'val', anotherKey: 'anotherVal', 'yetAnother[key]': 'val 1' })).toEqual(
      'key=val&anotherKey=anotherVal&yetAnother[key]=val%201'
    );
  });
});

describe('getUrl', () => {
  describe(`when 'url' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(getUrl()).toEqual('');
    });
  });

  describe(`when 'url' is provided`, () => {
    test(`URL is returned without query string`, () => {
      expect(getUrl('http://google.com?q=search')).toEqual('http://google.com');
    });
  });
});

describe('changeAlias', () => {
  describe(`when 'str' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(changeAlias()).toEqual('');
    });
  });

  describe(`when 'str' is provided`, () => {
    test(`an equivalent lowercase string is returned with Vietnamese accent removed`, () => {
      expect(changeAlias('Kiểm tra chuỗi dữ + liệu')).toEqual('kiem tra chuoi du lieu');
      expect(changeAlias('một chuỗi thử nghiệm dài khác')).toEqual('mot chuoi thu nghiem dai khac');
      expect(changeAlias('một chuỗi thử nghiệm dài khác')).toEqual('mot chuoi thu nghiem dai khac');
      expect(changeAlias('một chuỗi thử nghiệm dài  khác')).toEqual('mot chuoi thu nghiem dai khac');
      expect(
        changeAlias(
          'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüû!@%ỳýỵỷỹđñç^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
        )
      ).toEqual('aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuu yyyyydnc ');
    });
  });
});

describe('formatPhoneNumber', () => {
  describe(`when an empty string is provided`, () => {
    test(`an empty string is returned`, () => {
      expect(formatPhoneNumber('')).toEqual('');
    });
  });

  describe(`when a non empty string is provided`, () => {
    test(`attempts to format string as a phone number`, () => {
      expect(formatPhoneNumber('0341234567')).toEqual('0341 234 567');
    });
  });
});

describe('createBreakDownLine', () => {
  describe(`when an empty string is provided`, () => {
    test(`an empty string is returned`, () => {
      expect(createBreakDownLine('')).toEqual('');
    });
  });

  describe(`when a non empty string is provided`, () => {
    test(`attempts to format to multiline string by replacing newline markers with 'br' HTML tags`, () => {
      expect(createBreakDownLine('this is\r\na multiline\r\nstring')).toEqual('this is <br>a multiline <br>string');
    });
  });
});

describe('tripHtmlTag', () => {
  describe(`when an invalid or empty 'inputString' is provided`, () => {
    test(`returns an empty string`, () => {
      [true, ''].forEach((inputString) => expect(tripHtmlTag(inputString)).toEqual(''));
    });
  });

  describe(`when a valid 'inputString' is provided`, () => {
    describe(`where 'inputString' is a string`, () => {
      test(`returns an string with the HTML tags removed`, () => {
        expect(tripHtmlTag('test string')).toEqual('test string');
        expect(tripHtmlTag(`test<div>1</div>string<a href='#'>link</a>. Another<br/>sentence.`)).toEqual(
          'test1stringlink. Anothersentence.'
        );
      });
    });

    describe(`where 'inputString' is an object`, () => {
      test(`returns an string with the HTML tags removed`, () => {
        expect(tripHtmlTag({})).toEqual('');
        expect(tripHtmlTag({ data: '' })).toEqual('');
        expect(tripHtmlTag({ data: 'test<div>string</div>' })).toEqual('teststring');
        expect(tripHtmlTag({ textContent: 'test<div>string</div>' })).toEqual('teststring');
      });
    });
  });
});

describe('[Utils Function] Format phone number with country prefix', () => {
  it(`when "phoneNumber" invalid input data`, () => {
    expect(formatPhoneNumberWithCountryPrefix('')).toBe('');
    expect(formatPhoneNumberWithCountryPrefix('0')).toBe('');
    expect(formatPhoneNumberWithCountryPrefix('1234567890')).toBe('');
    expect(formatPhoneNumberWithCountryPrefix('09876543210')).toBe('');
  });

  it(`when "phoneNumber" valid input data`, () => {
    expect(formatPhoneNumberWithCountryPrefix('0987654321')).toBe('+84987654321');
  });
});

describe('convertVietnamese', () => {
  describe('when no string or empty string is provided', () => {
    test('empty string is returned', () => {
      expect(convertVietnamese()).toBe('');
      expect(convertVietnamese('')).toBe('');
    });
  });
  describe('when non-empty string is provided', () => {
    test('string is converted to lowercase and normalized', () => {
      expect(
        convertVietnamese(
          'àáÀÁảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
        )
      ).toBe(
        'aaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
      );
    });
  });
});

describe('prettifyPhoneNumber', () => {
  it('should return the same phone number if it is not 10 digits long', () => {
    const phoneNumber = '123456789';
    const options = { withCountryPrefix: true };
    const result = prettifyPhoneNumber(phoneNumber, options);
    expect(result).toEqual(phoneNumber);
  });

  it('should return the prettified phone number with country prefix', () => {
    const phoneNumber = '0123456789';
    const options = { withCountryPrefix: true };
    const result = prettifyPhoneNumber(phoneNumber, options);
    expect(result).toEqual('(+84) 123 456 789');
  });

  it('should return the prettified phone number without country prefix', () => {
    const phoneNumber = '0123456789';
    const options = { withCountryPrefix: false };
    const result = prettifyPhoneNumber(phoneNumber, options);
    expect(result).toEqual('012 345 6789');
  });
});
