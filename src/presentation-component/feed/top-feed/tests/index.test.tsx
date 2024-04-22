jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import * as PATH from 'routings/path';
import TopFeed from '..';

const topFeedList = [
  {
    id: 0,
    code: 'hash',
    title: 'Được đề cập nhiều nhất',
    icon: 'color-hash',
    link: PATH.ROUTING_COMMUNITY_TOP_HASH_TAG
  },
  {
    id: 1,
    code: 'communityTopLiked',
    title: 'Bài viết được bình chọn',
    link: PATH.ROUTING_COMMUNITY_TOP_LIKED
  },
  {
    id: 2,
    code: 'communityTopReview',
    title: 'Box đánh giá nhiều nhất',
    link: PATH.ROUTING_COMMUNITY_TOP_REVIEW
  },
  {
    id: 3,
    code: 'communityGoodSale',
    title: 'Đáng mua nhất tuần',
    link: PATH.ROUTING_COMMUNITY_GODD_SALE
  },
  {
    id: 4,
    code: 'communityHotBoxes',
    title: 'Box hot nhất tuần',
    link: PATH.ROUTING_COMMUNITY_HOT_BOXES
  }
];

const component = (params = {}) => {
  const props = {
    list: topFeedList
  };

  return <TopFeed {...Object.assign({}, props, params)} />;
};

describe('TopFeed', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
