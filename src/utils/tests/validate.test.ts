import * as yup from 'yup';
jest.mock('../../app/init-react-app', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));
import {
  isPromise,
  isEmptyObject,
  isUndefined,
  isCompareObject,
  isCartEmpty,
  isEmptyFullName,
  getFirstName,
  getLastName,
  checkLinkValid,
  isEmptyKeyObject,
  getNavLink,
  autoCorrectLink,
  isExternalLink,
  compareObject,
  compareArray,
  validationMessage,
  defineYupValidtors,
  isValidPhoneNumber,
  getPhoneOrEmail,
  isValidEmail
} from '../validate';
import { store } from '../../app/init-react-app';

describe('isPromise', () => {
  test('a promise should be detected', () => {
    const object = {
      promise: new Promise(() => {})
    };
    expect(Boolean(isPromise(null))).toEqual(false);
    expect(Boolean(isPromise([]))).toEqual(false);
    expect(isPromise(object)).toEqual(true);
  });

  test('a non promise should be detected', () => {
    const nonPromise = {};
    expect(Boolean(isPromise(nonPromise))).toEqual(false);
  });
});

test('[Utils Function] is object empty function', () => {
  const cyclic: { [key: string]: any } = {};
  cyclic.prop = cyclic;
  expect(isEmptyObject({})).toBe(true);
  expect(isEmptyObject(null)).toBe(true);
  expect(isEmptyObject(undefined)).toBe(true);
  expect(isEmptyObject(123)).toBe(false);
  expect(isEmptyObject({ a: 1 })).toBe(false);
  expect(isEmptyObject(cyclic)).toBe(false);
});

test('[Utils Function] is undefined value', () => {
  let a;
  let b = 1;
  let c = { d: 1 };
  let e = null;

  expect(isUndefined(a)).toBe(true);
  expect(isUndefined(b)).toBe(false);
  expect(isUndefined(c)).toBe(false);
  expect(isUndefined(e)).toBe(false);
});

test('[Utils Function] is compare object', () => {
  let a;
  let b = { c: 1 };
  let d = { e: 2 };
  let f = { c: 1 };

  expect(isCompareObject(a, b)).toBe(false);
  expect(isCompareObject(b, d)).toBe(false);
  expect(isCompareObject(d, f)).toBe(false);
  expect(isCompareObject(b, f)).toBe(true);
});

test('[Utils Function] check empty cart', () => {
  const item = {
    id: 1430814,
    cart_id: 430792,
    quantity: 1,
    price: 200000,
    discount_price: 0,
    discount_message: '',
    coins: 0,
    referrer_id: null,
    is_pre_order: false,
    pre_order_release_date: 0,
    purchase_type: 0,
    created_at: 1568693286,
    updated_at: 1568693286,
    note: null,
    editable: true,
    removable: true,
    linked_gift_type: null,
    box: {
      id: 7875,
      slug: 'okame-set-01-shampoo-conditioner',
      name: 'OKAME Set Shampoo + Conditioner',
      primary_picture: {
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/original/1523329786.jpg',
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/facebook/1523329786.jpg',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/large/1523329786.jpg',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/medium/1523329786.jpg',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/thumb/1523329786.jpg',
        blur_url:
          'https://s3-ap-southeast-1.amazonaws.com/example-staging-uploads/system/pictures/files/000/026/092/blur/1523329786.jpg'
      },
      is_individual: false
    }
  };

  const correctCart = [item];
  const incorrectCart = [{ ...item, purchase_type: 1 }];
  const emptyCart = [];

  expect(isCartEmpty(correctCart)).toBe(false);
  expect(isCartEmpty(incorrectCart)).toBe(true);
  expect(isCartEmpty(incorrectCart, 1)).toBe(false);
  expect(isCartEmpty(emptyCart)).toBe(true);
});

test('[Utils Function] chcek empty full name', () => {
  expect(isEmptyFullName('')).toBe(true);
  expect(isEmptyFullName('abd')).toBe(true);
  expect(isEmptyFullName('Nguyen Van A')).toBe(false);
});

test('[Utils Function] get first name in fullname string', () => {
  expect(getFirstName('')).toBe('');
  expect(getFirstName('Tran Van Nam')).toBe('Nam');
  expect(getFirstName('Nguyen Van A')).toBe('A');
});

test('[Utils Function] get last name in fullname string', () => {
  expect(getLastName('')).toBe('');
  expect(getLastName('Nguyen')).toBe('Nguyen');
  expect(getLastName('Tran Van Nam')).toBe('Tran Van');
  expect(getLastName('Nguyen Van A')).toBe('Nguyen Van');
});

describe('checkLinkValid', () => {
  test('valid links should be identified', () => {
    [undefined, null, '', '#'].forEach((link) => expect(checkLinkValid(link)).toEqual(false));
    expect(checkLinkValid('http://google.com/q=example')).toEqual(true);
  });
});

describe('autoCorrectLink', () => {
  test('should return link with HTTPS and WWW prefix', () => {
    expect(autoCorrectLink('google.com/q=example')).toEqual('https://www.google.com/q=example');
    expect(autoCorrectLink('http://google.com/q=example')).toEqual('https://www.google.com/q=example');
    expect(autoCorrectLink('http://www.google.com/q=example')).toEqual('https://www.google.com/q=example');
    expect(autoCorrectLink('https://www.google.com/q=example')).toEqual('https://www.google.com/q=example');
  });
});

describe('getNavLink', () => {
  test('should return link with HTTPS and WWW prefix', () => {
    expect(getNavLink('')).toEqual('');
    expect(getNavLink('https://example.com/sample/path?q=search')).toEqual('https://example.com/sample/path?q=search');
    expect(getNavLink(`${process.env.REACT_APP_FQDN}/sample/path?q=search`)).toEqual('/sample/path?q=search');
  });

  test('should return empty string for invalid URLs', () => {
    expect(getNavLink('example.com/sample/path?q=search')).toEqual('');
    expect(getNavLink('www.example.com/sample/path?q=search')).toEqual('');
  });
});

describe('isExternalLink', () => {
  describe(`when 'link' is empty`, () => {
    beforeEach(() => {
      (store.getState as any).mockReturnValue({ cart: { constants: {} } });
    });
    test(`should return 'false'`, () => {
      expect(isExternalLink('')).toBe(false);
    });
  });

  describe(`when 'lixibox_domains' list is unavailable`, () => {
    beforeEach(() => {
      (store.getState as any).mockReturnValue({ cart: { constants: {} } });
    });
    test(`should return 'true'`, () => {
      expect(isExternalLink('https://lixibox.com/a/link?q=123')).toBe(true);
    });
  });

  describe(`when internal link`, () => {
    beforeEach(() => {
      (store.getState as any).mockReturnValue({ cart: { constants: { lixibox_domains: ['lixibox.com'] } } });
    });

    test(`should return 'false'`, () => {
      expect(isExternalLink('https://lixibox.com/a/link?q=123')).toBe(false);
    });
  });

  describe(`when external link`, () => {
    beforeEach(() => {
      (store.getState as any).mockReturnValue({ cart: { constants: { lixibox_domains: ['lixibox.com'] } } });
    });

    test(`should return 'true'`, () => {
      expect(isExternalLink('https://example.com/a/link?q=123')).toBe(true);
      expect(isExternalLink('https://lixibox.com.example.com/a/link?q=123')).toBe(true);
    });
  });
});

test('[Utils Function] Check empty key object', () => {
  expect(isEmptyKeyObject({}, 'b')).toBe(true);
  expect(isEmptyKeyObject({ a: 1 }, 'b')).toBe(true);
  expect(isEmptyKeyObject({ a: 1, b: 2 }, 'a')).toBe(false);
  expect(isEmptyKeyObject({ a: 1, b: 2 }, 'c')).toBe(true);
});

describe('compareObject', () => {
  test('should detect if objects are identical', () => {
    expect(compareObject({ a: 1 }, {})).toEqual(false);
    expect(compareObject({ a: 1 }, { a: 2 })).toEqual(false);
    expect(compareObject({}, {})).toEqual(true);
    expect(compareObject({ x: 1 }, { x: 1 })).toEqual(true);
  });
});

describe('compareArray', () => {
  test('should detect if two array are identical', () => {
    expect(compareArray([], [1])).toBe(false);
    expect(compareArray([1], [1])).toBe(true);
    // expect(compareArray([1], [2])).toBe(false);
    // expect(compareArray([null], [null])).toBe(true);
    expect(compareArray([1], null)).toBe(false);
  });
});

describe('validationMessage', () => {
  describe('required', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.required('title')).toEqual('Vui lòng nhập title');
    });
  });

  describe('minLength', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.minLength('title', 3)).toEqual('Title phải có ít nhất 3 ký tự');
    });
  });

  describe('maxLength', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.maxLength('title', 3)).toEqual('Title không được vượt quá 3 ký tự');
    });
  });

  describe('pattern', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.pattern('title')).toEqual('Định dạng title không hợp lệ');
    });
  });

  describe('min', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.min('title', 3)).toEqual('Độ dài title phải tối thiểu 3');
    });
  });

  describe('max', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.max('title', 3)).toEqual('Độ dài title phải tối đa 3');
    });
  });

  describe('email', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.email('title')).toEqual('Định dạng title không hợp lệ');
    });
  });

  describe('minWords', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.minWords('title', 3)).toEqual('Độ dài title phải có ít nhất 3 từ');
    });
  });

  describe('maxWords', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.maxWords('title', 3)).toEqual('Độ dài title không được vượt quá 3 từ');
    });
  });

  describe('integer', () => {
    test(`returns formatted validation string`, () => {
      expect(validationMessage.integer('title')).toEqual('Title chỉ được chứa các chữ số');
    });
  });

  describe('dateValid', () => {
    test(`returns formatted validation date`, () => {
      expect(validationMessage.dateValid('title')).toEqual('Giá trị title không hợp lệ.');
    });
  });

  describe('rating', () => {
    test(`returns formatted validation rating`, () => {
      expect(validationMessage.rating('title')).toEqual('Hãy chọn cảm nhận của bạn về title');
    });
  });

  describe('phoneOrEmail', () => {
    test(`returns formatted validation rating`, () => {
      expect(validationMessage.phoneOrEmail('title')).toEqual('Định dạng title không hợp lệ');
    });
  });
  describe('letterOnly', () => {
    test(`returns failed if contain number`, () => {
      expect(validationMessage.letterOnly('title')).toEqual('title chỉ chứa chữ cái');
    });
  });

  describe('fullNameSegments', () => {
    test(`returns failed if contain number`, () => {
      expect(validationMessage.fullNameSegments('title')).toEqual('title phải chứa Họ và Tên');
    });
  });

  describe('fullNameSegmentMin', () => {
    test(`returns failed if contain number`, () => {
      expect(validationMessage.fullNameSegmentMin('title')).toEqual('title mỗi từ phải có ít nhất 1 kí tự');
    });
  });
});

describe('Yup validator - minWords', () => {
  beforeAll(() => {
    defineYupValidtors();
  });

  test(`string with word count more than defined threshold should be considered valid`, () => {
    const schema = yup.object().shape({
      data: yup.string().minWords(3)
    });

    expect(schema.isValidSync({ data: 'ab bce ef' })).toBe(true);
    expect(schema.isValidSync({ data: 'ab bce ef f' })).toBe(true);
    expect(schema.isValidSync({ data: 'ab bce ef fg' })).toBe(true);
    expect(schema.isValidSync({ data: 'ab bce ef fg g' })).toBe(true);
  });
  test(`string with word count less than defined threshold should be considered invalid`, () => {
    const schema = yup.object().shape({
      data: yup.string().minWords(3)
    });

    expect(schema.isValidSync({ data: '' })).toBe(false);
    expect(schema.isValidSync({ data: 'a b' })).toBe(false);
    expect(schema.isValidSync({ data: 'ab b' })).toBe(false);
  });
});

describe('Yup validator - maxWords', () => {
  beforeAll(() => {
    defineYupValidtors();
  });

  test(`string with word count less than defined threshold should be considered valid`, () => {
    const schema = yup.object().shape({
      data: yup.string().maxWords(3)
    });

    expect(schema.isValidSync({ data: '' })).toBe(true);
    expect(schema.isValidSync({ data: 'a b' })).toBe(true);
    expect(schema.isValidSync({ data: 'ab b' })).toBe(true);
    expect(schema.isValidSync({ data: 'ab bce ef' })).toBe(true);
  });
  test(`string with word count more than defined threshold should be considered invalid`, () => {
    const schema = yup.object().shape({
      data: yup.string().maxWords(3)
    });

    expect(schema.isValidSync({ data: 'a b c d' })).toBe(false);
    expect(schema.isValidSync({ data: 'ab bcc ddd eee' })).toBe(false);
    expect(schema.isValidSync({ data: 'ab bce ef g h i j k' })).toBe(false);
  });
});

describe('Yup validator - integer', () => {
  beforeAll(() => {
    defineYupValidtors();
  });

  test(`string with numeric characters only should be considered valid`, () => {
    const schema = yup.object().shape({
      data: yup.string().integer()
    });

    expect(schema.isValidSync({ data: '' })).toBe(true);
    expect(schema.isValidSync({ data: '1' })).toBe(true);
    expect(schema.isValidSync({ data: '12' })).toBe(true);
    expect(schema.isValidSync({ data: '012' })).toBe(true);
  });

  test(`string with non-numeric characters should be considered invalid`, () => {
    const schema = yup.object().shape({
      data: yup.string().integer(3)
    });

    expect(schema.isValidSync({ data: 'a' })).toBe(false);
    expect(schema.isValidSync({ data: 'a b' })).toBe(false);
    expect(schema.isValidSync({ data: '1 2' })).toBe(false);
    expect(schema.isValidSync({ data: '0 ' })).toBe(false);
    expect(schema.isValidSync({ data: '0a' })).toBe(false);
  });

  test(`with formatted error message`, () => {
    const Title = {
      age: 'Age'
    };
    const schema = yup.object().shape({
      age: yup.string().integer(({ path }) => validationMessage.integer(Title[path]))
    });

    expect(() => {
      schema.validateSync({ age: '' });
    }).not.toThrow();
    try {
      schema.validateSync({ age: 'a' });
    } catch (e) {
      expect(e.errors[0]).toBe('Age chỉ được chứa các chữ số');
    }
  });
});

describe('Yup validator - phoneOrEmail', () => {
  beforeAll(() => {
    defineYupValidtors();
  });

  test('should return true for valid phone numbers', async () => {
    const schema = yup.string().phoneOrEmail('Invalid phone number');
    const validPhoneNumbers = ['0123456789', '0987654321'];
    for (const phoneNumber of validPhoneNumbers) {
      const isValid = await schema.isValid(phoneNumber);
      expect(isValid).toBe(true);
    }
  });

  test('should return true for valid email addresses', async () => {
    const schema = yup.string().phoneOrEmail('Invalid email address');
    const validEmails = ['test@example.com', 'test123@gmail.com'];
    for (const email of validEmails) {
      const isValid = await schema.isValid(email);
      expect(isValid).toBe(true);
    }
  });

  test('should return false for invalid phone numbers and email addresses', async () => {
    const schema = yup.string().phoneOrEmail('Invalid phone number or email address');
    const invalidValues = ['123', 'abc', '01234567890', 'test@', 'test@.com'];
    for (const value of invalidValues) {
      const isValid = await schema.isValid(value);
      expect(isValid).toBe(false);
    }
  });
});

describe('isValidPhoneNumber', () => {
  test('should return true for valid phone numbers', () => {
    const validPhoneNumbers = ['0123456789', '0987654321'];
    for (const phoneNumber of validPhoneNumbers) {
      const isValid = isValidPhoneNumber(phoneNumber);
      expect(isValid).toBe(true);
    }
  });

  test('should return false for invalid phone numbers', () => {
    const invalidPhoneNumbers = ['123', 'abc', '01234567890'];
    for (const phoneNumber of invalidPhoneNumbers) {
      const isValid = isValidPhoneNumber(phoneNumber);
      expect(isValid).toBe(false);
    }
  });
});

describe('isValidEmail', () => {
  test('should return true for valid email addresses', () => {
    const validEmails = ['test@example.com', 'test123@gmail.com'];
    for (const email of validEmails) {
      const isValid = isValidEmail(email);
      expect(isValid).toBe(true);
    }
  });

  test('should return false for invalid email addresses', () => {
    const invalidEmails = ['test@', 'test@.com', 'test.com'];
    for (const email of invalidEmails) {
      const isValid = isValidEmail(email);
      expect(isValid).toBe(false);
    }
  });
});

describe('getPhoneOrEmail', () => {
  test('should return empty strings for empty input', () => {
    const [phone, email] = getPhoneOrEmail('');
    expect(phone).toEqual('');
    expect(email).toEqual('');
  });

  test('should return phone number if input is a valid phone number', () => {
    const [phone, email] = getPhoneOrEmail('0123456789');
    expect(phone).toEqual('0123456789');
    expect(email).toEqual('');
  });

  test('should return email if input is not a valid phone number', () => {
    const [phone, email] = getPhoneOrEmail('test@example.com');
    expect(phone).toEqual('');
    expect(email).toEqual('test@example.com');
  });

  test('should return an array of two empty strings if input is not a valid phone number or email', () => {
    const [phone, email] = getPhoneOrEmail('123');
    expect(phone).toEqual('');
    expect(email).toEqual('');
  });
});
