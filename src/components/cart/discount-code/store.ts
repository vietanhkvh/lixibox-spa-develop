import { ConnectedProps, connect } from 'react-redux';
import { removeDiscountCodeAction } from 'flows/cart/action';
import { fetchUserPersonalDiscountCodesAction, fetchUserVouchersAction } from 'flows/user/action';
import { RootState } from 'types/redux';
import DiscountCodeBlock from './component';

const mapStateToProps = (state: RootState) => ({ authStore: state.auth, cartStore: state.cart });

const mapDispatchToProps = {
  fetchUserPersonalDiscountCodesAction,
  fetchUserVouchersAction,
  removeDiscountCodeAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DiscountCodeBlock);
