import { REDUCER_GROUP } from '../reducer.group';
import * as LIKE_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined, isEmptyObject } from '../../utils/validate';
import { formatErrorMessage, isExistError } from '../../utils/exception';
import { openAlertAction } from '../alert/action';
import { fetchListLikedBoxesAction } from './action';
import { ALERT_LIKE_PRODUCT, ALERT_GENERAL_ERROR, ALERT_UNLIKE_PRODUCT } from '../../constants/application/alert';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_LIKE = {
  liked: {
    id: [],
    box: []
  },
  removeFromWishList: {
    loading: false,
    data: {},
    isSuccess: false
  },
  isWaiting: true,
  isSuccess: false,
  isFetchLikedListSuccess: false
} as {
  liked: {
    id: Array<any>;
    box: Array<any>;
  };
  isWaiting: boolean;
  isSuccess: boolean;
  isFetchLikedListSuccess: boolean;
};

function likeReducer(
  state = INITIAL_STATE_LIKE,
  action = {
    type: '',
    payload: {
      box_ids: [],
      boxes: {},
      error: undefined,
      errors: []
    },
    meta: { productId: '', isFetchNewListWhenSuccess: false },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.LIKE) {
    return state;
  }

  const { liked } = state;

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';
  let boxItem, boxListNew;

  switch (action.type) {
    case FULFILLED_TYPE(LIKE_ACTION_TYPE.FETCH_LIKED_BOX_ID):
      liked.id = action.payload.box_ids;

      return Object.assign({}, state, { liked });

    /** Like product */
    case PENDING_TYPE(LIKE_ACTION_TYPE.LIKE_PRODUCT):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false
      });

    case FULFILLED_TYPE(LIKE_ACTION_TYPE.LIKE_PRODUCT):
      if (liked.id.indexOf(action.meta.productId) < 0) {
        liked.id = [...liked.id, action.meta.productId];
      }

      action.asyncDispatch(openAlertAction(ALERT_LIKE_PRODUCT));
      if (action.meta.isFetchNewListWhenSuccess) {
        action.asyncDispatch(fetchListLikedBoxesAction({ page: 1, perPage: 12, stockStatus: 'in_stock' }));
      }
      return Object.assign({}, state, {
        liked,
        isSuccess: true,
        isWaiting: false
      });

    case REJECTED_TYPE(LIKE_ACTION_TYPE.LIKE_PRODUCT):
      return Object.assign({}, state, {
        isWaiting: true,
        isSuccess: false
      });

    /** Unlike product */
    // TODO: Check usage and drop old state residue (isWaiting, isSuccess, liked)
    case PENDING_TYPE(LIKE_ACTION_TYPE.UN_LIKE_PRODUCT):
      return Object.assign({}, state, {
        removeFromWishList: {
          data: {},
          loading: true,
          isSuccess: false
        },

        isWaiting: true,
        isSuccess: false
      });

    case FULFILLED_TYPE(LIKE_ACTION_TYPE.UN_LIKE_PRODUCT):
      const productIdLikedList = liked.id.filter((item) => item !== action.meta.productId);
      action.asyncDispatch(openAlertAction(ALERT_UNLIKE_PRODUCT));

      return Object.assign({}, state, {
        removeFromWishList: {
          loading: false,
          isSuccess: true,
          data: action.payload
        },

        liked: Object.assign({}, liked, { id: productIdLikedList }),
        isSuccess: true,
        isWaiting: false
      });

    case REJECTED_TYPE(LIKE_ACTION_TYPE.UN_LIKE_PRODUCT):
      if (isExistError(action.payload.error, action.payload.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
      }

      return Object.assign({}, state, {
        removeFromWishList: {
          loading: false,
          isSuccess: false,
          data: action.payload
        },

        isWaiting: true,
        isSuccess: false
      });

    /** Fetch user wish list (liked boxes) */
    case PENDING_TYPE(LIKE_ACTION_TYPE.FETCH_LIKED_BOXES):
      boxItem = {
        [generationHash]: isEmptyObject(liked.box) ? [] : liked.box[generationHash]
      };
      boxListNew = Object.assign({}, boxItem, liked.box);
      liked.box = boxListNew;

      return Object.assign({}, state, {
        liked,
        isFetchLikedListSuccess: false
      });

    case FULFILLED_TYPE(LIKE_ACTION_TYPE.FETCH_LIKED_BOXES):
      boxItem = { [generationHash]: action.payload };
      boxListNew = Object.assign({}, liked.box, boxItem);
      liked.box = boxListNew;

      return Object.assign({}, state, { liked, isFetchLikedListSuccess: true });

    case REJECTED_TYPE(LIKE_ACTION_TYPE.FETCH_LIKED_BOXES):
      boxItem = {
        [generationHash]: isEmptyObject(liked.box) ? [] : liked.box[generationHash]
      };
      boxListNew = Object.assign({}, liked.box, boxItem);
      liked.box = boxListNew;

      return Object.assign({}, state, {
        liked,
        isFetchLikedListSuccess: false
      });

    default:
      return state;
  }
}

export default likeReducer;
