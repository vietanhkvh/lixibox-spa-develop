jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FAQArticleDetail from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    content: 'Test content'
  };

  return <FAQArticleDetail {...Object.assign({}, props, params)} />;
};

describe('FAQArticleDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
