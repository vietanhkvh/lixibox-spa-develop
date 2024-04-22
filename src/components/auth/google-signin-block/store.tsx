import { connect, ConnectedProps } from 'react-redux';
import { setGoogleSigninStateAction } from 'flows/auth/action';
import { closeConfirmationModalAction, openConfirmationModalAction } from 'flows/shared-modal/action';
import { RootState } from 'types/redux';
import GoogleSigninBlock from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  sharedModalStore: state.sharedModal
});

export const mapDispatchToProps = {
  setGoogleSigninStateAction,
  openConfirmationModalAction,
  closeConfirmationModalAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GoogleSigninBlock);
