import { ConnectedProps, connect } from 'react-redux';

import { signInFBAction, fastTrackRequestOtpAction, fastTrackVerifyOtpAction } from 'flows/auth/action';
import { getCartAction } from 'flows/cart/action';
import { fetchUserReferrerProfileAction } from 'flows/user/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import CheckoutFastTrack from './component';
import { openAlertAction } from 'flows/alert/action';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  userStore: state.user
});
export const mapDispatchToProps = {
  signInFBAction,
  fetchConstantsAction,
  fetchUserReferrerProfileAction,
  getCartAction,
  fastTrackRequestOtpAction,
  fastTrackVerifyOtpAction,
  openAlertAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CheckoutFastTrack);
