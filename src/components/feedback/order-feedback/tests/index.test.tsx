import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import { INITIAL_STATE_FEEDBACK } from '../../../../flows/feedback/reducer';
import OrderFeedback from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    cartStore: INITIAL_STATE_CART,
    feedbackStore: INITIAL_STATE_FEEDBACK,
    fetchFeedbackByIdAction: jest.fn(),
    shareBoxOnFacebookAction: jest.fn(),
    openAlertAction: jest.fn(),
    openModalAction: jest.fn()
  };

  return <OrderFeedback {...Object.assign({}, props, params)} />;
};

describe('OrderFeedback', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
