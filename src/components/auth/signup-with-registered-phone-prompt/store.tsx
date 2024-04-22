import { connect, ConnectedProps } from 'react-redux';
import { requestOtpAction, signUpAction } from 'flows/auth/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { fetchUserReferrerProfileAction } from 'flows/user/action';
import { RootState } from 'types/redux';
import SignupWithRegisteredPhonePrompt from './component';

export const mapStateToProps = (state: RootState) => ({
  userStore: state.user,
  trackingStore: state.tracking
});

export const mapDispatchToProps = {
  signUpAction,
  requestOtpAction,
  fetchConstantsAction,
  fetchUserReferrerProfileAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignupWithRegisteredPhonePrompt);
