import {
  ROUTING_COMMUNITY_TOP_HASH_TAG,
  ROUTING_COMMUNITY_HOT_BOXES,
  ROUTING_COMMUNITY_GODD_SALE,
  ROUTING_COMMUNITY_TOP_REVIEW,
  ROUTING_COMMUNITY_TOP_LIKED
} from '../../routings/path';

export const DEAL_FEED = {
  ID: 'LIXIBOXBE23'
};

export const COMMUNITY_CATEGORY_NAME = {
  1: 'Mới nhất',
  2: 'Đập hộp',
  3: 'Từ Lixibox',
  4: 'Live'
};

export const TOP_STAT_NAV = [
  {
    id: 0,
    code: 'hash',
    title: 'Top được để cập nhiều nhất',
    url: ROUTING_COMMUNITY_TOP_HASH_TAG
  },
  {
    id: 1,
    code: 'communityTopLiked',
    title: 'Top bài viết được bình chọn',
    url: ROUTING_COMMUNITY_TOP_LIKED
  },
  {
    id: 2,
    code: 'communityTopReview',
    title: 'Top sản phẩm được đánh giá',
    url: ROUTING_COMMUNITY_TOP_REVIEW
  },
  {
    id: 3,
    code: 'communityGoodSale',
    title: 'Top sản phẩm đáng mua nhất tuần',
    url: ROUTING_COMMUNITY_GODD_SALE
  },
  {
    id: 4,
    code: 'communityHotBoxes',
    title: 'Top sản phẩm hot nhất tuần',
    url: ROUTING_COMMUNITY_HOT_BOXES
  }
];
