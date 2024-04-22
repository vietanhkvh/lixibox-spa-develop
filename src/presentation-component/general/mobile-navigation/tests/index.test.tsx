import { withRouter } from 'react-router';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import MobileNavigation from '..';

const component = (params = {}) => {
  const props = {
    productName: {
      // TODO: remove (unused)
      value: 'aProduct'
    },
    cartStore: INITIAL_STATE_CART,
    isTranspanentMode: true,
    showHideInfoMenu: true,
    showHideMobileMenu: true,
    specialDealCategories: true,
    showHideSpecialDealMenu: true,
    showHideSearchSuggestionMenu: true
  };

  return withRouter<any, any>(<MobileNavigation {...Object.assign({}, props, params)} />);
};

describe('MobileNavigation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
