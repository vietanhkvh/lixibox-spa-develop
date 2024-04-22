import { reduxRender } from 'utils/test-utils';
import AllBrand from '../component';
jest.mock('app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const component = (params = {}) => {
  const props = {};

  return <AllBrand {...Object.assign({}, props, params)} />;
};

describe('Address', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
