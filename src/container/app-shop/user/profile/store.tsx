import { ConnectedProps, connect } from 'react-redux';

import { openAlertAction } from 'flows/alert/action';
import {
  changePasswordUserAction,
  requestChangeEmailAction,
  requestEmailVerificationAction,
  verifyEmailAction,
  verifyPhoneAction
} from 'flows/user/action';
import {
  changeAvatarUserAction,
  editUserProfileAction,
  requestPhoneVerificationOtpAction,
  fetchUserProfileAction
} from 'flows/auth/action';
import { RootState } from 'types/redux';
import ProfileContainer from './container';

const mapStateToProps = (state: RootState) => ({
  userStore: state.user,
  authStore: state.auth
});

const mapDispatchToProps = {
  fetchUserProfileAction,
  verifyEmailAction,
  verifyPhoneAction,
  openAlertAction,
  editUserProfileAction,
  requestChangeEmailAction,
  changePasswordUserAction,
  requestEmailVerificationAction,
  requestPhoneVerificationOtpAction,
  changeAvatarUserAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfileContainer);
