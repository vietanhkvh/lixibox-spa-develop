import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RefereeEntryModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    onRequestClose: jest.fn()
  } as any;

  return <RefereeEntryModal {...Object.assign({}, props, params)} />;
};

describe('RefereeEntryModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
