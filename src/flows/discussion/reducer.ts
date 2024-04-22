import { REDUCER_GROUP } from '../reducer.group';
import * as BANNER_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';

export const INITIAL_STATE_DISCUSSION = {
  boxDiscussions: {},
  isAddDiscussionSuccess: false,
  isFetchDiscussionSuccess: false,
  isLoadingFetchBoxDiscussion: true,
  isAddDiscussionCommentSuccess: false,
  isAddingDiscussion: false
};

function discussionReducer(
  state = INITIAL_STATE_DISCUSSION,
  action: {
    type: '';
    payload: {
      discussion: '';
      discussions: '';
    };
    meta: {
      page: 1;
      boxId: '';
      perPage: 10;
      productId: '';
    };
    group: '';
  }
) {
  if (action.group !== REDUCER_GROUP.DISCUSSION) {
    return state;
  }

  const { boxDiscussions } = state;

  switch (action.type) {
    /** Add discussion for product */
    case PENDING_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION):
      return Object.assign({}, state, {
        isAddDiscussionSuccess: false,
        isAddingDiscussion: true
      });

    case FULFILLED_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION):
      const keyHash = objectToHash(action.meta);
      boxDiscussions &&
        !isUndefined(boxDiscussions[keyHash]) &&
        boxDiscussions[keyHash].discussions.unshift(action.payload.discussion);

      return Object.assign({}, state, {
        boxDiscussions,
        isAddDiscussionSuccess: true,
        isAddingDiscussion: false
      });

    case REJECTED_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION):
      return Object.assign({}, state, {
        isAddDiscussionSuccess: false,
        isAddingDiscussion: false
      });

    /** Add discussion sub comment for product */
    case PENDING_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION_COMMENT):
      return Object.assign({}, state, {
        isAddDiscussionCommentSuccess: false
      });

    case FULFILLED_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION_COMMENT):
      return Object.assign({}, state, {
        isAddDiscussionCommentSuccess: true
      });

    case REJECTED_TYPE(BANNER_ACTION_TYPE.ADD_DISCUSSION_COMMENT):
      return Object.assign({}, state, {
        isAddDiscussionCommentSuccess: false
      });

    // Fetch discussion boxes
    case PENDING_TYPE(BANNER_ACTION_TYPE.FETCH_DISCUSSIONS_BOXES):
      return Object.assign({}, state, {
        isFetchDiscussionSuccess: false,
        isLoadingFetchBoxDiscussion: true
      });

    case FULFILLED_TYPE(BANNER_ACTION_TYPE.FETCH_DISCUSSIONS_BOXES):
      const tmpBoxDiscussions = { [objectToHash(action.meta)]: action.payload };

      return Object.assign({}, state, {
        boxDiscussions: Object.assign({}, boxDiscussions, tmpBoxDiscussions),
        isFetchDiscussionSuccess: true,
        isLoadingFetchBoxDiscussion: false
      });

    case REJECTED_TYPE(BANNER_ACTION_TYPE.FETCH_DISCUSSIONS_BOXES):
      return Object.assign({}, state, {
        isFetchDiscussionSuccess: false,
        isLoadingFetchBoxDiscussion: false
      });

    case BANNER_ACTION_TYPE.CLEAR_DATA_DISCUSSIONS_BOXES:
      return Object.assign({}, state, {
        boxDiscussions: {}
      });

    default:
      return state;
  }
}

export default discussionReducer;
