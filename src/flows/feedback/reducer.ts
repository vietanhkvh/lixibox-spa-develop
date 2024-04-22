import { REDUCER_GROUP } from '../reducer.group';
import * as FEEDBACK_ACTION_TYPE from './type';

import { openAlertAction } from '../alert/action';
import { ALERT_GENERAL_SUCCESS, ALERT_GENERAL_ERROR } from '../../constants/application/alert';
import { gatewayTrackRated } from 'tracking/gateway';

import { objectToHash } from '../../utils/encode';
import { isUndefined, isEmptyObject } from '../../utils/validate';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_FEEDBACK = {
  isSuccess: true,
  isWaiting: false,
  feedbackById: {},
  userFeedbacks: {},
  userBoxesToFeedback: {},
  addFeedbackImage: {
    adding: false,
    added: false,
    errored: false
  },
  deleteFeedbackImage: {
    deleting: false,
    deleted: false,
    errored: false,
    lastId: null
  },
  isAddFeedbackSuccess: false,
  isEditFeedbackSuccess: false,
  isFetchFeedbackedSuccess: false,
  isFetchNotFeedbackSuccess: false,
  isFetchFeedbackById: false,
  isAddingFeedback: false,
  addedFeedbackId: null,
  shareBoxOnFacebook: {
    id: null,
    sharing: false,
    shared: false,
    errored: false,
    error: ''
  }
};

const feedbackReducer = (
  state = INITIAL_STATE_FEEDBACK,
  action = {
    type: '',
    payload: {
      boxes: {},
      box_id: {},
      feedback: {},
      feedbacks: {},
      id: null,
      feedbackable_lixibox_id: null,
      feedbackable_name: '',
      rate: null,
      error: ''
    },
    meta: {
      id: null,
      pictureId: null,
      enableSuccessAlert: false,
      enableFailureAlert: false,
      box: null
    },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.FEEDBACK) {
    return state;
  }

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

  const { userFeedbacks, userBoxesToFeedback, feedbackById } = state;

  let userFeedbackItem, userFeedbacksNew, userBoxesToFeedbackItem, userBoxesToFeedbackNew;

  switch (action.type) {
    /** Fetch feedbacks */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_FEEDBACKS):
      userFeedbackItem = {
        [generationHash]: isEmptyObject(userFeedbacks) ? null : userFeedbacks[generationHash]
      };
      userFeedbacksNew = Object.assign({}, userFeedbacks, userFeedbackItem);

      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isFetchFeedbackedSuccess: false,
        userFeedbacks: userFeedbacksNew
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_FEEDBACKS):
      userFeedbackItem = { [generationHash]: action.payload };
      userFeedbacksNew = Object.assign({}, userFeedbacks, userFeedbackItem);

      return Object.assign({}, state, {
        isSuccess: true,
        isWaiting: false,
        isFetchFeedbackedSuccess: true,
        userFeedbacks: userFeedbacksNew
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_FEEDBACKS):
      userFeedbackItem = {
        [generationHash]: isEmptyObject(userFeedbacks) ? [] : userFeedbacks[generationHash]
      };
      userFeedbacksNew = Object.assign({}, userFeedbacks, userFeedbackItem);

      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isFetchFeedbackedSuccess: false,
        userFeedbacks: userFeedbacksNew
      });

    /** Fetch boxes to feedback */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_BOXES_TO_FEEDBACK):
      userBoxesToFeedbackItem = {
        [generationHash]: isEmptyObject(userBoxesToFeedback) ? [] : userBoxesToFeedback[generationHash]
      };
      userBoxesToFeedbackNew = Object.assign({}, userBoxesToFeedback, userBoxesToFeedbackItem);

      return Object.assign({}, state, {
        userBoxesToFeedback: userBoxesToFeedbackNew,
        isWaiting: true,
        isSuccess: false,
        isFetchNotFeedbackSuccess: false
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_BOXES_TO_FEEDBACK):
      userBoxesToFeedbackItem = { [generationHash]: action.payload };
      userBoxesToFeedbackNew = Object.assign({}, userBoxesToFeedback, userBoxesToFeedbackItem);

      return Object.assign({}, state, {
        isWaiting: false,
        isSuccess: true,
        isFetchNotFeedbackSuccess: true,
        userBoxesToFeedback: userBoxesToFeedbackNew
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_USER_BOXES_TO_FEEDBACK):
      userBoxesToFeedbackItem = {
        [generationHash]: isEmptyObject(userBoxesToFeedback) ? [] : userBoxesToFeedback[generationHash]
      };
      userBoxesToFeedbackNew = Object.assign({}, userBoxesToFeedback, userBoxesToFeedbackItem);

      return Object.assign({}, state, {
        isWaiting: false,
        isSuccess: false,
        isFetchNotFeedbackSuccess: false,
        userBoxesToFeedback: userBoxesToFeedbackNew
      });

    /** Add feedback */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isAddFeedbackSuccess: false,
        isAddingFeedback: true
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK): {
      gatewayTrackRated({ box: action.meta.box, rating: action.payload.rate });

      return Object.assign({}, state, {
        isSuccess: true,
        isWaiting: false,
        isAddFeedbackSuccess: true,
        isAddingFeedback: false,
        addedFeedbackId: action.payload.id
      });
    }

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK):
      action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: 'Đã có lỗi xảy ra, vui lòng thử lại' })));

      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isAddFeedbackSuccess: false,
        isAddingFeedback: false
      });

    /** Edit feedback */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.EDIT_FEEDBACK):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isEditFeedbackSuccess: false
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.EDIT_FEEDBACK):
      action.meta.enableSuccessAlert &&
        action.asyncDispatch(openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Chỉnh sửa đánh giá thành công' })));
      return Object.assign({}, state, {
        isSuccess: true,
        isWaiting: false,
        isEditFeedbackSuccess: true
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.EDIT_FEEDBACK):
      action.meta.enableFailureAlert &&
        action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: 'Đã có lỗi xảy ra, vui lòng thử lại' })));
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false,
        isEditFeedbackSuccess: false
      });

    /** Create feedback image */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK_IMAGES):
      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          adding: true
        })
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK_IMAGES):
      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          adding: false,
          added: true,
          errored: false
        })
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.ADD_FEEDBACK_IMAGES):
      action.meta.enableFailureAlert &&
        action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: 'Đã có lỗi xảy ra, vui lòng thử lại' })));

      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          adding: false,
          errored: true
        })
      });

    /** Create feedback image */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.DELETE_FEEDBACK_IMAGE):
      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          deleting: true,
          lastId: action.meta.pictureId
        })
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.DELETE_FEEDBACK_IMAGE):
      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          deleting: false,
          deleted: true,
          errored: false
        })
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.DELETE_FEEDBACK_IMAGE):
      action.meta.enableFailureAlert &&
        action.asyncDispatch(openAlertAction(ALERT_GENERAL_ERROR({ content: 'Đã có lỗi xảy ra, vui lòng thử lại' })));
      return Object.assign({}, state, {
        addFeedbackImage: Object.assign({}, state.addFeedbackImage, {
          deleting: false,
          errored: true
        })
      });

    /** Share box on Facebook */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.SHARE_BOX_ON_FACEBOOK):
      return Object.assign({}, state, {
        shareBoxOnFacebook: Object.assign({}, state.shareBoxOnFacebook, {
          id: action.meta.id,
          sharing: true
        })
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.SHARE_BOX_ON_FACEBOOK):
      return Object.assign({}, state, {
        shareBoxOnFacebook: Object.assign({}, state.shareBoxOnFacebook, {
          id: action.meta.id,
          sharing: false,
          shared: true,
          errored: false,
          error: ''
        })
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.SHARE_BOX_ON_FACEBOOK):
      return Object.assign({}, state, {
        shareBoxOnFacebook: Object.assign({}, state.shareBoxOnFacebook, {
          id: action.meta.id,
          sharing: false,
          shared: false,
          errored: true,
          error: action.payload.error || ''
        })
      });

    /** Fetch feeback by ID */
    case PENDING_TYPE(FEEDBACK_ACTION_TYPE.FETCH_FEEDBACK_BY_ID):
      return Object.assign({}, state, {
        isFetchFeedbackById: false
      });

    case FULFILLED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_FEEDBACK_BY_ID):
      const tmpFeedbackById = { [generationHash]: action.payload.feedback };
      return Object.assign({}, state, {
        isFetchFeedbackById: true,
        feedbackById: Object.assign({}, feedbackById, tmpFeedbackById)
      });

    case REJECTED_TYPE(FEEDBACK_ACTION_TYPE.FETCH_FEEDBACK_BY_ID):
      return Object.assign({}, state, {
        isFetchFeedbackById: false
      });

    /** End feeback by ID */

    default:
      return state;
  }
};

export default feedbackReducer;
