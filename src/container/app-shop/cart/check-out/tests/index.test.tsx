import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../flows/cart/reducer';
import { INITIAL_STATE_SHOP } from '../../../../../flows/shop/reducer';
import { INITIAL_STATE_APP } from '../../../../../flows/app/reducer';
import { INITIAL_STATE_LIKE } from '../../../../../flows/like/reducer';
import Checkout from '../container';

const component = (params = {}) => {
  const props = {
    cartStore: INITIAL_STATE_CART,
    shopStore: INITIAL_STATE_SHOP,
    appStore: INITIAL_STATE_APP,

    getCart: jest.fn(),
    openModalAction: jest.fn(),
    getCartGiftAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    fetchCartRedeemBoxes: jest.fn(),
    fetchCartRedeemSpecialBoxes: jest.fn(),
    fetchCartRedeemUserBoxes: jest.fn(),
    fetchCartRedeemLatestBoxes: jest.fn(),
    fetchAddOnListAction: jest.fn(),
    fetchSampleBoxesAction: jest.fn(),
    fetchUserProfileAction: jest.fn(),
    removeItemFromCartAction: jest.fn(),
    fetchBoxesToFreeshipAction: jest.fn(),
    fetchSuggestionDiscountCodesAction: jest.fn(),
    openSharedModalAction: jest.fn(),
    addDiscountCodeAction: jest.fn(),
    showHideCartSumaryLayoutAction: jest.fn(),
    toggleDiscountCodeGiftModalVisibilityAction: jest.fn(),
    toggleDiscountCodeAddonModalVisibilityAction: jest.fn(),
    fetchHomeProductByCategoryAction: jest.fn(),
    likedIdList: INITIAL_STATE_LIKE.liked.id,
    closeModalAction: jest.fn(),
    likeProductAction: jest.fn(),
    updatePromotionsViewCountSinceCheckoutMountedAction: jest.fn()
  };

  return withRouter((routerProps) => <Checkout {...Object.assign({}, props, routerProps, params)} />);
};

describe('Checkout', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
