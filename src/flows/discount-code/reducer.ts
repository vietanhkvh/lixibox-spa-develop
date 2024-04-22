import { REDUCER_GROUP } from '../reducer.group';
import * as DISCOUNT_CODE_ACTION_TYPE from './type';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_DISCOUNT_CODE = {
  discountCodes: {},
  discountCodesBoxes: {},
  discountCodeSpecialAddons: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    lastCode: '',
    fetching: false,
    loaded: false,
    errored: false
  },
  discountCodeApplicableBoxes: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    lastCode: '',
    fetching: false,
    loaded: false,
    errored: false
  },
  discountCodeGiftBoxes: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    lastCode: '',
    fetching: false,
    loaded: false,
    errored: false
  },

  lastDiscountCode: '',
  isFetchingDiscountCode: false,
  isFetchDiscountCodeSuccess: false,
  isFetchDiscountCodeBoxesSuccess: false
};

const discountCodeReducer = (
  state = INITIAL_STATE_DISCOUNT_CODE,
  action = {
    type: '',
    payload: {
      discount_code: {},
      discount_codes: [],
      add_ons: [],
      boxes: [],
      paging: {
        current_page: 1,
        per_page: 20,
        total_pages: 0
      }
    },
    meta: {
      code: '',
      page: 1,
      perPage: 20
    },
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.DISCOUNT_CODE) {
    return state;
  }

  const { discountCodes, discountCodesBoxes } = state;
  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  switch (action.type) {
    /** Fetch discount code by code */
    case PENDING_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE):
      return Object.assign({}, state, {
        lastDiscountCode: action.meta.code,
        isFetchingDiscountCode: true,
        isFetchDiscountCodeSuccess: false
      });

    case FULFILLED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE):
      const discountCodeItem = {
        [generationHash]: action.payload.discount_code
      };
      const newDiscountCodes = Object.assign({}, discountCodeItem, discountCodes);

      return Object.assign({}, state, {
        discountCodes: newDiscountCodes,
        isFetchDiscountCodeSuccess: true,
        isFetchingDiscountCode: false
      });

    case REJECTED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE):
      return Object.assign({}, state, {
        isFetchDiscountCodeSuccess: false,
        isFetchingDiscountCode: false
      });

    case PENDING_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_SPECIAL_ADDONS):
      return Object.assign({}, state, {
        discountCodeSpecialAddons: Object.assign({}, state.discountCodeSpecialAddons, {
          lastCode: action.meta.code,
          fetching: true
        })
      });

    case FULFILLED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_SPECIAL_ADDONS):
      return Object.assign({}, state, {
        discountCodeSpecialAddons: Object.assign({}, state.discountCodeSpecialAddons, {
          byQuery: Object.assign({}, state.discountCodeSpecialAddons.byQuery, {
            [generationHash]: action.payload.add_ons
          }),
          pages: state.discountCodeSpecialAddons.pages.concat(action.payload.paging.current_page),
          lastPaging: action.payload.paging,
          lastCode: action.meta.code,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_SPECIAL_ADDONS):
      return Object.assign({}, state, {
        discountCodeSpecialAddons: Object.assign({}, state.discountCodeSpecialAddons, {
          lastCode: action.meta.code,
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_APPLICABLE_BOXES):
      return Object.assign({}, state, {
        discountCodeApplicableBoxes: Object.assign({}, state.discountCodeApplicableBoxes, {
          lastCode: action.meta.code,
          fetching: true
        })
      });

    case FULFILLED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_APPLICABLE_BOXES):
      return Object.assign({}, state, {
        discountCodeApplicableBoxes: Object.assign({}, state.discountCodeApplicableBoxes, {
          byQuery: Object.assign({}, state.discountCodeApplicableBoxes.byQuery, {
            [generationHash]: action.payload.boxes
          }),
          pages: state.discountCodeApplicableBoxes.pages.concat(action.payload.paging.current_page),
          lastPaging: action.payload.paging,
          lastCode: action.meta.code,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_APPLICABLE_BOXES):
      return Object.assign({}, state, {
        discountCodeApplicableBoxes: Object.assign({}, state.discountCodeApplicableBoxes, {
          lastCode: action.meta.code,
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_GIFT_BOXES):
      return Object.assign({}, state, {
        discountCodeGiftBoxes: Object.assign({}, state.discountCodeGiftBoxes, {
          lastCode: action.meta.code,
          fetching: true
        })
      });

    case FULFILLED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_GIFT_BOXES):
      return Object.assign({}, state, {
        discountCodeGiftBoxes: Object.assign({}, state.discountCodeGiftBoxes, {
          byQuery: Object.assign({}, state.discountCodeGiftBoxes.byQuery, {
            [generationHash]: action.payload.boxes
          }),
          pages: state.discountCodeGiftBoxes.pages.concat(action.payload.paging.current_page),
          lastPaging: action.payload.paging,
          lastCode: action.meta.code,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_GIFT_BOXES):
      return Object.assign({}, state, {
        discountCodeGiftBoxes: Object.assign({}, state.discountCodeGiftBoxes, {
          lastCode: action.meta.code,
          fetching: false,
          errored: true
        })
      });

    /** Fetch discount code boxes by product id */
    case PENDING_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_BOXES):
      return Object.assign({}, state, {
        isFetchDiscountCodeBoxesSuccess: false
      });

    case FULFILLED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_BOXES): {
      let discountCodePayload = action.payload.discount_codes;
      discountCodePayload = Array.isArray(discountCodePayload) ? discountCodePayload.filter((code) => code) : [];

      if (discountCodePayload && !!discountCodePayload.length) {
        gaEventTracking({
          category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
          action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR,
          label: `${
            GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR.DISPLAY_ON_SCREEN
          } : ${'Box Detail'}`,
          value: 1
        });
      }

      const discountCodeBoxesItem = {
        [generationHash]: discountCodePayload
      };
      const newDiscountCodesBoxes = Object.assign({}, discountCodesBoxes, discountCodeBoxesItem);

      return Object.assign({}, state, {
        discountCodesBoxes: newDiscountCodesBoxes,
        isFetchDiscountCodeBoxesSuccess: true
      });
    }

    case REJECTED_TYPE(DISCOUNT_CODE_ACTION_TYPE.FETCH_DISCOUNT_CODE_BOXES):
      return Object.assign({}, state, {
        isFetchDiscountCodeBoxesSuccess: false
      });

    case DISCOUNT_CODE_ACTION_TYPE.CLEAR_DATA_DISCOUNT_CODE:
      return Object.assign({}, state, { discountCodes: {} });

    default:
      return state;
  }
};

export default discountCodeReducer;
