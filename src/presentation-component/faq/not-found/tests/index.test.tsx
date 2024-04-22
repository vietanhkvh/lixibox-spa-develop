jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FAQNotFound from '..';

const component = (params = {}) => {
  const props = {};

  return <FAQNotFound {...Object.assign({}, props, params)} />;
};

describe('FAQNotFound', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
