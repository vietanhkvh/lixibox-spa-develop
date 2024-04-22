import { BoxCategory, ProductBox, ProductBoxBadgeItemResponse } from 'types/api/shop';
import { Theme } from 'types/api/theme';
import { Brand } from 'types/api/brand';
import { ActivityFeed } from 'types/api/activity-feed';
import { Magazine } from 'types/api/magazine';
import { Order } from 'types/api/order';
import { User } from 'types/api/auth';
import { Cart, CartItem, DiscountCode } from 'types/api/cart';
import { Scheme } from 'types/api/gwp';
import { AuthMethodType } from 'constants/application/auth';
import { SearchSourceType, SearchVersionType } from 'constants/application/search.type';
import { ContentType, ContentTypeType, ViewedSourceType } from 'tracking/constants/index';
import { CartItemSource } from 'utils/tracking/cart-item-source-manager';
import { ViewedSource } from 'tracking/constants';
import {
  MatomoLikeStatus,
  MatomoLoggerComponent,
  MatomoLoggerContentType,
  MatomoLoggerDimension,
  MatomoLoggerEventName
} from './constant';
import {
  matomoGetAddOnDimensions,
  matomoGetBoxDimensions,
  matomoGetCartDimensions,
  matomoGetCartItemDimensions,
  matomoGetGiftDimensions,
  matomoGetMagazineDimensions,
  matomoGetOrderDimensions,
  matomoGetRedeemDimensions,
  matomoGetSampleDimensions,
  matomoGetSourceDimension,
  matomoTrackEventWithDimension
} from './utils';

/**
 * WARNING:
 *
 * Avoid using "Matomo custom variables" as the will be deprecated in the future
 */

/**
 * matomoTrackPageView - Track page view
 */
export const matomoTrackPageView = () => {
  try {
    if (window._paq) {
      window._paq.push(['deleteCustomVariables', 'page']);
      // Example: Delete any page scoped dimensions as follows:
      // window._paq.push(['deleteCustomDimension', 1]);
      window._paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
      /**
       * TODO:
       *   - Need to restructure the way we update page title. Initial page title is not correct.
       *   - Currently, Matomo only sets page title if it's called before a `trackPageView` event.
       */
      // window._paq.push(['setDocumentTitle', window.document.title]);
      window._paq.push(['trackPageView']);
    }
  } catch (e) {}
};

export interface MatomoTrackViewContentParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
}
export const matomoTrackViewContent = ({ box, categories }: MatomoTrackViewContentParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.BOX,
        value: box?.price || 0,
        dimension: matomoGetBoxDimensions({ box, categories })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewBadgeParams {
  badge: ProductBoxBadgeItemResponse;
  box: ProductBox;
  source?: ViewedSourceType;
  sourceId?: string;
}
export const matomoTrackViewBadge = ({ badge, box, source, sourceId }: MatomoTrackViewBadgeParams) => {
  try {
    if (window._paq && badge && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.BADGE,
        dimension: Object.assign(
          {},
          {
            [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.BADGE,
            [MatomoLoggerDimension.CATEGORY]: badge.kind || '',
            [MatomoLoggerDimension.D27]: badge.type || '', // SUBCATEGORY
            [MatomoLoggerDimension.CONTENT_ID]: badge?.slug || '',
            [MatomoLoggerDimension.CONTENT_NAME]: badge?.content || '',
            [MatomoLoggerDimension.D28]: box?.lixibox_id || '', // PRODUCT_ID
            [MatomoLoggerDimension.D29]: box?.slug || '' // PRODUCT_SLUG
          },
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewContentFromSourceParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
  source: ViewedSourceType;
  sourceId: string;
}
export const matomoTrackViewContentFromSource = ({
  box,
  categories,
  source,
  sourceId
}: MatomoTrackViewContentFromSourceParams) => {
  try {
    if (window._paq && box && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT_FROM_SOURCE,
        name: source,
        dimension: Object.assign(
          {},
          matomoGetBoxDimensions({ box, categories }),
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewContentFromListParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
  source: ViewedSourceType;
  sourceId?: string;
  index: number;
}
export const matomoTrackViewContentFromList = ({
  box,
  categories,
  source,
  sourceId,
  index
}: MatomoTrackViewContentFromListParams) => {
  try {
    if (window._paq && box && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT_FROM_LIST,
        name: source,
        value: index || 0,
        dimension: Object.assign(
          {},
          matomoGetBoxDimensions({ box, categories }),
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedBoxFeedbacksParams {
  box: ProductBox;
}
export const matomoTrackViewedBoxFeedbacks = ({ box }: MatomoTrackViewedBoxFeedbacksParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_COMPONENT,
        name: MatomoLoggerComponent.BOX_FEEDBACKS,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackReactBoxFeedbackParams {
  box: ProductBox;
  liked: boolean;
}
export const matomoTrackReactBoxFeedback = ({ box, liked }: MatomoTrackReactBoxFeedbackParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.REACT_BOX_FEEDBACK,
        name: liked ? MatomoLikeStatus.LIKE : MatomoLikeStatus.UNLIKE,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackScrollParams {
  source: string;
  /**
   * Range: 0 - 100
   */
  scrolledPercentage: number;
}
export const matomoTrackScroll = ({ source, scrolledPercentage }: MatomoTrackScrollParams) => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.SCROLL,
        name: source || '',
        value: scrolledPercentage || 0,
        dimension: {
          [MatomoLoggerDimension.SCROLL_PERCENTAGE]: scrolledPercentage || 0
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewAllItemsParams {
  source: ViewedSourceType;
  sourceId?: string;
}
export const matomoTrackViewAllItems = ({ source, sourceId }: MatomoTrackViewAllItemsParams) => {
  try {
    if (window._paq && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_ALL_ITEMS,
        name: source,
        dimension: Object.assign(
          {},
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewItemListParams {
  source: ViewedSourceType;
  sourceId?: string;
  id?: string;
  name?: string;
}
export const matomoTrackViewItemList = ({
  source,
  sourceId = '',
  id = '',
  name = ''
}: MatomoTrackViewItemListParams) => {
  try {
    if (window._paq && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT_LIST,
        name: source,
        dimension: {
          [MatomoLoggerDimension.CONTENT_TYPE]: source,
          [MatomoLoggerDimension.CONTENT_ID]: id,
          [MatomoLoggerDimension.CONTENT_NAME]: name,
          [MatomoLoggerDimension.SOURCE]: source,
          [MatomoLoggerDimension.SOURCE_ID]: sourceId
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewCategoryParams {
  category: BoxCategory;
}
export const matomoTrackViewCategory = ({ category }: MatomoTrackViewCategoryParams) => {
  try {
    if (window._paq && category) {
      matomoTrackViewItemList({
        source: ViewedSource.CATEGORY,
        id: category.slug || '',
        name: category.name || ''
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewThemeParams {
  theme: Theme;
}
export const matomoTrackViewTheme = ({ theme }: MatomoTrackViewThemeParams) => {
  try {
    if (window._paq && theme) {
      matomoTrackViewItemList({
        source: ViewedSource.THEME,
        id: theme.slug || '',
        name: theme.name || ''
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewBrandParams {
  brand: Brand;
}
export const matomoTrackViewBrand = ({ brand }: MatomoTrackViewBrandParams) => {
  try {
    if (window._paq && brand) {
      matomoTrackViewItemList({
        source: ViewedSource.BRAND,
        id: brand.slug || '',
        name: brand.name || ''
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewDiscountCodeParams {
  discountCode: DiscountCode;
}
export const matomoTrackViewDiscountCode = ({ discountCode }: MatomoTrackViewDiscountCodeParams) => {
  try {
    if (window._paq && discountCode) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.DISCOUNT_CODE,
        dimension: {
          [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.DISCOUNT_CODE,
          [MatomoLoggerDimension.CONTENT_ID]: discountCode.code || ''
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedFeedParams {
  feed: ActivityFeed;
}
export const matomoTrackViewedFeed = ({ feed }: MatomoTrackViewedFeedParams) => {
  try {
    if (window._paq && feed) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.FEED,
        dimension: {
          [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.FEED,
          [MatomoLoggerDimension.CONTENT_ID]: feed.id ? String(feed.id) : ''
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedMagazineParams {
  magazine: Magazine;
}
export const matomoTrackViewedMagazine = ({ magazine }: MatomoTrackViewedMagazineParams) => {
  try {
    if (window._paq && magazine) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.MAGAZINE,
        dimension: matomoGetMagazineDimensions({ magazine })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedGwpSchemeParams {
  scheme: Scheme;
}
export const matomoTrackViewedGwpScheme = ({ scheme }: MatomoTrackViewedGwpSchemeParams) => {
  try {
    if (window._paq && scheme) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT,
        name: MatomoLoggerContentType.GWP,
        dimension: {
          [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.GWP,
          [MatomoLoggerDimension.CONTENT_ID]: scheme?.slug || '',
          [MatomoLoggerDimension.CONTENT_NAME]: scheme?.name || ''
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedMagazineFromListParams {
  source: ViewedSourceType;
  sourceId: string;
  index: number;
  magazine: Magazine;
}
export const matomoTrackViewedMagazineFromList = ({
  source,
  sourceId,
  index,
  magazine
}: MatomoTrackViewedMagazineFromListParams) => {
  try {
    if (window._paq && magazine) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CONTENT_FROM_LIST,
        name: source,
        value: index || 0,
        dimension: Object.assign(
          {},
          matomoGetMagazineDimensions({ magazine }),
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackCompleteMagazineParams {
  magazine: Magazine;
  /**
   * Range: 0 - 100
   */
  scrollPercentage: number;
}
export const matomoTrackCompleteMagazine = ({ magazine, scrollPercentage }: MatomoTrackCompleteMagazineParams) => {
  try {
    if (window._paq && magazine) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.COMPLETE_MAGAZINE,
        name: MatomoLoggerContentType.MAGAZINE,
        value: scrollPercentage,
        dimension: Object.assign({}, matomoGetMagazineDimensions({ magazine }), {
          [MatomoLoggerDimension.SCROLL_PERCENTAGE]: String(scrollPercentage || 0)
        })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackRatedParams {
  box: ProductBox;
  rating: number;
}
export const matomoTrackRated = ({ box, rating }: MatomoTrackRatedParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.RATE_PRODUCT,
        name: MatomoLoggerContentType.BOX,
        value: rating,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToWishlistParams {
  box: ProductBox;
}
export const matomoTrackAddToWishlist = ({ box }: MatomoTrackAddToWishlistParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_WISHLIST,
        value: box?.price || 0,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackRemoveFromWishlistParams {
  box: ProductBox;
}
export const matomoTrackRemoveFromWishlist = ({ box }: MatomoTrackRemoveFromWishlistParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.REMOVE_FROM_WISHLIST,
        value: box?.price || 0,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToWaitlistParams {
  box: ProductBox;
}
export const matomoTrackAddToWaitlist = ({ box }: MatomoTrackAddToWaitlistParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_WAIT_LIST,
        value: box?.price || 0,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackRemoveFromWaitlistParams {
  box: ProductBox;
}
export const matomoTrackRemoveFromWaitlist = ({ box }: MatomoTrackRemoveFromWaitlistParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.REMOVE_FROM_WAIT_LIST,
        value: box?.price || 0,
        dimension: matomoGetBoxDimensions({ box })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToCartParams {
  box: ProductBox;
  quantity: number;
  source?: ViewedSourceType;
  sourceId?: string;
  categories?: Array<BoxCategory>;
}
export const matomoTrackAddToCart = ({
  box,
  quantity,
  source,
  sourceId = '',
  categories
}: MatomoTrackAddToCartParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_CART,
        name: source,
        value: box?.price || 0,
        dimension: Object.assign(
          {},
          matomoGetBoxDimensions({ box, categories }),
          {
            [MatomoLoggerDimension.QUANTITY]: String(quantity || 0)
          },
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToCartAddOnParams extends MatomoTrackAddToCartParams {
  box: any;
}
export const matomoTrackAddToCartAddOn = ({ box, quantity }: MatomoTrackAddToCartAddOnParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_CART,
        name: MatomoLoggerContentType.ADD_ON,
        value: box.add_on_price || box.price || 0,
        dimension: Object.assign(
          {},
          matomoGetAddOnDimensions({ box }),
          {
            [MatomoLoggerDimension.QUANTITY]: String(quantity || 0)
          },
          matomoGetSourceDimension({ source: ViewedSource.ADD_ON })
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToCartRedeemParams extends MatomoTrackAddToCartParams {
  box: any;
}
export const matomoTrackAddToCartRedeem = ({ box, quantity }: MatomoTrackAddToCartRedeemParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_CART,
        name: MatomoLoggerContentType.REDEEM,
        value: box.coins_price || 0,
        dimension: Object.assign(
          {},
          matomoGetRedeemDimensions({ box }),
          {
            [MatomoLoggerDimension.QUANTITY]: String(quantity || 0)
          },
          matomoGetSourceDimension({ source: ViewedSource.REDEEM })
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToCartGiftParams extends MatomoTrackAddToCartParams {
  box: any;
}
export const matomoTrackAddToCartGift = ({ box, quantity }: MatomoTrackAddToCartGiftParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_CART,
        name: MatomoLoggerContentType.GIFT,
        dimension: Object.assign(
          {},
          matomoGetGiftDimensions({ box }),
          {
            [MatomoLoggerDimension.QUANTITY]: String(quantity || 0)
          },
          matomoGetSourceDimension({ source: ViewedSource.GIFT })
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackAddToCartSampleParams extends MatomoTrackAddToCartParams {
  box: any;
}
export const matomoTrackAddToCartSample = ({ box, quantity }: MatomoTrackAddToCartSampleParams) => {
  try {
    if (window._paq && box) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.ADD_TO_CART,
        name: MatomoLoggerContentType.SAMPLE,
        dimension: Object.assign(
          {},
          matomoGetSampleDimensions({ box }),
          {
            [MatomoLoggerDimension.QUANTITY]: String(quantity || 0)
          },
          matomoGetSourceDimension({ source: ViewedSource.SAMPLE })
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewCartParams {
  cart: Cart;
}
export const matomoTrackViewCart = ({ cart }: MatomoTrackViewCartParams) => {
  try {
    if (window._paq && cart) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_CART,
        value: cart.total_price || 0,
        dimension: matomoGetCartDimensions({ cart })
      });
    }
  } catch (e) {}
};

export const matomoTrackExitCart = () => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.EXIT_CART
      });
    }
  } catch (e) {}
};

export interface MatomoTrackRemoveFromCartParams {
  cartItem: CartItem;
  quantity: number;
}
export const matomoTrackRemoveFromCart = ({ cartItem, quantity = 1 }: MatomoTrackRemoveFromCartParams) => {
  try {
    if (window._paq && cartItem) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.REMOVE_FROM_CART,
        value: (cartItem.price || 0) * quantity,
        dimension: matomoGetCartItemDimensions({ cartItem, quantity })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackInitiatedCheckoutParams {
  cart: Cart;
}
export const matomoTrackInitiatedCheckout = ({ cart }: MatomoTrackInitiatedCheckoutParams) => {
  try {
    if (window._paq && cart) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.BEGIN_CHECKOUT,
        value: cart.total_price || 0,
        dimension: matomoGetCartDimensions({ cart })
      });
    }
  } catch (e) {}
};

export interface MatomoTrackPurchasedParams {
  order: Order;
}
export const matomoTrackPurchased = ({ order }: MatomoTrackPurchasedParams) => {
  try {
    if (window._paq && order && Array.isArray(order.order_boxes)) {
      // Track order items
      order.order_boxes.forEach(({ box, price, quantity }) => {
        window._paq.push([
          // Event name
          'addEcommerceItem',
          // productSKU (Required) – String – A unique product identifier.
          box.lixibox_id || '',
          // productName (Recommended) – String – The name of the product.
          box.name || '',
          // productCategory (Optional) – String/Array – This is either the category name passed as a string, or up to five unique categories as an array, e.g.
          // ["Books", "New Releases", "Technology"]
          box.tracking?.category_key || '',
          // price (Optional) – Integer/Float – The cost of the item.
          price || 0,
          // quantity (Optional) – Integer – How many of this item are in the order. Defaults to 1.
          quantity || 1
        ]);
      });

      // Track the order itself
      window._paq.push([
        'trackEcommerceOrder',
        // orderId (Required) – String – A unique reference number to avoid duplication.
        order.number || '',
        // grandTotal (Required) – Integer/Float – The order total revenue including tax & shipping with any discounts subtracted.
        order.total_price || 0,
        // subTotal (Optional) – Integer/Float – The order total excluding shipping.
        order.subtotal_price || 0,
        // tax (Optional) – Integer/Float -The amount of tax charged.
        0,
        // shipping (Optional) – Integer/Float – The amount charged for shipping.
        order.shipping_price || 0,
        // discount (Optional) – Integer/Float/Boolean – Discount offered? Default to false. Otherwise, you should include a numeric value.
        (order.discount_price || 0) + (order.promotions_price || 0)
      ]);
    }
  } catch (e) {}
};

interface MatomoTrackPurchasedFromSourcesParams {
  order: Order;
  sources: Array<CartItemSource>;
}
export const matomoTrackPurchasedFromSources = ({ order, sources }: MatomoTrackPurchasedFromSourcesParams) => {
  try {
    if (window._paq && order && sources && Array.isArray(order.order_boxes)) {
      sources.forEach((source) => {
        const quantity = source.quantity || 0;
        const orderBox = order.order_boxes.find((orderBox) => orderBox?.box?.id === source.boxId);

        const price = (orderBox?.price || 0) * quantity;

        matomoTrackEventWithDimension({
          action: MatomoLoggerEventName.PURCHASE_ITEM,
          name: source.source,
          value: price,
          dimension: Object.assign({}, orderBox?.box && matomoGetBoxDimensions({ box: orderBox.box }), {
            [MatomoLoggerDimension.ORDER_NUMBER]: order.number || '',
            [MatomoLoggerDimension.QUANTITY]: String(quantity || orderBox.quantity || 1),
            [MatomoLoggerDimension.TOTAL_PRICE]: String(order.total_price || 0),
            [MatomoLoggerDimension.SOURCE]: source.source || '',
            [MatomoLoggerDimension.SOURCE_ID]: source.sourceId || ''
          })
        });
      });
    }
  } catch (e) {}
};

export interface MatomoTrackCancelOrderParams {
  order: Order;
}
export const matomoTrackCancelOrder = ({ order }: MatomoTrackCancelOrderParams) => {
  try {
    if (window._paq && order) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.CANCEL_ORDER,
        value: order.total_price || 0,
        dimension: matomoGetOrderDimensions({ order })
      });
    }
  } catch (e) {}
};

interface MatomoTrackSearchParams {
  keyword: string;
  source?: SearchSourceType;
  sourceId?: string;
  suggestedKeywordType?: string;
}
/**
 * NOTE: We're using both Matomo native search event and custom event, since native event has built-in search dashboard
 * but doesn't support custom dimensions. On the other hand, custom event supports custom dimensions support
 */
export const matomoTrackSearch = ({
  keyword: _keyword,
  source,
  sourceId,
  suggestedKeywordType
}: MatomoTrackSearchParams) => {
  try {
    if (window._paq) {
      const keyword = _keyword || '';

      // Matomo native search event
      window._paq.push([
        // Event name
        'trackSiteSearch',
        // Search keyword
        keyword,
        // Search category selected in the search engine. Set to false if not required.
        false,
        // Number of results on the Search results page. Zero indicates a 'No Result Search Keyword'. Set to false if not known.
        false,
        // NOTE: Dimensions can be defined here as per Matomo documentation. But, these are not stored in the database.
        //       Possibly an issue on Matomo side.
        Object.assign(
          {},
          { [MatomoLoggerDimension.SEARCH_TERM]: keyword },
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId },
          suggestedKeywordType && { [MatomoLoggerDimension.SUGGESTED_KEYWORD_TYPE]: suggestedKeywordType }
        )
      ]);
      // Custom event
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.SEARCH,
        dimension: Object.assign(
          {},
          { [MatomoLoggerDimension.SEARCH_TERM]: keyword },
          source && { [MatomoLoggerDimension.SOURCE]: source },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId },
          suggestedKeywordType && { [MatomoLoggerDimension.SUGGESTED_KEYWORD_TYPE]: suggestedKeywordType }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewedSearchPanel {
  keyword: string;
}
export const matomoTrackViewedSearchPanel = ({ keyword }: MatomoTrackViewedSearchPanel) => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_COMPONENT,
        name: MatomoLoggerComponent.SEARCH_PANEL,
        dimension: Object.assign({}, { [MatomoLoggerDimension.SEARCH_TERM]: keyword || '' })
      });
    }
  } catch (e) {}
};

interface MatomoTrackSearchAutoCompleteParams {
  keyword: string;
  source: SearchSourceType;
  sourceId?: string;
  suggestedKeywordType?: string;
}
export const matomoTrackSearchAutoComplete = ({
  keyword,
  source,
  sourceId,
  suggestedKeywordType
}: MatomoTrackSearchAutoCompleteParams) => {
  try {
    if (window._paq && keyword && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.SEARCH_AUTO_COMPLETE,
        dimension: Object.assign(
          {},
          {
            [MatomoLoggerDimension.SEARCH_TERM]: keyword,
            [MatomoLoggerDimension.SOURCE]: source
          },
          sourceId && { [MatomoLoggerDimension.SOURCE_ID]: sourceId },
          suggestedKeywordType && { [MatomoLoggerDimension.SUGGESTED_KEYWORD_TYPE]: suggestedKeywordType }
        )
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewSearchResultsParams {
  keyword: string;
  version: SearchVersionType;
  source: SearchSourceType;
}
export const matomoTrackViewSearchResults = ({ keyword, version, source }: MatomoTrackViewSearchResultsParams) => {
  try {
    if (window._paq && keyword && version && source) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_SEARCH_RESULTS,
        dimension: {
          [MatomoLoggerDimension.SEARCH_TERM]: keyword || '',
          [MatomoLoggerDimension.SEARCH_VERSION]: version,
          [MatomoLoggerDimension.SOURCE]: source
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackLeaveSearchImmediatelyParams {
  keyword: string;
  version: SearchVersionType;
}
export const matomoTrackLeaveSearchImmediately = ({ keyword, version }: MatomoTrackLeaveSearchImmediatelyParams) => {
  try {
    if (window._paq && keyword && version) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.LEAVE_SEARCH_IMMEDIATELY,
        dimension: {
          [MatomoLoggerDimension.SEARCH_TERM]: keyword,
          [MatomoLoggerDimension.SEARCH_VERSION]: version
        }
      });
    }
  } catch (e) {}
};

export interface MatomoTrackViewSearchItemParams {
  type: ContentTypeType;
  box?: ProductBox;
  magazine?: Magazine;
  keyword: string;
  version: SearchVersionType;
  isFirstItemView: boolean;
}
export const matomoTrackViewSearchItem = ({
  type,
  box,
  magazine,
  keyword,
  version,
  isFirstItemView
}: MatomoTrackViewSearchItemParams) => {
  try {
    if (window._paq && box && keyword && version) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_SEARCH_ITEM,
        dimension: Object.assign(
          {},
          type === ContentType.PRODUCT ? matomoGetBoxDimensions({ box }) : matomoGetMagazineDimensions({ magazine }),
          {
            [MatomoLoggerDimension.SEARCH_TERM]: keyword,
            [MatomoLoggerDimension.SEARCH_VERSION]: version,
            [MatomoLoggerDimension.IS_RESULT_FIRST_ITEM_VIEW]: isFirstItemView ? '1' : '0'
          }
        )
      });
    }
  } catch (e) {}
};

interface MatomoTrackViewFirstSearchItemIndexParams {
  box: ProductBox;
  keyword: string;
  version: SearchVersionType;
  position: number;
}
export const matomoTrackViewFirstSearchItemIndex = ({
  box,
  keyword,
  version,
  position
}: MatomoTrackViewFirstSearchItemIndexParams) => {
  try {
    if (window._paq && box && keyword && version) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_FIRST_SEARCH_ITEM_INDEX,
        value: position || 0,
        dimension: Object.assign({}, matomoGetBoxDimensions({ box }), {
          [MatomoLoggerDimension.SEARCH_TERM]: keyword,
          [MatomoLoggerDimension.SEARCH_VERSION]: version
        })
      });
    }
  } catch (e) {}
};

interface MatomoTrackLoginParams {
  user: User;
  method?: AuthMethodType;
}
export const matomoTrackSignin = ({ user, method }: MatomoTrackLoginParams) => {
  try {
    if (window._paq && user) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.LOGIN,
        name: method || '',
        dimension: {
          [MatomoLoggerDimension.METHOD]: method || '',
          [MatomoLoggerDimension.USER_ID]: user.uuid || ''
        }
      });
    }
  } catch (e) {}
};

interface MatomoTrackSignupParams {
  user: User;
  method?: AuthMethodType;
}
export const matomoTrackSignup = ({ user, method }: MatomoTrackSignupParams) => {
  try {
    if (window._paq && user) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.SIGN_UP,
        name: method || '',
        dimension: {
          [MatomoLoggerDimension.METHOD]: method || '',
          [MatomoLoggerDimension.USER_ID]: user.uuid || ''
        }
      });
    }
  } catch (e) {}
};

interface MatomoTrackLogoutParams {
  user: User;
}
export const matomoTrackSignout = ({ user }: MatomoTrackLogoutParams) => {
  try {
    if (window._paq && user) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.LOGOUT,
        dimension: {
          [MatomoLoggerDimension.USER_ID]: user.uuid || ''
        }
      });
      window._paq.push(['resetUserId']);
    }
  } catch (e) {}
};

interface MatomoTrackUpdateProfileParams {
  birthday: string;
}
export const matomoTrackUpdateProfile = ({ birthday }: MatomoTrackUpdateProfileParams) => {
  try {
    if (window._paq && birthday) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.UPDATE_PROFILE,
        dimension: {
          [MatomoLoggerDimension.PROFILE]: birthday
        }
      });
    }
  } catch (e) {}
};

export const matomoTrackViewHome = () => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_HOME
      });
    }
  } catch (e) {}
};

interface MatomoTrackShareParams {
  id: string | number;
  type: 'product' | 'magazine';
  name: string;
  provider?: string; // TODO: Convert to enum
}
export const matomoTrackShare = ({ id, type, name, provider }: MatomoTrackShareParams) => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.SHARE,
        dimension: {
          [MatomoLoggerDimension.CONTENT_ID]: String(id),
          [MatomoLoggerDimension.CONTENT_TYPE]: type || '',
          [MatomoLoggerDimension.CONTENT_NAME]: name || '',
          [MatomoLoggerDimension.PROVIDER]: provider || ''
        }
      });
    }
  } catch (e) {}
};

export const matomoTrackUnboxingComplete = () => {
  try {
    if (window._paq) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.UNBOXING_COMPLETE
      });
    }
  } catch (e) {}
};

interface MatomoTrackViewReferralCodeParams {
  code: string;
}
export const matomoTrackViewReferralCode = ({ code }: MatomoTrackViewReferralCodeParams) => {
  try {
    if (window._paq && code) {
      matomoTrackEventWithDimension({
        action: MatomoLoggerEventName.VIEW_REFERRAL_CODE,
        dimension: {
          [MatomoLoggerDimension.REFERRAL_CODE]: code
        }
      });
    }
  } catch (e) {}
};
