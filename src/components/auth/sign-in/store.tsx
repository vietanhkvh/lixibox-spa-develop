import { ConnectedProps, connect } from 'react-redux';
import { signInAction } from 'flows/auth/action';
import { getCartAction } from 'flows/cart/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import SignIn from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});

export const mapDispatchToProps = {
  signInAction,
  fetchConstantsAction,
  getCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignIn);
