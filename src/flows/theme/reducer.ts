import { REDUCER_GROUP } from '../reducer.group';
import * as THEME_ACTION_TYPE from './type';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';

import { objectToHash, objectHash } from '../../utils/encode';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { ThemeState } from './reducer.type';

export const INITIAL_STATE_THEME: ThemeState = {
  theme: { list: [] },
  productByThemeId: {},
  boxes: {
    byQuery: {},
    lastTouchedId: '',
    fetching: false,
    loaded: false,
    errored: false
  },
  gwpSchemeExclusiveBoxes: {
    bySchemeSlug: {}
  },
  sectionsById: {},
  promotions: [],
  isProductByThemeIdSuccess: false,
  isProductByThemeIdFail: false
};

function themeReducer(
  state = INITIAL_STATE_THEME,
  action = {
    type: '',
    payload: {
      discount_codes: [],
      promotions: [],
      boxes: [],
      paging: null
    },
    meta: { id: '', hashKeys: {}, sectionId: null, schemeSlug: '' },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.THEME) {
    return state;
  }

  switch (action.type) {
    /** Fetch theme list */
    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_THEME):
      return Object.assign({}, state, {
        theme: {
          list: action.payload
        }
      });

    /** Fetch theme list */
    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_PROMOTIONS):
      return Object.assign({}, state, {
        promotions: action.payload.promotions
      });

    /** Fetch product list by theme id */
    case PENDING_TYPE(THEME_ACTION_TYPE.FETCH_PRODUCT_BY_THEME_ID):
      return Object.assign({}, state, {
        isProductByThemeIdSuccess: false,
        isProductByThemeIdFail: false
      });

    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_PRODUCT_BY_THEME_ID):
      if (!!action.payload && !!action.payload.discount_codes) {
        gaEventTracking({
          category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
          action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR,
          label: `${GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR.DISPLAY_ON_SCREEN} : ${'Theme'}`,
          value: 1
        });
      }
      const keyHash = objectToHash({ id: action.meta.id });

      return Object.assign({}, state, {
        isProductByThemeIdSuccess: true,
        productByThemeId: { [keyHash]: action.payload },
        isProductByThemeIdFail: false
      });

    case REJECTED_TYPE(THEME_ACTION_TYPE.FETCH_PRODUCT_BY_THEME_ID):
      return Object.assign({}, state, {
        isProductByThemeIdSuccess: false,
        isProductByThemeIdFail: true
      });

    case PENDING_TYPE(THEME_ACTION_TYPE.FETCH_GWP_SCHEME_EXCLUSIVE_BOXES):
      return Object.assign({}, state, {
        gwpSchemeExclusiveBoxes: Object.assign({}, state.gwpSchemeExclusiveBoxes, {
          bySchemeSlug: Object.assign({}, state.gwpSchemeExclusiveBoxes.bySchemeSlug, {
            [action.meta.schemeSlug]: {
              fetching: true,
              loaded: false,
              errored: false
            }
          })
        })
      });

    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_GWP_SCHEME_EXCLUSIVE_BOXES):
      return Object.assign({}, state, {
        gwpSchemeExclusiveBoxes: Object.assign({}, state.gwpSchemeExclusiveBoxes, {
          bySchemeSlug: Object.assign({}, state.gwpSchemeExclusiveBoxes.bySchemeSlug, {
            [action.meta.schemeSlug]: {
              index: action.payload.boxes || [],
              paging: action.payload.paging || null,
              fetching: false,
              loaded: true,
              errored: false
            }
          })
        })
      });

    case REJECTED_TYPE(THEME_ACTION_TYPE.FETCH_GWP_SCHEME_EXCLUSIVE_BOXES):
      return Object.assign({}, state, {
        gwpSchemeExclusiveBoxes: Object.assign({}, state.gwpSchemeExclusiveBoxes, {
          bySchemeSlug: Object.assign({}, state.gwpSchemeExclusiveBoxes.bySchemeSlug, {
            [action.meta.schemeSlug]: {
              fetching: false,
              loaded: false,
              errored: true
            }
          })
        })
      });

    /** Fetch theme boxes */
    case PENDING_TYPE(THEME_ACTION_TYPE.FETCH_THEME_BOXES): {
      const keyHash = objectHash(action.meta.hashKeys);
      return Object.assign({}, state, {
        boxes: Object.assign({}, state.boxes, {
          lastTouchedId: keyHash,
          fetching: true
        })
      });
    }

    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_THEME_BOXES): {
      const keyHash = objectHash(action.meta.hashKeys);

      return Object.assign({}, state, {
        boxes: Object.assign({}, state.boxes, {
          byQuery: Object.assign({}, state.boxes.byQuery, { [keyHash]: action.payload }),
          fetching: false,
          loaded: true,
          errored: false
        })
      });
    }

    case REJECTED_TYPE(THEME_ACTION_TYPE.FETCH_THEME_BOXES): {
      return Object.assign({}, state, {
        boxes: Object.assign({}, state.boxes, {
          fetching: false,
          errored: true
        })
      });
    }

    /** Fetch theme section */
    case PENDING_TYPE(THEME_ACTION_TYPE.FETCH_THEME_SECTION):
      return Object.assign({}, state, {
        sectionsById: Object.assign({}, state.sectionsById, {
          [action.meta.sectionId]: {
            section: null,
            fetching: true,
            loaded: false,
            errored: false
          }
        })
      });

    case FULFILLED_TYPE(THEME_ACTION_TYPE.FETCH_THEME_SECTION): {
      return Object.assign({}, state, {
        sectionsById: Object.assign({}, state.sectionsById, {
          [action.meta.sectionId]: {
            section: action.payload,
            fetching: false,
            loaded: true,
            errored: false
          }
        })
      });
    }

    case REJECTED_TYPE(THEME_ACTION_TYPE.FETCH_THEME_SECTION):
      return Object.assign({}, state, {
        sectionsById: Object.assign({}, state.sectionsById, {
          [action.meta.sectionId]: {
            section: null,
            fetching: false,
            loaded: false,
            errored: true
          }
        })
      });

    case THEME_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_THEME_ID:
      return Object.assign({}, state, {
        productByThemeId: {}
      });

    default:
      return state;
  }
}

export default themeReducer;
