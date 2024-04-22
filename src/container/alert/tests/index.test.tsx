import { withRouter } from 'react-router';
jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import Alert from '../container';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';

const component = (params = {}) => {
  const props = {
    alertStore: {
      list: [
        {
          id: 111,
          icon: 'lixibox',
          title: 'Test alert title',
          content: 'Test alert content',
          type: 'DEFAULT',
          iconText: 'icon text',
          isShowIconText: true
        }
      ]
    },
    cartStore: INITIAL_STATE_CART,
    closeAlert: jest.fn()
  };

  return withRouter<any, any>(<Alert {...Object.assign({}, props, params)} />);
};

describe('Alert', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
