import { IMobileToolbarProps, IMobileToolbarState } from './model';

import * as ROUTINGS from '../../../routings/path';

export const DEFAULT_PROPS = {} as IMobileToolbarProps;
export const INITIAL_STATE = {
  includedInComponent: [
    ROUTINGS.ROUTING_SHOP_INDEX,
    ROUTINGS.ROUTING_PROMOTION,

    ROUTINGS.ROUTING_COMMUNITY_PATH,
    ROUTINGS.ROUTING_COMMUNITY_UNBOXING_PATH,
    ROUTINGS.ROUTING_COMMUNITY_BEST_DEALS_PATH,
    ROUTINGS.ROUTING_COMMUNITY_LIVE,

    ROUTINGS.ROUTING_MAGAZINE,
    ROUTINGS.ROUTING_USER,
    ROUTINGS.ROUTING_PRODUCT_CATEGORY_PATH
  ],
  listNav: [
    {
      id: 1,
      title: 'Mua sắm',
      code: 'home',
      icon: 'cart',
      selected: [ROUTINGS.ROUTING_SHOP_INDEX],
      link: ROUTINGS.ROUTING_SHOP_INDEX
    },
    {
      id: 2,
      title: 'Ưu đãi',
      code: 'promotion',
      icon: 'gift',
      selected: [ROUTINGS.ROUTING_PROMOTION],
      link: ROUTINGS.ROUTING_PROMOTION
    },
    {
      id: 3,
      title: 'Feed',
      code: 'feed',
      icon: 'message-heart',
      selected: [
        ROUTINGS.ROUTING_COMMUNITY_PATH,
        ROUTINGS.ROUTING_COMMUNITY_UNBOXING_PATH,
        ROUTINGS.ROUTING_COMMUNITY_BEST_DEALS_PATH,
        ROUTINGS.ROUTING_COMMUNITY_LIVE
      ],
      link: ROUTINGS.ROUTING_COMMUNITY_PATH
    },
    {
      id: 4,
      title: 'Magazine',
      code: 'magazine',
      icon: 'magazine',
      selected: [ROUTINGS.ROUTING_MAGAZINE],
      link: ROUTINGS.ROUTING_MAGAZINE
    },
    {
      id: 5,
      title: 'Tài khoản',
      code: 'user',
      icon: 'user',
      selected: [ROUTINGS.ROUTING_USER],
      link: ROUTINGS.ROUTING_USER
    }
  ]
} as IMobileToolbarState;
