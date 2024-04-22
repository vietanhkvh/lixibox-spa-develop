import * as FEEDBACK_API_PATH from '../../api/feedback';
import * as FEEDBACK_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch user feedbacks action
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 */

export const fetchUserFeedbacksAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.FETCH_USER_FEEDBACKS,
      payload: {
        promise: FEEDBACK_API_PATH.fetchUserFeedbacks({ page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.FEEDBACK
    });

/**
 * Fetch user boxes to feedback action
 *
 * @param {number} page ex 1, 2
 * @param {number} perPage ex 50
 */

export const fetchUserBoxesToFeedbackAction =
  ({ page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.FETCH_USER_BOXES_TO_FEEDBACK,
      payload: {
        promise: FEEDBACK_API_PATH.fetchUserBoxesToFeedback({
          page,
          perPage
        }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.FEEDBACK
    });

/**
 * Add feedback
 *
 * @param {string} feedbackableId
 * @param {string} feedbackableType
 * @param {number} rate
 * @param {string} review
 */
export const addFeedbackAction =
  ({ box, feedbackableId, feedbackableType, rate, review, title = '', pictures = [] }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.ADD_FEEDBACK,
      payload: {
        promise: FEEDBACK_API_PATH.addFeedback({
          feedbackableId,
          feedbackableType,
          rate,
          review,
          title,
          pictures
        }).then((res) => res)
      },
      group: REDUCER_GROUP.FEEDBACK
    });

/**
 * Edit feedback
 *
 * @param {string} id
 * @param {string} review
 * @param {string} rate
 */
export const editFeedbackAction =
  ({ id, review, rate, title, onSuccess, onReject, enableSuccessAlert = true, enableFailureAlert = true }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.EDIT_FEEDBACK,
      payload: {
        promise: FEEDBACK_API_PATH.editFeedback({
          id,
          review,
          rate,
          title
        }).then((res) => res)
      },
      meta: { feedbackId: id, enableSuccessAlert, enableFailureAlert },
      group: REDUCER_GROUP.FEEDBACK,
      onSuccess,
      onReject
    });

interface AddFeedbackImagesActionParams {
  id: number;
  pictures: Array<string>;
  enableFailureAlert: boolean;
  onSuccess: (params: { payload: any; meta: any }) => any;
  onReject: (params: { payload: any; meta: any }) => any;
}
export const addFeedbackImagesAction =
  ({ id, pictures, enableFailureAlert = true, onSuccess, onReject }: AddFeedbackImagesActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.ADD_FEEDBACK_IMAGES,
      payload: {
        promise: FEEDBACK_API_PATH.addFeedbackImages({
          id,
          pictures
        }).then((res) => res)
      },
      meta: { id, pictures, enableFailureAlert },
      group: REDUCER_GROUP.FEEDBACK,
      onSuccess,
      onReject
    });

/**
 * Delete feedback image
 *
 * @param {number} id
 * @param {number} pictureId
 */
export const deleteFeedbackImageAction =
  ({ id, pictureId, onSuccess, onReject, enableFailureAlert = true }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.DELETE_FEEDBACK_IMAGE,
      payload: {
        promise: FEEDBACK_API_PATH.deleteFeedbackImage({
          id,
          pictureId
        }).then((res) => res)
      },
      meta: { id, pictureId, enableFailureAlert },
      group: REDUCER_GROUP.FEEDBACK,
      onSuccess,
      onReject
    });

/**
 * Fetch feedback by ID
 *
 * @param {string} feedbackId
 */
export const fetchFeedbackByIdAction =
  ({ feedbackId }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.FETCH_FEEDBACK_BY_ID,
      payload: {
        promise: FEEDBACK_API_PATH.fetchFeedbackById({ feedbackId }).then((res) => res)
      },
      meta: { feedbackId },
      group: REDUCER_GROUP.FEEDBACK
    });

/**
 * Share box on Facebook
 *
 * @param {string} id
 */
export const shareBoxOnFacebookAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: FEEDBACK_ACTION_TYPE.SHARE_BOX_ON_FACEBOOK,
      payload: {
        promise: FEEDBACK_API_PATH.shareBoxOnFacebook({ id }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.FEEDBACK
    });
