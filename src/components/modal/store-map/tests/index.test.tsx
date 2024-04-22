import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import StoreMapModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    data: {
      data: 'https://www.google.com/maps/d/u/0/embed?mid=1AZtxRDqV7xEEWJUq7q77tqM7mfbqo5Io&ll=10.791051896120734%2C106.69337490149968&z=15'
    }
  };

  return withRouter((routerProps) => <StoreMapModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('StoreMapModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
