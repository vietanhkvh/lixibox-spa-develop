import { REDUCER_GROUP } from '../reducer.group';
import * as GWP_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { GwpState } from './types';

export const INITIAL_STATE_GWP: GwpState = {
  schemes: {
    index: [],
    testimonials: [],
    faqs: [],
    videoBanner: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  loadedScheme: {
    detail: null,
    fetching: false,
    loaded: false,
    errored: false
  }
};

function gwpReducer(
  state = INITIAL_STATE_GWP,
  action = {
    type: '',
    payload: {
      schemes: [],
      testimonials: [],
      faqs: [],
      scheme: null,
      desktop_video: null,
      mobile_video: null
    },
    meta: {
      slug: ''
    },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.GWP) {
    return state;
  }

  try {
    switch (action.type) {
      case PENDING_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEMES):
        return Object.assign({}, state, {
          schemes: Object.assign({}, state.schemes, {
            fetching: true,
            errored: false
          })
        });

      case FULFILLED_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEMES):
        return Object.assign({}, state, {
          schemes: Object.assign({}, state.schemes, {
            index: action.payload.schemes || [],
            testimonials: action.payload.testimonials || [],
            faqs: action.payload.faqs || [],
            videoBanner: {
              landscape: action.payload.desktop_video || null,
              portrait: action.payload.mobile_video || null
            },
            fetching: false,
            loaded: true,
            errored: false
          })
        });

      case REJECTED_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEMES):
        return Object.assign({}, state, {
          schemes: Object.assign({}, state.schemes, {
            fetching: false,
            errored: true
          })
        });

      case PENDING_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEME_DETAIL):
        return Object.assign({}, state, {
          loadedScheme: Object.assign({}, state.loadedScheme, {
            fetching: true,
            errored: false
          })
        });

      case FULFILLED_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEME_DETAIL):
        return Object.assign({}, state, {
          loadedScheme: Object.assign({}, state.loadedScheme, {
            detail: action.payload.scheme || null,
            fetching: false,
            loaded: true,
            errored: false
          })
        });

      case REJECTED_TYPE(GWP_ACTION_TYPE.GET_GWP_SCHEME_DETAIL):
        return Object.assign({}, state, {
          loadedScheme: Object.assign({}, state.loadedScheme, {
            fetching: false,
            errored: true
          })
        });

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}

export default gwpReducer;
