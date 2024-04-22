import * as BRAND_API_PATH from '../../api/brand';
import * as BRAND_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Fetch Brand List */
export const fetchBrandListAction = () => (dispatch, getState) =>
  dispatch({
    type: BRAND_ACTION_TYPE.FETCH_BRAND_LIST,
    payload: { promise: BRAND_API_PATH.fetchBrandList().then((res) => res) },
    group: REDUCER_GROUP.BRAND
  });

/** Fecth list all product by brand id */
export const fetchProductByBrandIdAction =
  ({ id, pl = '', ph = '', sort = '', stockStatus = '', page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: BRAND_ACTION_TYPE.FETCH_PRODUCT_BY_BRAND_ID,
      payload: {
        promise: BRAND_API_PATH.fetchProductByBrandId({
          id,
          page,
          perPage,
          pl,
          ph,
          sort,
          stockStatus
        }).then((res) => res)
      },
      meta: { id, page, perPage },
      group: REDUCER_GROUP.BRAND
    });

/** Fetch Brand List */
export const clearDataBrandsByIdAction = () => (dispatch, getState) =>
  dispatch({
    type: BRAND_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_BRAND_ID,
    payload: {},
    group: REDUCER_GROUP.BRAND
  });
