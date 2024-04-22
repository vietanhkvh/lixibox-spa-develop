import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MobileConfirmation from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    closeTimeoutMS: 300,
    title: 'Mobile Confirmation Title',
    prompt: 'Test prompt message',
    confirmationButton: { text: 'Confirm', icon: 'check' },
    data: { text: 'Test data' },
    onCancel: jest.fn(),
    onConfirm: jest.fn()
  };

  return <MobileConfirmation {...Object.assign({}, props, params)} />;
};

describe('MobileConfirmation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
