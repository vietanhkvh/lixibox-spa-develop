import Modal from 'react-modal';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import CommentEditFormModal from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    initialValue: 'initial value',
    isOpen: true,
    onSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };

  return <CommentEditFormModal {...Object.assign({}, props, params)} />;
};

describe('CommentEditFormModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
