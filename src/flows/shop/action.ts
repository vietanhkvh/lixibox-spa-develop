import * as SHOP_ACTION_TYPE from './type';
import * as SHOP_API_PATH from '../../api/shop';
import { REDUCER_GROUP } from '../reducer.group';

import { landingPagesData_Json } from './landing-page-data';
import { gatewayTrackAddToWaitlist, gatewayTrackRemoveFromWaitlist } from 'tracking/gateway';

/** Get collection data in home page */
export const fetchDataHomePageAction = () => (dispatch, getState) =>
  dispatch({
    type: SHOP_ACTION_TYPE.FECTH_DATA_HOME_PAGE,
    payload: { promise: SHOP_API_PATH.fetchDataHomePage().then((res) => res) },
    group: REDUCER_GROUP.SHOP
  });

/** Get Product list by cagegory new version */
export interface FetchProductByCategoryActionProps {
  idCategory: string;
  searchQuery?: string;
}
export const fetchProductByCategoryAction = ({ idCategory, searchQuery }: FetchProductByCategoryActionProps) => {
  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_PRODUCT_BY_CATEGORY,
      payload: {
        promise: SHOP_API_PATH.fetchProductByCategory(idCategory, searchQuery).then((res) => res)
      },
      meta: { metaFilter: { idCategory, searchQuery: searchQuery || '' } },
      group: REDUCER_GROUP.SHOP
    });
};

/**  Update Product name cho Product detail trên Mobile */
export const updateProductNameMobileAction = (productName: any) => ({
  type: SHOP_ACTION_TYPE.UPDATE_PRODUCT_NAME_MOBILE,
  payload: productName,
  group: REDUCER_GROUP.SHOP
});

/**  Update filter for category */
export const updateCategoryFilterStateAction = (categoryFilter: any) => ({
  type: SHOP_ACTION_TYPE.UPDATE_CATEGORY_FILTER_STATE,
  payload: categoryFilter,
  group: REDUCER_GROUP.SHOP
});

/** Get product detail */
export const getProductDetailAction =
  ({ productId, isTrackingViewBox = false }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.GET_PRODUCT_DETAIL,
      payload: {
        promise: SHOP_API_PATH.getProductDetail(productId).then((res) => res)
      },
      meta: { productId, isTrackingViewBox },
      group: REDUCER_GROUP.SHOP
    });

/** Get product detail landing pages */
export const getLandingPagesDataAction =
  ({ productId }) =>
  async (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.GET_LANDING_PAGES_DATA,
      payload: await SHOP_API_PATH.fetchDataLandingPage().then((res) =>
        landingPagesData_Json({ productId, data: res })
      ),
      meta: { productId },
      group: REDUCER_GROUP.SHOP
    });

/** Fetch redeem boxes list */
export const fetchRedeemBoxesAction =
  ({ page, perPage = 72, filter, sort }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_REDEEM_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchRedeemBoxes({
          page,
          perPage,
          filter,
          sort
        }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.SHOP
    });

/** Add product into wait list */
export const addToWaitListAction = ({ boxId, box, slug = '' }) => {
  gatewayTrackAddToWaitlist({ box });

  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.ADD_WAIT_LIST,
      payload: { promise: SHOP_API_PATH.addWaitList({ boxId }).then((res) => res) },
      dispatch,
      meta: { slug },
      group: REDUCER_GROUP.SHOP
    });
};

/** Remove product from wait list */
export const removeFromWaitListAction = ({ boxId, box, slug = '', onSuccess, onReject }) => {
  gatewayTrackRemoveFromWaitlist({ box });

  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.REMOVE_FROM_WAIT_LIST,
      payload: { promise: SHOP_API_PATH.removeFromWaitList({ boxId }).then((res) => res) },
      dispatch,
      meta: { boxId, slug },
      group: REDUCER_GROUP.SHOP,
      onSuccess,
      onReject
    });
};

/**
 * Fetch feebbacks boxes list by id or slug of product
 *
 * @param{string} id or slug of product
 * @param{number} page
 * @param{string} perPage
 */
export const fetchFeedbackBoxesAction =
  ({ productId, page, perPage = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_FEEDBACK_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchFeedbackBoxes({
          productId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { productId, page, perPage },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch saving sets boxes list by id or slug of product
 *
 * @param{string} id or slug of product
 * @param{number} page
 * @param{string} perPage
 */
export const fetchSavingSetsBoxesAction =
  ({ productId, page = 1, perPage = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_SAVING_SETS_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchSavingSetsBoxes({
          productId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { productId, page, perPage },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch magazine boxes list by id or slug of product
 *
 * @param{string} id or slug of product
 * @param{number} page
 * @param{number} perPage
 */
export const fetchMagazinesBoxesAction =
  ({ productId, page = 1, perPage = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_MAGAZINES_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchMagazinesBoxes({
          productId,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { productId, page, perPage },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch related boxes list by id or slug of product
 *
 * @param{string} id or slug of product
 * @param{limit} number
 */
export const fetchRelatedBoxesAction =
  ({ productId, limit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_RELATED_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchRelatedBoxes({ productId, limit }).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.SHOP
    });

export interface FetchDataHotDealActionProps {
  page: number;
  perPage: number;
}
export const fetchDataHotDealAction =
  ({ page, perPage }: FetchDataHotDealActionProps) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FECTH_DATA_HOT_DEAL,
      payload: {
        promise: SHOP_API_PATH.fetchDataHotDeal({ page, perPage }).then((res) => res)
      },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch makeups by id or slug of product
 *
 * @param{string} id or slug of product
 * @param{limit} number
 */
export const fetchMakeupsAction =
  ({ boxId, limit = 10 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_MAKEUPS,
      payload: {
        promise: SHOP_API_PATH.fetchMakeups({ boxId, limit }).then((res) => res)
      },
      meta: { boxId },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch store boxes of box detail by product id
 *
 * @param{string} id or slug of product
 */
export const fetchStoreBoxesAction =
  ({ productId }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_STORE_BOXES,
      payload: {
        promise: SHOP_API_PATH.fetchStoreBoxes({ productId }).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch bundled items by box id
 */
export const fetchBundledItemsAction =
  ({ boxId }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_BUNDLED_ITEMS,
      payload: {
        promise: SHOP_API_PATH.fetchBundledItems({ boxId }).then((res) => res)
      },
      meta: { boxId },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch bundled products by box id
 */
export const fetchBundledProductsAction =
  ({ boxId }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_BUNDLED_PRODUCTS,
      payload: {
        promise: SHOP_API_PATH.fetchBundledProducts({ boxId }).then((res) => res)
      },
      meta: { boxId },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch boxes categories of box detail by product id
 *
 * @param{string} id or slug of product
 */
export const fetchBoxesCategoriesAction =
  ({ productId }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_BOXES_CATEGORIES,
      payload: {
        promise: SHOP_API_PATH.fetchBoxesCategories({ productId }).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.SHOP
    });

/**
 * Fetch new product or best selling product that show to home page
 *
 * @param {string} category id or slug
 * @param {number} limit
 */
export const fetchHomeProductByCategoryAction = ({ categoryId, limit = 25 }) => {
  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_HOME_PRODUCT_BY_CATEGORY,
      payload: {
        promise: SHOP_API_PATH.fetchHomeProductByCategory({
          categoryId,
          limit
        }).then((res) => res)
      },
      meta: { metaFilter: { categoryId, limit } },
      group: REDUCER_GROUP.SHOP
    });
};

/** Clear data hot deal */
export const clearDataHotDealAction = () => (dispatch, getState) =>
  dispatch({
    type: SHOP_ACTION_TYPE.CLEAR_DATA_HOT_DEAL,
    payload: {},
    group: REDUCER_GROUP.SHOP
  });

/** Clear data after leave page */
export const clearDataProductByCategoryAction = () => (dispatch, getState) =>
  dispatch({
    type: SHOP_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_CATEGORY,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.SHOP
  });

export const clearDataProdutDetailAction = () => (dispatch, getState) =>
  dispatch({
    type: SHOP_ACTION_TYPE.CLEAR_DATA_PRODUCT_DETAIL,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.SHOP
  });

export const fetchFeedbackPictureAction = ({ productId }) => {
  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FETCH_FEEDBACK_PICTURE,
      payload: {
        promise: SHOP_API_PATH.fetchFeedbackPicture({ productId }).then((res) => res)
      },
      meta: { productId },
      group: REDUCER_GROUP.SHOP
    });
};

/**  Fetch recommendation box */
export const fetchRecommendationBox =
  ({ page = 1 }) =>
  (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.FECTH_RECOMMENDATION_BOX,
      payload: {
        promise: SHOP_API_PATH.fetchRecommendationBox({ page }).then((res) => res)
      },
      meta: { page },
      group: REDUCER_GROUP.SHOP
    });

export const fetchRedeemLatestBoxesAction = ({ page, perPage }) => ({
  type: SHOP_ACTION_TYPE.FETCH_REDEEM_LATEST_BOXES,
  payload: {
    promise: SHOP_API_PATH.fetchRedeemLatestBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.SHOP
});

export const fetchRedeemSpecialBoxesAction = ({ page, perPage }) => ({
  type: SHOP_ACTION_TYPE.FETCH_REDEEM_SPECIAL_BOXES,
  payload: {
    promise: SHOP_API_PATH.fetchRedeemSpecialBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.SHOP
});

export const fetchRedeemUserBoxesAction = ({ page, perPage }) => ({
  type: SHOP_ACTION_TYPE.FETCH_REDEEM_USER_BOXES,
  payload: {
    promise: SHOP_API_PATH.fetchRedeemUserBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.SHOP
});

export type FetchBoxFeedbackSummaryActionProps = SHOP_API_PATH.FetchBoxFeedbackSummaryApiProps;
export const fetchBoxFeedbackSummaryAction = ({ slug }: FetchBoxFeedbackSummaryActionProps) => ({
  type: SHOP_ACTION_TYPE.FETCH_BOX_FEEDBACK_SUMMARY,
  payload: {
    promise: SHOP_API_PATH.fetchBoxFeedbackSummaryApi({ slug }).then((res) => res)
  },
  meta: { slug },
  group: REDUCER_GROUP.SHOP
});

export const fetchReviewableBoxesAction = (boxId) => ({
  type: SHOP_ACTION_TYPE.FETCH_REVIEWABLE_BOXES,
  payload: {
    promise: SHOP_API_PATH.fetchReviewableBoxes(boxId).then((res) => res)
  },
  group: REDUCER_GROUP.SHOP
});

export interface LikeAFeedbackActionProps {
  feedbackId: number;
}
export const likeAFeedbackAction = ({ feedbackId }: LikeAFeedbackActionProps) => {
  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.LIKE_A_FEEDBACK,
      payload: {
        promise: SHOP_API_PATH.likeAFeedbackApi({ feedbackId }).then((res) => res)
      },
      meta: { feedbackId },
      group: REDUCER_GROUP.SHOP
    });
};

export interface UnlikeAFeedbackActionProps {
  feedbackId: number;
}
export const unlikeAFeedbackAction = ({ feedbackId }: UnlikeAFeedbackActionProps) => {
  return (dispatch, getState) =>
    dispatch({
      type: SHOP_ACTION_TYPE.UNLIKE_A_FEEDBACK,
      payload: {
        promise: SHOP_API_PATH.unlikeAFeedbackApi({ feedbackId }).then((res) => res)
      },
      meta: { feedbackId },
      group: REDUCER_GROUP.SHOP
    });
};
