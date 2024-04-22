import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from 'utils/test-utils';
import BuyerPhoneFormModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    initialValue: '0341112222',
    isOpen: true,
    onSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };

  return withRouter((routerProps) => <BuyerPhoneFormModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('BuyerPhoneFormModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
