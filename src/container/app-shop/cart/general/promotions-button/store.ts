import { ConnectedProps, connect } from 'react-redux';
import { removeDiscountCodeAction, setPromotionsPopupVisibilityAction } from 'flows/cart/action';
import { fetchUserPersonalDiscountCodesAction, fetchUserVouchersAction } from 'flows/user/action';
import { RootState } from 'types/redux';
import DiscountCodeBlock from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});

const mapDispatchToProps = {
  fetchUserPersonalDiscountCodesAction,
  fetchUserVouchersAction,
  removeDiscountCodeAction,
  setPromotionsPopupVisibilityAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DiscountCodeBlock);
