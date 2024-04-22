import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../../flows/cart/reducer';
import DeliveryNoteBlock from '../container';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    cartStore: INITIAL_STATE_CART,
    deliverySetNoteMessage: jest.fn()
  };

  return withRouter((routerProps) => <DeliveryNoteBlock {...Object.assign({}, props, routerProps, params)} />);
};

describe('DeliveryNoteBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
