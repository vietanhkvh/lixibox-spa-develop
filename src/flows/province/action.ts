import * as PROVINCE_API_PATH from '../../api/province';
import * as PROVINCE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch province list action
 */

export const fetchProvinceListAction = () => (dispatch, getState) =>
  dispatch({
    type: PROVINCE_ACTION_TYPE.FETCH_PROVINCE_LIST,
    payload: {
      promise: PROVINCE_API_PATH.fetchProvinceList().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.PROVINCE
  });

/**
 * Fetch ship fee by province id and district id
 */

export const fetchShipFeeByDistrictIdAction =
  ({ provinceName = '', districtName = '', provinceId = 0, districtId, boxId = 0 }) =>
  (dispatch, getState) =>
    dispatch({
      type: PROVINCE_ACTION_TYPE.FETCH_SHIPPING_FEE_BY_DISTRICT_ID,
      payload: {
        promise: PROVINCE_API_PATH.fetchShipFeeByDistrictId({
          provinceId,
          districtId,
          boxId
        }).then((res) => res)
      },
      meta: { districtId, provinceName, districtName },
      group: REDUCER_GROUP.PROVINCE
    });

/**
 * Fetch ward by province id
 */

export const fetchWardByProvinceIdAction =
  ({ provinceId }) =>
  (dispatch, getState) =>
    dispatch({
      type: PROVINCE_ACTION_TYPE.FETCH_WARD_BY_PROVINCE_ID,
      payload: {
        promise: PROVINCE_API_PATH.fetchWardByProvinceId({ provinceId }).then((res) => res)
      },
      meta: { provinceId },
      group: REDUCER_GROUP.PROVINCE
    });
