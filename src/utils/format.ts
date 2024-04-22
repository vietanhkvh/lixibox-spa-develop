import { SLUG_MAP } from 'utils/string';

/**
 * Format number with decimal spacer
 * @param {number} value number
 * @return {string} number with format
 */
export const numberFormat = (_number: number | any) => {
  /**
   * Validate value
   * - NULL
   * - UNDEFINED
   * NOT A NUMBER
   */
  if (null === _number || 'undefined' === typeof _number || true === isNaN(_number)) {
    return '0';
  }

  const signValue = _number < 0 ? '-' : '';
  const absValue = Math.abs(_number);

  return signValue + absValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

/**
 * Get param search
 * HINT: Avoid. Use `new URLSearchParams(url).get(key)` instead
 * @return {string} key
 */
export const getUrlParameter = (url, key) => {
  key = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
  let results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
/**
 * Get all param search
 * @return {object} key
 */
export const getAllFilterParametes = (url) => {
  const parameters = new URLSearchParams(url);
  const page = parameters.get('page');
  const sort = parameters.get('sort');
  const pl = parameters.get('pl');
  const ph = parameters.get('ph');
  const bids = parameters.get('brands');
  const stockStatus = parameters.get('stock_status');
  return {
    sort,
    page,
    pl,
    ph,
    bids,
    stockStatus
  };
};
/**
 * Returns JS object equivalence to the provided query string
 * @param {string} search - Query string
 */
export const getUrlQuery = (search: string): { [key: string]: string } => {
  let keys: Array<string> = [];
  search
    .replace('?', '')
    .split('&')
    .forEach((param) => {
      if (!!param.length) {
        keys.push(param.split('=')[0]);
      }
    });

  const query = {};
  keys.forEach((key) => (query[key] = getUrlParameter(search, key)));
  return query;
};

/**
 * Converts a JS object into a query string
 * @param {object} queryObject - Query string as JS object (e.g. the output of `getUrlQuery`)
 */
export const getQueryString = (queryObject: { [key: string]: string }): string => {
  return Object.keys(queryObject)
    .filter((key) => queryObject[key] !== '')
    .map((key) => `${key}=${encodeURIComponent(queryObject[key])}`)
    .join('&');
};

/**
 * Get url
 * @return {string} key
 */
export const getUrl = (url = '') => {
  if (0 === url.length) return '';
  return url.split('?')[0];
};

export const convertVietnamese = (str: string = ''): string => {
  if (!str || !str.length) return '';
  str = str.toLowerCase();
  str = SLUG_MAP.normalizeAlphabets({ str });

  return str;
};

export const changeAlias = (str: string = ''): string => {
  if (!str || !str.length) return '';

  str = str.trim().toLowerCase();
  str = SLUG_MAP.normalizeAll({ str, replaceSpecialCharWith: 'space' });
  str = str.replace(/ + /g, ' ');

  return str;
};

/**
 * Format phone number. Example: 0978 001 227
 * @input phone number string
 * @returns phone number format string
 * @deprecated Use `prettifyPhoneNumber` instead
 */
export const formatPhoneNumber = (str) => {
  if (!str || str.length === 0) return '';

  return `${str.slice(0, 4)} ${str.slice(4, 7)} ${str.slice(7, str.length)}`;
};

export const createBreakDownLine = (str) => {
  if (!str || str.length === 0) return '';
  return str.replace(/(?:\r\n|\r|\n)/g, ' <br>');
};

export const tripHtmlTag = (inputString) => {
  try {
    let finalString = '';

    if ('string' === typeof inputString) {
      finalString = inputString;
    } else if ('object' === typeof inputString) {
      finalString = inputString.textContent || inputString.data;
    } else {
      return '';
    }

    const formatedString = finalString.replace(/<\/?[^>]+(>|$)/g, '');

    if (!formatedString || !formatedString.length) {
      return '';
    }

    return formatedString;
  } catch (e) {
    return '';
  }
};

export const formatPhoneNumberWithCountryPrefix = (phoneNumber: string) => {
  if (!phoneNumber || 10 !== phoneNumber.length || '0' !== phoneNumber[0]) return '';

  return `+84${phoneNumber.slice(1)}`;
};

export interface FormatPhoneNumberOptions {
  withCountryPrefix?: boolean;
}
/**
 * Prettify phone number. Example: (+84) 978 001 227
 *
 * Default options:
 * {
 *   withCountryPrefix: true
 * }
 */
export const prettifyPhoneNumber = (phoneNumber: string, options?: FormatPhoneNumberOptions) => {
  const _options = options || {
    withCountryPrefix: false
  };

  if (!phoneNumber || 10 !== phoneNumber.length) return phoneNumber;

  const prefix = _options.withCountryPrefix ? '+84' : '';

  if (prefix) {
    return `(${prefix}) ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 10)}`;
  } else {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
  }
};

export const hexToRGBA = (hex, alpha = 100) => {
  // If short form hex color code is provided, convert it to long form
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const roundNumber = (num, precision) => {
  if (Number.isInteger(num)) {
    return num;
  } else {
    var multiplier = Math.pow(10, precision);
    return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
  }
};
