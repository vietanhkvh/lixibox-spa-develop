import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import ProductTabDelivery from '..';

const component = (params = {}) => {
  const props = {
    data: { boxId: 0 }
  };

  return withRouter((routerProps) => <ProductTabDelivery {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductTabDelivery', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
