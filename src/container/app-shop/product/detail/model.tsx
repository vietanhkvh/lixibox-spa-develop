import { ProductBoxVideo } from 'types/api/shop';
import { Picture } from 'types/generic';
import { PropsFromRedux } from './store';

export interface IProductDetailContainerProps extends PropsFromRedux {
  history?: any;
  match?: any;
  location?: any;
  boxReviewFeedback: any;
  feedbackPerPage?: number;
  isExclusiveBrand?: boolean;
}

export interface IProductDetailContainerState {
  idProduct: string;
  idProductHash: string;

  feedbackPosition?: number;
  discussionPosition?: number;
  heightPriceBtnToTop?: number;
  isFixedToolbar?: boolean;
  isFetchLoveBox?: boolean;
  isPriorotyBlock?: boolean;
  isPriceBtnOnTop?: boolean;
  isFetchSavingBox?: boolean;
  isFetchRelatedBox?: boolean;
  isLoadingFeedback?: boolean;
  isFetchShopTheLook?: boolean;
  isFetchWatchedList?: boolean;
  isFetchListFeedback?: boolean;
  isFetchMagazineForBox?: boolean;
  isFetchProductDetailFail?: boolean;

  feedbackUrlList: Array<any>;

  feedbackPage: any;

  trackingCode: string;
  expTrackingCode: string;
  referrerObjectType: string;
  referrerObjectId: string;

  isOpenStoreModal?: boolean;
  isOpenStoreMapModal?: boolean;
  isOpenCitySelectionModal?: boolean;
  isOpenSizeGuideModal?: boolean;
  isOpenDiscountCodeModal?: boolean;
  isOpenSavingBoxModal?: boolean;
  isOpenFeedbackModal?: boolean;
  isOpenDiscussionModal?: boolean;
  isOpenCashbackInfoModal?: boolean;
  storeMapUrl?: string;

  nextVariantId: string;
}

export interface CombinedProduct {
  box: any;
  id: number;
  slug: string;
  name: string;
  brand: string;
  brandUrl: string;
  currentPrice: number;
  oldPrice: number;
  rating: { count: number; avg_rate: number };
  love: number;
  picture: Array<Picture>;
  video: Array<ProductBoxVideo>;
  stock: number;
  storeStock: number;
}
