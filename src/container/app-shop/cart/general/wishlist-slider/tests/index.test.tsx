import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../flows/cart/reducer';
import AddonSlider from '../container';

const component = (params = {}) => {
  const props = {
    cartStore: INITIAL_STATE_CART
  } as any;

  return withRouter((routerProps) => <AddonSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('AddonSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
