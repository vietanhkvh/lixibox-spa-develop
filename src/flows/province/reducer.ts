import { REDUCER_GROUP } from '../reducer.group';
import * as PROVINCE_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_PROVINCE = {
  provinceList: {
    list: []
  },
  wardList: {},
  shipFeeList: {},
  isFetchWardListSuccess: false,
  isFetchShipFeeListSuccess: false
};

const provinceReducer = (
  state = INITIAL_STATE_PROVINCE,
  action = {
    type: '',
    payload: { provinces: [], wards: [] },
    meta: { districtId: '', provinceId: '', provinceName: '', districtName: '' },
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.PROVINCE) {
    return state;
  }

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  /** User province list */
  const { wardList } = state;

  switch (action.type) {
    /** Fetch province list */
    case PENDING_TYPE(PROVINCE_ACTION_TYPE.FETCH_PROVINCE_LIST):
      return state;

    case FULFILLED_TYPE(PROVINCE_ACTION_TYPE.FETCH_PROVINCE_LIST):
      return Object.assign({}, state, {
        provinceList: { list: action.payload.provinces }
      });

    case REJECTED_TYPE(PROVINCE_ACTION_TYPE.FETCH_PROVINCE_LIST):
      return state;

    /** Fetch ship fee by district id */
    case PENDING_TYPE(PROVINCE_ACTION_TYPE.FETCH_SHIPPING_FEE_BY_DISTRICT_ID):
      return Object.assign({}, state, { isFetchShipFeeListSuccess: false });

    case FULFILLED_TYPE(PROVINCE_ACTION_TYPE.FETCH_SHIPPING_FEE_BY_DISTRICT_ID):
      // const shipFeeItem = { [generationHash]: action.payload };
      // const newShipFeeList = Object.assign({}, shipFeeList, shipFeeItem);

      return Object.assign({}, state, {
        shipFeeList: {
          ...action.payload,
          provinceName: action.meta.provinceName,
          districtName: action.meta.districtName
        },
        isFetchShipFeeListSuccess: true
      });

    case REJECTED_TYPE(PROVINCE_ACTION_TYPE.FETCH_SHIPPING_FEE_BY_DISTRICT_ID):
      return Object.assign({}, state, { isFetchShipFeeListSuccess: false });

    /** Fetch ward by province id */
    case PENDING_TYPE(PROVINCE_ACTION_TYPE.FETCH_WARD_BY_PROVINCE_ID):
      return Object.assign({}, state, { isFetchWardListSuccess: false });

    case FULFILLED_TYPE(PROVINCE_ACTION_TYPE.FETCH_WARD_BY_PROVINCE_ID):
      const wards = { [generationHash]: action.payload.wards };
      const newWardList = Object.assign({}, wardList, wards);

      return Object.assign({}, state, {
        wardList: newWardList,
        isFetchWardListSuccess: true
      });

    case REJECTED_TYPE(PROVINCE_ACTION_TYPE.FETCH_WARD_BY_PROVINCE_ID):
      return Object.assign({}, state, { isFetchWardListSuccess: false });

    default:
      return state;
  }
};

export default provinceReducer;
