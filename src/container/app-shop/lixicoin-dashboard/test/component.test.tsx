import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_LIXICOIN } from 'flows/lixicoin/reducer';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import { INITIAL_STATE_SHOP } from 'flows/shop/reducer';
import LixicoinDashboard from '../component';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    lixicoinStore: INITIAL_STATE_LIXICOIN,
    shopStore: INITIAL_STATE_SHOP,
    userStore: INITIAL_STATE_USER,
    fetchRedeemLatestBoxesAction: jest.fn(),
    fetchUserProfileAction: jest.fn(),
    getMembershipAction: jest.fn(),
    getUserMembershipAction: jest.fn()
  };

  return <LixicoinDashboard {...Object.assign({}, props, params)} />;
};

describe('LixicoinDashboard', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
