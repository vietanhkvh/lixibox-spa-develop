import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import CheckoutSuccessModal from '..';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    data: {
      constants: INITIAL_STATE_CART.constants,
      orderInfo: INITIAL_STATE_CART.orderInfo,
      paymentStatus: INITIAL_STATE_CART.paymentStatus
    }
  };

  return withRouter((routerProps) => <CheckoutSuccessModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('CheckoutSuccessModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
