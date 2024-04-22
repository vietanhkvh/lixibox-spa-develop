import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import View from '..';
import { INITIAL_STATE_AUTH } from '../../../../../../../flows/auth/reducer';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import { INITIAL_STATE_ERROR } from '../../../../../../../flows/error/reducer';
import { INITIAL_STATE_USER } from '../../../../../../../flows/user/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const toggleVisibility = jest.fn();
const onCouponBodyClick = jest.fn();
const isOpen = true;
const authStore = INITIAL_STATE_AUTH;
const cartStore = INITIAL_STATE_CART;
const errorStore = INITIAL_STATE_ERROR;
const userStore = INITIAL_STATE_USER;
const addDiscountCodeAction = jest.fn();
const popErrorAction = jest.fn();
const openSharedModalAction = jest.fn();

const component = (params = {}) => {
  const props = {
    isOpen,
    paging: { page: 1, perPage: 30 },
    toggleVisibility,
    onCouponBodyClick,
    authStore,
    cartStore,
    errorStore,
    userStore,
    addDiscountCodeAction,
    popErrorAction,
    openSharedModalAction
  };

  return <View {...Object.assign({}, props, params)} />;
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
