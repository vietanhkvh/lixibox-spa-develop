/**
 * Default pagination value
 */
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  SUM: 72,
  SORT: 'newest'
};

/**
 * Category filter
 *
 * url from browser: /makeup_chanel_lv_200k-300k_newest_page-3
 * api query: /makeup.json?page=3&bids=lv%2Cchanel&pl=100&ph=200&sort=wprice-desc
 */
export const CATEGORY_FILTER = {
  idCategory: {
    key: 'idCategory'
  },
  price: {
    pattern: /\d*k-\d*k/,

    minPrice: {
      key: 'minPrice',
      apiQuery: 'pl'
    },
    maxPrice: {
      key: 'maxPrice',
      apiQuery: 'ph'
    }
  },
  sort: {
    key: 'sort',
    value: [
      {
        key: 'newest',
        title: 'Mới nhất',
        icon: 'time',
        selected: false
      },
      {
        key: 'price-asc',
        title: 'Giá tăng dần',
        icon: 'arrow-up',
        selected: false
      },
      {
        key: 'price-desc',
        title: 'Giá giảm dần',
        icon: 'arrow-down',
        selected: false
      }
    ],
    apiQuery: 'sort'
  },
  page: {
    key: 'page',
    pattern: /page-\d*/,
    textReplace: 'page-',
    apiQuery: 'page'
  },
  brand: {
    key: 'brand',
    apiQuery: 'bids'
  }
};

/**
 * Define category filter default
 * @param page 1
 * @param sort newest
 */
export const CATEGORY_FILTER_DEFAULT = [
  {
    key: 'sort',
    value: 'newest'
  },
  {
    key: 'page',
    value: 1
  },
  {
    key: 'perPage',
    value: 72
  }
];
