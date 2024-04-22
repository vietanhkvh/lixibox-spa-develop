import { connect, ConnectedProps } from 'react-redux';
import PromotionsModal from './component';
import {
  addDiscountCodeAction,
  fetchCartDiscountCodesAction,
  removeDiscountCodeAction,
  toggleApplyBalanceStatusAction,
  updatePromotionsViewCountSinceCheckoutMountedAction,
  updateRepresentablePromotionsAction
} from 'flows/cart/action';
import { popErrorAction } from 'flows/error/action';
import { openSharedModalAction } from 'flows/shared-modal/action';
import { RootState } from 'types/redux';
import { fetchRedeemUserBoxesAction } from 'flows/shop/action';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  errorStore: state.error,
  shopStore: state.shop,
  userStore: state.user
});

const mapDispatchToProps = {
  fetchCartDiscountCodesAction,
  toggleApplyBalanceStatusAction,
  fetchRedeemUserBoxesAction,
  updateRepresentablePromotionsAction,
  addDiscountCodeAction,
  removeDiscountCodeAction,
  popErrorAction,
  openSharedModalAction,
  updatePromotionsViewCountSinceCheckoutMountedAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PromotionsModal);
