import { REDUCER_GROUP } from '../reducer.group';
import * as BRAND_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_BRAND = {
  list: [],
  productByBrandId: {},
  productBrandPaging: { current_page: 0, per_page: 0, total_pages: 0 },
  isProductByBrandIdSuccess: false,
  isFetchingProductByBrandId: false,
  isFetchingBrand: true
};

function brandReducer(
  state = INITIAL_STATE_BRAND,
  action = {
    type: '',
    payload: { groups: {}, paging: {} },
    meta: {
      id: ''
    },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.BRAND) {
    return state;
  }

  const { productByBrandId } = state;

  switch (action.type) {
    /** Fetch theme list */
    case PENDING_TYPE(BRAND_ACTION_TYPE.FETCH_BRAND_LIST):
      return Object.assign({}, state, {
        list: [],
        isFetchingBrand: true
      });

    case FULFILLED_TYPE(BRAND_ACTION_TYPE.FETCH_BRAND_LIST):
      return Object.assign({}, state, {
        list: action.payload.groups,
        isFetchingBrand: false
      });

    case REJECTED_TYPE(BRAND_ACTION_TYPE.FETCH_BRAND_LIST):
      return Object.assign({}, state, {
        list: [],
        isFetchingBrand: false
      });

    /** Fetch product list by brand id */
    case PENDING_TYPE(BRAND_ACTION_TYPE.FETCH_PRODUCT_BY_BRAND_ID):
      return Object.assign({}, state, {
        isProductByBrandIdSuccess: false,
        isFetchingProductByBrandId: true,
        productByBrandId: {}
      });

    case FULFILLED_TYPE(BRAND_ACTION_TYPE.FETCH_PRODUCT_BY_BRAND_ID):
      const keyHash = objectToHash(action.meta);
      const tmpList = { [keyHash]: action.payload };
      const tmpProductByBrandId = Object.assign({}, tmpList, productByBrandId);
      return Object.assign({}, state, {
        productByBrandId: tmpProductByBrandId,
        productBrandPaging: action.payload.paging,
        isProductByBrandIdSuccess: true,
        isFetchingProductByBrandId: false
      });

    case REJECTED_TYPE(BRAND_ACTION_TYPE.FETCH_PRODUCT_BY_BRAND_ID):
      return Object.assign({}, state, {
        isProductByBrandIdSuccess: false,
        isFetchingProductByBrandId: false,
        productByBrandId: {}
      });

    case BRAND_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_BRAND_ID:
      return Object.assign({}, state, {
        productByBrandId: {}
      });

    default:
      return state;
  }
}

export default brandReducer;
