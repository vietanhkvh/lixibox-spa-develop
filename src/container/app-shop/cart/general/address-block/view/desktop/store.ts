import { ConnectedProps, connect } from 'react-redux';

import {
  updateContactPhoneAction,
  setCheckoutPhaseReadiness,
  updateAuthModalStateAction,
  UpdateAuthModalStateActionParams
} from 'flows/cart/action';
import { CHECKOUT_PHASE, CHECKOUT_STEP } from 'flows/cart/constant';
import { RootState } from 'types/redux';
import AddressBlock from './container';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  addressStore: state.address,
  authStore: state.auth
});
export const mapDispatchToProps = (dispatch) => ({
  updateAuthModalStateAction: (data: UpdateAuthModalStateActionParams) => dispatch(updateAuthModalStateAction(data)),
  setAddressReadiness: (readiness) =>
    dispatch(setCheckoutPhaseReadiness({ phase: CHECKOUT_PHASE.payment, step: CHECKOUT_STEP.address, readiness })),
  updateContactPhoneAction: (phone: string) => dispatch(updateContactPhoneAction(phone))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddressBlock);
