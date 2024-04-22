import * as DISCOUNT_CODE_API_PATH from '../../api/discount-code';
import * as DISCOUNT_CODE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch discount code by code
 *
 * @param {string} code ex: EA9F8521
 */
export const fetchDiscountCodesByCodeAction =
  ({ code }) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE,
      payload: {
        promise: DISCOUNT_CODE_API_PATH.fetchDiscountCodesByCode({ code }).then((res) => res)
      },
      meta: { code },
      group: REDUCER_GROUP.DISCOUNT_CODE
    });

export type FetchDiscountCodeSpecialAddonsActionParams = DISCOUNT_CODE_API_PATH.FetchDiscountCodeSpecialAddonsParams;
export const fetchDiscountCodeSpecialAddonsAction =
  ({ code, page, perPage }: DISCOUNT_CODE_API_PATH.FetchDiscountCodeSpecialAddonsParams) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_SPECIAL_ADDONS,
      payload: {
        promise: DISCOUNT_CODE_API_PATH.fetchDiscountCodeSpecialAddons({ code, page, perPage }).then((res) => res)
      },
      meta: { code, page, perPage },
      group: REDUCER_GROUP.DISCOUNT_CODE
    });

export const fetchDiscountCodeApplicableBoxesAction =
  ({ code, page, perPage }: DISCOUNT_CODE_API_PATH.FetchDiscountCodeApplicableBoxesParams) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_APPLICABLE_BOXES,
      payload: {
        promise: DISCOUNT_CODE_API_PATH.fetchDiscountCodeApplicableBoxes({ code, page, perPage }).then((res) => res)
      },
      meta: { code, page, perPage },
      group: REDUCER_GROUP.DISCOUNT_CODE
    });

export const fetchDiscountCodeGiftBoxesAction =
  ({ code, page, perPage }: DISCOUNT_CODE_API_PATH.FetchDiscountCodeGiftBoxesParams) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_GIFT_BOXES,
      payload: {
        promise: DISCOUNT_CODE_API_PATH.fetchDiscountCodeGiftBoxes({ code, page, perPage }).then((res) => res)
      },
      meta: { code, page, perPage },
      group: REDUCER_GROUP.DISCOUNT_CODE
    });

/**
 * Fetch discount code boxes by product id
 *
 * @param {string} productId ex: 3301
 * @param {number} limit ex: 2
 */
export const fetchDiscountCodesBoxesAction =
  ({ productId, limit }) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_BOXES,
      payload: {
        promise: DISCOUNT_CODE_API_PATH.fetchDiscountCodesBoxes({
          productId,
          limit
        }).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.DISCOUNT_CODE
    });

/**
 * Clear data discount code by code
 */
export const clearDataDiscountCodeAction = () => (dispatch, getState) =>
  dispatch({
    type: DISCOUNT_CODE_ACTION_TYPE.CLEAR_DATA_DISCOUNT_CODE,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.DISCOUNT_CODE
  });
