import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import RedeemPrompt from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    icon: 'lixibox',
    title: 'Test title',
    body: <div>Test child node</div>,
    onClick: jest.fn()
  };

  return withRouter((routerProps) => <RedeemPrompt {...Object.assign({}, props, routerProps, params)} />);
};

describe('RedeemPrompt', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
