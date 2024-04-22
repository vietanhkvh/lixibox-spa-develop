// MatomoEvents
export const MatomoLoggerEventName = Object.freeze({
  /* Existing event names */
  ADD_TO_CART: 'add_to_cart',
  ADD_TO_WAIT_LIST: 'add_to_wait_list',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  BEGIN_CHECKOUT: 'begin_checkout',
  CANCEL_ORDER: 'cancel_order',
  COMPLETE_MAGAZINE: 'complete_magazine',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PURCHASE: 'purchase',
  PURCHASE_ITEM: 'purchase_item',
  RATE_PRODUCT: 'rate_product',
  REMOVE_FROM_CART: 'remove_from_cart',
  REMOVE_FROM_WAIT_LIST: 'remove_from_wait_list',
  REMOVE_FROM_WISHLIST: 'remove_from_wishlist',
  SEARCH: 'search',
  SHARE: 'share',
  SIGN_UP: 'sign_up',
  TUTORIAL_BEGIN: 'tutorial_begin',
  TUTORIAL_COMPLETE: 'tutorial_complete',
  VIEW_CART: 'view_cart',
  VIEW_CONTENT: 'view_content',

  /* Existing event names - not used */
  // SEARCH: 'search',
  // VIEW_MAGAZINE: 'view_magazine',

  /* New event names */
  EXIT_CART: 'exit_cart',
  LEAVE_SEARCH_IMMEDIATELY: 'leave_search_immediately',
  REACT_BOX_FEEDBACK: 'react_box_feedback',
  SCROLL: 'scroll',
  UNBOXING_COMPLETE: 'unboxing_complete',
  UPDATE_PROFILE: 'update_profile',
  VIEW_ALL_ITEMS: 'view_all_items',
  VIEW_COMPONENT: 'view_component',
  VIEW_CONTENT_FROM_LIST: 'view_content_from_list',
  VIEW_CONTENT_FROM_SOURCE: 'view_content_from_source',
  VIEW_CONTENT_LIST: 'view_content_list',
  VIEW_FIRST_SEARCH_ITEM_INDEX: 'view_first_search_item_index',
  VIEW_HOME: 'view_home',
  VIEW_REFERRAL_CODE: 'view_referral_code',
  VIEW_SEARCH_RESULTS: 'view_search_results',
  VIEW_SEARCH_ITEM: 'view_search_item',
  SEARCH_AUTO_COMPLETE: 'search_autocomplete'
});

export const MatomoAttributes = Object.freeze({
  CONTENT_TYPE: 'content_type',
  CONTENT_ID: 'content_id',
  CONTENT_NAME: 'content_name',
  CONTENTS: 'contents',
  PRICE: 'price',
  TOTAL_PRICE: 'total_price',
  CURRENCY: 'currency',
  QUANTITY: 'quantity',
  PRODUCT_CATEGORY: 'product_category',
  PRODUCT_URL: 'product_url',
  PRODUCT_IMAGE_URL: 'product_image_url',
  MAGAZINE_CATEGORY: 'magazine_category',
  SEARCH_TERM: 'search_term',
  RATING_VALUE: 'rating_value',
  MEMBER: 'member',
  SHIPPING: 'shipping',
  COUPON: 'coupon',
  METHOD: 'method',
  LIXICOIN: 'lixicoin',
  PROVIDER: 'provider',
  USER_ID: 'user_id',
  EMAIL: 'email',
  SCROLL_PERCENTAGE: 'scroll_percentage'
});

/**
 * WARNING: Currently we have 30 configured dimensions on Matomo. To support varying data types for different events,
 * we are using several dynamic dimensions (D27, D28, D29, D30) that can be used for different purposes in different
 * events. Please refer to the event definitions for specific meaning of each dynamic dimension in each event.
 */
export const MatomoLoggerDimension = Object.freeze({
  CONTENT_TYPE: 1,
  CONTENT_ID: 2,
  CONTENT_NAME: 3,
  PRICE: 4,
  CATEGORY: 5,
  PRODUCT_URL: 6,
  PRODUCT_IMAGE_URL: 7,
  QUANTITY: 8,
  TOTAL_PRICE: 9,
  COUPON: 10,
  ORDER_NUMBER: 11,
  CURRENCY: 12,
  REFERRAL_CODE: 13,
  PERCENTAGE: 14,
  SOURCE: 15,
  SOURCE_ID: 16,
  SEARCH_VERSION: 17,
  IS_RESULT_FIRST_ITEM_VIEW: 18,
  METHOD: 19,
  SEARCH_TERM: 20,
  USER_ID: 21,
  SCROLL_PERCENTAGE: 22,
  PROFILE: 23,
  PROVIDER: 24,
  PLATFORM: 25,
  SUGGESTED_KEYWORD_TYPE: 26,
  D27: 27, // Dynamic dimension. May have different meaning in different events.
  D28: 28, // Dynamic dimension. May have different meaning in different events.
  D29: 29, // Dynamic dimension. May have different meaning in different events.
  D30: 30 // Dynamic dimension. May have different meaning in different events.
});

export const MatomoActionCode = Object.freeze({
  cart_screen: 623,
  Box_detail_screen: 596,
  Shopping_screen: 593 // (in the home page)
});

export const MatomoLoggerContentType = Object.freeze({
  BOX: 'box',
  THEME: 'theme',
  BRAND: 'brand',
  DISCOUNT_CODE: 'discount_code',
  FEED: 'feed',
  MAGAZINE: 'magazine',
  GWP: 'gwp',
  REDEEM: 'redeem',
  ADD_ON: 'add_on',
  SAMPLE: 'sample',
  GIFT: 'gift',
  BADGE: 'badge'
});

export const MatomoLoggerComponent = Object.freeze({
  BOX_FEEDBACKS: 'box_feedbacks',
  SEARCH_PANEL: 'search_panel'
});

export const MatomoLikeStatus = Object.freeze({
  LIKE: 'like',
  UNLIKE: 'unlike'
});
