import { BoxCategory, ProductBox, ProductBoxBadgeItemResponse } from 'types/api/shop';
import { Cart, CartItem, DiscountCode } from 'types/api/cart';
import { User } from 'types/api/auth';
import { Theme } from 'types/api/theme';
import { Brand } from 'types/api/brand';
import { ActivityFeed } from 'types/api/activity-feed';
import { Magazine } from 'types/api/magazine';
import { Order } from 'types/api/order';
import { Scheme } from 'types/api/gwp';
import { SearchSourceType, SearchVersionType } from 'constants/application/search.type';
import { AuthMethodType } from 'constants/application/auth';
import { debugEvent } from './utils';
import { getTrackableBoxCategoryName } from 'tracking/utils';
import { trackingFacebookPixel } from 'tracking/facebook-pixel';
import { trackingTiktokPixel } from 'tracking/tiktok-pixel';
import {
  moengageTrackAddToCart,
  moengageTrackAddToWaitlist,
  moengageTrackAddToWishlist,
  moengageTrackBeginCheckout,
  moengageTrackCancelOrder,
  moengageTrackCompleteMagazine,
  moengageTrackPurchase,
  moengageTrackRateProduct,
  moengageTrackRemoveFromCart,
  moengageTrackRemoveFromWaitlist,
  moengageTrackRemoveFromWishlist,
  moengageTrackSearch,
  moengageTrackShare,
  moengageTrackSignin,
  moengageTrackSignout,
  moengageTrackSignup,
  moengageTrackViewCart,
  moengageTrackViewContent,
  moengageTrackViewContentList,
  moengageTrackViewMagazine,
  moengageUpdateProfile
} from 'tracking/moengage';
import {
  branchIoTrackViewContent,
  branchIoTrackViewItemList,
  branchIoTrackViewCategory,
  branchIoTrackViewTheme,
  branchIoTrackViewBrand,
  branchIoTrackRated,
  branchIoTrackSignin,
  branchIoTrackSignup,
  branchIoTrackSignout,
  branchIoTrackViewHome,
  branchIoTrackViewSearchResults,
  branchIoTrackAddToCart,
  branchIoTrackAddToCartAddOn,
  branchIoTrackAddToCartRedeem,
  branchIoTrackAddToCartGift,
  branchIoTrackAddToCartSample,
  branchIoTrackViewCart,
  branchIoTrackExitCart,
  branchIoTrackInitiatedCheckout,
  branchIoTrackPurchased,
  branchIoTrackCancelOrder,
  branchIoTrackShare,
  branchIoTrackUnboxingComplete
} from 'tracking/branchio';
import {
  matomoTrackPageView,
  matomoTrackReactBoxFeedback,
  matomoTrackScroll,
  matomoTrackViewAllItems,
  matomoTrackViewCategory,
  matomoTrackViewContent,
  matomoTrackViewContentFromList,
  matomoTrackViewItemList,
  matomoTrackViewTheme,
  matomoTrackViewedBoxFeedbacks,
  matomoTrackViewBrand,
  matomoTrackViewDiscountCode,
  matomoTrackViewedFeed,
  matomoTrackViewedMagazine,
  matomoTrackViewedMagazineFromList,
  matomoTrackCompleteMagazine,
  matomoTrackRated,
  matomoTrackAddToWishlist,
  matomoTrackRemoveFromWishlist,
  matomoTrackAddToWaitlist,
  matomoTrackRemoveFromWaitlist,
  matomoTrackAddToCart,
  matomoTrackAddToCartAddOn,
  matomoTrackAddToCartRedeem,
  matomoTrackAddToCartGift,
  matomoTrackAddToCartSample,
  matomoTrackViewCart,
  matomoTrackExitCart,
  matomoTrackRemoveFromCart,
  matomoTrackInitiatedCheckout,
  // matomoTrackPurchased,
  matomoTrackCancelOrder,
  matomoTrackSearch,
  matomoTrackViewSearchResults,
  matomoTrackLeaveSearchImmediately,
  matomoTrackViewSearchItem,
  matomoTrackViewFirstSearchItemIndex,
  matomoTrackSignin,
  matomoTrackSignup,
  matomoTrackSignout,
  matomoTrackUpdateProfile,
  matomoTrackViewHome,
  matomoTrackShare,
  matomoTrackUnboxingComplete,
  matomoTrackViewReferralCode,
  matomoTrackViewContentFromSource,
  matomoTrackPurchased,
  matomoTrackPurchasedFromSources,
  matomoTrackViewedGwpScheme,
  matomoTrackSearchAutoComplete,
  matomoTrackViewedSearchPanel,
  matomoTrackViewBadge
} from 'tracking/matomo';
import { ContentType, ContentTypeType, Currency } from 'tracking/constants';
import { ViewedSourceType } from 'tracking/constants/index';
import { PURCHASE_TYPE, PurchaseTypeType } from 'constants/application/purchase';
import { CartItemSource, CartItemSourceManager } from 'utils/tracking/cart-item-source-manager';
import { gaTrackAddToCart } from 'tracking/google-analytic';
import { storageKey } from 'constants/application/client-storage';
import { getBoxBadges } from 'utils/product';

/**
 * NOTE:
 *
 * - Errors should not be logged to console as tracking is meant to be transparent to the user.
 *
 * TODO:
 *
 * - Add tracking dimension: desktop/mobile view
 */

export const gatewayTrackPageView = async () => {
  try {
    // Matomo
    matomoTrackPageView();

    debugEvent({ event: 'PageView' });
  } catch (e) {}
};

interface GatewayTrackViewContentParams {
  box: ProductBox;
  categories: Array<BoxCategory>;
}
export const gatewayTrackViewContent = async (params: GatewayTrackViewContentParams) => {
  try {
    const { box, categories } = params;

    const categoryName = getTrackableBoxCategoryName({ box, categories });
    const brandName = (box?.is_individual && box?.box_products?.[0]?.product?.brand?.name) || '';
    const lixiboxId = box?.lixibox_id || '';
    const id = box?.id || '';
    const name = box?.slug || '';
    const image = box?.primary_picture?.original_url || '';
    const originalPrice = box?.original_price || 0;
    const price = box?.price || 0;

    // Facebook pixel
    trackingFacebookPixel('ViewContent', {
      content_ids: [id], // params with array
      content_name: name,
      content_type: ContentType.PRODUCT,
      contents: [{ id: id, quantity: 1 }], // params with array
      currency: Currency.DEFAULT,
      value: price
    });

    // Tiktok pixel
    trackingTiktokPixel('ViewContent', {
      content_id: id, // single parameter
      content_name: name,
      content_type: ContentType.PRODUCT,
      currency: Currency.DEFAULT,
      price,
      value: price
    });

    // Google analytics
    'function' === typeof window.gtag &&
      window.gtag('event', 'view_item', {
        currency: Currency.DEFAULT,
        value: price,
        items: [
          {
            item_id: id,
            item_name: name,
            affiliation: '',
            coupon: '',
            discount: originalPrice - price,
            index: 0,
            item_brand: brandName,
            item_category: categoryName,
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: '',
            item_list_name: '',
            item_variant: '',
            location_id: '',
            price,
            quantity: 1
          }
        ]
      });

    // Moengage
    moengageTrackViewContent({
      lixiboxId,
      id,
      name,
      image,
      price,
      category: categoryName,
      contentType: ContentType.PRODUCT,
      currency: Currency.DEFAULT
    });

    // Matomo
    matomoTrackViewContent({ box, categories });

    // Branch.IO
    branchIoTrackViewContent({ box, categories });

    debugEvent({ event: 'ViewContent', params });
  } catch (e) {}
};

export interface GatewayTrackViewBadgeParams {
  badge: ProductBoxBadgeItemResponse;
  box: ProductBox;
  source?: ViewedSourceType;
  sourceId?: string;
}
/**
 * Triggered when user views a box with a badge from either of the following sources:
 * - box detail
 * - box preview
 */
export const gatewayTrackViewBadge = async (params: GatewayTrackViewBadgeParams) => {
  try {
    const { badge, box, source, sourceId } = params;

    // Matomo
    matomoTrackViewBadge({ badge, box, source, sourceId });

    debugEvent({ event: 'ViewBadge', params });
  } catch (e) {}
};

interface GatewayTrackViewContentFromSource {
  box: ProductBox;
  categories?: Array<BoxCategory>;
  source: ViewedSourceType;
  sourceId?: string;
}
export const gatewayTrackViewContentFromSource = async (params: GatewayTrackViewContentFromSource) => {
  try {
    const { box, categories, source, sourceId } = params;

    // Matomo
    matomoTrackViewContentFromSource({ box, categories, source, sourceId });

    debugEvent({ event: 'ViewContentFromSource', params });
  } catch (e) {}
};

interface GatewayTrackViewContentFromListParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
  source: ViewedSourceType;
  sourceId?: string;
  index: number;
}
export const gatewayTrackViewContentFromList = async (params: GatewayTrackViewContentFromListParams) => {
  try {
    const { box, categories, source, sourceId, index } = params;

    // Matomo
    matomoTrackViewContentFromList({ box, categories, source, sourceId, index });

    // Set view source
    source &&
      localStorage.setItem(
        storageKey.TRACKING_PRODUCT_VIEW_SOURCE,
        JSON.stringify({ source, sourceId, boxId: box?.lixibox_id })
      );

    // START - Derivative events----------------------------------------------

    getBoxBadges(box).forEach((badge) => {
      gatewayTrackViewBadge({ box, badge, source, sourceId });
    });
    // Ensures that the badge view event is only triggered once
    localStorage.setItem(storageKey.TRACKING_IS_PRODUCT_VIEWED_FROM_SOURCE, 'true');

    // END - Derivative events-------------------------------------------------

    debugEvent({ event: 'ViewContentFromList', params });
  } catch (e) {}
};

interface GatewayTrackViewedBoxFeedbacksParams {
  box: ProductBox;
}
export const gatewayTrackViewedBoxFeedbacks = async (params: GatewayTrackViewedBoxFeedbacksParams) => {
  try {
    const { box } = params;

    // Matomo
    matomoTrackViewedBoxFeedbacks({ box });

    debugEvent({ event: 'ViewedBoxFeedbacks', params });
  } catch (e) {}
};

interface GatewayTrackReactBoxFeedbackParams {
  box: ProductBox;
  liked: boolean;
}
export const gatewayTrackReactBoxFeedback = async (params: GatewayTrackReactBoxFeedbackParams) => {
  try {
    const { box, liked } = params;

    // Matomo
    matomoTrackReactBoxFeedback({ box, liked });

    // TODO: Implement
    debugEvent({ event: 'ReactBoxFeedback', params });
  } catch (e) {}
};

interface GatewayTrackScrollParams {
  source: string;
  /**
   * Range: 0 - 100
   */
  scrolledPercentage: number;
}
export const gatewayTrackScroll = async (params: GatewayTrackScrollParams) => {
  try {
    const { source, scrolledPercentage } = params;

    // Matomo
    matomoTrackScroll({ source, scrolledPercentage });

    debugEvent({ event: 'Scroll', params });
  } catch (e) {}
};

interface GatewayTrackViewAllItemsParams {
  source: ViewedSourceType;
  sourceId?: string;
}
export const gatewayTrackViewAllItems = async (params: GatewayTrackViewAllItemsParams) => {
  try {
    const { source, sourceId } = params;

    // Matomo
    matomoTrackViewAllItems({ source, sourceId });

    debugEvent({ event: 'ViewAllItems', params });
  } catch (e) {}
};

interface GatewayTrackViewItemListParams {
  source: ViewedSourceType;
  sourceId?: string;
  id?: string;
  name?: string;
  items?: Array<ProductBox>;
}
export const gatewayTrackViewItemList = async (params: GatewayTrackViewItemListParams) => {
  try {
    const { source, sourceId, id, name } = params;

    // MoEngage
    moengageTrackViewContentList({ id, name, type: source as any });
    // Matomo
    matomoTrackViewItemList({ source, sourceId, id, name });
    // Branch.IO
    branchIoTrackViewItemList({ source, sourceId, id, name });

    debugEvent({ event: 'ViewItemList', params });
  } catch (e) {}
};

interface GatewayTrackViewCategoryParams {
  category: BoxCategory;
}
export const gatewayTrackViewCategory = async (params: GatewayTrackViewCategoryParams) => {
  try {
    const { category } = params;

    // Matomo
    matomoTrackViewCategory({ category });
    // Branch.IO
    branchIoTrackViewCategory({ category });

    debugEvent({ event: 'ViewCategory', params });
  } catch (e) {}
};

interface GatewayTrackViewThemeParams {
  theme: Theme;
}
export const gatewayTrackViewTheme = async (params: GatewayTrackViewThemeParams) => {
  try {
    const { theme } = params;

    // Matomo
    matomoTrackViewTheme({ theme });
    // Branch.IO
    branchIoTrackViewTheme({ theme });

    debugEvent({ event: 'ViewTheme', params });
  } catch (e) {}
};

interface GatewayTrackViewBrandParams {
  brand: Brand;
}
export const gatewayTrackViewBrand = async (params: GatewayTrackViewBrandParams) => {
  try {
    const { brand } = params;

    // Matomo
    matomoTrackViewBrand({ brand });
    // Branch.IO
    branchIoTrackViewBrand({ brand });

    debugEvent({ event: 'ViewBrand', params });
  } catch (e) {}
};

interface GatewayTrackViewDiscountCodeParams {
  discountCode: DiscountCode;
}
export const gatewayTrackViewDiscountCode = async (params: GatewayTrackViewDiscountCodeParams) => {
  try {
    const { discountCode } = params;

    // Matomo
    matomoTrackViewDiscountCode({ discountCode });

    debugEvent({ event: 'ViewDiscountCode', params });
  } catch (e) {}
};

interface GatewayTrackViewedFeedParams {
  feed: ActivityFeed;
}
export const gatewayTrackViewedFeed = async (params: GatewayTrackViewedFeedParams) => {
  try {
    const { feed } = params;

    // Matomo
    matomoTrackViewedFeed({ feed });

    debugEvent({ event: 'ViewedFeed', params });
  } catch (e) {}
};

interface GatewayTrackViewedMagazineParams {
  magazine: Magazine;
}
export const gatewayTrackViewedMagazine = async (params: GatewayTrackViewedMagazineParams) => {
  try {
    const { magazine } = params;

    // MoEngage
    moengageTrackViewMagazine({ magazine });
    // Matomo
    matomoTrackViewedMagazine({ magazine });

    debugEvent({ event: 'ViewedMagazine', params });
  } catch (e) {}
};

interface GatewayTrackViewedGwpSchemeParams {
  scheme: Scheme;
}
export const gatewayTrackViewedGwpScheme = async (params: GatewayTrackViewedGwpSchemeParams) => {
  try {
    const { scheme } = params;

    // Matomo
    matomoTrackViewedGwpScheme({ scheme });

    debugEvent({ event: 'ViewedGwpScheme', params });
  } catch (e) {}
};

interface GatewayTrackViewedMagazineFromListParams {
  source: ViewedSourceType;
  sourceId?: string;
  index: number;
  magazine: Magazine;
}
export const gatewayTrackViewedMagazineFromList = async (params: GatewayTrackViewedMagazineFromListParams) => {
  try {
    const { source, sourceId, index, magazine } = params;

    // Matomo
    matomoTrackViewedMagazineFromList({ source, sourceId, index, magazine });

    debugEvent({ event: 'ViewedMagazineFromList', params });
  } catch (e) {}
};

interface GatewayTrackCompleteMagazineParams {
  magazine: Magazine;
  /**
   * Range: 0 - 100
   */
  scrollPercentage: number;
}
export const gatewayTrackCompleteMagazine = async (params: GatewayTrackCompleteMagazineParams) => {
  try {
    const { magazine, scrollPercentage } = params;

    // MoEngage
    moengageTrackCompleteMagazine({ magazine, scrollPercentage });
    // Matomo
    matomoTrackCompleteMagazine({ magazine, scrollPercentage });

    debugEvent({ event: 'CompleteMagazine', params });
  } catch (e) {}
};

interface GatewayTrackRatedParams {
  box: ProductBox;
  rating: number;
}
export const gatewayTrackRated = async (params: GatewayTrackRatedParams) => {
  try {
    const { box, rating } = params;

    // MoEngage
    moengageTrackRateProduct({ box, rating });
    // Matomo
    matomoTrackRated({ box, rating });
    // Branch.IO
    branchIoTrackRated({ box, rating });

    debugEvent({ event: 'Rated', params });
  } catch (e) {}
};

interface GatewayTrackAddToWishlistParams {
  box: ProductBox;
}
export const gatewayTrackAddToWishlist = async (params: GatewayTrackAddToWishlistParams) => {
  try {
    const { box } = params;

    // MoEngage
    moengageTrackAddToWishlist({ box });
    // Matomo
    matomoTrackAddToWishlist({ box });

    debugEvent({ event: 'AddToWishlist', params });
  } catch (e) {}
};

interface GatewayTrackRemoveFromWishlistParams {
  box: ProductBox;
}
export const gatewayTrackRemoveFromWishlist = async (params: GatewayTrackRemoveFromWishlistParams) => {
  try {
    const { box } = params;

    // MoEngage
    moengageTrackRemoveFromWishlist({ box });
    // Matomo
    matomoTrackRemoveFromWishlist({ box });

    debugEvent({ event: 'RemoveFromWishlist', params });
  } catch (e) {}
};

interface GatewayTrackAddToWaitlistParams {
  box: ProductBox;
}
export const gatewayTrackAddToWaitlist = async (params: GatewayTrackAddToWaitlistParams) => {
  try {
    const { box } = params;

    // MoEngage
    moengageTrackAddToWaitlist({ box });
    // Matomo
    matomoTrackAddToWaitlist({ box });

    debugEvent({ event: 'AddToWaitlist', params });
  } catch (e) {}
};

interface GatewayTrackRemoveFromWaitlistParams {
  box: ProductBox;
}
export const gatewayTrackRemoveFromWaitlist = async (params: GatewayTrackRemoveFromWaitlistParams) => {
  try {
    const { box } = params;

    // MoEngage
    moengageTrackRemoveFromWaitlist({ box });
    // Matomo
    matomoTrackRemoveFromWaitlist({ box });

    debugEvent({ event: 'RemoveFromWaitlist', params });
  } catch (e) {}
};

interface GatewayTrackAddToCartParams {
  box: ProductBox;
  quantity: number;
  purchaseType?: PurchaseTypeType;
  source?: ViewedSourceType;
  sourceId?: string;
  cartId?: number;
  totalValue?: number;
  categories?: Array<BoxCategory>;
}
export const gatewayTrackAddToCart = async (params: GatewayTrackAddToCartParams) => {
  try {
    const { box, quantity, purchaseType, source: _source, sourceId: _sourceId, categories } = params;

    // Fetch source from localStorage set by viewContentFromList, if source is not provided
    let source = _source;
    let sourceId = _sourceId;

    if (!source) {
      const sourceRaw = localStorage.getItem(storageKey.TRACKING_PRODUCT_VIEW_SOURCE);
      localStorage.removeItem(storageKey.TRACKING_PRODUCT_VIEW_SOURCE);
      const sourceObj = sourceRaw ? JSON.parse(sourceRaw) : null;

      if (sourceObj?.boxId === box?.lixibox_id) {
        source = sourceObj?.source;

        if (!sourceId) {
          sourceId = sourceObj?.sourceId;
        }
      }
    }

    const boxId = box?.lixibox_id || '',
      slug = box?.slug || '',
      price = box?.price || 0,
      category = box?.tracking?.category_key || '';

    // Logic processor
    source && CartItemSourceManager.add({ boxId: box?.id, quantity, source, sourceId });

    // Facebook pixel
    trackingFacebookPixel('AddToCart', {
      content_name: slug,
      content_category: category,
      content_ids: boxId,
      content_type: ContentType.PRODUCT,
      value: price,
      currency: Currency.DEFAULT
    });
    // Tiktok pixel
    trackingTiktokPixel('AddToCart', {
      content_type: ContentType.PRODUCT,
      content_id: boxId,
      quantity,
      price: price,
      value: price,
      currency: Currency.DEFAULT
    });
    // Google analytics
    gaTrackAddToCart({ box, quantity });
    // MoEngage
    moengageTrackAddToCart({ box, quantity });
    // Matomo & Branch.IO
    switch (purchaseType) {
      case PURCHASE_TYPE.NORMAL:
        matomoTrackAddToCart({ box, quantity, source, sourceId, categories });
        branchIoTrackAddToCart({ box, quantity, source, sourceId, categories });
        break;
      case PURCHASE_TYPE.ADDON:
        matomoTrackAddToCartAddOn({ box, quantity });
        branchIoTrackAddToCartAddOn({ box, quantity });
        break;
      case PURCHASE_TYPE.REDEEM:
        matomoTrackAddToCartRedeem({ box, quantity });
        branchIoTrackAddToCartRedeem({ box, quantity });
        break;
      case PURCHASE_TYPE.GIFT:
        matomoTrackAddToCartGift({ box, quantity });
        branchIoTrackAddToCartGift({ box, quantity });
        break;
      case PURCHASE_TYPE.SAMPLE:
        matomoTrackAddToCartSample({ box, quantity });
        branchIoTrackAddToCartSample({ box, quantity });
        break;
      default:
        break;
    }

    debugEvent({ event: 'AddToCart', params: Object.assign({}, params, { source, sourceId }) });
  } catch (e) {}
};

interface GatewayTrackViewCartParams {
  cart: Cart;
}
export const gatewayTrackViewCart = async (params: GatewayTrackViewCartParams) => {
  try {
    const { cart } = params;

    // MoEngage
    moengageTrackViewCart({ cartDetail: cart });
    // Matomo
    matomoTrackViewCart({ cart });
    // Branch.IO
    branchIoTrackViewCart({ cart });

    debugEvent({ event: 'ViewCart', params });
  } catch (e) {}
};

export const gatewayTrackExitCart = async () => {
  try {
    // Matomo
    matomoTrackExitCart();
    // Branch.IO
    branchIoTrackExitCart();

    debugEvent({ event: 'ExitCart' });
  } catch (e) {}
};

interface GatewayTrackRemoveFromCartParams {
  cartItem: CartItem;
  quantity: number;
}
export const gatewayTrackRemoveFromCart = async (params: GatewayTrackRemoveFromCartParams) => {
  try {
    const { cartItem, quantity } = params;

    // Logic processor
    CartItemSourceManager.remove({ boxId: cartItem?.box?.id, quantity });

    // MoEngage
    moengageTrackRemoveFromCart({ box: cartItem?.box, quantity });
    // Matomo
    matomoTrackRemoveFromCart({ cartItem, quantity });

    debugEvent({ event: 'RemoveFromCart', params });
  } catch (e) {}
};

interface GatewayTrackInitiatedCheckoutParams {
  cart: Cart;
  user: User;
}
export const gatewayTrackInitiatedCheckout = async (params: GatewayTrackInitiatedCheckoutParams) => {
  try {
    const { cart, user } = params;

    // Set user id
    user?.uuid && localStorage.setItem(storageKey.TRACKING_GATEWAY_UUID, user?.uuid);

    // MoEngage
    moengageTrackBeginCheckout({ cartDetail: cart });
    // Matomo
    matomoTrackInitiatedCheckout({ cart });
    // Branch.IO
    branchIoTrackInitiatedCheckout({ cart, user });

    debugEvent({ event: 'InitiatedCheckout', params });
  } catch (e) {}
};

interface GatewayTrackPurchasedParams {
  order: Order;
  user: User;
}
export const gatewayTrackPurchased = async (params: GatewayTrackPurchasedParams) => {
  try {
    const { order, user } = params;

    // Set user id
    user?.uuid && localStorage.setItem(storageKey.TRACKING_GATEWAY_UUID, user?.uuid);

    // MoEngage
    moengageTrackPurchase({ order });
    // Matomo
    matomoTrackPurchased({ order });
    // Branch.IO
    branchIoTrackPurchased({ order, user });

    // Track purchased from sources
    const sources = CartItemSourceManager.get();
    CartItemSourceManager.clear();
    gatewayTrackPurchasedFromSources({ order, sources });

    debugEvent({ event: 'Purchased', params });
  } catch (e) {}
};

interface GatewayTrackPurchasedFromSourcesParams {
  order: Order;
  sources: Array<CartItemSource>;
}
export const gatewayTrackPurchasedFromSources = async (params: GatewayTrackPurchasedFromSourcesParams) => {
  try {
    const { order, sources } = params;

    // Matomo
    matomoTrackPurchasedFromSources({ order, sources });

    debugEvent({ event: 'PurchasedFromSources', params });
  } catch (e) {}
};

interface GatewayTrackCancelOrderParams {
  order: Order;
}
export const gatewayTrackCancelOrder = async (params: GatewayTrackCancelOrderParams) => {
  try {
    const { order } = params;

    // MoEngage
    moengageTrackCancelOrder({ order });
    // Matomo
    matomoTrackCancelOrder({ order });
    // Branch.IO
    branchIoTrackCancelOrder({ order });

    debugEvent({ event: 'CancelOrder', params });
  } catch (e) {}
};

interface GatewayTrackSearchParams {
  keyword: string;
  source?: SearchSourceType;
  sourceId?: string;
  suggestedKeywordType?: string;
}
export const gatewayTrackSearch = async (params: GatewayTrackSearchParams) => {
  try {
    const { keyword, source, sourceId, suggestedKeywordType } = params;

    // MoEngage
    moengageTrackSearch({ searchTerm: keyword });
    // Matomo
    matomoTrackSearch({ keyword, source, sourceId, suggestedKeywordType });

    debugEvent({ event: 'Search', params });
  } catch (e) {}
};

export interface GatewayTrackViewedSearchPanel {
  keyword: string;
}
export const gatewayTrackViewedSearchPanel = async (params: GatewayTrackViewedSearchPanel) => {
  try {
    const { keyword } = params;

    // Matomo
    matomoTrackViewedSearchPanel({ keyword });

    debugEvent({ event: 'ViewedSearchPanel', params });
  } catch (e) {}
};

interface GatewayTrackSearchAutoCompleteParams {
  keyword: string;
  source: SearchSourceType;
  sourceId?: string;
  suggestedKeywordType?: string;
}
export const gatewayTrackSearchAutoComplete = async (params: GatewayTrackSearchAutoCompleteParams) => {
  try {
    const { keyword, source, sourceId, suggestedKeywordType } = params;

    // Matomo
    matomoTrackSearchAutoComplete({ keyword, source, sourceId, suggestedKeywordType });

    debugEvent({ event: 'SearchAutoComplete', params });
  } catch (e) {}
};

interface GatewayTrackViewSearchResultsParams {
  keyword: string;
  version: SearchVersionType;
  source: SearchSourceType;
}
export const gatewayTrackViewSearchResults = async (params: GatewayTrackViewSearchResultsParams) => {
  try {
    const { keyword, version, source } = params;

    // Matomo
    matomoTrackViewSearchResults({ keyword, version, source });
    // Branch.IO
    branchIoTrackViewSearchResults({ keyword, version, source });

    debugEvent({ event: 'ViewSearchResults', params });
  } catch (e) {}
};

interface GatewayTrackLeaveSearchImmediatelyParams {
  keyword: string;
  version: SearchVersionType;
}
/**
 * Triggered when user navigates to another page without executing any of the following action
 * - view a box detail
 * - view a magazine detail
 * - pagination button click
 * - sort
 * - filter
 */
export const gatewayTrackLeaveSearchImmediately = async (params: GatewayTrackLeaveSearchImmediatelyParams) => {
  try {
    const { keyword, version } = params;

    // Matomo
    matomoTrackLeaveSearchImmediately({ keyword, version });

    debugEvent({ event: 'LeaveSearchImmediately', params });
  } catch (e) {}
};

type GatewayTrackViewSearchItemParams = {
  type: ContentTypeType;
  box?: ProductBox;
  magazine?: Magazine;
  keyword: string;
  version: SearchVersionType;
  /**
   * @deprecated Unused. Retained to sync with mobile app.
   */
  isFirstItemView?: boolean;
};
export const gatewayTrackViewSearchItem = async (params: GatewayTrackViewSearchItemParams) => {
  try {
    const { type, box, magazine, keyword, version, isFirstItemView } = params;

    // Matomo
    matomoTrackViewSearchItem({ type, box, magazine, keyword, version, isFirstItemView });

    debugEvent({ event: 'ViewSearchItem', params });
  } catch (e) {}
};

// NOTE: Discussed and skipped. Remove after matomo integration is live and stable.
interface GatewayTrackViewFirstSearchItemIndexParams {
  box: ProductBox;
  keyword: string;
  version: SearchVersionType;
  position: number;
}
export const gatewayTrackViewFirstSearchItemIndex = async (params: GatewayTrackViewFirstSearchItemIndexParams) => {
  try {
    const { box, keyword, version, position } = params;

    // Matomo
    matomoTrackViewFirstSearchItemIndex({ box, keyword, version, position });

    debugEvent({ event: 'ViewFirstSearchItemIndex', params });
  } catch (e) {}
};

interface GatewayTrackSigninParams {
  user: User;
  method?: AuthMethodType;
}
export const gatewayTrackSignin = async (params: GatewayTrackSigninParams) => {
  try {
    const { user, method } = params;

    // Set user id
    user?.uuid && localStorage.setItem(storageKey.TRACKING_GATEWAY_UUID, user?.uuid);

    // MoEngage
    moengageTrackSignin(user, method);
    // Matomo
    matomoTrackSignin({ user, method });
    // Branch.IO
    branchIoTrackSignin({ user, method });

    debugEvent({ event: 'Signin', params });
  } catch (e) {}
};

interface GatewayTrackSignupParams {
  user: User;
  method?: AuthMethodType;
}
export const gatewayTrackSignup = async (params: GatewayTrackSignupParams) => {
  try {
    const { user, method } = params;

    // Set user id
    user?.uuid && localStorage.setItem(storageKey.TRACKING_GATEWAY_UUID, user?.uuid);

    // MoEngage
    moengageTrackSignup(user, method);
    // Matomo
    matomoTrackSignup({ user, method });
    // Branch.IO
    branchIoTrackSignup({ user, method });

    debugEvent({ event: 'Signup', params });
  } catch (e) {}
};

interface GatewayTrackSignoutParams {
  user: User;
}
export const gatewayTrackSignout = async (params: GatewayTrackSignoutParams) => {
  try {
    const { user } = params;

    // MoEngage
    moengageTrackSignout(user);
    // Matomo
    matomoTrackSignout({ user });
    // Branch.IO
    branchIoTrackSignout({ user });

    // Remove user id
    localStorage.removeItem(storageKey.TRACKING_GATEWAY_UUID);

    debugEvent({ event: 'Signout', params });
  } catch (e) {}
};

interface GatewayTrackUpdateProfileParams {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: number;
}
export const gatewayTrackUpdateProfile = async (params: GatewayTrackUpdateProfileParams) => {
  try {
    const { birthday } = params;

    // MoEngage
    moengageUpdateProfile(params);
    // Matomo
    matomoTrackUpdateProfile({ birthday });

    debugEvent({ event: 'UpdateProfile', params });
  } catch (e) {}
};

export const gatewayTrackViewHome = async () => {
  try {
    // Matomo
    matomoTrackViewHome();
    // Branch.IO
    branchIoTrackViewHome();

    debugEvent({ event: 'ViewHome' });
  } catch (e) {}
};

interface GatewayTrackShareParams {
  id: string | number;
  type: 'product' | 'magazine';
  name: string;
  provider?: string; // TODO: Convert to enum
}
export const gatewayTrackShare = async (params: GatewayTrackShareParams) => {
  try {
    const { id, type, name, provider } = params;

    // MoEngage
    moengageTrackShare({ id, type, name, provider });
    // Matomo
    matomoTrackShare({ id, type, name, provider });
    // Branch.IO
    branchIoTrackShare({ id, type, name, provider });

    debugEvent({ event: 'Share', params });
  } catch (e) {}
};

export const gatewayTrackUnboxingComplete = async () => {
  try {
    // Matomo
    matomoTrackUnboxingComplete();
    // Branch.IO
    branchIoTrackUnboxingComplete();

    debugEvent({ event: 'UnboxingComplete' });
  } catch (e) {}
};

interface GatewayTrackViewReferralCodeParams {
  code: string;
}
export const gatewayTrackViewReferralCode = async (params: GatewayTrackViewReferralCodeParams) => {
  try {
    const { code } = params;

    // Matomo
    matomoTrackViewReferralCode({ code });

    debugEvent({ event: 'ViewReferralCode', params });
  } catch (e) {}
};
