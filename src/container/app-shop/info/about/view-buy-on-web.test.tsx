import Modal from 'react-modal';
import { reduxRender } from '../../../../utils/test-utils';
import Component from './view-buy-on-web';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

Modal.setAppElement(document.body.appendChild(document.createElement('div')));
const component = (params = {}) => <Component />;

describe('Info view-buy-on-web', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
