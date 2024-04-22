import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RefereeSchemeDetailModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    onRequestClose: jest.fn()
  } as any;

  return <RefereeSchemeDetailModal {...Object.assign({}, props, params)} />;
};

describe('RefereeSchemeDetailModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
