import { get, post, del, fetchData } from '../config/restful-method';
import { getCsrfToken } from '../utils/auth';
import { CDN_JSON_S3_ASSETS_PREFIX } from 'utils/uri';
export const fetchDataHotDeal = ({ page = 1, perPage = 15 }) =>
  get({
    path: `/shop/hot_deal?page=${page}&per_page=${perPage}`,
    description: '[Shop] Get data hot deal in home page /shop/hot_deal',
    errorMesssage: `Can't get data. Please try again`
  });

export const fetchRecommendationBox = ({ page = 1 }) =>
  get({
    path: `/recommendations?page=${page}&per_page=12`,
    description: '[Shop] Get recommendation box /shop/recommendations',
    errorMesssage: `Can't get data. Please try again`
  });

export const fetchDataHomePage = () =>
  get({
    path: '/shop',
    description: '[Shop] Get group data in home page /shop',
    errorMesssage: `Can't get latest boxs data. Please try again`
  });

export const fetchProductByCategory = (idCategory: string, query = '') => {
  const _query = new URLSearchParams(query);
  const stockStatus = _query.get('stock_status') || '';
  const stockStatuses = stockStatus.split(',');
  _query.set('stock_status', stockStatuses.length === 1 ? stockStatuses[0] : '');
  const queryString = _query.toString();

  return get({
    path: `/browse_nodes/${idCategory}${queryString ? `?${queryString}` : ''}`,
    description: '[Shop] Fetch list product in category /browse_nodes/:id',
    errorMesssage: `Can't get list product by category. Please try again`
  });
};

export const getProductDetail = (idProduct: string) =>
  get({
    path: `/boxes/${idProduct}`,
    description: '[Shop] Get Product Detail /boxes/:id',
    errorMesssage: `Can't get product detail. Please try again`
  });

export interface IFetchReDeemBoxesParam {
  page: number;
  perPage: number;
  filter?: {
    brand?: string;
    category?: string;
    coinsPrice?: string;
  };
  sort?: {
    coinsPrice?: string;
  };
}

const generateParams = (key, value) => (value ? `&${key}=${value}` : '');

export const fetchRedeemBoxes = ({ page = 1, perPage = 72, filter, sort }: IFetchReDeemBoxesParam) => {
  const query =
    `?page=${page}&per_page=${perPage}` +
    generateParams('filter[brand]', filter && filter.brand) +
    generateParams('filter[category]', filter && filter.category) +
    generateParams('filter[coins_price]', filter && filter.coinsPrice) +
    generateParams('sort[coins_price]', filter && sort && sort.coinsPrice);

  return get({
    path: `/boxes/redeems${query}`,
    description: '[Shop] Fetch redeem boxes list /boxes/redeems',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const addWaitList = ({ boxId }) => {
  const data = {
    csrf_token: getCsrfToken()
  };

  return post({
    path: `/boxes/${boxId}/waitlist`,
    data,
    description: '[Shop] Add item to wait list /boxes/:id/waitlist',
    errorMesssage: `Can't Get listwait list. Please try again`
  });
};

export const removeFromWaitList = ({ boxId }) => {
  const data = {
    csrf_token: getCsrfToken()
  };

  return del({
    path: `/boxes/${boxId}/waitlist`,
    data,
    description: '[Shop] Remove item from wait list /boxes/:id/waitlist',
    errorMesssage: `Can't remove item from wait list. Please try again`
  });
};

export const fetchFeedbackBoxes = ({ productId, page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/boxes/${productId}/feedbacks${query}`,
    description: '[Shop] Fetch list feedbacks boxes /boxes/:id/feedbacks',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const fetchSavingSetsBoxes = ({ productId, page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/boxes/${productId}/saving_sets${query}`,
    description: '[Shop] Fetch list saving sets boxes /boxes/:id/saving_sets',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const fetchMagazinesBoxes = ({ productId, page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/boxes/${productId}/magazines${query}`,
    description: '[Shop] Fetch magazine boxes /boxes/:id/magazines',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const fetchRelatedBoxes = ({ productId, limit = 10 }) => {
  const query = `?limit=${limit}`;

  return get({
    path: `/boxes/${productId}/related_boxes${query}`,
    description: '[Shop] Fetch related boxes /boxes/:id/related_boxes',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const fetchMakeups = ({ boxId, limit = 10 }) =>
  get({
    path: `/makeups/${boxId}?limit=${limit}`,
    description: '[Shop] Fetch makeups /makeups/:id',
    errorMesssage: `Can't fetch data. Please try again`
  });

export const fetchStoreBoxes = ({ productId }) =>
  get({
    path: `/boxes/${productId}/store_boxes`,
    description: '[Shop] Fetch store boxes /boxes/:id/store_boxes',
    errorMesssage: `Can't fetch store boxes. Please try again`
  });

export const fetchBundledItems = ({ boxId }) =>
  get({
    path: `/boxes/${boxId}/bundle_items`,
    description: '[Shop] Fetch bundle items /boxes/:boxId/bundle_items',
    errorMesssage: `Can't fetch bundle items. Please try again`
  });

export const fetchBundledProducts = ({ boxId }) =>
  get({
    path: `/boxes/${boxId}/bundle_products`,
    description: '[Shop] Fetch bundle products /boxes/:boxId/bundle_products',
    errorMesssage: `Can't fetch bundle products. Please try again`
  });

export interface FetchBoxFeedbackSummaryApiProps {
  slug: string;
}
export const fetchBoxFeedbackSummaryApi = ({ slug }: FetchBoxFeedbackSummaryApiProps) =>
  get({
    path: `/external_services/summary?slug=${slug}`,
    description: '[Shop] Fetch box feedback summary /external_services/summary',
    errorMesssage: `Can't fetch box feedback summary. Please try again`
  });

export const fetchBoxesCategories = ({ productId }) =>
  get({
    path: `/boxes/${productId}/categories`,
    description: '[Shop] Fetch boxes categories /boxes/:id/categories',
    errorMesssage: `Can't fetch boxes categories. Please try again`
  });

export const fetchHomeProductByCategory = ({ categoryId, limit = 25 }) =>
  get({
    path: `/shop/browse_nodes/${categoryId}?limit=${limit}`,
    description: '[Shop] Fetch product list by category id /shop/browse_nodes/:id',
    errorMesssage: `Can't fetch product list by category id. Please try again`
  });

export const fetchFeedbackPicture = ({ productId }) => {
  return get({
    path: `/boxes/${productId}/feedback_pictures`,
    description: '[Shop] Fetch feedback picture /boxes/:id/feedback_pictures',
    errorMesssage: `Can't fetch data. Please try again`
  });
};

export const fetchRedeemLatestBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems${query}`,
    description: '[Shop] Fetch redeem latest boxes /redeems',
    errorMesssage: `Can't fetch redeem latest boxes. Please try again`
  });
};

export const fetchRedeemSpecialBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems/specials${query}`,
    description: '[Cart] Fetch redeem special boxes /redeems/specials',
    errorMesssage: `Can't fetch redeem special boxes. Please try again`
  });
};

export const fetchRedeemUserBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems/me${query}`,
    description: '[Cart] Fetch redeem user boxes /redeems/me',
    errorMesssage: `Can't fetch redeem user boxes. Please try again`
  });
};

export const fetchDataLandingPage = () =>
  // local
  // fetchData(`https://www.lixibox.com/landing-page/layout.json?v=${new Date().getTime()}`);
  // production
  fetchData(CDN_JSON_S3_ASSETS_PREFIX(`/landing-page/layout.json?v=${new Date().getTime()}`));

export const fetchReviewableBoxes = (boxId) => {
  const csrf_token = getCsrfToken();

  return get({
    path: `/boxes/${boxId}/reviewable?csrf_token=${csrf_token}`,
    description: ` Fetch box id boxes reviewable /boxes/${boxId}/reviewable?access_token=${csrf_token}`,
    errorMesssage: `Can't fetch id ${boxId} reviewable  boxes. Please try again`
  });
};

export interface LikeAFeedbackApiProps {
  feedbackId: number;
}
export const likeAFeedbackApi = ({ feedbackId }: LikeAFeedbackApiProps) => {
  const data = {
    csrf_token: getCsrfToken()
  };

  return post({
    path: `/feedbacks/${feedbackId}/like`,
    data,
    description: '[Shop] Like a feedback /feedbacks/:id/like',
    errorMesssage: `Can't like feedback. Please try again`
  });
};

export interface UnlikeAFeedbackApiProps {
  feedbackId: number;
}
export const unlikeAFeedbackApi = ({ feedbackId }: UnlikeAFeedbackApiProps) => {
  const data = {
    csrf_token: getCsrfToken()
  };

  return del({
    path: `/feedbacks/${feedbackId}/unlike`,
    data,
    description: '[Shop] Unlike a feedback /feedbacks/:id/unlike',
    errorMesssage: `Can't unlike feedback. Please try again`
  });
};
