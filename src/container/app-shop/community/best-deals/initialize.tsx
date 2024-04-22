import { IProps, IState } from './model';

import {
  ROUTING_COMMUNITY_TOP_HASH_TAG,
  ROUTING_COMMUNITY_TOP_LIKED,
  ROUTING_COMMUNITY_TOP_REVIEW,
  ROUTING_COMMUNITY_HOT_BOXES,
  ROUTING_COMMUNITY_GODD_SALE
} from '../../../../routings/path';

export const DEFAULT_PROPS = {
  days: 7,
  limit: 10
} as IProps;

export const INITIAL_STATE = {
  isLoading: false,
  isFeebackFull: false,
  pageLoadMore: 1,
  topFeedList: [
    {
      id: 0,
      code: 'hash',
      title: 'Được đề cập nhiều nhất',
      icon: 'color-hash',
      link: ROUTING_COMMUNITY_TOP_HASH_TAG
    },
    {
      id: 1,
      code: 'communityTopLiked',
      title: 'Bài viết được bình chọn',
      link: ROUTING_COMMUNITY_TOP_LIKED
    },
    {
      id: 2,
      code: 'communityTopReview',
      title: 'Box đánh giá nhiều nhất',
      link: ROUTING_COMMUNITY_TOP_REVIEW
    },
    {
      id: 3,
      code: 'communityGoodSale',
      title: 'Đáng mua nhất tuần',
      link: ROUTING_COMMUNITY_GODD_SALE
    },
    {
      id: 4,
      code: 'communityHotBoxes',
      title: 'Box hot nhất tuần',
      link: ROUTING_COMMUNITY_HOT_BOXES
    }
  ]
} as IState;
