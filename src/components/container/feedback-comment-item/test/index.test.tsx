import { reduxRender } from 'utils/test-utils';
import FeedbackCommentItem from '..';

const component = (params = {}) => {
  const props = {
    comment: {} as any
  };

  return <FeedbackCommentItem {...Object.assign({}, props, params)} />;
};

describe('FeedbackCommentItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
