import { reduxRender } from 'utils/test-utils';
import FeedbackSummaryFeedbacks from '..';

const feedbacks = [
  {
    title: 'chất lượng sản phẩm',
    slug: 'chat_luong_san_pham',
    attitude: 'Positive',
    review:
      'Gel dưỡng ẩm này cung cấp độ ẩm tốt, giúp giảm mụn và làm sáng da. Ngoài ra, gel mỏng nhẹ, thấm nhanh và không gây bết dính, tạo cảm giác dịu nhẹ cho da.'
  },
  {
    title: 'Trải nghiệm người dùng',
    slug: 'Trai_nghiem_nguoi_dung',
    attitude: 'Positive',
    review:
      'Người dùng rất hài lòng với mùi dễ chịu, cảm giác mỏng nhẹ trên da và hiệu quả trong việc làm sáng da và giảm thâm mụn.'
  }
];

const component = (params = {}) => {
  const props = {
    feedbacks
  };

  return <FeedbackSummaryFeedbacks {...Object.assign({}, props, params)} />;
};

describe('FeedbackSummaryFeedbacks', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
