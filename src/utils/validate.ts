import * as yup from 'yup';
import { capitalize } from './string';
import { store } from '../app/init-react-app';

/**
 * Returns whether the provided value is a promise
 *
 * @param {object} value Potential promise
 * @return {Boolean}
 */
// FIXME: Not testing a promise
export const isPromise = (value) => {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
};

/**
 * Check empty for object
 *
 * @param {Object} object
 * @return {boolean}
 */
export const isEmptyObject = (object: any) => {
  if (true === isUndefined(object)) {
    return true;
  }

  if ('object' !== typeof object) {
    return false;
  }
  try {
    const objectStringify = JSON.stringify(object);
    return objectStringify.length <= 6;
  } catch (e) {
    return false;
  }

  // return 0 === Object.keys(object).length;
};

/**
 * Check undefined for value
 *
 * @param {any} value
 * @return {boolean}
 */
export const isUndefined = (value: any) => 'undefined' === typeof value;

/**
 * Compare between 2 objects by compare JSON stringify
 *
 * @param {object} a
 * @param {object} b
 */
export const isCompareObject = (a: Object, b: Object) => JSON.stringify(a) === JSON.stringify(b);

/** Check cart not contain a product which bought by money */
export const isCartEmpty = (list, purchaseType = 0) => {
  if (0 === list.length) {
    return true;
  }

  const _list = list.filter((item) => item.purchase_type === purchaseType);
  if (0 === _list.length) {
    return true;
  }

  return false;
};

/**
 * Full name must greater than 4 character. Ex: Le Le (5 characters)
 */
export const isEmptyFullName = (str) => {
  return typeof str === 'undefined' || str === null || str === '' || str.trim().length < 5;
};

export const getFirstName = (fullName) => {
  if (isEmptyFullName(fullName)) return '';

  fullName = fullName.trim().replace(/\s\s+/g, ' ');
  const nameArr = fullName && fullName.split(' ');

  return nameArr[nameArr.length - 1];
};

export const getLastName = (fullName) => {
  if (isEmptyFullName(fullName)) return '';

  fullName = fullName.trim().replace(/\s\s+/g, ' ');
  const nameArr = fullName && fullName.split(' ');

  if (nameArr.length === 1) return nameArr[0];
  return nameArr.slice(0, nameArr.length - 1).join(' ');
};

// FIXME: Doesn't completely validate links
export const checkLinkValid = (link) => {
  return 'undefined' !== typeof link && link !== null && link.trim().length > 0 && link !== '#';
};

export const autoCorrectLink = (link) => {
  if (link.indexOf('https://') === -1) {
    const newLink = link.replace('www.', '').replace('http://', '').replace('https://', '');

    return `https://www.${newLink}`;
  }

  return link;
};

export const getNavLink = (url) => {
  if (!url) return '';

  try {
    const _uri = new URL(url);
    return process.env.REACT_APP_HOST_NAME === _uri.hostname ? _uri.pathname + _uri.search : url;
  } catch (e) {
    return '';
  }
};

export const isExternalLink = (url) => {
  if (!url) return false;

  const state = store.getState();
  const lixiboxDomains =
    state && (state as any).cart && (state as any).cart.constants && (state as any).cart.constants.lixibox_domains;

  if (!lixiboxDomains) {
    return true;
  }

  const isExternal = !lixiboxDomains.find((hostname) => {
    try {
      const _internalUri = new URL(`http://` + hostname);
      const targetUri = new URL(url);
      return _internalUri.hostname.match(new RegExp(`${targetUri.hostname.replace(`.`, `\\.`)}$`, 'i'));
    } catch (e) {
      return false;
    }
  });

  return isExternal;
};

export const isSameOriginLink = (link: string) => {
  try {
    return new URL(link).host === new URL(process.env.REACT_APP_FQDN).host;
  } catch (e) {
    return true;
  }
};

/**
 * Check empty for object
 *
 * @param {Object} object
 * @return {boolean}
 */
export const isEmptyKeyObject = (object: any, key: string) => {
  if (isUndefined(object) || isEmptyObject(object)) {
    return true;
  }

  return !object.hasOwnProperty(key);
};

export const isFakeFacebookEmail = (email: string): boolean => {
  return !!(email && email.match(/@facebook.com$/));
};

export const compareArray = (a, b) => {
  try {
    if (a.length !== b.length) return false;

    let checkDiff = true;

    a.forEach((item, index) => {
      if (!b[index] || !compareObject(item, b[index])) checkDiff = false;
    });

    return checkDiff;
  } catch (e) {
    return false;
  }
};

export const compareObject = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    /** Return false when number of key is diff */
    return false;
  }
  let checkDiff = true;

  aKeys.forEach((akey) => {
    if (bKeys.indexOf(akey) < 0 || a[akey] !== b[akey]) {
      /** Return false when value of key or value is diff */
      checkDiff = false;
    }
  });

  return checkDiff;
};

export const validationMessage = {
  required: (fieldTitle) => `Vui lòng nhập ${fieldTitle.toLowerCase()}`,
  min: (fieldTitle, min) => `Độ dài ${fieldTitle.toLowerCase()} phải tối thiểu ${min}`, // number
  max: (fieldTitle, max) => `Độ dài ${fieldTitle.toLowerCase()} phải tối đa ${max}`, // number
  pattern: (fieldTitle) => `Định dạng ${fieldTitle.toLowerCase()} không hợp lệ`,
  minLength: (fieldTitle, minLength) => `${capitalize(fieldTitle)} phải có ít nhất ${minLength} ký tự`, // string
  maxLength: (fieldTitle, maxLength) => `${capitalize(fieldTitle)} không được vượt quá ${maxLength} ký tự`, // string
  email: (fieldTitle) => `Định dạng ${fieldTitle.toLowerCase()} không hợp lệ`,
  minWords: (fieldTitle, minWords) => `Độ dài ${fieldTitle.toLowerCase()} phải có ít nhất ${minWords} từ`,
  maxWords: (fieldTitle, maxWords) => `Độ dài ${fieldTitle.toLowerCase()} không được vượt quá ${maxWords} từ`,
  integer: (fieldTitle) => `${capitalize(fieldTitle)} chỉ được chứa các chữ số`,
  rating: (fieldTitle) => `Hãy chọn cảm nhận của bạn về ${fieldTitle.toLowerCase()}`,
  phoneOrEmail: (fieldTitle) => `Định dạng ${fieldTitle.toLowerCase()} không hợp lệ`,
  dateValid: (fieldTitle) => `Giá trị ${fieldTitle.toLowerCase()} không hợp lệ.`,
  letterOnly: (fieldName) => `${fieldName} chỉ chứa chữ cái`,
  fullNameSegments: (fieldTitle) => `${fieldTitle} phải chứa Họ và Tên`,
  fullNameSegmentMin: (fieldTitle) => `${fieldTitle} mỗi từ phải có ít nhất 1 kí tự`
};

/**
 * WARNING:
 * Bundler may hoist global variables before function invocation. And ordering is unpredictable, when multiple files
 * are considered. This may result in scenario where custom validators are not defined before they are used. To avoid
 * this issue, define form schema in a function, if it's defined in global scope.
 */
export const defineYupValidtors = () => {
  yup.addMethod(yup.string, 'minWords', function (minWords, error) {
    return this.test('minWords', error, function (value) {
      const { path, createError } = this;

      const hasSufficientWords = (note) => note.trim().split(/\s+/).length >= minWords;
      return hasSufficientWords(value) || createError({ path, message: error, params: { minWords } });
    });
  });

  yup.addMethod(yup.string, 'maxWords', function (maxWords, error) {
    return this.test('maxWords', error, function (value) {
      const { path, createError } = this;

      const hasSufficientWords = (note) => note.trim().split(/\s+/).length <= maxWords;
      return hasSufficientWords(value) || createError({ path, message: error, params: { maxWords } });
    });
  });

  yup.addMethod(yup.string, 'integer', function (error) {
    return this.test('integer', error, function (value) {
      const { path, createError } = this;

      return (typeof value === 'string' && !!value.match(/^\d*$/)) || createError({ path, message: error, params: {} });
    });
  });

  yup.addMethod(yup.string, 'phoneOrEmail', function (error) {
    return this.test('phoneOrEmail', error, function (value) {
      const { path, createError } = this;

      // TODO: Utilize yup's native email validator
      return (
        (typeof value === 'string' &&
          (!!value.match(/^0[0-9]{9}$/) ||
            !!value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) ||
        createError({ path, message: error, params: {} })
      );
    } as any);
  });

  yup.addMethod(yup.string, 'fullNameSegments', function (error) {
    return this.test('fullNameSegments', error, function (value) {
      const { path, createError } = this;

      return (
        (typeof value === 'string' && !!value.match(/(.+ )+.+/)) || createError({ path, message: error, params: {} })
      );
    });
  });

  yup.addMethod(yup.string, 'fullNameSegmentMin', function (error) {
    return this.test('fullNameSegmentMin', error, function (value) {
      const { path, createError } = this;

      return (
        (typeof value === 'string' && !!value.match(/(.{1,} )+.{1,}/)) ||
        createError({ path, message: error, params: {} })
      );
    });
  });
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  return !!phoneNumber.match(/^0[0-9]{9}$/);
};

export const isValidEmail = (email: string) => {
  return !!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
};

/**
 * @returns {string[]} - returns an array where first element is phone number and second element is email
 */
export const getPhoneOrEmail = (phoneOrEmail: string) => {
  if (!phoneOrEmail) return ['', ''];

  const phone = isValidPhoneNumber(phoneOrEmail) ? phoneOrEmail : '';
  const email = phone ? '' : isValidEmail(phoneOrEmail) ? phoneOrEmail : '';

  return [phone, email];
};
