import {
  ROUTING_INFO_MAKEOVER,
  ROUTING_INFO_MASK_BAR,
  ROUTING_INFO_SKIN_TEST,
  ROUTING_COMMUNITY_PATH,
  ROUTING_COMMUNITY_UNBOXING_PATH,
  ROUTING_COMMUNITY_BEST_DEALS_PATH,
  ROUTING_MAGAZINE,
  ROUTING_MAGAZINE_CATEGORY_PATH,
  ROUTING_USER_INVITE,
  ROUTING_SHOP_GIFT_CATEGORY,
  ROUTING_SHOP_BEAUTY_CATEGORY
} from '../../../routings/path';
import { IProps, IState } from './model';
import tracking from './tracking';

import { BANNER_ID } from '../../../constants/application/default';
import { objectToHash } from '../../../utils/encode';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

export const DEFAULT_PROPS = {
  fixHeader: false,
  listMenu: []
} as IProps;

export const INITIAL_STATE = {
  alphaBetBrandSelected: '',
  idShoppingCat: 'menu-product-0',
  subMenuDesktop: {
    show: false,
    id: ''
  },
  listCategoryReject: [841, 992, 844],
  isActiveMenu: false,
  listRootNavigation: [
    {
      id: 'gift',
      link: `${ROUTING_SHOP_GIFT_CATEGORY}`,
      title: 'SHOP GIFTS',
      isHighLight: true
    },
    {
      id: 'category',
      link: `${ROUTING_SHOP_BEAUTY_CATEGORY}`,
      title: 'SHOP BEAUTY',
      tracking: (type) => 'function' === typeof tracking[type] && tracking[type](1),
      isHighLight: false
    },
    // {
    //   id: 'momAndBaby',
    //   link: '/category/mom-and-baby',
    //   title: 'Shop Mẹ & Bé',
    //   isHighLight: false
    //   icon: 'color-community'
    // },
    // {
    //   id: 'new',
    //   link: '/category/new-beauty-box',
    //   title: 'NEW',
    //   isHighLight: false
    // },

    {
      id: 'special',
      link: '#',
      title: 'ƯU ĐÃI',
      isHighLight: false
    },
    {
      id: 'brand',
      link: '#',
      title: 'THƯƠNG HIỆU',
      isHighLight: false
    },
    {
      id: 'invite',
      link: `${ROUTING_USER_INVITE}`,
      title: 'GIỚI THIỆU BẠN BÈ',
      isHighLight: true
    },
    // {
    //   id: 'service',
    //   link: '#',
    //   title: 'STORE & SERVICE'
    // },
    {
      id: 'magazine',
      link: `${ROUTING_MAGAZINE}`,
      title: 'MAGAZINE',
      isHighLight: false
    },
    {
      id: 'community',
      link: `${ROUTING_COMMUNITY_PATH}`,
      title: 'FEED',
      isHighLight: true,
      icon: 'youtube'
    }
  ]
} as IState;

export const MENU_IMAGE_CONFIG = {
  BOX: [
    {
      id: 1,
      img: CDN_ASSETS_PREFIX('/menu/box-0-1.jpg'),
      link: '/category/new-beauty-box',
      title: 'New Beauty Box'
    },
    {
      id: 2,
      img: CDN_ASSETS_PREFIX('/menu/box-0-2.jpg'),
      link: '/category/best-selling-beauty-box',
      title: 'Shop - Best Sellers'
    },
    {
      id: 3,
      img: CDN_ASSETS_PREFIX('/menu/box-0-3.jpg'),
      link: '/category/acne-beauty-box',
      title: 'Shop - ACNE Treatment'
    }
  ],
  CAT: {
    428: {
      3: {
        id: 428,
        size: 'small',
        img: CDN_ASSETS_PREFIX('/menu/box-1-1.jpg'),
        content: [
          {
            link: '/category/lips',
            title: 'Shop: Lip Stick Dupes'
          }
        ]
      }
    },
    429: {
      3: {
        id: 429,
        size: 'small',
        img: CDN_ASSETS_PREFIX('/menu/box-2-1.jpg'),
        content: [
          {
            link: '/category/lips',
            title: 'Shop: Anti Aging'
          }
        ]
      }
    },
    430: {
      3: {
        id: 430,
        img: CDN_ASSETS_PREFIX('/menu/box-3-1.jpg'),
        content: [
          {
            link: '/category/hair',
            title: 'Shop: Hair Care'
          },
          {
            link: '/category/bath-body',
            title: 'Shop: Body Scrub'
          }
        ]
      }
    },
    421: {
      2: {
        id: 4213,
        img: CDN_ASSETS_PREFIX('/menu/box-5-1.jpg'),
        content: [
          {
            link: '/category/brush',
            title: 'Shop: Lustre'
          }
        ]
      },
      3: {
        id: 4214,
        img: CDN_ASSETS_PREFIX('/menu/box-5-2.jpg'),
        content: [
          {
            link: '/search/halio',
            title: 'Shop: Halio'
          }
        ]
      }
    }
  },
  BRAND: {
    id: 'brand',
    menu: [],
    banner: [
      {
        id: 101,
        img: CDN_ASSETS_PREFIX('/menu/brand-6.jpg'),
        content: [
          {
            isExternalLink: true,
            link: `https://lixibox.app/HalioBrand_5629`,
            title: 'Brand: Halio'
          }
        ]
      },
      {
        id: 102,
        img: CDN_ASSETS_PREFIX('/menu/brand-7.jpg'),
        content: [
          {
            isExternalLink: true,
            link: `https://lixibox.app/HemiBrand_5630`,
            title: 'Brand: Hemi'
          },
          {
            isExternalLink: true,
            link: `https://lixibox.app/LustreBrand_5631`,
            title: 'Brand: Lustre'
          }
        ]
      },
      {
        id: 103,
        img: CDN_ASSETS_PREFIX('/menu/brand-8.jpg'),
        content: [
          {
            isExternalLink: true,
            link: `https://lixibox.app/TheAuraginsBrand_5633`,
            title: 'Brand: Auragins'
          },
          {
            isExternalLink: true,
            link: `https://lixibox.app/OkameBrand_5632`,
            title: 'Brand: Okame'
          }
        ]
      }
    ]
  },
  NEW: {
    id: 'new',
    menu: [
      {
        id: 201,
        link: '/category/new-beauty-box',
        title: 'BEAUTY BOX'
      },
      {
        id: 202,
        link: '/category/new-makeup',
        title: 'MAKEUP'
      },
      {
        id: 203,
        link: '/category/new-skin-care',
        title: 'SKINCARE'
      },
      {
        id: 204,
        link: '/category/bath-body',
        title: 'BATH & BODY'
      },
      {
        id: 2041,
        link: '/category/hair',
        title: 'HAIR'
      },
      {
        id: 205,
        link: '/category/tools-accessories',
        title: 'TOOLS & BRUSHES'
      },
      {
        id: 206,
        link: '/search/FRAGRANCE',
        title: 'FRAGRANCE'
      },
      // {
      //   id: 207,
      //   link: '/',
      //   title: 'FOR MEN'
      // },
      {
        id: 208,
        link: '/search/mini',
        title: 'MINI SIZE'
      }
    ],
    banner: [
      {
        id: 201,
        img: CDN_ASSETS_PREFIX('/menu/new-1.jpg'),
        content: [
          {
            link: '/category/moisturizer',
            title: 'New: Quench'
          }
        ]
      },
      {
        id: 202,
        img: CDN_ASSETS_PREFIX('/menu/new-2.jpg'),
        content: [
          {
            link: '/search/mini',
            title: 'New: Mini Size'
          }
        ]
      },
      {
        id: 203,
        img: CDN_ASSETS_PREFIX('/menu/new-3.jpg'),
        content: [
          {
            link: '/category/new-beauty-box',
            title: 'New: Lixibox Favorites'
          },
          {
            link: '/category/best-selling-beauty-box',
            title: 'Brand: Beauty Rising Stars'
          }
        ]
      }
    ]
  },
  SPECIAL: {
    id: 'special',
    menu: [],
    banner: [
      {
        id: 303,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-10.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://lixibox.app/FreeQuaDen2Trieu-MuaNgay_6361',
            title: 'Quà tặng kèm đơn hàng - Free quà đến 2 triệu'
          }
        ]
      },
      {
        id: 301,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-1.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://lixibox.app/UuDai70-MuaNgay_4669',
            title: 'Săn Sale 70%'
          }
        ]
      },
      {
        id: 302,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-11.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://www.lixibox.com/theme/pha-co-san-sale-free-qua-2-trieu?utm_campaign=PhaCo-SanQua2Trieu&utm_id=6474&utm_medium=banner&utm_source=community',
            title: 'Ở nhà chăm da'
          }
        ]
      }
    ]
  },
  GIFT: {
    id: 'gift',
    menu: [],
    banner: [
      {
        id: 303,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-10.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://lixibox.app/FreeQuaDen2Trieu-MuaNgay_6361',
            title: 'Quà tặng kèm đơn hàng - Free quà đến 2 triệu'
          }
        ]
      },
      {
        id: 301,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-1.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://lixibox.app/UuDai70-MuaNgay_4669',
            title: 'Săn Sale 70%'
          }
        ]
      },
      {
        id: 302,
        img: CDN_ASSETS_PREFIX('/menu/best-deal-11.jpg'),
        content: [
          {
            isExternalLink: true,
            link: 'https://www.lixibox.com/theme/pha-co-san-sale-free-qua-2-trieu?utm_campaign=PhaCo-SanQua2Trieu&utm_id=6474&utm_medium=banner&utm_source=community',
            title: 'Ở nhà chăm da'
          }
        ]
      }
    ]
  },
  MOM_BABY: {
    id: 'momBaby',
    menu: [],
    banner: [
      {
        id: 9000 /** TODO: Random ID? */,
        img: CDN_ASSETS_PREFIX('/menu/be_mac.jpg'),
        content: [
          {
            link: '/category/be-mac',
            title: 'Bé mặc'
          }
        ]
      },
      {
        id: 9001,
        img: CDN_ASSETS_PREFIX('/menu/be_ngu.jpg'),
        content: [
          {
            link: '/category/be-ngu',
            title: 'Bé ngủ'
          }
        ]
      }
    ]
  },
  SERVICE: {
    id: 'service',
    menu: [
      {
        id: 501,
        link: ROUTING_INFO_MAKEOVER,
        title: 'MakeOver'
      },
      {
        id: 402,
        link: ROUTING_INFO_SKIN_TEST,
        title: 'Skin Test'
      },
      {
        id: 403,
        link: ROUTING_INFO_MASK_BAR,
        title: 'Mask Bar'
      }
      // {
      //   id: 404,
      //   link: '',
      //   title: 'Cửa hàng LIXIBOX'
      // }
    ],
    banner: [
      {
        id: 401,
        img: CDN_ASSETS_PREFIX('/menu/service-1.jpg'),
        content: [
          {
            link: ROUTING_INFO_MAKEOVER,
            title: 'Service: MakeOver'
          }
        ]
      },
      {
        id: 402,
        img: CDN_ASSETS_PREFIX('/menu/service-2.jpg'),
        content: [
          {
            link: ROUTING_INFO_SKIN_TEST,
            title: 'Service: Skin Test'
          }
        ]
      },
      {
        id: 403,
        img: CDN_ASSETS_PREFIX('/menu/service-3.jpg'),
        content: [
          {
            link: ROUTING_INFO_MASK_BAR,
            title: 'Service: Mask Bar'
          }
        ]
      }
    ]
  },
  MAGAZINE: {
    id: 'magazine',
    menu: [
      {
        id: 601,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/makeup`,
        title: 'MAKEUP'
      },
      {
        id: 602,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/skincare`,
        title: 'SKINCARE'
      },
      {
        id: 603,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/inspiration`,
        title: 'INSPIRATION'
      },
      {
        id: 604,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/ingredient`,
        title: 'INGREDIENT'
      },
      {
        id: 605,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/brand`,
        title: 'BRAND'
      },
      {
        id: 606,
        link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/expert-s-review`,
        title: "USER'S REVIEW"
      }
    ]
  },

  COMMUNITY: {
    id: 'community',
    menu: [
      {
        id: 701,
        link: `${ROUTING_COMMUNITY_PATH}`,
        title: 'NEW FEEDS'
      },
      {
        id: 702,
        link: `${ROUTING_COMMUNITY_UNBOXING_PATH}`,
        title: 'UNBOXING'
      },
      {
        id: 703,
        link: `${ROUTING_COMMUNITY_BEST_DEALS_PATH}`,
        title: 'BEST DEALS'
      }
    ]
  }
};

export const alphabetSameScroll = ['U', 'V', 'W', 'Y'];

export const MOM_BABY_MENU_BANNER_PARAMS = {
  idBanner: BANNER_ID.MOM_BABY_MENU_BANNER,
  limit: 2
};
export const MOM_BABY_MENU_BANNER_HASH = objectToHash(MOM_BABY_MENU_BANNER_PARAMS);

export const BEST_DEAL_MENU_BANNER_LIMIT = 3;
export const BEST_DEAL_MENU_BANNER_PARAMS = {
  idBanner: BANNER_ID.BEST_DEAL_MENU_BANNER,
  limit: 3
};
export const BEST_DEAL_MENU_BANNER_HASH = objectToHash(BEST_DEAL_MENU_BANNER_PARAMS);

export const SHOP_GIFT_MENU_BANNER_LIMIT = 3;
export const SHOP_GIFT_MENU_BANNER_PARAMS = {
  idBanner: BANNER_ID.SHOP_GIFT_MENU_BANNER,
  limit: 3
};
export const SHOP_GIFT_MENU_BANNER_HASH = objectToHash(SHOP_GIFT_MENU_BANNER_PARAMS);

export const BRANDS_MENU_BANNER_LIMIT = 3;
export const BRANDS_MENU_BANNER_PARAMS = {
  idBanner: BANNER_ID.BRANDS_MENU_BANNER,
  limit: 3
};
export const BRANDS_MENU_BANNER_HASH = objectToHash(BRANDS_MENU_BANNER_PARAMS);
