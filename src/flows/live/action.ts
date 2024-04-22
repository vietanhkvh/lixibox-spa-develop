import * as LIVE_API_PATH from '../../api/live';
import * as LIVE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch live list
 *
 */
export const fetchLiveListAction =
  ({ page = 1, perPage = 20 }) =>
  (dispatch, getState) =>
    dispatch({
      type: LIVE_ACTION_TYPE.FETCH_LIVE_LIST,
      payload: {
        promise: LIVE_API_PATH.fetchLiveList({
          page,
          perPage
        }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.LIVE
    });

/**
 * Get live detail
 *
 */
export const getLiveDetailAction =
  ({ slug }) =>
  (dispatch, getState) =>
    dispatch({
      type: LIVE_ACTION_TYPE.GET_LIVE_DETAIL,
      payload: {
        promise: LIVE_API_PATH.getLiveDetail({ slug }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.LIVE
    });

/**
 * Fetch live comment list
 *
 */
export const fetchLiveCommentListAction =
  ({ slug, limit = 30, before = '' }) =>
  (dispatch, getState) =>
    dispatch({
      type: LIVE_ACTION_TYPE.FETCH_LIVE_COMMENT_LIST,
      payload: {
        promise: LIVE_API_PATH.fetchLiveCommentList({
          slug,
          limit,
          before
        }).then((res) => res)
      },
      meta: { before },
      group: REDUCER_GROUP.LIVE
    });

/**
 * Fetch live reply comment list
 *
 */
export const fetchLiveRepliesCommentListAction =
  ({ slug, commentId, page = 1, perPage = 30 }) =>
  (dispatch, getState) =>
    dispatch({
      type: LIVE_ACTION_TYPE.FETCH_LIVE_REPLIES_COMMENT_LIST,
      payload: {
        promise: LIVE_API_PATH.fetchLiveRepliesCommentList({
          slug,
          commentId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.LIVE
    });

/** Update data from socket */
export const updateDataFromSocketAction = (data) => ({
  type: LIVE_ACTION_TYPE.UPDATE_DATA_FROM_SOCKET,
  payload: data,
  group: REDUCER_GROUP.LIVE
});

interface ICreateLiveComment {
  slug: string;
  content: string;
  commentId?: number;
}

/** Create new comment by slug */
export const createLiveCommentAction =
  ({ slug, content, commentId }: ICreateLiveComment) =>
  (dispatch, getState) =>
    dispatch({
      type: LIVE_ACTION_TYPE.CREATE_LIVE_COMMENT,
      payload: {
        promise: LIVE_API_PATH.createLiveComment({
          slug,
          content,
          commentId
        }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.LIVE
    });

/** Set display live background panel action */
export const displayLiveBackgroundAction = (status) => ({
  type: LIVE_ACTION_TYPE.DISPLAY_LIVE_BACKGROUND,
  payload: { displayLiveBackgroundStatus: status },
  group: REDUCER_GROUP.LIVE
});
