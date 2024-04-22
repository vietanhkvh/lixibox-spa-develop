import { reduxRender } from 'utils/test-utils';
import FeedbackSummaryRatings from '..';

const ratings = [
  {
    title: 'chất lượng sản phẩm',
    slug: 'chat_luong_san_pham',
    score: 4.77
  },
  {
    title: 'giá trị',
    slug: 'gia_tri',
    score: 4.77
  },
  {
    title: 'trải nghiệm người dùng',
    slug: 'trai_nghiem_nguoi_dung',
    score: 4.7
  }
];

const component = (params = {}) => {
  const props = {
    ratings
  };

  return <FeedbackSummaryRatings {...Object.assign({}, props, params)} />;
};

describe('FeedbackSummaryRatings', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
