import * as SPECIAL_DEALS_API_PATH from '../../api/special-deals';
import * as SPECIAL_DEALS_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch special deal list
 *
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 */
export const fetchSpecialDealListAction =
  ({ page = 1, perPage = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL_LIST,
      payload: {
        promise: SPECIAL_DEALS_API_PATH.fetchSpecialDealList({
          page,
          perPage
        }).then((res) => res)
      },
      group: REDUCER_GROUP.SPECIAL_DEALS
    });

/**
 * Fetch special deal by slug or id
 *
 * @param {string} slug ex: weekly-specials
 */
export const fetchSpecialDealBySlugAction =
  ({ slug }) =>
  (dispatch, getState) =>
    dispatch({
      type: SPECIAL_DEALS_ACTION_TYPE.FETCH_SPECIAL_DEAL,
      payload: {
        promise: SPECIAL_DEALS_API_PATH.fetchSpecialDealBySlug({ slug }).then((res) => res)
      },
      meta: { slug },
      group: REDUCER_GROUP.SPECIAL_DEALS
    });

/**
 * Clear data special deal list
 */
export const clearDataSpecialDealListAction = () => (dispatch, getState) =>
  dispatch({
    type: SPECIAL_DEALS_ACTION_TYPE.CLEAR_DATA_SPECIAL_DEAL_LIST,
    payload: {},
    group: REDUCER_GROUP.SPECIAL_DEALS
  });

/**
 * Clear data special deal by slug or id
 */
export const clearDataSpecialDealAction = () => (dispatch, getState) =>
  dispatch({
    type: SPECIAL_DEALS_ACTION_TYPE.CLEAR_DATA_SPECIAL_DEAL,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.SPECIAL_DEALS
  });
