import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import RegionSelectorModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    onSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };

  return <RegionSelectorModal {...Object.assign({}, props, params)} />;
};

describe('RegionSelectorModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
