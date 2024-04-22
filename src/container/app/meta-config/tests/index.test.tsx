import { withRouter } from 'react-router';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import { INITIAL_STATE_META } from '../../../../flows/meta/reducer';
import MetaConfig from '../container';

const component = (params = {}) => {
  const props = {
    cartStore: INITIAL_STATE_CART,
    metaStore: INITIAL_STATE_META
  };

  return withRouter<any, any>(<MetaConfig {...Object.assign({}, props, params)} />);
};

describe('MetaConfig', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
