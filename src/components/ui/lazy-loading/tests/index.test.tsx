jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LazyLoading from '../component';

const component = (params = {}) => {
  const props = {};

  return <LazyLoading {...Object.assign({}, props, params)} />;
};

describe('LazyLoading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
