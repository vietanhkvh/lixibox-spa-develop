import { ConnectedProps, connect } from 'react-redux';
import { getEmailVerificationAction, requestPhoneVerificationOtpAction } from 'flows/auth/action';
import UserInfo from './component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getEmailVerificationAction,
  requestPhoneVerificationOtpAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserInfo);
