import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscountCodeMobileAlertModal from '../component';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    data: {
      suggestionDiscountCodes: INITIAL_STATE_CART.suggestionDiscountCodes,
      cartDetail: INITIAL_STATE_CART.cartDetail,
      addDiscountCodeAction: jest.fn()
    }
  };

  return withRouter((routerProps) => (
    <DiscountCodeMobileAlertModal {...Object.assign({}, props, routerProps, params)} />
  ));
};

describe('DiscountCodeMobileAlertModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
