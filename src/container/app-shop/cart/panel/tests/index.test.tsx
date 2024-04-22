import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../flows/cart/reducer';
import { INITIAL_STATE_APP } from '../../../../../flows/app/reducer';
import { INITIAL_STATE_AUTH } from '../../../../../flows/auth/reducer';
import CartPanel from '../container';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    openModal: jest.fn(),
    payment: jest.fn(),
    checkout: jest.fn(),
    appStore: INITIAL_STATE_APP,
    cartStore: INITIAL_STATE_CART,
    authStore: INITIAL_STATE_AUTH,
    fetchAddOnList: jest.fn(),
    deliveryGuestAddress: jest.fn(),
    fetchConstantsAction: jest.fn(),
    setPaymentHighlightErrorBlockAction: jest.fn(),
    resetPaymentHighlightErrorBlockAction: jest.fn()
  } as any;

  return withRouter((routerProps) => <CartPanel {...Object.assign({}, props, routerProps, params)} />);
};

describe('CartPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
