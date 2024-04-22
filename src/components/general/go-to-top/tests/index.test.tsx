jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import GoToTop from '..';

const component = (params = {}) => {
  const props = {};

  return <GoToTop {...Object.assign({}, props, params)} />;
};

describe('GoToTop', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
