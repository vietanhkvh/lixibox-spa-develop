import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import View from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    code: 'TESTCODE',
    isOpen: true,
    isCompact: true,
    toggleVisibility: jest.fn(),
    onGoBack: jest.fn()
  };

  return <View {...Object.assign({}, props, params)} />;
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
