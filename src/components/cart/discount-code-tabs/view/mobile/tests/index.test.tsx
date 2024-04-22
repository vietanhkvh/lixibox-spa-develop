import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { INITIAL_STATE_AUTH } from '../../../../../../flows/auth/reducer';
import { INITIAL_STATE_CART } from '../../../../../../flows/cart/reducer';
import { INITIAL_STATE_ERROR } from '../../../../../../flows/error/reducer';
import { INITIAL_STATE_USER } from '../../../../../../flows/user/reducer';
import View from '..';

const authStore = INITIAL_STATE_AUTH;
const cartStore = INITIAL_STATE_CART;
const errorStore = INITIAL_STATE_ERROR;
const userStore = INITIAL_STATE_USER;
const addDiscountCodeAction = jest.fn();
const popErrorAction = jest.fn();
const fetchUserPersonalDiscountCodesAction = jest.fn();
const fetchUserVouchersAction = jest.fn();
const fetchSuggestionDiscountCodesAction = jest.fn();

const component = (params = {}) => {
  const props = {
    paging: { page: 1, perPage: 30 },
    onTabLoad: jest.fn(),

    authStore,
    cartStore,
    errorStore,
    userStore,

    addDiscountCodeAction,
    popErrorAction,
    fetchUserPersonalDiscountCodesAction,
    fetchUserVouchersAction,
    fetchSuggestionDiscountCodesAction
  };

  return withRouter((routerProps) => <View {...Object.assign({}, props, routerProps, params)} />);
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
