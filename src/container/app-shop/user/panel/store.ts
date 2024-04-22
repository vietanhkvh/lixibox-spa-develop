import { ConnectedProps, connect } from 'react-redux';
import { closeConfirmationModalAction, openConfirmationModalAction } from 'flows/shared-modal/action';
import { getEmailVerificationAction, requestPhoneVerificationOtpAction } from 'flows/auth/action';
import { RootState } from 'types/redux';
import UserPanel from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  sharedModalStore: state.sharedModal
});

const mapDispatchToProps = {
  openConfirmationModalAction,
  closeConfirmationModalAction,
  requestPhoneVerificationOtpAction,
  getEmailVerificationAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserPanel);
