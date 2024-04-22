import * as EXPERT_API_PATH from '../../api/expert';
import * as EXPERT_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Get expert info
 *
 * @param {string} idExpert
 */
export const getExpertInfoAction = (idExpert: string) => (dispatch, getState) =>
  dispatch({
    type: EXPERT_ACTION_TYPE.GET_EXPERT_INFO,
    payload: {
      promise: EXPERT_API_PATH.getExpertInfo(idExpert).then((res) => res)
    },
    meta: { idExpert },
    group: REDUCER_GROUP.EXPERT
  });

/**
 * Fetch product list by expert
 *
 * @param {string} idExpert
 */
export const fetchProductByExpertAction = (idExpert: string) => (dispatch, getState) =>
  dispatch({
    type: EXPERT_ACTION_TYPE.FETCH_PRODUCT_BY_EXPERT,
    payload: {
      promise: EXPERT_API_PATH.fetchProductByExpert(idExpert).then((res) => res)
    },
    meta: { idExpert },
    group: REDUCER_GROUP.EXPERT
  });

/**
 * Clear data expert info
 */
export const clearDataExpertInfoAction = () => (dispatch, getState) =>
  dispatch({
    type: EXPERT_ACTION_TYPE.CLEAR_DATA_EXPERT_INFO,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.EXPERT
  });

/**
 * Clear data product list by expert
 */
export const clearDataProductByExpertAction = () => (dispatch, getState) =>
  dispatch({
    type: EXPERT_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_EXPERT,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.EXPERT
  });
