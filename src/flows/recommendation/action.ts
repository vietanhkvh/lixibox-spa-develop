import * as RECOMMENDATION_API_PATH from '../../api/recommendation';
import * as RECOMMENDATION_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch Cart Recommendation List
 *
 * @param {number} page ex : 1
 * @param {number} perPage ex : 12
 */

export const fetchCartRecommendationListAction =
  ({ page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: RECOMMENDATION_ACTION_TYPE.FETCH_CART_RECOMMENDATION_LIST,
      payload: {
        promise: RECOMMENDATION_API_PATH.fetchCartRecommendationList({ page, perPage }).then((res) => res)
      },
      group: REDUCER_GROUP.RECOMMENDATION
    });
