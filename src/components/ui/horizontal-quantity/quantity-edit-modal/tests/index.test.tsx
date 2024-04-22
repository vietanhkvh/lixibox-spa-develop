import Modal from 'react-modal';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import QuantityEditModal from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    value: 1,
    isOpen: true,
    minCartItemQuantity: 1,
    maxCartItemQuantity: 100,
    onClose: jest.fn(),
    onSubmit: jest.fn()
  };

  return <QuantityEditModal {...Object.assign({}, props, params)} />;
};

describe('QuantityEditModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
