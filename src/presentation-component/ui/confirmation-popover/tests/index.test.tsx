import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ConfirmationPopover from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));
const anchor = { current: document.body.appendChild(document.createElement('div')) };

const component = (params = {}) => {
  const props = {
    title: 'Title',
    anchor,
    isOpen: true,
    data: {},
    acceptButton: { title: 'Accept', loading: false, onClick: jest.fn() },
    rejectButton: { title: 'Reject', loading: false, onClick: jest.fn() }
  };

  return <ConfirmationPopover {...Object.assign({}, props, params)} />;
};

describe('ConfirmationPopover', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
