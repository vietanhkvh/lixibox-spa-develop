import { DATETIME_TYPE_FORMAT } from '../../constants/application/global';
import stableStringify from './json-stable-stringify';

/**
 * Decode Entities html
 *
 * @param str string
 * @return string fater encoded
 */
export const decodeEntities = (str) => {
  return null === str || 'undefined' === typeof str
    ? ''
    : String(str)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
};

/**
 * Convert object to hash key
 * WARNING: Unsafe function (see test)
 * @deprecated Use `objectHash` instead
 *
 * @param objectStock object to convert
 * @return hash string
 */
export const objectToHash = (objectStock: Object) => {
  let newObjectStock = Object.assign({}, objectStock);
  const keys = Object.keys(objectStock);

  keys.forEach((item) => {
    // eslint-disable-next-line
    if (objectStock[item] == objectStock[item] * 1) {
      newObjectStock[item] = objectStock[item] * 1;
    }
  });

  const objectStringify = JSON.stringify(newObjectStock);
  return stringToHash(objectStringify);
};

/**
 * Generate safe hash of an object
 * TODO: Replace `stringToHash` with native `window.crypto`
 *
 * @param obj object to convert
 * @returns hash string
 */
export const objectHash = (obj: { [key: string]: any }) => stringToHash(stableStringify(obj));

/**
 * Convert string to hash key
 * @deprecated Replace `stringToHash` usage with native `window.crypto`
 *
 * @param stringStock string to convert
 * @return hash tring
 */
export const stringToHash = (stringStock: string): string => {
  /** Init stock hash string as date time string */
  let hash = 0;
  if (typeof stringStock !== 'string' || 0 === stringStock.length) {
    return `${hash}`;
  }

  for (let i = 0, len = stringStock.length; i < len; i++) {
    let character = stringStock.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash;
  }

  return `${Math.abs(hash)}`;
};

export const convertUnixTimeYYYYMMDD = (unixTime: number, format: string) => {
  const newDate = new Date(unixTime * 1000);

  switch (format) {
    case DATETIME_TYPE_FORMAT.SHORT_DATE:
      const month = newDate.getMonth() + 1;
      return `${newDate.getFullYear()}-${month < 10 ? `0` + month : month}-${
        newDate.getDate() < 10 ? `0` + newDate.getDate() : newDate.getDate()
      }`;

    default:
      return '';
  }
};

export const convertUnixTimeDDMMYYYY = (unixTime: number, format?: string) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const convertUnixTimeHHMM = (unixTime: number) => {
  const date = new Date(unixTime * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp
  // const seconds = "0" + date.getSeconds();

  return hours + ':' + minutes.substr(-2);
};

export const getHourMinuteNumber = (date) => {
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();

  return parseInt(hours + minutes.substr(-2));
};

export const checkOpenStore = (openUnixTime, closeUnixTime) => {
  const currentDate = new Date();
  const openDate = new Date(openUnixTime * 1000);
  const closeDate = new Date(closeUnixTime * 1000);

  if (
    getHourMinuteNumber(currentDate) >= getHourMinuteNumber(openDate) &&
    getHourMinuteNumber(currentDate) <= getHourMinuteNumber(closeDate)
  ) {
    return true;
  }

  return false;
};

// TODO: Invalid string fallback not provided
export const convertDateToDDMMYYY = (strDate: string) => {
  if (0 === strDate.length) {
    return '';
  }

  const arrDate = strDate.split('-');
  return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]} `;
};

/** Underscore case to camel case conversion */
export const toCamel = (text) =>
  text.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

/** Camel case to underscore case conversion */
export const toSnake = (text) =>
  text
    .replace(/(?:^|\.?)([A-Z])/g, function (_, y) {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');

/**
 * Wrapper - Encodes URI component wherever possible, for unknown data types
 * TODO: Drop this function once full TypeScript coverage is achieved
 */
export const safeEncodeURIComponent = (data: any) => {
  if (typeof data !== 'string') return '';

  let encoded = '';
  try {
    encoded = encodeURIComponent(data);
  } catch (e) {}

  return encoded;
};

export const safeDecodeURIComponent = (data: any, options: { sanitize: boolean } = { sanitize: false }) => {
  if (typeof data !== 'string') return '';

  let decoded = options.sanitize ? '' : data;
  try {
    decoded = decodeURIComponent(data);
  } catch (e) {}

  return decoded;
};

/**
 * Route param decoder
 *
 * NOTE: Serves as a temporary workaround to the `history` package issue https://github.com/remix-run/history/issues/505
 * TODO: Drop this method once `history` package is upgraded to a version where the above mentioned issue is resolved
 */
export const decodeRouteParam = (param: string) => {
  return safeDecodeURIComponent(param);
};
