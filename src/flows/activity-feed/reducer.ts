import { REDUCER_GROUP } from '../reducer.group';
import * as ACTIVITY_FEED_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';
import { isExistError, formatErrorMessage } from '../../utils/exception';
import { ALERT_GENERAL_ERROR } from '../../constants/application/alert';

import { openAlertAction } from '../alert/action';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_ACTIVITY_FEED = {
  userInfo: {
    info: null,
    isLoading: false
  },

  collection: {
    list: [],
    detail: {},
    isLoading: false
  },
  list: [],
  nextPageCode: '',
  navigationList: [],
  activityFeedCommentList: {
    commentList: {},
    isFetchCommentListSuccess: false
  },

  // TODO: Suboptimal state. Convert to normalized state
  activityFeedDetail: {},

  hashtags: {},
  isFetchHashtags: false,
  hashtagFeeds: [],

  communityHotBoxes: [],
  communityGoodSale: [],
  communityTopReview: [],
  communityTopLiked: [],

  isFetchActivityFeedDetailSuccess: false,
  isFetchActivityFeedDetailFail: false,
  activityFeedUpdate: {
    feedId: null,
    commentId: null,
    updating: false,
    errored: false
  },
  activityFeedDelete: {
    feedId: null,
    commentId: null,
    deleting: false,
    errored: false
  },
  isAddCommentSuccess: false,
  isAddingComment: false,
  isLikeSuccess: false,
  isUnlikeSuccess: false,
  isFetchCollectionSuccess: false,
  isFetchCollectionDetailSuccess: false,

  isFetchedAllFeedback: false,
  isFetchedNavigationFeedback: false,
  isFetchFeedbackSuccessful: false,
  isFetchFeedbackNavigatinSuccessful: false,

  isFetchCommunityHotBoxes: false,
  isFetchCommunityGoodSale: false,
  isFetchCommunityTopReview: false,
  isFetchCommunityTopLiked: false,

  isFetchingHashtagFeeds: false
};

const activityFeedReducer = (
  state = INITIAL_STATE_ACTIVITY_FEED,
  action = {
    type: '',
    payload: {
      comment: {},
      comments: {},
      feeds: [],
      feed: {},
      error: '',
      errors: [],
      collections: [],
      collection: {},
      hashtags: [],
      user: {},
      titles: [],
      boxes: [],
      next_page_code: ''
    },
    meta: {
      id: '',
      feedId: '',
      commentId: '',
      page: 0,
      perPage: 0,
      days: 7,
      limit: 10,
      hashtag: '',
      pageCode: 'first_page',
      metaFilter: { limit: 0, pageCode: 'first_page' },
      userReferralCode: ''
    },
    asyncDispatch: (data: any) => {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.ACTIVITY_FEED) {
    return state;
  }

  let generationHash;

  /** User comment list */
  const { activityFeedCommentList, list, navigationList, activityFeedDetail, collection, hashtags, hashtagFeeds } =
    state;
  let commentItem, commentListNew, pageCode, feeds;

  switch (action.type) {
    /** Fetch activity list */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST):
      return Object.assign({}, state, {
        isFetchFeedbackSuccessful: false,
        isFetchedAllFeedback: false,
        list: action.meta.metaFilter.pageCode === 'first_page' ? [] : list // First time load new activity feeds with current id equal 0 then refresh list
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST):
      // User access new feed fist time or access again then refresh new feed
      pageCode = action.meta.metaFilter.pageCode;
      const limit = action.meta.metaFilter.limit;

      let newList = list;
      if (!pageCode || 'first_page' === pageCode) {
        newList = [];
      }

      feeds = action.payload.feeds || [];

      return Object.assign({}, state, {
        list: [...newList, ...feeds],
        nextPageCode: action.payload.next_page_code,
        isFetchFeedbackSuccessful: true,
        isFetchedAllFeedback: feeds.length < limit // Fetched all feedback
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST):
      return Object.assign({}, state, {
        isFetchFeedbackSuccessful: false,
        isFetchedAllFeedback: false
      });

    /** Activity feed navigation */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST_NAVIGAATION):
      return Object.assign({}, state, {
        isFetchFeedbackNavigatinSuccessful: false,
        isFetchedNavigationFeedback: false,
        navigationList: !!navigationList && !!navigationList.length ? navigationList : []
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST_NAVIGAATION):
      return Object.assign({}, state, {
        navigationList: action.payload.feeds,
        isFetchFeedbackNavigatinSuccessful: true,
        isFetchedNavigationFeedback: true
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_LIST_NAVIGAATION):
      return Object.assign({}, state, {
        isFetchFeedbackNavigatinSuccessful: false,
        isFetchedNavigationFeedback: false
      });

    // CLEAR_DATA_ACTIVITY_FEED_LIST
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_LIST:
      return Object.assign({}, state, {
        list: []
      });
    // END CLEAR_DATA_ACTIVITY_FEED_LIST

    /** Fetch activity feed comment list */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_COMMENT_LIST):
      return Object.assign({}, state, {
        activityFeedCommentList: {
          isFetchCommentListSuccess: false
        }
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_COMMENT_LIST):
      generationHash = false === isUndefined(action.meta) ? objectToHash(action.meta) : '';
      commentItem = { [generationHash]: action.payload.comments };
      commentListNew = Object.assign({}, activityFeedCommentList.commentList, commentItem);

      return Object.assign({}, state, {
        activityFeedCommentList: {
          commentList: commentListNew,
          isFetchCommentListSuccess: true
        }
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_COMMENT_LIST):
      return Object.assign({}, state, {
        activityFeedCommentList: {
          isFetchCommentListSuccess: false
        }
      });

    /** Update activity feed comment */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.UPDATE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedUpdate: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          updating: true,
          errored: false
        }
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.UPDATE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedUpdate: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          updating: false,
          errored: false
        }
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.UPDATE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedUpdate: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          updating: false,
          errored: true
        }
      });

    /** Delete activity feed comment */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedDelete: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          deleting: true,
          errored: false
        }
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedDelete: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          deleting: false,
          errored: false
        }
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        activityFeedDelete: {
          feedId: action.meta.feedId,
          commentId: action.meta.commentId,
          deleting: false,
          errored: true
        }
      });

    // CLEAR_DATA_ACTIVITY_FEED_COMMENT_LIST
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_COMMENT_LIST:
      return Object.assign({}, state, {
        activityFeedCommentList: {
          commentList: {},
          isFetchCommentListSuccess: false
        }
      });
    // END CLEAR_DATA_ACTIVITY_FEED_COMMENT_LIST

    /** Add activity feed comment */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_COMMENT):
      return Object.assign({}, state, {
        isAddCommentSuccess: false,
        isAddingComment: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_COMMENT):
      // TODO: Replace suboptimal hashed page strategy with normalized data model (Issue: Deletion operation can not be performed without index re-fetch)
      const keyHash = objectToHash(action.meta);

      return Object.assign({}, state, {
        activityFeedCommentList: {
          commentList: {
            [keyHash]: [...activityFeedCommentList.commentList[keyHash], action.payload.comment]
          }
        },
        isAddCommentSuccess: true,
        isAddingComment: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_COMMENT):
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
        isAddCommentSuccess: false,
        isAddingComment: false
      });

    /** Add like activity feed comment */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_LIKE):
      return Object.assign({}, state, {
        isLikeSuccess: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_LIKE):
      const tmpLikeList = Array.isArray(list)
        ? list.map((item: any) => {
            if (item.id === action.meta.id) {
              item.liked = true;
              item.total_likes += 1;
            }

            return item;
          })
        : [];

      return Object.assign({}, state, {
        list: tmpLikeList,
        isLikeSuccess: true
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.ADD_ACTIVITY_FEED_LIKE):
      return Object.assign({}, state, {
        isLikeSuccess: false
      });

    /** Delete like activity feed comment */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_LIKE):
      return Object.assign({}, state, {
        isUnlikeSuccess: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_LIKE):
      const tmpUnlikeList = Array.isArray(list)
        ? list.map((item: any) => {
            if (item.id === action.meta.id) {
              item.liked = false;
              item.total_likes = item.total_likes > 0 ? item.total_likes - 1 : 0;
            }

            return item;
          })
        : [];

      return Object.assign({}, state, {
        list: tmpUnlikeList,
        isUnlikeSuccess: true
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.DELETE_ACTIVITY_FEED_LIKE):
      return Object.assign({}, state, {
        isUnlikeSuccess: false
      });

    /** Fetch activity feed detail */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_DETAIL):
      return Object.assign({}, state, {
        isFetchActivityFeedDetailSuccess: false,
        isFetchActivityFeedDetailFail: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_DETAIL):
      const item = { [objectToHash(action.meta)]: action.payload.feed };
      const _activityFeedDetail = Object.assign({}, activityFeedDetail, item);

      return Object.assign({}, state, {
        isFetchActivityFeedDetailSuccess: true,
        isFetchActivityFeedDetailFail: false,
        activityFeedDetail: _activityFeedDetail
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_ACTIVITY_FEED_DETAIL):
      return Object.assign({}, state, {
        isFetchActivityFeedDetailSuccess: false,
        isFetchActivityFeedDetailFail: true
      });

    // CLEAR_DATA_ACTIVITY_FEED_DETAIL
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_ACTIVITY_FEED_DETAIL:
      return Object.assign({}, state, {
        isFetchActivityFeedDetailSuccess: false,
        activityFeedDetail: {}
      });
    // END CLEAR_DATA_ACTIVITY_FEED_DETAIL

    /** Get collection */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION):
      return Object.assign({}, state, {
        list: [], // Reset activity feed list
        collection: {
          list: [],
          isLoading: true
        },
        isFetchCollectionSuccess: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION):
      return Object.assign({}, state, {
        collection: {
          list: action.payload.collections,
          isLoading: false,
          detail: !isUndefined(collection.detail) ? collection.detail : {}
        },
        isFetchCollectionSuccess: true
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION):
      return Object.assign({}, state, {
        collection: {
          list: [],
          isLoading: false
        },
        isFetchCollectionSuccess: false
      });

    /** Get collection detail */
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION_DETAIL):
      return Object.assign({}, state, {
        collection: {
          isLoading: true,
          list: collection && !isUndefined(collection.list) ? collection.list : []
        },
        isFetchCollectionDetailSuccess: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION_DETAIL):
      let collectionDetail = {
        [action.meta.id]: {
          collection: action.payload.collection,
          feeds: action.payload.feeds
        }
      };

      return Object.assign({}, state, {
        collection: {
          detail: Object.assign({}, collection.detail, collectionDetail),
          isLoading: false,
          list: collection && !isUndefined(collection.list) ? collection.list : []
        },
        isFetchCollectionDetailSuccess: true
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_COLLECTION_DETAIL):
      return Object.assign({}, state, {
        collection: { isLoading: false },
        isFetchCollectionDetailSuccess: false
      });

    // CLEAR_DATA_COLLECTION
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COLLECTION:
      return Object.assign({}, state, {
        collection: {
          isLoading: false,
          list: []
        },
        isFetchCollectionDetailSuccess: false
      });
    // END CLEAR_DATA_COLLECTION

    // HASH TAGS
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAGS):
      return Object.assign({}, state, {
        isFetchHashtags: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAGS):
      return Object.assign({}, state, {
        hashtags: Object.assign({}, { [objectToHash(action.meta)]: action.payload.hashtags }, hashtags),
        isFetchHashtags: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAGS):
      return Object.assign({}, state, {
        isFetchHashtags: false
      });
    // END HASH TAGS

    // CLEAR_DATA_COMMUNITY_HASHTAGS
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COMMUNITY_HASHTAGS:
      return Object.assign({}, state, {
        hashtags: {}
      });
    // END CLEAR_DATA_COMMUNITY_HASHTAGS

    // HASHTAG FEEDS
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAG_FEEDS):
      pageCode = action.meta.pageCode;

      return Object.assign({}, state, {
        hashtagFeeds: !pageCode || 'first_page' === pageCode ? [] : hashtagFeeds,
        isFetchingHashtagFeeds: true,
        isFetchFeedbackSuccessful: false,
        isFetchedAllFeedback: false
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAG_FEEDS):
      pageCode = action.meta.pageCode;

      let newHashtagFeeds = hashtagFeeds;
      feeds = action.payload.feeds || [];

      newHashtagFeeds = !pageCode || 'first_page' === pageCode ? feeds : [...newHashtagFeeds, ...feeds];

      return Object.assign({}, state, {
        hashtagFeeds: newHashtagFeeds,
        isFetchingHashtagFeeds: false,
        isFetchFeedbackSuccessful: true,
        isFetchedAllFeedback: feeds.length < action.meta.limit // Fetched all feedback
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HASHTAG_FEEDS):
      return Object.assign({}, state, {
        isFetchingHashtagFeeds: false,
        isFetchFeedbackSuccessful: false,
        isFetchedAllFeedback: false
      });
    // END HASHTAG FEEDS

    // GET GET_USER_COMMUNITY_PROFILE
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_USER_COMMUNITY_PROFILE): {
      return Object.assign({}, state, {
        userInfo: {
          info: null,
          isLoading: true
        }
      });
    }

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_USER_COMMUNITY_PROFILE): {
      return Object.assign({}, state, {
        userInfo: {
          info: action.payload.user,
          isLoading: false
        }
      });
    }

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.GET_USER_COMMUNITY_PROFILE): {
      return Object.assign({}, state, {
        userInfo: {
          info: null,
          isLoading: false
        }
      });
    }
    // END GET_USER_COMMUNITY_PROFILE

    // CLEAR_DATA_COMMUNITY_HASHTAG_FEEDS
    case ACTIVITY_FEED_ACTION_TYPE.CLEAR_DATA_COMMUNITY_HASHTAG_FEEDS:
      return Object.assign({}, state, {
        hashtagFeeds: []
      });
    // END CLEAR_DATA_COMMUNITY_HASHTAG_FEEDS

    // FETCH_COMMUNITY_HOT_BOXES
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HOT_BOXES):
      return Object.assign({}, state, {
        // communityHotBoxes: [],
        isFetchCommunityHotBoxes: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HOT_BOXES):
      return Object.assign({}, state, {
        communityHotBoxes: action.payload.boxes,
        isFetchCommunityHotBoxes: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_HOT_BOXES):
      return Object.assign({}, state, {
        communityHotBoxes: [],
        isFetchCommunityHotBoxes: false
      });
    // END FETCH_COMMUNITY_HOT_BOXES

    // GOOD_SALE
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_GOOD_SALE):
      return Object.assign({}, state, {
        // communityGoodSale: [],
        isFetchCommunityGoodSale: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_GOOD_SALE):
      return Object.assign({}, state, {
        communityGoodSale: action.payload.boxes,
        isFetchCommunityGoodSale: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_GOOD_SALE):
      return Object.assign({}, state, {
        communityGoodSale: [],
        isFetchCommunityGoodSale: false
      });
    // END GOOD_SALE

    // TOP_REVIEW
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_REVIEW):
      return Object.assign({}, state, {
        // communityTopReview: [],
        isFetchCommunityTopReview: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_REVIEW):
      return Object.assign({}, state, {
        communityTopReview: action.payload.boxes,
        isFetchCommunityTopReview: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_REVIEW):
      return Object.assign({}, state, {
        communityTopReview: [],
        isFetchCommunityTopReview: false
      });
    // END TOP_REVIEW

    // TOP_LIKED
    case PENDING_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_LIKED):
      return Object.assign({}, state, {
        // communityTopLiked: [],
        isFetchCommunityTopLiked: true
      });

    case FULFILLED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_LIKED):
      return Object.assign({}, state, {
        communityTopLiked: action.payload.feeds,
        isFetchCommunityTopLiked: false
      });

    case REJECTED_TYPE(ACTIVITY_FEED_ACTION_TYPE.FETCH_COMMUNITY_TOP_LIKED):
      return Object.assign({}, state, {
        communityTopLiked: [],
        isFetchCommunityTopLiked: false
      });
    // END TOP_LIKED

    default:
      return state;
  }
};

export default activityFeedReducer;
