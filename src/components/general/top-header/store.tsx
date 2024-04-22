import { signOutAction, backToAdminAction } from '../../../flows/auth/action';
import { clearCartAction } from '../../../flows/cart/action';
import { IProps } from './model';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  cartStore: state.cart,
  userStore: state.user,
  filterSuggestionSelected: state.search.filterSuggestionSelected
});

export const mapDispatchToProps = (dispatch) =>
  ({
    signOut: (): void => dispatch(signOutAction()),
    backToAdminAction: (): void => dispatch(backToAdminAction()),
    clearCart: () => dispatch(clearCartAction())
  } as IProps);
