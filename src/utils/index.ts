import { getCsrfToken } from './auth';
import { currenyFormat } from './currency';
import { decodeEntities, objectToHash, stringToHash, convertDateToDDMMYYY } from './encode';
import { numberFormat } from './format';
import { updateMenuSelect } from './menu';
import {
  navigateFreeLink,
  navigateMagazine,
  navigateLixicointConvert,
  navigateExpert,
  navigateAdmin
} from './navigate';
import { isMobileVersion } from './responsive';
import { set, get, check, createCookie, readCookie, eraseCookie } from './storage';
import { categoryFilterUrlParser, categoryFilterApiFormat } from './uri';
import { isPromise, isEmptyObject, isUndefined, isCompareObject } from './validate';
import { checkMessageReminder, checkUserInfoFields, checkCartEmptyMessage } from './check-message-reminder';

export {
  /** auth */
  getCsrfToken,
  /** currency */
  currenyFormat,
  /** encode */
  decodeEntities,
  objectToHash,
  stringToHash,
  convertDateToDDMMYYY,
  /** format */
  numberFormat,
  /** menu */
  updateMenuSelect,
  /** navigate */
  navigateFreeLink,
  navigateMagazine,
  navigateLixicointConvert,
  navigateExpert,
  navigateAdmin,
  /** responsive */
  isMobileVersion,
  /** Storage */
  set,
  get,
  check,
  createCookie,
  readCookie,
  eraseCookie,
  /** uri */
  categoryFilterUrlParser,
  categoryFilterApiFormat,
  /** validate */
  isPromise,
  isEmptyObject,
  isUndefined,
  isCompareObject,
  /** check */
  checkMessageReminder,
  checkUserInfoFields,
  checkCartEmptyMessage
};
