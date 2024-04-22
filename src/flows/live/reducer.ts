import { REDUCER_GROUP } from '../reducer.group';
import * as LIVE_ACTION_TYPE from './type';

// import { objectToHash } from '../../utils/encode';
// import { isUndefined } from '../../utils/validate';
import { openAlertAction } from '../alert/action';
import { ALERT_GENERAL_ERROR } from '../../constants/application/alert';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_MAGAZINE = {
  liveList: [],
  isFetchLiveList: false,
  isFetchLiveSuccess: false,

  liveDetail: {
    discount_codes: [],
    boxes: []
  },
  isGetLiveDetail: false,
  isGetLiveDetailSuccess: false,
  receiveNewDiscountCode: 0,
  receiveNewBox: 0,

  isShowLiveBackground: true,

  liveCommentList: [],
  isFetchLiveCommentList: false,
  isFetchLiveCommentSuccess: false,
  receiveNewComment: 0,
  receiveNewRelyComment: 0,
  pinnedCommentId: 0,

  liveRepliesCommentList: {
    comment: { id: 0 },
    replies: []
  },
  isFetchLiveRepliesCommentList: false,
  isFetchLiveRepliesCommentSuccess: false,

  isCreatingLiveComment: false,
  isCreateLiveCommentSuccess: false
};

const magazineReducer = (
  state = INITIAL_STATE_MAGAZINE,
  action = {
    type: '',
    payload: {
      video: {},
      videos: [],
      comments: [],
      type: '',
      data: {},
      displayLiveBackgroundStatus: false
    },
    meta: { type: '', page: 1 },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  if (action.group !== REDUCER_GROUP.LIVE) return state;

  switch (action.type) {
    /** FETCH_LIVE_LIST */
    case PENDING_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_LIST):
      return Object.assign({}, state, {
        liveList: [],
        isFetchLiveList: true,
        isFetchLiveSuccess: false
      });

    case FULFILLED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_LIST):
      return Object.assign({}, state, {
        liveList: action.payload.videos,
        isFetchLiveList: false,
        isFetchLiveSuccess: true
      });

    case REJECTED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_LIST):
      return Object.assign({}, state, {
        liveList: [],
        isFetchLiveList: false,
        isFetchLiveSuccess: false
      });

    /** GET_LIVE_DETAIL */
    case PENDING_TYPE(LIVE_ACTION_TYPE.GET_LIVE_DETAIL):
      return Object.assign({}, state, {
        liveDetail: {},
        isGetLiveDetail: true,
        isGetLiveDetailSuccess: false
      });

    case FULFILLED_TYPE(LIVE_ACTION_TYPE.GET_LIVE_DETAIL):
      return Object.assign({}, state, {
        liveDetail: action.payload.video,
        isGetLiveDetail: false,
        isGetLiveDetailSuccess: true
      });

    case REJECTED_TYPE(LIVE_ACTION_TYPE.GET_LIVE_DETAIL):
      return Object.assign({}, state, {
        liveDetail: {},
        isGetLiveDetail: false,
        isGetLiveDetailSuccess: false
      });

    /** FETCH_LIVE_COMMENT_LIST */
    case PENDING_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_COMMENT_LIST):
      return Object.assign({}, state, {
        liveCommentList: [],
        isFetchLiveCommentList: true,
        isFetchLiveCommentSuccess: false
      });

    case FULFILLED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_COMMENT_LIST):
      return Object.assign({}, state, {
        liveCommentList: action.payload.comments,
        isFetchLiveCommentList: false,
        isFetchLiveCommentSuccess: true
      });

    case REJECTED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_COMMENT_LIST):
      return Object.assign({}, state, {
        liveCommentList: [],
        isFetchLiveCommentList: false,
        isFetchLiveCommentSuccess: false
      });

    /** FETCH_LIVE_REPLIES_COMMENT_LIST */
    case PENDING_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_REPLIES_COMMENT_LIST):
      return Object.assign({}, state, {
        liveRepliesCommentList: {},
        isFetchLiveRepliesCommentList: true,
        isFetchLiveRepliesCommentSuccess: false
      });

    case FULFILLED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_REPLIES_COMMENT_LIST):
      return Object.assign({}, state, {
        liveRepliesCommentList: action.payload,
        isFetchLiveRepliesCommentList: false,
        isFetchLiveRepliesCommentSuccess: true
      });

    case REJECTED_TYPE(LIVE_ACTION_TYPE.FETCH_LIVE_REPLIES_COMMENT_LIST):
      return Object.assign({}, state, {
        liveRepliesCommentList: {},
        isFetchLiveRepliesCommentList: false,
        isFetchLiveRepliesCommentSuccess: false
      });

    /**.CREATE_LIVE_COMMENT */
    case PENDING_TYPE(LIVE_ACTION_TYPE.CREATE_LIVE_COMMENT):
      return Object.assign({}, state, {
        isCreatingLiveComment: true,
        isCreateLiveCommentSuccess: false
      });

    case FULFILLED_TYPE(LIVE_ACTION_TYPE.CREATE_LIVE_COMMENT):
      return Object.assign({}, state, {
        isCreatingLiveComment: false,
        isCreateLiveCommentSuccess: true
      });

    case REJECTED_TYPE(LIVE_ACTION_TYPE.CREATE_LIVE_COMMENT):
      action.asyncDispatch(
        openAlertAction(ALERT_GENERAL_ERROR({ content: 'Đã có lỗi xảy ra, không thể gửi tin nhắn' }))
      );

      return Object.assign({}, state, {
        isCreatingLiveComment: false,
        isCreateLiveCommentSuccess: false
      });

    case LIVE_ACTION_TYPE.DISPLAY_LIVE_BACKGROUND:
      return Object.assign({}, state, {
        isShowLiveBackground: action.payload.displayLiveBackgroundStatus
      });

    /** LIVE_ACTION_TYPE.UPDATE_DATA_FROM_SOCKET */
    case LIVE_ACTION_TYPE.UPDATE_DATA_FROM_SOCKET: {
      const { type, data }: { type: string; data: any } = action.payload;
      if (!type || !type.length || !data) return state;
      let newState = {};

      switch (type) {
        case 'add-comment':
          {
            const { liveCommentList, receiveNewComment, liveRepliesCommentList, receiveNewRelyComment } = state;

            let newLiveRepliesCommentList = liveRepliesCommentList; /* To update new reply list */
            let newReceiveNewRelyComment = receiveNewRelyComment; /* To update count of reply list */

            if (!!data && !!data.comment && !!data.comment.comment) {
              if (data.comment.comment.id === liveRepliesCommentList.comment.id) {
                /* Only update when open reply comment list */
                /* Adding new item to update new reply list */
                newLiveRepliesCommentList = Object.assign({}, liveRepliesCommentList, {
                  replies: [...liveRepliesCommentList.replies, data.comment]
                });

                /* Update count of reply list */
                newReceiveNewRelyComment += 1;
              }
            }

            newState = Object.assign(
              {},
              {
                liveRepliesCommentList: newLiveRepliesCommentList /* Update if exist new data */,
                receiveNewRelyComment: newReceiveNewRelyComment /* Update if exist new data */,
                liveCommentList: [...liveCommentList, data.comment],
                receiveNewComment: receiveNewComment + 1
              }
            );
          }
          break;

        case 'delete-comment':
          {
            const { comment_ids: deleteCommentIds } = data;
            const { liveCommentList } = state;
            newState = Object.assign(
              {},
              {
                liveCommentList: liveCommentList.filter((item) => !deleteCommentIds.includes(item.id))
              }
            );
          }
          break;

        case 'pin-comment':
          {
            const { comment_id: pinnedCommentId } = data;
            newState = Object.assign({}, { pinnedCommentId });
          }
          break;

        case 'unpin-comment':
          newState = Object.assign({}, { pinnedCommentId: 0 });
          break;

        case 'add-discount-code':
          {
            const { liveDetail, receiveNewDiscountCode } = state;
            const { discount_code: newDiscountCode } = data;

            newState = Object.assign(
              {},
              {
                liveDetail: Object.assign({}, liveDetail, {
                  discount_codes: [...liveDetail.discount_codes, newDiscountCode]
                }),
                receiveNewDiscountCode: receiveNewDiscountCode + 1
              }
            );
          }
          break;

        case 'delete-discount-code':
          {
            const { liveDetail } = state;
            const { discount_code_ids: deleteDiscountCodeIds } = data;

            newState = Object.assign(
              {},
              {
                liveDetail: Object.assign({}, liveDetail, {
                  discount_codes: liveDetail.discount_codes.filter(
                    (discountCode) => !deleteDiscountCodeIds.includes(discountCode.id)
                  )
                })
              }
            );
          }
          break;

        case 'add-box':
          {
            const { liveDetail, receiveNewBox } = state;
            const { box: newBox } = data;

            newState = Object.assign(
              {},
              {
                liveDetail: Object.assign({}, liveDetail, {
                  boxes: [...liveDetail.boxes, newBox]
                }),
                receiveNewBox: receiveNewBox + 1
              }
            );
          }
          break;

        case 'delete-box':
          {
            const { liveDetail } = state;
            const { box_ids: deleteBoxIds } = data;

            newState = Object.assign(
              {},
              {
                liveDetail: Object.assign({}, liveDetail, {
                  boxes: liveDetail.boxes.filter((box) => !deleteBoxIds.includes(box.id))
                })
              }
            );
          }
          break;

        case 'change-status':
          window.location.reload();
          break;
      }

      return Object.assign({}, state, newState);
    }

    default:
      return state;
  }
};

export default magazineReducer;
