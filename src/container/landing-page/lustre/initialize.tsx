import { IProps, IState } from './model';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

export const DEFAULT_PROPS = {
  productTypeList: [
    {
      id: 1,
      name: 'HOT ITEM'
    },
    {
      id: 2,
      name: 'BEST SELL'
    }
  ],

  instagram: [
    {
      link: 'https://www.instagram.com/p/BWXC4dxgaX2/',
      img: CDN_ASSETS_PREFIX('/landing-page/halio/instagram1.jpg')
    },
    {
      link: 'https://www.instagram.com/p/BgjGpdYABFP/',
      img: CDN_ASSETS_PREFIX('/landing-page/halio/instagram2.jpg')
    },
    {
      link: 'https://www.instagram.com/p/BcL6paKgFvd/',
      img: CDN_ASSETS_PREFIX('/landing-page/halio/instagram3.jpg')
    },
    {
      link: 'https://www.instagram.com/p/BZ4_ERvgsZT/',
      img: CDN_ASSETS_PREFIX('/landing-page/halio/instagram4.jpg')
    }
  ]
} as IProps;

export const INITIAL_STATE = {
  positionProductType: 0
} as IState;
