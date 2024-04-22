// Branch.IO Standard Events
export const BranchIOLoggerStandardEventName = Object.freeze({
  // Commerce Events

  ADD_TO_CART: 'ADD_TO_CART',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  /** Alias: BEGIN_CHECKOUT */
  INITIATE_PURCHASE: 'INITIATE_PURCHASE',
  PURCHASE: 'PURCHASE',
  VIEW_CART: 'VIEW_CART',

  // Content Events

  /** Alias: VIEW_CONTENT */
  VIEW_ITEM: 'VIEW_ITEM',
  VIEW_ITEMS: 'VIEW_ITEMS',
  /** Alias: SEARCH */
  SEARCH: 'SEARCH',
  /** Alias: RATE_PRODUCT */
  RATE: 'RATE',
  SHARE: 'SHARE',

  // Lifecycle Events

  /** Alias: SIGN_UP */
  COMPLETE_REGISTRATION: 'COMPLETE_REGISTRATION',
  LOGIN: 'LOGIN'
});

// Branch.IO Custom Events
export const BranchIOLoggerCustomEventName = Object.freeze({
  ADD_TO_WAIT_LIST: 'ADD_TO_WAIT_LIST',
  CANCEL_ORDER: 'CANCEL_ORDER',
  COMPLETE_MAGAZINE: 'COMPLETE_MAGAZINE',
  LOGOUT: 'LOGOUT',
  PURCHASE_ITEM: 'PURCHASE_ITEM',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  REMOVE_FROM_WAIT_LIST: 'REMOVE_FROM_WAIT_LIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  VIEW_HOME: 'VIEW_HOME',
  EXIT_CART: 'EXIT_CART',
  UNBOXING_COMPLETE: 'UNBOXING_COMPLETE'
});

// NOTE: Unused
// export const BranchIOLoggerEventName = Object.freeze({
//   /* Active event on Branch.IO */

//   /* Existing event names */

//   /* Existing event names - not used */
//   // SEARCH: 'search',
//   // VIEW_MAGAZINE: 'view_magazine',

//   /* New event names */
//   EXIT_CART: 'exit_cart',
//   LEAVE_SEARCH_IMMEDIATELY: 'leave_search_immediately',
//   REACT_BOX_FEEDBACK: 'react_box_feedback',
//   SCROLL: 'scroll',
//   UPDATE_PROFILE: 'update_profile',
//   VIEW_ALL_ITEMS: 'view_all_items',
//   VIEW_COMPONENT: 'view_component',
//   VIEW_CONTENT_FROM_LIST: 'view_content_from_list',
//   VIEW_CONTENT_FROM_SOURCE: 'view_content_from_source',
//   VIEW_CONTENT_LIST: 'view_content_list',
//   VIEW_FIRST_SEARCH_ITEM_INDEX: 'view_first_search_item_index',
//   VIEW_REFERRAL_CODE: 'view_referral_code',
//   VIEW_SEARCH_RESULTS: 'view_search_results',
//   VIEW_SEARCH_ITEM: 'view_search_item',
//   SEARCH_AUTO_COMPLETE: 'search_autocomplete',
//   TUTORIAL_BEGIN: 'tutorial_begin',
//   TUTORIAL_COMPLETE: 'tutorial_complete',
// });

export const BranchIOLoggerContentItemStandardAttribute = Object.freeze({
  /** string */
  CONTENT_SCHEMA: '$content_schema',
  /** string */
  OG_TITLE: '$og_title',
  /** string */
  OG_DESCRIPTION: '$og_description',
  /** string */
  OG_IMAGE_URL: '$og_image_url',
  /** string */
  CANONICAL_IDENTIFIER: '$canonical_identifier',
  /** string */
  CURRENCY: '$currency',
  /** boolean */
  PUBLICLY_INDEXABLE: '$publicly_indexable',
  /** number */
  PRICE: '$price',
  /** boolean */
  LOCALLY_INDEXABLE: '$locally_indexable',
  /** number */
  QUANTITY: '$quantity',
  /** string */
  SKU: '$sku',
  /** string */
  PRODUCT_NAME: '$product_name',
  /** string */
  PRODUCT_BRAND: '$product_brand',
  /** string */
  PRODUCT_CATEGORY: '$product_category',
  /** string */
  PRODUCT_VARIANT: '$product_variant',
  /** number */
  RATING_AVERAGE: '$rating_average',
  /** number */
  RATING_COUNT: '$rating_count',
  /** number */
  RATING_MAX: '$rating_max',
  /** number */
  CREATION_TIMESTAMP: '$creation_timestamp',
  /** number */
  EXP_DATE: '$exp_date',
  /** string[] */
  KEYWORDS: '$keywords',
  /** string */
  ADDRESS_STREET: '$address_street',
  /** string */
  ADDRESS_CITY: '$address_city',
  /** string */
  ADDRESS_REGION: '$address_region',
  /** string */
  ADDRESS_COUNTRY: '$address_country',
  /** string */
  ADDRESS_POSTAL_CODE: '$address_postal_code',
  /** number */
  LATITUDE: '$latitude',
  /** number */
  LONGITUDE: '$longitude',
  /** string[] */
  IMAGE_CAPTIONS: '$image_captions',
  /** string */
  CONDITION: '$condition',
  /** object{string: number | string | boolean} */
  CUSTOM_FIELDS: '$custom_fields',

  /** string, custom? */
  CANONICAL_URL: '$canonical_url',
  /** number, custom? */
  RATE: '$rate'
});

export const BranchIOLoggerContentItemCustomAttribute = Object.freeze({
  /** string */
  CATEGORY: 'category',

  // Web only
  /** string */
  CONTENT_TYPE: 'content_type',
  /** string */
  CONTENT_ID: 'content_id',
  /** string */
  CONTENT_NAME: 'content_name',
  /** string */
  PROVIDER: 'provider',
  /** string */
  SOURCE: 'source',
  /** string */
  SOURCE_ID: 'source_id'
});

export const BranchIOProductCondition = Object.freeze({
  NEW: 'NEW'
});

export const BranchIOProductCategory = Object.freeze({
  HEALTH_AND_BEAUTY: 'HEALTH_AND_BEAUTY'
});

export const BranchIOLoggerContentType = Object.freeze({
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
