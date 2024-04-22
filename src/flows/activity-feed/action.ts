import * as ACTIVITY_FEED_API_PATH from '../../api/activity-feed';
import * as ACTIVITY_FEED_ACTION_TYPE from './type';
import { FEEDABLE_TYPE } from '../../constants/application/feedable';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch activity feed list by filter (limit & current_id)
 *
 * @param {number} limit default 20
 * @param {number} currentId
 */
export const fecthActivityFeedListAction =
  ({ limit = 20, userReferralCode = 0, feedType = '', pageCode = 'first_page' }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fecthActivityFeedList({
          limit,
          pageCode,
          userReferralCode,
          feedType
        }).then((res) => res)
      },
      meta: { metaFilter: { limit, pageCode } },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

export const fecthActivityFeedListNavigationAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST_NAVIGAATION,
    payload: {
      promise: ACTIVITY_FEED_API_PATH.fecthActivityFeedList({
        limit: 3,
        userReferralCode: 0,
        feedType: FEEDABLE_TYPE.LOVE
      }).then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/**
 * Fetch activity feed comment list
 *
 * @param {number} id
 * @param {number} lastCommentId
 * @param {number} page
 * @param {number} perPage
 */
export const fecthActivityFeedCommentListAction =
  ({ id, lastCommentId, page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_COMMENT_LIST,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fecthActivityFeedCommentList({
          id,
          lastCommentId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Delete activity feed comment
 *
 * @param {number} id
 * @param {string} content
 * @param {number} lastCommentId
 */
export const addActivityFeedCommentAction =
  ({ id, content, lastCommentId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_COMMENT,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.addActivityFeedComment({
          id,
          content,
          lastCommentId
        }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Update activity feed comment
 *
 * @param {number} feedId
 * @param {number} commentId
 * @param {string} content
 */
export const updateActivityFeedCommentAction =
  ({ feedId, commentId, content }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.UPDATE_ACTIVITY_FEED_COMMENT,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.updateActivityFeedComment({ feedId, commentId, content }).then((res) => res)
      },
      meta: { feedId, commentId, content },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Delete activity feed comment
 *
 * @param {number} feedId
 * @param {number} commentId
 */
export const deleteActivityFeedCommentAction =
  ({ feedId, commentId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_COMMENT,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.deleteActivityFeedComment({ feedId, commentId }).then((res) => res)
      },
      meta: { feedId, commentId },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Add activity feed like
 *
 * @param {number} id
 */
export const addActivityFeedLikeAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_LIKE,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.addActivityFeedLike({ id }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Delete activity feed like
 *
 * @param {number} id
 */
export const deleteActivityFeedLikeAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_LIKE,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.deleteActivityFeedLike({ id }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Fetch activity feed detail by id
 *
 * @param {number} feedId
 */
export const fetchActivityFeedDetailAction =
  ({ feedId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_DETAIL,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchActivityFeedDetail({ feedId }).then((res) => res)
      },
      meta: { feedId },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Get Collection Action (Top feed)
 *
 * @param {number} page ex: 1
 * @param {number} perPage ex: 12
 */

export const getCollectionAction =
  ({ page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.getCollection({ page, perPage }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Get Collection Detail Action (Top feed)
 *
 * @param {number} id ex: 1
 */

export const getCollectionDetailAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION_DETAIL,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.getCollectionDetail({ id }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/** Clear data activity feed list */
export const clearDataActivityFeedListAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_LIST,
    payload: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/** Clear data activity feed commentlist */
export const clearDataActivityFeedCommentListAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_COMMENT_LIST,
    payload: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/** Clear data collection */
export const clearDataCollectionAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COLLECTION,
    payload: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/** Clear data activity feed detail */
export const clearDataActivityFeedDetailAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_DETAIL,
    payload: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/**
 * Fetch commnunity hashtags list by days
 *
 * @param {number} days
 */
export const fetchCommunityHashtagsAction =
  ({ days = 7 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAGS,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityHashtags({ days }).then((res) => res)
      },
      meta: { days },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Fetch commnunity hashtags list by days
 *
 * @param {number} days
 */
export const fetchCommunityHashtagFeedsAction =
  ({ hashtag, limit = 10, days = 30, currentId = 0 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAG_FEEDS,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityHashtagFeeds({
          hashtag,
          limit,
          days,
          currentId
        }).then((res) => res)
      },
      meta: { hashtag, limit, days, currentId },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

/**
 * Clear data commnunity hashtags list by days
 *
 * @param {number} days
 */
export const clearDataCommunityHashtagsAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COMMUNITY_HASHTAGS,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

/**
 * Clear data commnunity hashtags list by days
 */
export const clearDataCommunityHashtagFeedsAction = () => (dispatch, getState) =>
  dispatch({
    type: ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COMMUNITY_HASHTAG_FEEDS,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.ACTIVITY_FEED
  });

export const getUserCommunityProfileAction =
  ({ userReferralCode = 0 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.GET_USER_COMMUNITY_PROFILE,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.getUserCommunityProfile({
          userReferralCode
        }).then((res) => res)
      },
      meta: { userReferralCode },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

export const fetchCommunityHotBoxes =
  ({ days = 7, limit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HOT_BOXES,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityHotBoxes({ days, limit }).then((res) => res)
      },
      meta: { days, limit },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

export const fetchCommunityGoodSale =
  ({ limit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_GOOD_SALE,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityGoodSale({ limit }).then((res) => res)
      },
      meta: { limit },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

export const fetchCommunityTopReview =
  ({ days = 7, boxLimit = 10, feedLimit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_REVIEW,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityTopReview({ days, boxLimit, feedLimit }).then((res) => res)
      },
      meta: { days, boxLimit, feedLimit },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });

export const fetchCommunityTopLiked =
  ({ days = 7, limit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_LIKED,
      payload: {
        promise: ACTIVITY_FEED_API_PATH.fetchCommunityTopLiked({ days, limit }).then((res) => res)
      },
      meta: { days, limit },
      group: REDUCER_GROUP.ACTIVITY_FEED
    });
