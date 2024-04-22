import { get, post } from '../config/restful-method';

export interface IFetchLiveListParam {
  page?: number;
  perPage?: number;
}

export const fetchLiveList = ({ page = 1, perPage = 20 }: IFetchLiveListParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/lives/videos${query}`,
    description: '[Live] Get live list /lives/videos',
    errorMesssage: `Can't get live list. Please try again`
  });
};

export interface IGetLiveDetailParam {
  slug?: string;
}

export const getLiveDetail = ({ slug }: IGetLiveDetailParam) =>
  get({
    path: `/lives/${slug}`,
    description: '[Live] Get live detail /lives/:slug',
    errorMesssage: `Can't get live detail. Please try again`
  });

export interface IFetchLiveCommentListParam {
  slug: number;
  limit?: number;
  before?: string;
}

export const fetchLiveCommentList = ({ slug, limit = 30, before = '' }: IFetchLiveCommentListParam) => {
  const query = `?limit=${limit}&before=${before}`;

  return get({
    path: `/lives/${slug}/comments${query}`,
    description: '[Live] Get live comment list /lives/:slug/comments',
    errorMesssage: `Can't get live comment list. Please try again`
  });
};

export interface IFetchLiveRepliesCommentListParam {
  slug: number;
  commentId: number;
  page?: number;
  perPage?: number;
}

export const fetchLiveRepliesCommentList = ({
  slug,
  commentId,
  page = 1,
  perPage = 50
}: IFetchLiveRepliesCommentListParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/lives/${slug}/comments/${commentId}${query}`,
    description: '[Live] Get live relies comment list /lives/:slug/comments',
    errorMesssage: `Can't get live relies comment list. Please try again`
  });
};

interface ICreateLiveComment {
  slug: string;
  content: string;
  commentId?: number;
}

export const createLiveComment = ({ slug, content, commentId }: ICreateLiveComment) =>
  post({
    path: `/lives/${slug}/comments${!!commentId ? `/${commentId}` : ''}`,
    data: { content },
    description: '[Live] Create comment /lives/:slug/comments/:comment_id',
    errorMesssage: `Can't create live comment list. Please try again`
  });
