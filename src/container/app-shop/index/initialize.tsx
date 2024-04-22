import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;
export const INITIAL_STATE = {
  isFetchedFeatureBanner: false,
  isFetchedHotBoxes: false,
  isFetchedMagazineList: false,
  isFetchedNewProducts: false,
  isFetchedPopularSearch: false,
  isFetchedWatchedList: false,
  isFetchedActivityFeed: false,
  isFetchedFooterBanner: false,
  isFetchedCountdown: false,
  isPriorotyBlock: true,
  isModalCategoryOpen: false
} as IState;

export const MOBILE_CATEGORY_MENU = [
  {
    id: 1,
    name: 'Beauty Box',
    slug: 'beauty-box'
  },
  {
    id: 2,
    name: 'Best Sellers',
    slug: 'bestsellers'
  },
  {
    id: 3,
    name: 'Makeup',
    slug: 'makeup'
  },
  {
    id: 4,
    name: 'Skin Care',
    slug: 'skin-care'
  },
  {
    id: 5,
    name: 'Bath & Body',
    slug: 'bath-body'
  },
  {
    id: 6,
    name: 'Hair',
    slug: 'hair'
  },
  {
    id: 7,
    name: 'New Products',
    slug: 'new-products'
  },
  {
    id: 8,
    name: 'Tools & Accessories',
    slug: 'tools-accessories'
  },
  {
    id: 9,
    name: 'Perfume',
    slug: 'perfume'
  }
];
