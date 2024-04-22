import * as LIKE_API_PATH from '../../api/like';
import * as LIKE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';
import { gatewayTrackAddToWishlist, gatewayTrackRemoveFromWishlist } from 'tracking/gateway';

/**
 * Like one of product by id
 *
 * @param {string} productId <ex: 1234>
 */
export const likeProductAction =
  (productBox: any, isFetchNewListWhenSuccess = false) =>
  (dispatch, getState) => {
    const productId = (productBox && productBox.id) || -1; // NOTE: Setting default to -1 as in old logic
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.WISH_LIST_ACTION,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.WISH_LIST_ACTION.CLICK_ON_ALL_PAGE,
      value: 1
    });
    gatewayTrackAddToWishlist({ box: productBox });
    return dispatch({
      type: LIKE_ACTION_TYPE.LIKE_PRODUCT,
      payload: { promise: LIKE_API_PATH.likeProduct(productId).then((res) => res) },
      meta: { productId, isFetchNewListWhenSuccess },
      group: REDUCER_GROUP.LIKE
    });
  };

/**
 * Un Like one of product by id
 * TODO: Move params to an object
 *
 * @param {string} productId <ex: 1234>
 */
export const UnLikeProductAction =
  (productBox: any, onSuccess = () => {}, onReject = () => {}) =>
  (dispatch, getState) => {
    const productId = (productBox && productBox.id) || -1; // NOTE: Setting default to -1 as in old logic
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.WISH_LIST_ACTION,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.WISH_LIST_ACTION.CLICK_ON_ALL_PAGE,
      value: 1
    });
    gatewayTrackRemoveFromWishlist({ box: productBox });

    return dispatch({
      type: LIKE_ACTION_TYPE.UN_LIKE_PRODUCT,
      payload: {
        promise: LIKE_API_PATH.unLikeProduct(productId).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.LIKE,
      onSuccess,
      onReject
    });
  };

/** Fetch list of liked box id */
export const fetchListLikedBoxIdAction = () => (dispatch, getState) =>
  dispatch({
    type: LIKE_ACTION_TYPE.FETCH_LIKED_BOX_ID,
    payload: { promise: LIKE_API_PATH.fetchListLikedBoxId().then((res) => res) },
    group: REDUCER_GROUP.LIKE
  });

/**
 * Fetch list of liked boxes
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 */
export const fetchListLikedBoxesAction =
  ({ page, perPage, stockStatus }) =>
  (dispatch, getState) =>
    dispatch({
      type: LIKE_ACTION_TYPE.FETCH_LIKED_BOXES,
      payload: {
        promise: LIKE_API_PATH.fetchListLikedBoxes({ page, perPage, stockStatus }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.LIKE
    });
