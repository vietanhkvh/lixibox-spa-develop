import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openModalAction } from 'flows/modal/action';
import {
  fetchAddOnListAction,
  checkoutAction,
  paymentAction,
  deliveryGuestAddressAction,
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction,
  updateAuthModalStateAction,
  setPromotionsPopupVisibilityAction,
  SetPromotionsPopupVisibilityActionParams
} from 'flows/cart/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { openSharedModalAction, OpenSharedModalActionParams } from 'flows/shared-modal/action';
import CheckOutContainer from './container';

export const mapStateToProps = (state) => ({
  cartStore: state.cart,
  appStore: state.app,
  authStore: state.auth
});

export const mapDispatchToProps = (dispatch) => ({
  updateAuthModalStateAction: (data) => dispatch(updateAuthModalStateAction(data)),
  setPromotionsPopupVisibilityAction: (data: SetPromotionsPopupVisibilityActionParams) =>
    dispatch(setPromotionsPopupVisibilityAction(data)),
  fetchAddOnList: (data) => dispatch(fetchAddOnListAction(data)),
  openModal: (data: any) => dispatch(openModalAction(data)),
  checkout: (data: any) => dispatch(checkoutAction(data)),
  payment: (data: any) => dispatch(paymentAction(data)),
  fetchConstantsAction: () => dispatch(fetchConstantsAction()),
  deliveryGuestAddress: (data) => dispatch(deliveryGuestAddressAction(data)),
  setPaymentHighlightErrorBlockAction: (data) => dispatch(setPaymentHighlightErrorBlockAction(data)),
  resetPaymentHighlightErrorBlockAction: () => dispatch(resetPaymentHighlightErrorBlockAction()),
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data))
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CheckOutContainer));
