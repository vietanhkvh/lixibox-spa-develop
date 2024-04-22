export const GA_TRACKING_EVENT_CATEGORY = {
  /**
   * Tracking api respose time in client include network
   *
   * - category   : [API] Api response time (include network),
   * - action     : [Shop] Get Product Detail /Boxes/:id
   * - label      : /Boxes/halio-Sensitive-Facial-Cleansing-Massaging-Device-Mint
   * - value      : 500
   */
  API_RESPONSE_TIME: '[API] Api response time (include network)',
  API_RESPONSE_STATUS: '[API] Api response Status',

  FEATURE_EFFECTIVE: '[Feature] Measure the effectiveness of a particular feature',
  BEHAVIOR_IN_PAGE: '[Behavior] Action behavior in each page',

  EXCEPTION: '[Exception] The error occurs on the web',
  BACKGROUND: 'background',
  WEB_VITALS: 'Web Vitals'
};

export const GA_TRACKING_EVENT_ACTION = {
  //////////////////////////
  FEATURE_EFFECTIVE: {
    SUGGESTION_FEEDBACK_MODAL: '[Community] Suggestion feedback modal',
    SUGGESTION_FEEDBACK_STICKY: '[Community] Suggestion feedback sticky',
    CUSTOMER_CHAT: '[Footer] Facebook customer chat',
    BOX_DETAIL_PICTURE_VIEWER: '[Box Detail] View list of picture in box detail',
    MOBILE_NAVIGATION_TOOLBAR: '[General Mobile UI] Mobile Navigation Toolbar',
    CHECKOUT_BUY_LATER: '[Checkout] Buy later - Add to wish list',
    SEARCH_BOX: '[Header] Search suggestion',
    SHOP_MENU_DROPDOWN_VER_1: '[Header] SHOP menu dropdown',
    SHOP_MENU_DROPDOWN_VER_2: '[Header] SHOP menu dropdown v2',
    DESKTOP_NAVIGATION_IMAGES: '[Header] Desktop navigation images',
    FOOTER_BANNER_IMAGES: '[Footer] Banner images',
    DISCOUNT_CODE_IN_THEME: '[Theme pages] Discount code component',
    WISH_LIST_ACTION: '[General] Wish list action',
    PAYMENT_NEXT_STEP_NAVIGATION: '[Payment Pages] Next step Navigation',
    DISCOUNT_CODE_BEHAVIOR: '[Discount code] Discount code behavior',
    DETECT_DUPLICATE_API: '[API] Detect duplicate API',
    DESKTOP_MAIN_BANNER: '[Banner] Behavior on desktop main banner',
    DESKTOP_SHARE_BUTTON_BOX_DETAIL: '[Box Detail] Share button interaction',
    DESKTOP_SHARE_BUTTON_MAGAZINE_DETAIL: '[Magazine Detail] Share button interaction'
  },

  //////////////////////////
  BEHAVIOR_IN_PAGE: {
    LIXICOINS_PAGE: '[Behavior] Lixicoins page',
    COMMNUNITY_PAGE: '[Behavior] Community page page'
  },

  //////////////////////////
  EXCEPTION: {
    SENTRY: '[Exception] Sentry tracking',
    FORCE_RELOAD: '[Exception] Force reload whhen exception',
    UNEXPECTED_API_RESPONSE_401: '[Exception] User request was unexpectedly denied with 401 response',
    GENERAL: '[Exception] General exception',
    XSS_RISK: '[Exception] Detected XSS risk'
  },
  LOAD: 'load'
};

export const GA_TRACKING_EVENT_LABEL = {
  FEATURE_EFFECTIVE: {
    //////////////////////////
    SUGGESTION_FEEDBACK_MODAL: {
      SHOW_MODAL: 'Suggestion feedback modal: Show modal',
      VIEW_CONTENT: 'Suggestion feedback modal: View content'
    },

    //////////////////////////
    SUGGESTION_FEEDBACK_STICKY: {
      SHOW_STICKY: 'Suggestion feedback sticky: Show Sticky',
      STICKY_HOVER_ON: 'Suggestion feedback sticky: Hover On',
      VIEW_CONTENT: 'Suggestion feedback sticky: View content'
    },

    //////////////////////////
    CUSTOMER_CHAT: {
      OPEN: 'Facebook customer chat: Open',
      CLOSE: 'Facebook customer chat: Close'
    },

    /////////////////////////
    BOX_DETAIL_PICTURE_VIEWER: {
      HOVER: {
        MAIN_IMAGE: '[Picture in Box detail] Hover main image',
        ITEM_IMAGE: '[Picture in Box detail] Hover item image'
      },

      CLICK: {
        MAIN_IMAGE: '[Picture in Box detail] Click main image',
        ITEM_IMAGE: '[Picture in Box detail] Click item image',
        VIEW_MORE_IMAGE: '[Picture in Box detail] Click view more'
      },

      MODAL: {
        OPEN_MODAl: '[Picture in Box detail] Open picture modal',
        CLICK_LIXIBOX_IMAGE: `[Picture in Box detail] Click Lixibox's picture Tab`,
        CLICK_USER_IMAGE: `[Picture in Box detail] Click User's picture Tab`,
        VIEW_IMAGE: `[Picture in Box detail] View image in modal`
      }
    },

    //////////////////////////
    MOBILE_NAVIGATION_TOOLBAR: {
      CLICK_ITEM: '[General Mobile UI] Mobile Navigation Toolbar - Click: '
    },

    CHECKOUT_BUY_LATER: {
      BUY_LATER: '[Checkout - Buy later] Buy later',
      REMOVE: '[Checkout - Buy later] Remove product'
    },

    //////////////////////////
    SEARCH_BOX: {
      CLICK_BOX_SUGGESTION_RESULT: '[Header - Search suggestion] Click box result',
      CLICK_MAGAZINE_SUGGESTION_RESULT: '[Header - Search suggestion] Click magazine result',
      CLOSE_SUGGESTION_SEARCH_MODAL: '[Header - Search suggestion] Close modal',
      CLICK_POPULAR_KEYWORD: '[Header - Search suggestion] Click popular keyword',
      CLICK_HISTORY_KEYWORD: '[Header - Search suggestion] Click history keyword'
    },

    //////////////////////////
    SHOP_MENU_DROPDOWN_VER_1: {
      HOVER_LEVEL_1: '[Header - SHOP menu dropdown - v1] Hover level 1',
      HOVER_LEVEL_2: '[Header - SHOP menu dropdown - v1] Hover level 2',
      HOVER_LEVEL_3: '[Header - SHOP menu dropdown - v1] Hover level 3',
      CLICK_LEVEL_1: '[Header - SHOP menu dropdown - v1] Click level 1',
      CLICK_LEVEL_2: '[Header - SHOP menu dropdown - v1] Click level 2',
      CLICK_LEVEL_3: '[Header - SHOP menu dropdown - v1] Click level 3'
    },

    //////////////////////////
    SHOP_MENU_DROPDOWN_VER_2: {
      CLICK_ITEM: '[Header - SHOP menu dropdown - v2] Click Item - '
    },

    //////////////////////////
    DESKTOP_NAVIGATION_IMAGES: {
      CLICK_ON: '[Header - Desktop navigation images] Click: '
    },

    //////////////////////////
    FOOTER_BANNER_IMAGES: {
      CLICK_ON: '[Footer - Banner images] Click: '
    },

    DESKTOP_SHARE_BUTTON: {
      PRODUCT_DETAIL_CLICK_ON: '[Product detail] Click share button: ',
      MAGAZINE_DETAIL_CLICK_ON: '[Magazine detail] Click share button: '
    },

    //////////////////////////
    DISCOUNT_CODE_IN_THEME: {
      OPEN: '[Theme pages - Discount code component] Open modal',
      APPLY: '[Theme pages - Discount code component] Apply discount code'
    },

    //////////////////////////
    WISH_LIST_ACTION: {
      CLICK_ON_LIST_BOX_PAGE: '[General - Wish list action] Click on List box pages',
      CLICK_ON_ALL_PAGE: '[General - Wish list action] Click on all pages'
    },

    //////////////////////////
    PAYMENT_NEXT_STEP_NAVIGATION: {
      CLICK_ON_NAVIGATE_BUTTON: '[Payment Pages] Next step Navigation - Click on Navigate Button',
      CLICK_ON_BLOCK: '[Payment Pages] Next step Navigation - Click on Block'
    },

    //////////////////////////
    DISCOUNT_CODE_BEHAVIOR: {
      DISPLAY_ON_SCREEN: '[Discount code] Display on screen',
      ADD_CODE: '[Discount code] Add code',
      REMOVE_CODE: '[Discount code] Remove code'
    },

    DETECT_DUPLICATE_API: '[API] Detect duplicate API',

    DESKTOP_MAIN_BANNER: {
      NAVIGATION: '[Banner] Behavior on desktop main banner - Navigation - ', // Ex: 1 / 10
      ON_CLICK: '[Banner] Behavior on desktop main banner - On Click - ' // Ex: 1 / 10
    }
  },

  BEHAVIOR_IN_PAGE: {
    //////////////////////////
    LIXICOINS_PAGE: {
      VIEW_PAGE: 'View pages',
      CLICK_INFO_BENEFIT: 'Click Info / Benefit info',
      CLICK_INFO_EXPIRATION_DATE: 'Click Info / Expiration Date',
      CLICK_INFO_HISTORY: 'Click Info / Lixicoin History',
      CLICK_INFO_COIN_SAVING: 'Click Info / Coin Saving',
      CLICK_INFO_REDEEM: 'Click Info / Redeem',
      CLICK_INFO_UP_LEVEL: 'Click Info / Up Level',
      CLICK_COIN_SAVING_SHOP: 'Click Coin Saving / Shop',
      CLICK_COIN_SAVING_UNBOXING: 'Click Coin Saving / Unboxing',
      CLICK_COIN_SAVING_RATING: 'Click Coin Saving / Rating',
      CLICK_COIN_SAVING_INVITE: 'Click Coin Saving Invite friend',
      CLICK_FAQ: 'Click FAQ'
    },

    //////////////////////////
    COMMNUNITY_PAGE: {
      VIEW_PAGE: {
        NEW_FEEDS: '[View pages] New feeds',
        UNBOXING: '[View pages] Unboxing',
        BEST_DEALS: '[View pages] Best deals',
        FEED_DETAIL: '[View pages] Feed detail',

        LOAD_PAGE: '[View pages] Load page: ',

        USER_PROFILE: '[View pages] User profile'
      },

      MAIN_NAVIGATION: {
        FEED: '[Main Navigation]: Click New feeds',
        UNBOXING: '[Main Navigation]: Click Unboxing',
        BEST_DEALS: '[Main Navigation]: Click Unboxing',
        LIVE: '[Main Navigation]: Click Live Stream'
      },

      SUB_NAVIGATION: {
        USER_PROFILE: '[Sub Navigation]: Click User Profiles',
        BOX_RATING: '[Sub Navigation]: Box rating'
      },

      RIGHT_SIDEBAR: {
        TAG: '[Right Sidebar] Click Tag',
        SUGGESTION_CREATE_FEED: '[Right Sidebar] Suggestion Create Box'
      },

      CREATE_FEEDS_COMPONENT: {
        HEADING_TAB: {
          FEEDBACK: '[Create Feeds Component] Click Heading Tab - Create Feedback',
          UNBOXING: '[Create Feeds Component] Click Heading Tab - Create Unboxing'
        },

        CONTENT: {
          EDIT: '[Create Feeds Component] Change to edit mode',
          PLACEHOLDER: '[Create Feeds Component] Change to placeholder mode'
        }
      },

      FEED_COMPONENT: {
        LIKE: '[Feeds Component] Click Like',
        UN_LIKE: '[Feeds Component] Click Un Like',

        VIEW_COMMNENT: '[Feeds Component] Click View Message',
        POST_COMMENT: '[Feeds Component] Post Comment',

        SHARE_FEED: '[Feeds Component] Click Share feed',
        BOOKMARK_BOX: '[Feeds Component] Boommark Box',

        SHOW_MODAL_CONTENT: '[Feeds Component] Show modal content',
        RELATED_LINK: '[Feeds Component] Click to Related link',

        USER_PROFILE: '[Feeds Component] Click user profile',
        TIME: '[Feeds Component] Click time to view detail',

        CHANGE_IMAGE_LIST: '[Feeds Component] Chane image list in modal content'
      }
    }
  },

  EXCEPTION: {
    SENTRY: '[Exception - Sentry tracking] ',
    FORCE_RELOAD: '[Exception - Force reload whhen exception] ',
    GENERAL: '[Exception - General] ',
    XSS_RISK: '[Exception - XSS risk] '
  },

  GENERIC: {
    PRODUCT_DETAIL: 'Product detail'
  }
};
