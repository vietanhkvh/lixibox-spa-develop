import * as TRACKING_API_PATH from '../../api/tracking';
import * as TRACKING_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Tracking view box */
export const trackingViewBoxAction =
  ({ boxId, expertTrackingItemCode, campaignCode, referrerObjectType, referrerObjectId }) =>
  (dispatch, getState) =>
    dispatch({
      type: TRACKING_ACTION_TYPE.TRACKING_VIEW_BOX,
      payload: {
        promise: TRACKING_API_PATH.trackingViewBox({
          boxId,
          expertTrackingItemCode,
          campaignCode,
          referrerObjectType,
          referrerObjectId
        }).then((res) => res)
      },
      group: REDUCER_GROUP.TRACKING
    });

/** Tracking view group */
export const trackingViewGroupAction =
  ({ groupObjectType, groupObjectId, referrerObjectType, referrerObjectId, campaignCode }) =>
  (dispatch, getState) =>
    dispatch({
      type: TRACKING_ACTION_TYPE.TRACKING_VIEW_GROUP,
      payload: {
        promise: TRACKING_API_PATH.trackingViewGroup({
          groupObjectType,
          groupObjectId,
          referrerObjectType,
          referrerObjectId,
          campaignCode
        }).then((res) => res)
      },
      meta: { groupObjectId, campaignCode },
      group: REDUCER_GROUP.TRACKING
    });

/**
 * Fetch experts tracking groupst by code
 *
 * @param {string} code
 */
export const fetchExpertsTrackingGroupAction = (code: string) => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.FETCH_EXPERTS_TRACKING_GROUP,
    payload: {
      promise: TRACKING_API_PATH.fetchExpertsTrackingGroup(code).then((res) => res)
    },
    meta: { code },
    group: REDUCER_GROUP.TRACKING
  });

/**
 * Save product tracking
 *
 * @param {object} product
 */
export const saveProductTrackingAction = (data) => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.SAVE_PRODUCT_TRACKING,
    payload: data,
    group: REDUCER_GROUP.TRACKING
  });

/**
 * Save utm id tracking
 *
 * @param {string} utmId
 */
export const saveUtmIdTrackingAction = (utmData) => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.SAVE_UTM_ID_TRACKING,
    payload: utmData,
    group: REDUCER_GROUP.TRACKING
  });

/**
 * Remove utm id tracking
 */
export const removeUtmIdTrackingAction = () => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.REMOVE_UTM_ID_TRACKING,
    payload: '',
    group: REDUCER_GROUP.TRACKING
  });

export const changeRoutingAction =
  ({ routing }) =>
  (dispatch, getState) =>
    dispatch({
      type: TRACKING_ACTION_TYPE.CHANGE_ROUTING,
      payload: { routing },
      group: REDUCER_GROUP.TRACKING
    });

/**
 * Clear data experts tracking groupst by code
 *
 * @param {string} code
 */
export const clearDataExpertsTrackingGroupAction = () => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.CLEAR_DATA_EXPERTS_TRACKING_GROUP,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.TRACKING
  });

/**
 * Get utm id from affiliate tracking
 *
 * @param {string} sskey
 */
export const getUtmIdFromAffiliateTrackingAction = (trackingKey: string, utmSource: string) => (dispatch, getState) =>
  dispatch({
    type: TRACKING_ACTION_TYPE.GET_UTM_ID_FROM_AFFILIATE,
    payload: {
      promise: TRACKING_API_PATH.getUtmIdFromAffiliateTrackingApi(trackingKey, utmSource).then((res) => res)
    },
    meta: { trackingKey },
    group: REDUCER_GROUP.TRACKING
  });

/**
 * Tracking utms actions
 *
 * @param {string|number} utmId
 */
export const trackingUtmsAction =
  ({ utmId }: { utmId: string | number }) =>
  (dispatch, getState) =>
    dispatch({
      type: TRACKING_ACTION_TYPE.TRACKING_UTMS,
      payload: {
        promise: TRACKING_API_PATH.trackingUtms({ utmId }).then((res) => res)
      },
      meta: { utmId },
      group: REDUCER_GROUP.TRACKING
    });
