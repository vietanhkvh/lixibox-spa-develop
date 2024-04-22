import { Pageable } from 'utils/page';
import { BoxCategory, Product, ProductBox, FeedbackSummaryResponse } from '../../types/api/shop';
import { PagingResponse } from 'api/types';

export interface RedeemableState extends Pageable {
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ShopState {
  /**
   * @deprecated - use `hotDeals` instead
   */
  hotDeal: any;
  hotDeals: {
    index: Array<ProductBox>;
    paging: PagingResponse | null;
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  productByCategory: {
    [hash: string]: {
      boxes: Array<ProductBox>;
      success: boolean;
    };
  };
  fetchProductByCategory: {
    lastCategoryId: string;
    lastSearchQuery: string;
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  boxesCategories: Array<BoxCategory>;
  productDetail: {
    [key: string]: Product;
  };
  productDetailsFetching: Array<string>;
  productDetailsLoaded: Array<string>;
  productDetailsErrored: Array<string>;
  isGetProductDetailSuccess: boolean;
  isTrackingViewBox: boolean;
  isGetProductDetailFail: Array<string>;
  isLoadingProductDetail: boolean;
  likeAFeedback: {
    [feedbackId: string]: {
      processing: boolean;
      processed: boolean;
      errored: boolean;
    };
  };
  unlikeAFeedback: {
    [feedbackId: string]: {
      processing: boolean;
      processed: boolean;
      errored: boolean;
    };
  };
  redeemable: {
    special: RedeemableState;
    user: RedeemableState;
    latest: RedeemableState;
  };

  boxFeedbackable: {
    slug: string;
    canReview: boolean;
    reviewed: boolean;
    fetching?: boolean;
    loaded?: boolean;
    errored?: boolean;
  };

  boxFeedbackSummary: {
    detail: FeedbackSummaryResponse | null;
    lastId: string;
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };

  /**
   * pagination group on top bar
   */

  productPaging: any;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
