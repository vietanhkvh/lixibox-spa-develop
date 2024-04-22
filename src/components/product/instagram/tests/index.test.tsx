jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductInstagram from '..';

const component = (params = {}) => {
  const props = {
    openModal: jest.fn(),
    list: []
  };

  return <ProductInstagram {...Object.assign({}, props, params)} />;
};

describe('ProductInstagram', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
