import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MobileConfirmation from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    closeTimeoutMS: 300,
    classes: { container: 'confirmationContainer', prompt: 'confirmationPrompt', button: 'confirmationButton' },
    title: 'Mobile Confirmation Title',
    prompt: 'Test prompt message',
    confirmationButton: { text: 'Confirm', icon: 'check' },
    label: 'Test Label',
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
