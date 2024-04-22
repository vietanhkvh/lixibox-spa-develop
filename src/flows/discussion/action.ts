import * as DISCUSSION_API_PATH from '../../api/discussion';
import * as DISCUSSION_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Get discussion of product
 *
 * @param {string | id} boxId slug or id of product
 * @param {string} content content of message comment
 */
export const addDiscussionAction =
  ({ productId, content, page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCUSSION_ACTION_TYPE.ADD_DISCUSSION,
      payload: {
        promise: DISCUSSION_API_PATH.addDiscussion({ productId, content }).then((res) => res)
      },
      meta: { productId, page, perPage },
      group: REDUCER_GROUP.DISCUSSION
    });

/**
 * Get discussion comment of product
 *
 * @param {number} id id of comment
 * @param {string} content content of message comment
 */
export const addDiscussionCommentAction =
  ({ id, content }) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCUSSION_ACTION_TYPE.ADD_DISCUSSION_COMMENT,
      payload: {
        promise: DISCUSSION_API_PATH.addDiscussionComment({ id, content }).then((res) => res)
      },
      group: REDUCER_GROUP.DISCUSSION
    });

/**
 * Fetch discussions boxes list by id or slug of product
 *
 * @param {string | number} productId id or slug of product
 * @param {number} page
 * @param {number} perPage
 */
export const fetchDiscussionsBoxesAction =
  ({ productId, page, perPage = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: DISCUSSION_ACTION_TYPE.FETCH_DISCUSSIONS_BOXES,
      payload: {
        promise: DISCUSSION_API_PATH.fetchDiscussionsBoxes({
          productId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { productId, page, perPage },
      group: REDUCER_GROUP.DISCUSSION
    });

/** Clear data after leave page */
export const clearDataDiscussionsBoxesAction = () => (dispatch, getState) =>
  dispatch({
    type: DISCUSSION_ACTION_TYPE.CLEAR_DATA_DISCUSSIONS_BOXES,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.DISCUSSION
  });
