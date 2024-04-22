import { REDUCER_GROUP } from '../reducer.group';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

import * as RECOMMENDATION_ACTION_TYPE from './type';
import { RecommendationState } from './types';

export const INITIAL_STATE_RECOMMENDATION: RecommendationState = {
  cartRecommendationList: [],
  cartRecommendationStatus: {
    fetching: false,
    loaded: false,
    errored: false
  }
};

function recommendationReducer(
  state = INITIAL_STATE_RECOMMENDATION,
  action = {
    type: '',
    payload: { boxes: [] },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.RECOMMENDATION) return state;

  try {
    switch (action.type) {
      case PENDING_TYPE(RECOMMENDATION_ACTION_TYPE.FETCH_CART_RECOMMENDATION_LIST):
        return Object.assign({}, state, {
          cartRecommendationList: [],
          cartRecommendationStatus: {
            fetching: true,
            loaded: false,
            errored: false
          }
        });

      case FULFILLED_TYPE(RECOMMENDATION_ACTION_TYPE.FETCH_CART_RECOMMENDATION_LIST):
        return Object.assign({}, state, {
          cartRecommendationList: action.payload.boxes || [],
          cartRecommendationStatus: {
            fetching: false,
            loaded: true,
            errored: false
          }
        });

      case REJECTED_TYPE(RECOMMENDATION_ACTION_TYPE.FETCH_CART_RECOMMENDATION_LIST):
        return Object.assign({}, state, {
          cartRecommendationList: [],
          cartRecommendationStatus: {
            fetching: false,
            loaded: false,
            errored: true
          }
        });

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}

export default recommendationReducer;
