import { connect } from 'react-redux';

import {
  signInFBAction,
  linkSocialAccountAction,
  LinkSocialAccountActionParams,
  SignInFBActionParams
} from 'flows/auth/action';
import { getCartAction } from 'flows/cart/action';
import ConnectFacebookContainer from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  userStore: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  getCartAction: () => dispatch(getCartAction()),
  signInFBAction: (data: SignInFBActionParams) => dispatch(signInFBAction(data)),
  linkSocialAccountAction: (data: LinkSocialAccountActionParams) => dispatch(linkSocialAccountAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ConnectFacebookContainer);
