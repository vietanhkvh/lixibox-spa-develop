import { ConnectedProps, connect } from 'react-redux';

import { signUpAction, signInFBAction, requestOtpAction } from 'flows/auth/action';
import { openAlertAction } from 'flows/alert/action';
import { getCartAction } from 'flows/cart/action';
import { fetchUserReferrerProfileAction } from 'flows/user/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import SignUp from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  userStore: state.user,
  trackingStore: state.tracking
});

export const mapDispatchToProps = {
  signUpAction,
  requestOtpAction,
  signInFBAction,
  openAlertAction,
  fetchConstantsAction,
  fetchUserReferrerProfileAction,
  getCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignUp);
