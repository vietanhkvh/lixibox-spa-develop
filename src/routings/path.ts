// TODO: Remove obsolete routes

/** Home Page */
export const ROUTING_SHOP_INDEX = '/';

/** Product Category Page */
export const ROUTING_PRODUCT_CATEGORY_PATH = '/category';
export const ROUTING_PRODUCT_CATEGORY = `${ROUTING_PRODUCT_CATEGORY_PATH}/:categoryFilter`;
export const ROUTING_SHOP_GIFT_CATEGORY = `${ROUTING_PRODUCT_CATEGORY_PATH}/shop-gifts`;
export const ROUTING_SHOP_BEAUTY_CATEGORY = `${ROUTING_PRODUCT_CATEGORY_PATH}/beauty`;
/* Category Lingerie */
export const ROUTING_PRODUCT_CATEGORY_LINGERIE = `/lingerie`;

/** Product Detail Page */
export const ROUTING_PRODUCT_DETAIL_PATH = '/shop';
export const ROUTING_PRODUCT_DETAIL = `${ROUTING_PRODUCT_DETAIL_PATH}/:idProduct`;

/** Expext Detail Page */
// export const ROUTING_EXPERT_DETAIL_PATH = '/expert';
// export const ROUTING_EXPERT_DETAIL = `${ROUTING_EXPERT_DETAIL_PATH}/:idExpert`;
//

/** Auth Page */
export const ROUTING_AUTH_CHECKOUT_FAST_TRACK = '/auth-fast-track';
export const ROUTING_AUTH_SIGN_IN = '/sign-in';
export const ROUTING_AUTH_FORGOT_PASSWORD = '/forgot-password';
export const ROUTING_AUTH_SIGN_UP = '/sign-up';
export const ROUTING_AUTH_VERIFY_PHONE = '/verify-phone/:phone';
export const ROUTING_AUTH_PHONE_REGISTERED = '/phone-registered/:phone';
export const ROUTING_AUTH_LOGIN_UNCONFIRMED_PHONE_PROMPT = '/unconfirmed-phone/:phone';
export const ROUTING_AUTH_ATTACH_PHONE_STEP_1 = '/attach-phone';
export const ROUTING_AUTH_ATTACH_PHONE_STEP_2 = '/attach-phone-confirm';
export const ROUTING_AUTH_RESET_PASSWORD = '/users/password/edit';
export const ROUTING_AUTH_CONNECT_FACEBOOK = '/connect-facebook';
export const ROUTING_AUTH_CONNECT_GOOGLE = '/connect-google';

/** Mobile Tab Page */
export const ROUTING_FEED = '/mobile-feed';
export const ROUTING_PROMOTION = '/mobile-promotion';
export const ROUTING_NOTIFICATION = '/mobile-notification';

/** User Group */
export const ROUTING_USER = '/user';
export const ROUTING_USER_ORDER = `${ROUTING_USER}/orders`;
export const ROUTING_USER_ORDER_STORE_PURCHASES = `${ROUTING_USER_ORDER}/store-purchases`;
export const ROUTING_USER_ORDER_STORE_PURCHASES_DETAIL = `${ROUTING_USER_ORDER_STORE_PURCHASES}/:orderNumber`;
export const ROUTING_USER_DISCOUNT_CODES = `${ROUTING_USER}/discount-codes`;
export const ROUTING_USER_ORDER_DETAIL = `${ROUTING_USER_ORDER}/:orderNumber`;
export const ROUTING_USER_ORDER_DETAIL_ONEPAY = `${ROUTING_USER_ORDER}/:orderNumber/onepay`;

export const ROUTING_USER_FEEDBACK = `${ROUTING_USER}/feedbacks`;
export const ROUTING_USER_WISHLIST = `${ROUTING_USER}/wishlist`;
export const ROUTING_USER_WATCHED = `${ROUTING_USER}/watched`;
export const ROUTING_USER_WAITLIST = `${ROUTING_USER}/waitlist`;

export const ROUTING_USER_PROFILE = `${ROUTING_USER}/profile`;
export const ROUTING_USER_CHANGE_PASSWORD = `${ROUTING_USER}/change-password`;
export const ROUTING_USER_VERIFY = `${ROUTING_USER}/verify`;
export const ROUTING_USER_VERIFY_EMAIL = `${ROUTING_USER}/verify-email`;
export const ROUTING_USER_UPDATE_PASSWORD = `${ROUTING_USER}/update-password`;
export const ROUTING_USER_PROFILE_EDIT = `${ROUTING_USER}/profile-edit`;
export const ROUTING_USER_DELIVERY = `${ROUTING_USER}/delivery`;
export const ROUTING_USER_NOTIFICATION = `${ROUTING_USER}/notification`;
export const ROUTING_USER_TRANSACTIONS = `${ROUTING_USER}/transactions`;
export const ROUTING_USER_TRANSACTIONS_LIXICOIN = `${ROUTING_USER_TRANSACTIONS}/lixicoin`;
export const ROUTING_USER_TRANSACTIONS_BALANCE = `${ROUTING_USER_TRANSACTIONS}/balance`;
export const ROUTING_USER_TRANSACTIONS_LIXICOIN_OLD = `${ROUTING_USER}/lixicoin`;
export const ROUTING_USER_INVITE = `${ROUTING_USER}/invite`;
export const ROUTING_USER_INVITE_DETAIL = `${ROUTING_USER_INVITE}/:id`;
export const ROUTING_USER_INVITE_HISTORY = `${ROUTING_USER_INVITE}/history`;

/** Magazine */
export const ROUTING_MAGAZINE = '/magazine';

export const ROUTING_SEARCH_MAGAZINE_PATH = '/search-magazine';
export const ROUTING_SEARCH_MAGAZINE = `${ROUTING_SEARCH_MAGAZINE_PATH}/:keyword`;

export const ROUTING_MAGAZINE_CATEGORY_PATH = `${ROUTING_MAGAZINE}/category`;
export const ROUTING_MAGAZINE_CATEGORY = `${ROUTING_MAGAZINE_CATEGORY_PATH}/:idCategory`;

export const ROUTING_MAGAZINE_DETAIL_PATH = `${ROUTING_MAGAZINE}`;
export const ROUTING_MAGAZINE_DETAIL = `${ROUTING_MAGAZINE_DETAIL_PATH}/:idPost`;

export const ROUTING_MAGAZINE_TAG_PATH = `${ROUTING_MAGAZINE}/tag`;
export const ROUTING_MAGAZINE_TAG = `${ROUTING_MAGAZINE_TAG_PATH}/:idTag`;

export const ROUTING_MAGAZINE_VIDEO_PATH = `${ROUTING_MAGAZINE}/video`;
export const ROUTING_MAGAZINE_VIDEO = `${ROUTING_MAGAZINE_VIDEO_PATH}/:idVideo`;

/** Check out */
export const ROUTING_CHECK_OUT_PATH = '/check-out';
export const ROUTING_CHECK_OUT = `${ROUTING_CHECK_OUT_PATH}/cart`;
export const ROUTING_CHECK_OUT_PAYMENT = `${ROUTING_CHECK_OUT_PATH}/payment`;
export const ROUTING_CHECK_OUT_SUCCESS = `${ROUTING_CHECK_OUT_PATH}/success`;

/** Instant buy now routing */
export const ROUTING_INSTANT_BUY_NOW_PATH = `/buynow`;
export const ROUTING_INSTANT_BUY_NOW_SENSITIVE = `/sensitive${ROUTING_INSTANT_BUY_NOW_PATH}`;
export const ROUTING_INSTANT_BUY_NOW_SENSITIVE_MINT = `/sensitive-mint${ROUTING_INSTANT_BUY_NOW_PATH}`;

/** Lixicoin */
export const ROUTING_LIXI_COIN = '/lixicoin';
export const ROUTING_LIXI_COIN_FAQ = '/lixicoin/faq';
export const ROUTING_BALANCE = '/balance';
export const ROUTING_BALANCE_FAQ = '/balance/faq';
export const ROUTING_MEMBERSHIP = '/membership';
export const ROUTING_MEMBERSHIP_FAQ = '/membership/faq';

/** Theme */
export const ROUTING_THEME_DETAIL_PATH = `/theme`;
export const ROUTING_THEME_DETAIL_PATH_OLD = `/shop/theme`;
export const ROUTING_THEME_DETAIL = `${ROUTING_THEME_DETAIL_PATH}/:idSpecial`;
export const ROUTING_THEME_DETAIL_OLD = `${ROUTING_THEME_DETAIL_PATH_OLD}/:idSpecial`;

/** Brand */
export const ROUTING_BRAND_DETAIL_PATH = `/brands`;
export const ROUTING_BRAND_DETAIL = `${ROUTING_BRAND_DETAIL_PATH}/:idBrand`;

/** Info Group */
export const ROUTING_INFO = '/info';
export const ROUTING_INFO_ABOUT_US = `${ROUTING_INFO}/about-us`;
export const ROUTING_INFO_TERM = `${ROUTING_INFO}/term`;
export const ROUTING_INFO_PRIVACY = `${ROUTING_INFO}/privacy`;
export const ROUTING_INFO_PRIVACY_EN = `${ROUTING_INFO}/privacy-en`;
export const ROUTING_INFO_PRIVACY_SHORT = `/privacy`;
export const ROUTING_INFO_DISTRIBUTOR = `${ROUTING_INFO}/distributor`;
export const ROUTING_INFO_HALIO_DISTRIBUTOR = `${ROUTING_INFO_DISTRIBUTOR}/halio`;
export const ROUTING_FAQ = '/faq';
export const ROUTING_PRODUCT_MANUAL = '/product-manual';
export const ROUTING_ARTICLE_DETAIL_PATH = `${ROUTING_PRODUCT_MANUAL}/article`;
export const ROUTING_ARTICLE_DETAIL = `${ROUTING_ARTICLE_DETAIL_PATH}/:articleSlug`;
export const ROUTING_ARTICLE_LIST = `${ROUTING_PRODUCT_MANUAL}/:topicSlug`;

// export const ROUTING_INFO_CAREERS = `${ROUTING_INFO}/careers`;
export const ROUTING_INFO_GIVE_GIFT_CARD = `${ROUTING_INFO}/give-gift-card`;
export const ROUTING_INFO_BUY_ON_APP = `${ROUTING_INFO}/buy-on-app`;
export const ROUTING_INFO_BUY_ON_WEB = `${ROUTING_INFO}/buy-on-web`;
export const ROUTING_INFO_SHIPPING_FEE = `${ROUTING_INFO}/shipping-fee`;
export const ROUTING_INFO_DELIVERY_AND_PAYMENT = `${ROUTING_INFO}/delivery-and-payment`;
export const ROUTING_INFO_RECEIVE_TIME = `${ROUTING_INFO}/receive-time`;
export const ROUTING_INFO_RECEIVE_AND_REDEEM = `${ROUTING_INFO}/receive-and-return`;
export const ROUTING_INFO_GUARANTEE = `${ROUTING_INFO}/guarantee`;

// export const ROUTING_INFO_QUESTION_ABOUT_US = `${ROUTING_INFO}/question-about-us`;

export const ROUTING_INFO_QUESTION_RECEIVE_GIFT = `${ROUTING_INFO}/question-receive-gift`;
export const ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS = `${ROUTING_INFO}/question-invite-friends-get-rewards`;
export const ROUTING_INFO_QUESTION_GIFT_CARD_2019 = `${ROUTING_INFO}/gift-card-2019`;
export const ROUTING_INFO_MAKEOVER = `${ROUTING_INFO}/makeover`;
export const ROUTING_INFO_MASK_BAR = `${ROUTING_INFO}/mask-bar`;
export const ROUTING_INFO_SKIN_TEST = `${ROUTING_INFO}/skin-test`;
export const ROUTING_INFO_RECOMMEND = `${ROUTING_INFO}/recommend`;

/** Search */
export const ROUTING_SEARCH_PATH = '/search';
export const ROUTING_SEARCH_DETAIL = `${ROUTING_SEARCH_PATH}/:keyWordSearch`;

/** Special deals */
export const ROUTING_SPECIAL_DEALS = '/special-deals';
export const ROUTING_SPECIAL_DEAL_DETAIL_OLD = `${ROUTING_SPECIAL_DEALS}/:idSpecialDeal`;
export const ROUTING_SPECIAL_DEAL_DETAIL = `/lixiboxgwp`;
/** Gift with purchase */
export const ROUTING_GWP_INDEX = `/gwp`;
export const ROUTING_GWP_DETAIL = `${ROUTING_SPECIAL_DEAL_DETAIL}/:gwpSlug`;

/** Orders */
export const ROUTING_ORDERS = '/orders';
export const ROUTING_ORDERS_TRACKINGS_PATH = `${ROUTING_ORDERS}/trackings`;
export const ROUTING_ORDERS_TRACKINGS = `${ROUTING_ORDERS_TRACKINGS_PATH}/:idNumber`;

/** Loves */
export const ROUTING_LOVE = '/love';
export const ROUTING_LOVES = '/loves';
export const ROUTING_LOVES_NEW = `${ROUTING_LOVES}/new`;

/** Invite - Referal */
export const ROUTING_REFERAL_PATH = '/invite';
export const ROUTING_REFERAL = `${ROUTING_REFERAL_PATH}/:referalCode`;

/** Tracking Expert */
export const ROUTING_TRACKING_EXPERT_PATH_PRE = '/ex';
export const ROUTING_TRACKING_EXPERT_PATH = '/ex/reviews';
export const ROUTING_TRACKING_EXPERT = `${ROUTING_TRACKING_EXPERT_PATH}/:trackingCode`;

/** Redeem */
export const ROUTING_REDEEM_PATH = `/redeem`;
export const ROUTING_SPECIAL_REDEEM_PATH = `${ROUTING_REDEEM_PATH}/hot`;
export const ROUTING_USER_REDEEM_PATH = `${ROUTING_REDEEM_PATH}/recommendation`;
export const ROUTING_LATEST_REDEEM_PATH = `${ROUTING_REDEEM_PATH}/latest`;

/** Brand mobile */
export const ROUTING_MOBILE_BRAND_PATH = '/mobile-brand';

/** Community */
export const ROUTING_COMMUNITY_PATH = '/community';
export const ROUTING_COMMUNITY_DETAIL_PATH = `${ROUTING_COMMUNITY_PATH}/:feedId`;
export const ROUTING_COMMUNITY_TAG_PATH = `${ROUTING_COMMUNITY_PATH}/tag`;
export const ROUTING_COMMUNITY_TAG_DETAIL = `${ROUTING_COMMUNITY_TAG_PATH}/:hashtag`;
export const ROUTING_COMMUNITY_COLLECTION_PATH = `${ROUTING_COMMUNITY_PATH}/collection`; // TODO: Remove, obsolete
export const ROUTING_COMMUNITY_UNBOXING_PATH = `${ROUTING_COMMUNITY_PATH}/unboxing`;
export const ROUTING_COMMUNITY_UNBOXING_FEEDBACK = `${ROUTING_COMMUNITY_UNBOXING_PATH}/feedbacks`;
export const ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW = `${ROUTING_COMMUNITY_UNBOXING_FEEDBACK}/new`;
export const ROUTING_COMMUNITY_UNBOXING_GUIDE_LINE = `${ROUTING_COMMUNITY_PATH}/unboxing/guide-line`;
export const ROUTING_COMMUNITY_COLLECTION_DETAIL = `${ROUTING_COMMUNITY_COLLECTION_PATH}/:collectionId`;
export const ROUTING_COMMUNITY_QUESTION_ANSWER_PATH = `${ROUTING_COMMUNITY_PATH}/question-answer`;
export const ROUTING_COMMUNITY_USER_FEED_PATH = `${ROUTING_COMMUNITY_PATH}/user`;
export const ROUTING_COMMUNITY_USER_FEED_DETAIL = `${ROUTING_COMMUNITY_USER_FEED_PATH}/:userReferralCode`;
export const ROUTING_COMMUNITY_BEST_DEALS_PATH = `${ROUTING_COMMUNITY_PATH}/best-deals`;
export const ROUTING_COMMUNITY_FEEDBACK = `${ROUTING_COMMUNITY_PATH}/feedback`; // Retained for backward compatibility
export const ROUTING_COMMUNITY_FEEDBACK_CREATE = `${ROUTING_COMMUNITY_FEEDBACK}/create`; // Retained for backward compatibility
export const ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH = `${ROUTING_COMMUNITY_PATH}/feedback/edit`;
export const ROUTING_COMMUNITY_FEEDBACK_EDIT = `${ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH}/:feedbackId`;
export const ROUTING_COMMUNITY_FEEDBACKS = `${ROUTING_COMMUNITY_PATH}/feedbacks`;
export const ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS = `${ROUTING_COMMUNITY_FEEDBACKS}/submitted`;
export const ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT = `${ROUTING_COMMUNITY_FEEDBACKS}/to-submit`;
export const ROUTING_COMMUNITY_NEW_FEEDBACK = `${ROUTING_COMMUNITY_FEEDBACKS}/new/:productId`;
export const ROUTING_COMMUNITY_TOP_HASH_TAG = `${ROUTING_COMMUNITY_PATH}/top-hash-tag`;
export const ROUTING_COMMUNITY_HOT_BOXES = `${ROUTING_COMMUNITY_PATH}/top-hot-boxes`;
export const ROUTING_COMMUNITY_GODD_SALE = `${ROUTING_COMMUNITY_PATH}/top-good-sale`;
export const ROUTING_COMMUNITY_TOP_REVIEW = `${ROUTING_COMMUNITY_PATH}/top-review`;
export const ROUTING_COMMUNITY_TOP_LIKED = `${ROUTING_COMMUNITY_PATH}/top-liked`;
export const ROUTING_ORDER_FEEDBACK = `${ROUTING_COMMUNITY_PATH}/feedbacks/:feedbackId`;

/** LIVE STREAM */
export const ROUTING_COMMUNITY_LIVE = `${ROUTING_COMMUNITY_PATH}/live`;
export const ROUTING_COMMUNITY_LIVE_DETAIL = `${ROUTING_COMMUNITY_LIVE}/:id`;

/** Reviews */
export const ROUTING_REVIEWS_PATH = `/feedbacks/:feedbackId`;

/** Pay */
export const ROUTING_PAY_PATH = `/pay`;
export const ROUTING_PAY = `${ROUTING_PAY_PATH}/:number`;

/** Mobile - deep link */
export const ROUTING_MOBILE_DEEPLINK = '/mobile';

/** HOT LINK */
export const ROUTING_HOT_LINK_HALIO = '/halio';
export const ROUTING_HOT_LINK_HALIO_SENSITIVE_WITHOUT_SLASH = '/halio-sensitive'; // Redirect to '/halio/sensitive/baby-pink'
export const ROUTING_HOT_LINK_HALIO_SENSITIVE = '/halio/sensitive'; // Redirect to '/halio/sensitive/baby-pink'

export const ROUTING_HOT_LINK_HALIO_SENSITIVE_PINK_SHORT = '/sensitive';
export const ROUTING_HOT_LINK_HALIO_SENSITIVE_MINT_SHORT = '/sensitive-mint';

export const ROUTING_HOT_LINK_HALIO_SENSITIVE_PINK_REAL = '/halio/sensitive/baby-pink';
export const ROUTING_HOT_LINK_HALIO_SENSITIVE_MINT_REAL = '/halio/sensitive/mint';

export const ROUTING_HOT_LINK_HALIO_DETAIL = `${ROUTING_HOT_LINK_HALIO}/:id`;

export const ROUTING_HOT_LINK_LUSTRE = '/lustre';
export const ROUTING_HOT_LINK_LUSTRE_PRODUCT = `${ROUTING_HOT_LINK_LUSTRE}/:productId`; // NOTE: Not yet implemented
export const ROUTING_HOT_LINK_OKAME = '/okame';

/** HALIO PRIVATE ACCESS TRADE */
export const ROUTING_HALIO_PRIVATE_ACCESSS_TRADE = '/haliogiatot';

/** RE ORDER */
export const ROUTING_RE_ORDER_PATH = `/re-order`;
export const ROUTING_RE_ORDER_DETAIL = `${ROUTING_RE_ORDER_PATH}/:idGroup`;

/** GAME */
export const ROUTING_GAME = `/games`;
export const ROUTING_GAME_BEAUTY_HUNTER = `${ROUTING_GAME}/beauty-hunter`;
export const ROUTING_GAME_BEAUTY_HUNTER_PLAY = `${ROUTING_GAME_BEAUTY_HUNTER}/play`;
export const ROUTING_GAME_BEAUTY_HUNTER_RESULT = `${ROUTING_GAME_BEAUTY_HUNTER}/result`;

/** DISCOUNT CODE */
export const ROUTING_DISCOUNT_CODE_PATH = '/discount-code';
export const ROUTING_VOUCHERS_PATH = '/my-vouchers';
export const ROUTING_DISCOUNT_CODE_DETAIL = `${ROUTING_DISCOUNT_CODE_PATH}/:discountCode`;
export const ROUTING_DISCOUNT_CODE_CATEGORY_BOXES = `${ROUTING_DISCOUNT_CODE_DETAIL}/:boxCategory`;

/** SUPPORT */
export const ROUTING_SUPPORT_CENTER_PATH = '/support-center';

/** STORE */
export const ROUTING_STORE_INDEX = '/stores';
export const ROUTING_STORE_MAP = '/store';

/** DUMMY */
export const ROUTING_DUMMY = '/dummy';

export const ROUTING_HOT_DEAL = '/hot-deal';

/** 404 */
export const ROUTING_NOT_FOUND = '/404';
