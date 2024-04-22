import { get, post, patch, del } from '../config/restful-method';
import { getCsrfToken } from '../utils/auth';

export interface IActivityFeedListParam {
  limit: number;
  pageCode?: string;
  userReferralCode: number;
  feedType: string;
}

export const fecthActivityFeedList = ({
  userReferralCode = 0,
  limit = 20,
  pageCode = 'first_page',
  feedType = ''
}: IActivityFeedListParam) => {
  const query =
    `?limit=${limit}` +
    (!!pageCode ? `&page_code=${pageCode}` : '') +
    (!!userReferralCode ? `&user_referral_code=${userReferralCode}` : '') +
    (!!feedType ? `&feed_type=${feedType}` : '');

  return get({
    path: `/activity_feeds${query}`,
    description: `[Activityfeeds] Fetch feed list /activity_feeds`,
    errorMesssage: `Can't fetch data activity feeds. Please try again`
  });
};

// Fetch activity feed comment list
export interface IActivityFeedCommentListParam {
  id: number;
  lastCommentId: number;
  page: number;
  perPage: number;
}

export const fecthActivityFeedCommentList = ({ id, lastCommentId, page, perPage }: IActivityFeedCommentListParam) => {
  const lastCommentParams = 'undefined' !== typeof lastCommentId ? `&last_comment_id=${lastCommentId}` : '';
  const query = `?&page=${page}&per_page=${perPage}${lastCommentParams}`;

  return get({
    path: `/activity_feeds/${id}/comments${query}`,
    description: `[Activityfeeds] Fetch feed comment list /activity_feeds/:id/comments`,
    errorMesssage: `Can't fetch activity feed comment list. Please try again`
  });
};

// Update activity feed comment
export interface IUpdateActivityFeedCommentParams {
  feedId: number;
  commentId: number;
  content: string;
}
export const updateActivityFeedComment = ({ feedId, commentId, content }: IUpdateActivityFeedCommentParams) =>
  patch({
    path: `/activity_feeds/${feedId}/comments/${commentId}`,
    data: { csrf_token: getCsrfToken(), content },
    description: `[Activityfeeds] Update feed comment /activity_feeds/:feed_id/comments/:comment_id`,
    errorMesssage: `Can't update activity feed comment. Please try again`
  });

// Delete activity feed comment
export interface IDeleteActivityFeedCommentParams {
  feedId: number;
  commentId: number;
}
export const deleteActivityFeedComment = ({ feedId, commentId }: IDeleteActivityFeedCommentParams) =>
  del({
    path: `/activity_feeds/${feedId}/comments/${commentId}`,
    data: { csrf_token: getCsrfToken() },
    description: `[Activityfeeds] Delete feed comment /activity_feeds/:feed_id/comments/:comment_id`,
    errorMesssage: `Can't delete activity feed comment. Please try again`
  });

// Add activity feed comment
export interface IAddActivityFeedCommentParam {
  id: number;
  content: string;
  lastCommentId: number;
}

export const addActivityFeedComment = ({ id, content, lastCommentId }: IAddActivityFeedCommentParam) =>
  post({
    path: `/activity_feeds/${id}/comments`,
    data: {
      csrf_token: getCsrfToken(),
      content: content,
      last_comment_id: lastCommentId
    },
    description: `[Activityfeeds] Add feed comment /activity_feeds/:id/comments`,
    errorMesssage: `Can't add activity feed comment. Please try again`
  });

// Add activity feed like
export interface IAddActivityFeedLikeParam {
  id: number;
}

export const addActivityFeedLike = ({ id }: IAddActivityFeedLikeParam) =>
  post({
    path: `/activity_feeds/${id}/like`,
    data: {
      csrf_token: getCsrfToken()
    },
    description: `[Activityfeeds] Like feed /activity_feeds/:id/like`,
    errorMesssage: `Can't add activity feed like. Please try again`
  });

// Delete activity feed like
export interface IDeleteActivityFeedLikeParam {
  id: number;
}

export const deleteActivityFeedLike = ({ id }: IDeleteActivityFeedLikeParam) =>
  del({
    path: `/activity_feeds/${id}/unlike`,
    data: { csrf_token: getCsrfToken() },
    description: `[Activityfeeds] Unlike feed /activity_feeds/:id/unlike`,
    errorMesssage: `Can't delete activity feed like. Please try again`
  });

export const fetchActivityFeedDetail = ({ feedId }) =>
  get({
    path: `/activity_feeds/${feedId}`,
    description: `[Activityfeeds] Fetch feed detail /activity_feeds/:id`,
    errorMesssage: `Can't fetch activity feed detail. Please try again`
  });

/**
 * Get Collection (Top feed)
 *
 * @param {number} page ex: 1
 * @param {number} perPage ex: 12
 */
export const getCollection = ({ page = 1, perPage = 12 }) => {
  const query = `?&page=${page}&per_page=${perPage}`;

  return get({
    path: `/community${query}`,
    description: `[Activityfeeds] Get collection /community`,
    errorMesssage: `Can't get collection. Please try again`
  });
};

/**
 * Get Collection detail (Top feed)
 *
 * @param {number} id ex: 1
 */
export const getCollectionDetail = ({ id }) =>
  get({
    path: `/community/${id}`,
    description: `[Activityfeeds] Get collection detail /community/:id`,
    errorMesssage: `Can't get collection detail. Please try again`
  });

export const fetchCommunityHashtagFeeds = ({ hashtag, limit = 10, days = 30, currentId = 0 }) => {
  const query = `?hashtag=${hashtag}&days=${days}&limit=${limit}` + (currentId !== 0 ? `&current_id=${currentId}` : '');

  return get({
    path: `/community/hashtag_feeds${query}`,
    description: '[Activityfeeds] Fetch community hashtag feeds /community/hashtag_feeds',
    errorMesssage: `Can't fetch community hashtag feeds. Please try again`
  });
};

export const fetchCommunityHashtags = ({ days = 7 }) => {
  const query = `?days=${days}`;

  return get({
    path: `/community/hashtags${query}`,
    description: '[Activityfeeds] Fetch community hashtags /community/hashtags',
    errorMesssage: `Can't fetch community hashtags. Please try again`
  });
};

export const getUserCommunityProfile = ({ userReferralCode = 0 }) =>
  get({
    path: `/user/${userReferralCode}`,
    description: `[Activityfeeds] Get user community profile /user/:userReferralCode`,
    errorMesssage: `Can't fetch data. Please try again`
  });

export const fetchCommunityHotBoxes = ({ days = 7, limit = 10 }) => {
  const query = `?days=${days}&limit=${limit}`;

  return get({
    path: `/community/hot_boxes${query}`,
    description: '[Activityfeeds] Fetch community hot boxes /community/hot_boxes',
    errorMesssage: `Can't fetch community hot boxes. Please try again`
  });
};

export const fetchCommunityGoodSale = ({ limit = 10 }) => {
  const query = `?limit=${limit}`;

  return get({
    path: `/community/good_sale${query}`,
    description: '[Activityfeeds] Fetch community good sale boxes /community/good_sale',
    errorMesssage: `Can't fetch community good sale boxes. Please try again`
  });
};

export const fetchCommunityTopReview = ({ days = 7, boxLimit = 10, feedLimit = 10 }) => {
  const query = `?days=${days}&box_limit=${boxLimit}&feed_limit=${feedLimit}`;

  return get({
    path: `/community/top_reviewed${query}`,
    description: '[Activityfeeds] Fetch community top reviewd box /community/top_reviewed',
    errorMesssage: `Can't fetch community top reviewd boxes. Please try again`
  });
};

export const fetchCommunityTopLiked = ({ days = 7, limit = 10 }) => {
  const query = `?days=${days}&limit=${limit}`;

  return get({
    path: `/community/top_liked${query}`,
    description: '[Activityfeeds] Fetch community top liked feeds /community/top_liked',
    errorMesssage: `Can't fetch community top liked feeds. Please try again`
  });
};
