export const ContentType = Object.freeze({
  PRODUCT: 'product' as const,
  MAGAZINE: 'magazine' as const
});
export type ContentTypeType = (typeof ContentType)[keyof typeof ContentType];

export const Currency = Object.freeze({
  DEFAULT: 'VND' as const,
  LIXICOIN: 'Lixicoin' as const
});
export type CurrencyType = (typeof Currency)[keyof typeof Currency];

export const ViewedSource = Object.freeze({
  NONE: '',
  WISHLIST: 'wishlist',
  WAITLIST: 'waitlist',
  RECENT_VIEWED: 'recent_viewed',
  MY_FEEDBACK: 'my_feedback',

  EMPTY_CART_WISHLIST: 'empty_cart_wishlist',
  CART_WISHLIST: 'cart_wishlist',
  CART_HOTTEST_BOXES: 'cart_hottest_boxes',
  CART_RECOMMENDATION: 'cart_recommendation',
  CART_FREESHIP_SUGGESTION: 'cart_freeship_suggestion',
  CART_BEST_SELLING_BOXES: 'cart_best_selling_boxes',
  ADD_ON: 'add_on',
  REDEEM: 'redeem',
  SAMPLE: 'sample',
  GIFT: 'gift',
  CART: 'cart',
  ORDER: 'order',
  TRANSACTION_HISTORY: 'transaction_history',

  SEARCH: 'search',

  BOX_DETAIL: 'box_detail',
  BOX_DETAIL_RECENT_VIEWED: 'box_detail_recent_viewed',
  BOX_DETAIL_RELATED_BOXES: 'box_detail_related_boxes',
  BOX_DETAIL_RELATED_MAGAZINES: 'box_detail_related_magazines',
  BOX_DETAIL_RELATED_SAVINGS_BOXES: 'box_detail_related_savings_boxes',
  BOX_DETAIL_RELATED_TESTIMONIAL_BOXES: 'box_detail_related_testimonial_boxes',
  BOX_GROUP: 'box_group',
  PRODUCT_BOXES: 'product_boxes',
  BOX_FEEDBACKS: 'box_feedbacks',
  FEEDBACK: 'feedback',

  HOT_BOXES: 'hot_boxes',
  HOT_DEAL: 'hot_deal',
  HOME_HOT_DEAL: 'home_hot_deal',

  GWP_SCHEME_HOT_DEAL: 'gwp_scheme_hot_deal',
  GWP_SCHEME_BEST_SELLING: 'gwp_scheme_best_selling',
  GWP_SCHEME_GIFT_ITEM: 'gwp_scheme_gift_item',
  GWP_SCHEME_EXCLUSIVE_BOXES: 'gwp_scheme_exclusive_boxes',

  HOME_RECENT_VIEWED: 'home_recent_viewed',
  HOME_NEWEST_INDIVIDUAL_BOXES: 'home_newest_individual_boxes',
  HOME_BEST_SELLING_BOXES: 'home_best_selling_boxes',
  HOME_RECOMMENDATION: 'home_recommendation',

  CATEGORY: 'category',
  BRAND: 'brand',
  THEME: 'theme',
  GWP: 'gwp',
  THEME_SECTION: 'theme_section',
  DISCOUNT_CODE: 'discount_code',
  FEED: 'feed',

  MAGAZINE_LIST: 'magazine_list',
  TAG_MAGAZINE_LIST: 'tag_magazine_list',
  MAGAZINE_RELATED_BOXES: 'magazine_related_boxes',
  MAGAZINE_DETAIL_RELATED_MAGAZINES: 'magazine_detail_related_magazines',

  // Web only
  LANDING_PAGE: 'landing_page'
});
export type ViewedSourceType = (typeof ViewedSource)[keyof typeof ViewedSource];
