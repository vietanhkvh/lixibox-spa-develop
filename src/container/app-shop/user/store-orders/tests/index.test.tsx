import { INITIAL_STATE_ORDER } from 'flows/order/reducer';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { withRouter } from 'react-router';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import StoreOrders from '../component';

const component = (params = {}) => {
  const props = {
    perPage: 20,
    userStore: INITIAL_STATE_USER,
    orderStore: INITIAL_STATE_ORDER,
    fetchUserStoreOrdersAction: jest.fn(),
    cancelOrderAction: jest.fn(),
    openModalAction: jest.fn(),
    getCancelOrderReasonAction: jest.fn()
  };

  return withRouter((routerProps) => <StoreOrders {...Object.assign({}, props, routerProps, params)} />);
};

describe('StoreOrders', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
