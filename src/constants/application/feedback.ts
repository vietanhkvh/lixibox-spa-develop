import {
  ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS,
  ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT,
  ROUTING_COMMUNITY_PATH,
  ROUTING_COMMUNITY_UNBOXING_PATH,
  ROUTING_COMMUNITY_BEST_DEALS_PATH
} from '../../routings/path';

export const FEEDBACK_TYPE_VALUE = {
  true: {
    title: 'Box'
  },
  false: {
    title: 'Box'
  }
};

export const FEEDBACK_TABS = [
  {
    id: 'submittedFeedbacks',
    title: 'Sản phẩm đã đánh giá',
    link: ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS
  },
  {
    id: 'feedbacksToSubmit',
    title: 'Sản phẩm chờ đánh giá',
    link: ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT
  }
];

export const MAX_FEEDBACK_IMAGE_COUNT = 10;

export const FEEDBACK_MOBILE_TABS = [
  {
    id: 0,
    code: 'new',
    title: 'Mới nhất',
    link: ROUTING_COMMUNITY_PATH
  },
  {
    id: 1,
    code: 'unboxing',
    title: 'Đập hộp',
    link: ROUTING_COMMUNITY_UNBOXING_PATH
  },
  {
    id: 2,
    code: 'from-lixibox',
    title: 'Từ Lixibox',
    link: ROUTING_COMMUNITY_BEST_DEALS_PATH
  }
];
