import { connect } from 'react-redux';
import {
  signinWithGoogleAction,
  linkSocialAccountAction,
  LinkSocialAccountActionParams,
  SigninWithGoogleActionParams
} from 'flows/auth/action';
import { getCartAction } from 'flows/cart/action';
import ConnectGoogleContainer from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  userStore: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  getCartAction: () => dispatch(getCartAction()),
  signinWithGoogleAction: (data: SigninWithGoogleActionParams) => dispatch(signinWithGoogleAction(data)),
  linkSocialAccountAction: (data: LinkSocialAccountActionParams) => dispatch(linkSocialAccountAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ConnectGoogleContainer);
