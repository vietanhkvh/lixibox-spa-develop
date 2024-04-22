import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import OverlayLoader from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isVisible: true
  };

  return <OverlayLoader {...Object.assign({}, props, params)} />;
};

describe('OverlayLoader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
