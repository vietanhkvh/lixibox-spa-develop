export const sortKey = {
  default: 'default',
  newest: 'newest',
  'most-discount': 'most-discount',
  'price-asc': 'price-asc',
  'price-desc': 'price-desc',
  'best-seller': 'best-seller',
  'order-asc': 'order-asc',
  'order-desc': 'order-desc',
  'most-viewed': 'most-viewed'
};
export const defaultSortList = [
  {
    id: 1,
    key: sortKey['default'],
    title: 'Mặc định',
    selected: true
  },
  {
    id: 2,
    key: sortKey['newest'],
    title: 'Mới nhất',
    selected: false
  },
  {
    id: 3,
    key: sortKey['most-discount'],
    title: 'Giảm giá nhiều nhất',
    selected: false
  },
  {
    id: 4,
    key: sortKey['price-asc'],
    title: 'Giá tăng dần',
    selected: false
  },
  {
    id: 5,
    key: sortKey['price-desc'],
    title: 'Giá giảm dần',
    selected: false
  },
  {
    id: 6,
    key: sortKey['best-seller'],
    title: 'Bán chạy',
    selected: false
  }
];
export const defaultSortMagazine = [
  {
    id: 1,
    key: sortKey['default'],
    title: 'Mặc định',
    selected: true
  },
  {
    id: 2,
    key: sortKey['newest'],
    title: 'Mới nhất',
    selected: false
  },
  {
    id: 3,
    key: sortKey['order-asc'],
    title: 'Thứ tự A-Z',
    selected: false
  },
  {
    id: 4,
    key: sortKey['price-desc'],
    title: 'Thứ tự Z-A',
    selected: false
  },
  {
    id: 5,
    key: sortKey['most-viewed'],
    title: 'Xem nhiều nhất',
    selected: false
  }
];
