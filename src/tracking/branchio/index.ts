import { BoxCategory, ProductBox } from 'types/api/shop';
import { Theme } from 'types/api/theme';
import { Brand } from 'types/api/brand';
import { Order } from 'types/api/order';
import { User } from 'types/api/auth';
import { Cart } from 'types/api/cart';
import { AuthMethodType } from 'constants/application/auth';
import { SearchSourceType, SearchVersionType } from 'constants/application/search.type';
import { ViewedSourceType } from 'tracking/constants/index';
import { ViewedSource } from 'tracking/constants';
import { getCartItemPrice, getPurchaseTypeKeyStrFromValue } from 'utils/cart';
import { getOrderBoxPrice } from 'utils/order';
import {
  BranchIOLoggerContentItemCustomAttribute,
  BranchIOLoggerContentItemStandardAttribute,
  BranchIOLoggerContentType,
  BranchIOLoggerCustomEventName,
  BranchIOLoggerStandardEventName
} from './constant';
import { branchIoGenerateEventAndCustomData, branchIoGetBoxDimensions } from './utils';

export interface BranchIOTrackViewContentParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
}
export const branchIoTrackViewContent = ({ box, categories }: BranchIOTrackViewContentParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.VIEW_ITEM,
        branchIoGenerateEventAndCustomData({
          description: 'View box',
          revenue: box.price || 0
        }), // event and custom data
        [branchIoGetBoxDimensions({ box, categories })], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackViewItemListParams {
  source: ViewedSourceType;
  sourceId?: string;
  id?: string;
  name?: string;
}
export const branchIoTrackViewItemList = ({
  source,
  sourceId = '',
  id = '',
  name = ''
}: BranchIOTrackViewItemListParams) => {
  try {
    if (window.branch && source) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.VIEW_ITEMS,
        branchIoGenerateEventAndCustomData({
          description: 'View item list',
          [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: source,
          [BranchIOLoggerContentItemCustomAttribute.CONTENT_ID]: id,
          [BranchIOLoggerContentItemCustomAttribute.CONTENT_NAME]: name,
          [BranchIOLoggerContentItemCustomAttribute.SOURCE]: source,
          [BranchIOLoggerContentItemCustomAttribute.SOURCE_ID]: sourceId
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackViewCategoryParams {
  category: BoxCategory;
}
export const branchIoTrackViewCategory = ({ category }: BranchIOTrackViewCategoryParams) => {
  try {
    if (window._paq && category) {
      branchIoTrackViewItemList({
        source: ViewedSource.CATEGORY,
        id: category.slug || '',
        name: category.name || ''
      });
    }
  } catch (e) {}
};

export interface BranchIOTrackViewThemeParams {
  theme: Theme;
}
export const branchIoTrackViewTheme = ({ theme }: BranchIOTrackViewThemeParams) => {
  try {
    if (window._paq && theme) {
      branchIoTrackViewItemList({
        source: ViewedSource.THEME,
        id: theme.slug || '',
        name: theme.name || ''
      });
    }
  } catch (e) {}
};

export interface BranchIOTrackViewBrandParams {
  brand: Brand;
}
export const branchIoTrackViewBrand = ({ brand }: BranchIOTrackViewBrandParams) => {
  try {
    if (window._paq && brand) {
      branchIoTrackViewItemList({
        source: ViewedSource.BRAND,
        id: brand.slug || '',
        name: brand.name || ''
      });
    }
  } catch (e) {}
};

export interface BranchIOTrackRatedParams {
  box: ProductBox;
  rating: number;
}
export const branchIoTrackRated = ({ box, rating }: BranchIOTrackRatedParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.RATE,
        branchIoGenerateEventAndCustomData({
          description: 'Rate box',
          revenue: box.price || 0
        }), // event and custom data
        [
          Object.assign({}, branchIoGetBoxDimensions({ box }), {
            [BranchIOLoggerContentItemStandardAttribute.RATE]: rating
          })
        ], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

interface BranchIOTrackLoginParams {
  user: User;
  method?: AuthMethodType;
}
export const branchIoTrackSignin = ({ user, method }: BranchIOTrackLoginParams) => {
  try {
    if (window.branch && user) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.LOGIN,
        branchIoGenerateEventAndCustomData({
          description: 'Login',
          method: method || '',
          user_id: user.uuid || ''
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

interface BranchIOTrackSignupParams {
  user: User;
  method?: AuthMethodType;
}
export const branchIoTrackSignup = ({ user, method }: BranchIOTrackSignupParams) => {
  try {
    if (window.branch && user) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.COMPLETE_REGISTRATION,
        branchIoGenerateEventAndCustomData({
          description: 'Signup',
          method: method || '',
          user_id: user.uuid || ''
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

interface BranchIOTrackLogoutParams {
  user: User;
}
export const branchIoTrackSignout = ({ user }: BranchIOTrackLogoutParams) => {
  try {
    if (window.branch && user) {
      window.branch.logEvent(
        BranchIOLoggerCustomEventName.LOGOUT,
        branchIoGenerateEventAndCustomData({
          description: 'Logout',
          user_id: user.uuid || ''
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export const branchIoTrackViewHome = () => {
  try {
    if (window.branch) {
      window.branch.logEvent(
        BranchIOLoggerCustomEventName.VIEW_HOME,
        branchIoGenerateEventAndCustomData({
          description: 'View home'
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackViewSearchResultsParams {
  keyword: string;
  version: SearchVersionType;
  source: SearchSourceType;
}
export const branchIoTrackViewSearchResults = ({ keyword, version, source }: BranchIOTrackViewSearchResultsParams) => {
  try {
    if (window.branch && keyword && version && source) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.SEARCH,
        branchIoGenerateEventAndCustomData({
          description: 'View search results',
          search_query: keyword || '',
          search_version: version || '',
          source: source || ''
        }), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackAddToCartParams {
  box: ProductBox;
  quantity: number;
  source?: ViewedSourceType;
  sourceId?: string;
  categories?: Array<BoxCategory>;
}
export const branchIoTrackAddToCart = ({
  box,
  quantity,
  source,
  sourceId = '',
  categories
}: BranchIOTrackAddToCartParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.ADD_TO_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Add to cart',
              revenue: box.price || 0,
              quantity: quantity || 0
            },
            source && { source },
            sourceId && { source_id: sourceId }
          )
        ), // event and custom data
        [branchIoGetBoxDimensions({ box, categories })], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackAddToCartAddOnParams extends BranchIOTrackAddToCartParams {
  box: any;
}
export const branchIoTrackAddToCartAddOn = ({ box, quantity }: BranchIOTrackAddToCartAddOnParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.ADD_TO_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Add to cart',
              revenue: box.add_on_price || box.price || 0,
              quantity: quantity || 0,
              source: ViewedSource.ADD_ON
            }
          )
        ), // event and custom data
        [
          Object.assign({}, branchIoGetBoxDimensions({ box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: box.add_on_price || box.price || 0,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: BranchIOLoggerContentType.ADD_ON
          })
        ], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackAddToCartRedeemParams extends BranchIOTrackAddToCartParams {
  box: any;
}
export const branchIoTrackAddToCartRedeem = ({ box, quantity }: BranchIOTrackAddToCartRedeemParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.ADD_TO_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Add to cart',
              revenue: box.coins_price || 0,
              quantity: quantity || 0,
              source: ViewedSource.REDEEM
            }
          )
        ), // event and custom data
        [
          Object.assign({}, branchIoGetBoxDimensions({ box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: box.coins_price || 0,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: BranchIOLoggerContentType.REDEEM
          })
        ], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackAddToCartGiftParams extends BranchIOTrackAddToCartParams {
  box: any;
}
export const branchIoTrackAddToCartGift = ({ box, quantity }: BranchIOTrackAddToCartGiftParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.ADD_TO_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Add to cart',
              revenue: 0,
              quantity: quantity || 0,
              source: ViewedSource.GIFT
            }
          )
        ), // event and custom data
        [
          Object.assign({}, branchIoGetBoxDimensions({ box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: 0,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: BranchIOLoggerContentType.GIFT
          })
        ], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackAddToCartSampleParams extends BranchIOTrackAddToCartParams {
  box: any;
}
export const branchIoTrackAddToCartSample = ({ box, quantity }: BranchIOTrackAddToCartSampleParams) => {
  try {
    if (window.branch && box) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.ADD_TO_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Add to cart',
              revenue: 0,
              quantity: quantity || 0,
              source: ViewedSource.SAMPLE
            }
          )
        ), // event and custom data
        [
          Object.assign({}, branchIoGetBoxDimensions({ box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: 0,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: BranchIOLoggerContentType.SAMPLE
          })
        ], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackViewCartParams {
  cart: Cart;
}
export const branchIoTrackViewCart = ({ cart }: BranchIOTrackViewCartParams) => {
  try {
    if (window.branch && cart) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.VIEW_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'View cart',
              revenue: cart.total_price || 0,
              coupon: cart.discount_code || cart.referral_code || cart.mobile_referral_code || '',
              shipping: cart.shipping_price || 0,
              quantity: cart.cart_items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0
              // TODO: Implement
              // user_type: user?.order_count > 0 ? 'existing_customer' : 'new_customer',
            }
          )
        ), // event and custom data
        (cart.cart_items || []).map((cartItem) =>
          Object.assign({}, branchIoGetBoxDimensions({ box: cartItem.box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: getCartItemPrice(cartItem),
            [BranchIOLoggerContentItemStandardAttribute.QUANTITY]: cartItem.quantity || 1,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: getPurchaseTypeKeyStrFromValue(
              cartItem.purchase_type
            )
          })
        ), // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export const branchIoTrackExitCart = () => {
  try {
    if (window.branch) {
      window.branch.logEvent(
        BranchIOLoggerCustomEventName.EXIT_CART,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Exit cart'
            }
          )
        ), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackInitiatedCheckoutParams {
  cart: Cart;
  user?: User;
}
export const branchIoTrackInitiatedCheckout = ({ cart, user }: BranchIOTrackInitiatedCheckoutParams) => {
  try {
    if (window.branch && cart) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.INITIATE_PURCHASE,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Initiate checkout',
              revenue: cart.total_price || 0,
              coupon: cart.discount_code || cart.referral_code || cart.mobile_referral_code || '',
              shipping: cart.shipping_price || 0,
              quantity: cart.cart_items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0,
              user_type: !user ? '' : (user.orders_count || 0) > 0 ? 'existing_customer' : 'new_customer'
            }
          )
        ), // event and custom data
        (cart.cart_items || []).map((cartItem) =>
          Object.assign({}, branchIoGetBoxDimensions({ box: cartItem.box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: getCartItemPrice(cartItem),
            [BranchIOLoggerContentItemStandardAttribute.QUANTITY]: cartItem.quantity || 1,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: getPurchaseTypeKeyStrFromValue(
              cartItem.purchase_type
            )
          })
        ), // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export interface BranchIOTrackPurchasedParams {
  order: Order;
  user: User;
}
export const branchIoTrackPurchased = ({ order, user }: BranchIOTrackPurchasedParams) => {
  try {
    if (window.branch && order && Array.isArray(order.order_boxes)) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.PURCHASE,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Purchase',
              transaction_id: order.number || '',
              revenue: order.total_price || 0,
              coupon: order.discount_code || order.referral_code || order.mobile_referral_code || '',
              shipping: order.shipping_price || 0,
              quantity: order.order_boxes?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0,
              user_type: !user ? '' : (user.orders_count || 0) > 0 ? 'existing_customer' : 'new_customer',
              subtotal_price: order.subtotal_price || 0,
              discount: (order.discount_price || 0) + (order.promotions_price || 0)
            }
          )
        ), // event and custom data
        (order.order_boxes || []).map((orderBox) =>
          Object.assign({}, branchIoGetBoxDimensions({ box: orderBox.box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: getOrderBoxPrice(orderBox),
            [BranchIOLoggerContentItemStandardAttribute.QUANTITY]: orderBox.quantity || 1,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: getPurchaseTypeKeyStrFromValue(
              orderBox.purchase_type
            )
          })
        ), // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

// NOTE: Skipped
// interface BranchIOTrackPurchasedFromSourcesParams {
//   order: Order;
//   sources: Array<CartItemSource>;
// }
// export const branchIoTrackPurchasedFromSources = ({ order, sources }: BranchIOTrackPurchasedFromSourcesParams) => {
//   try {
//     if (window._paq && order && sources && Array.isArray(order.order_boxes)) {
//       sources.forEach((source) => {
//         const quantity = source.quantity || 0;
//         const orderBox = order.order_boxes.find((orderBox) => orderBox?.box?.id === source.boxId);

//         const price = (orderBox?.price || 0) * quantity;

//         branchIoTrackEventWithDimension({
//           action: MatomoLoggerEventName.PURCHASE_ITEM,
//           name: source.source,
//           value: price,
//           dimension: Object.assign({}, orderBox?.box && branchIoGetBoxDimensions({ box: orderBox.box }), {
//             [MatomoLoggerDimension.ORDER_NUMBER]: order.number || '',
//             [MatomoLoggerDimension.QUANTITY]: String(quantity || orderBox.quantity || 1),
//             [MatomoLoggerDimension.TOTAL_PRICE]: String(order.total_price || 0),
//             [MatomoLoggerDimension.SOURCE]: source.source || '',
//             [MatomoLoggerDimension.SOURCE_ID]: source.sourceId || ''
//           })
//         });
//       });
//     }
//   } catch (e) {}
// };

export interface BranchIOTrackCancelOrderParams {
  order: Order;
}
export const branchIoTrackCancelOrder = ({ order }: BranchIOTrackCancelOrderParams) => {
  try {
    if (window.branch && order) {
      window.branch.logEvent(
        BranchIOLoggerCustomEventName.CANCEL_ORDER,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Cancel order',
              transaction_id: order.number || '',
              revenue: order.total_price || 0,
              coupon: order.discount_code || order.referral_code || order.mobile_referral_code || '',
              shipping: order.shipping_price || 0,
              quantity: order.order_boxes?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0,
              // TODO: Implement
              // user_type: user?.order_count > 0 ? 'existing_customer' : 'new_customer',
              subtotal_price: order.subtotal_price || 0,
              discount: (order.discount_price || 0) + (order.promotions_price || 0)
            }
          )
        ), // event and custom data
        (order.order_boxes || []).map((orderBox) =>
          Object.assign({}, branchIoGetBoxDimensions({ box: orderBox.box }), {
            [BranchIOLoggerContentItemStandardAttribute.PRICE]: getOrderBoxPrice(orderBox),
            [BranchIOLoggerContentItemStandardAttribute.QUANTITY]: orderBox.quantity || 1,
            [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: getPurchaseTypeKeyStrFromValue(
              orderBox.purchase_type
            )
          })
        ), // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

interface BranchIOTrackShareParams {
  id: string | number;
  type: 'product' | 'magazine';
  name: string;
  provider?: string; // TODO: Convert to enum
}
export const branchIoTrackShare = ({ id, type, name, provider }: BranchIOTrackShareParams) => {
  try {
    if (window.branch) {
      window.branch.logEvent(
        BranchIOLoggerStandardEventName.SHARE,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Share',
              [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: type || '',
              [BranchIOLoggerContentItemCustomAttribute.CONTENT_ID]: id,
              [BranchIOLoggerContentItemCustomAttribute.CONTENT_NAME]: name || '',
              [BranchIOLoggerContentItemCustomAttribute.PROVIDER]: provider || ''
            }
          )
        ), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

export const branchIoTrackUnboxingComplete = () => {
  try {
    if (window.branch) {
      window.branch.logEvent(
        BranchIOLoggerCustomEventName.UNBOXING_COMPLETE,
        branchIoGenerateEventAndCustomData(
          Object.assign(
            {},
            {
              description: 'Unboxing complete'
            }
          )
        ), // event and custom data
        [], // contentItems
        '', // customerEventAlias
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
  } catch (e) {}
};

/**
 * Not tracked
 *
 * - branchIoTrackPageView
 * - branchIoTrackViewBadge
 * - branchIoTrackViewContentFromSource
 * - branchIoTrackViewedBoxFeedbacks
 * - branchIoTrackReactBoxFeedback
 * - branchIoTrackScroll
 * - branchIoTrackViewAllItems
 * - branchIoTrackViewItemList
 * - branchIoTrackViewDiscountCode
 * - branchIoTrackViewedFeed
 * - branchIoTrackViewedMagazine
 * - branchIoTrackViewedGwpScheme
 * - branchIoTrackViewedMagazineFromList
 * - branchIoTrackCompleteMagazine
 * - branchIoTrackAddToWishlist
 * - branchIoTrackRemoveFromWishlist
 * - branchIoTrackAddToWaitlist
 * - branchIoTrackRemoveFromWaitlist
 * - branchIoTrackRemoveFromCart
 * - branchIoTrackSearch
 * - branchIoTrackViewedSearchPanel
 * - branchIoTrackSearchAutoComplete
 * - branchIoTrackLeaveSearchImmediately
 * - branchIoTrackViewSearchItem
 * - branchIoTrackViewFirstSearchItemIndex
 * - branchIoTrackUpdateProfile
 * - branchIoTrackViewReferralCode
 */
