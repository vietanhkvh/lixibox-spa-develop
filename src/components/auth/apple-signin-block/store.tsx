import { connect, ConnectedProps } from 'react-redux';
import { setAppleSigninStateAction } from 'flows/auth/action';
import { closeConfirmationModalAction, openConfirmationModalAction } from 'flows/shared-modal/action';
import { RootState } from 'types/redux';
import AppleSigninBlock from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  sharedModalStore: state.sharedModal
});

export const mapDispatchToProps = {
  setAppleSigninStateAction,
  openConfirmationModalAction,
  closeConfirmationModalAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppleSigninBlock);
