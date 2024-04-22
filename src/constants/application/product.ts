export const TAB_INFO_STATUS = {
  info: 1,
  usage: 2,
  ingredients: 3,
  reasonToSell: 4,
  brand: 5
};

export const BEST_SELLING_PARAMS = {
  idCategory: 'best-selling-beauty-box',
  limit: 25,
  params: [
    { key: 'page', value: 1 },
    { key: 'sort', value: 'newest' }
  ]
};

export const NEW_PRODUCT_PARAMS = {
  idCategory: 'new-products',
  limit: 25,
  params: [
    { key: 'page', value: 1 },
    { key: 'sort', value: 'newest' }
  ]
};

export const BADGE_POSITION_API_KEYS = ['top_left', 'top_right', 'bottom_left', 'bottom_right'];
