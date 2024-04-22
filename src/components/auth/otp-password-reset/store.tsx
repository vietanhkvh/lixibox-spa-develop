import { ConnectedProps, connect } from 'react-redux';
import { requestOtpAction, resetPasswordByOtpAction } from 'flows/auth/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import OTPPasswordReset from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth
});
export const mapDispatchToProps = {
  requestOtpAction,
  resetPasswordByOtpAction,
  fetchConstantsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OTPPasswordReset);
