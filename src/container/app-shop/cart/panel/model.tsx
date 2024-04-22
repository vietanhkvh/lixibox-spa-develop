import { SetPromotionsPopupVisibilityActionParams, UpdateAuthModalStateActionParams } from 'flows/cart/action';
import { CartState } from 'flows/cart/types';
import { OpenSharedModalActionParams } from 'flows/shared-modal/action';
export interface IProps {
  history?: any;
  location: any;
  openModal?: any;

  payment?: any;
  checkout?: any;
  appStore?: any;
  cartStore: CartState;
  authStore: any;
  fetchAddOnList?: any;
  deliveryGuestAddress?: any;
  fetchConstantsAction?: any;
  setPaymentHighlightErrorBlockAction?: any;
  resetPaymentHighlightErrorBlockAction?: any;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  updateAuthModalStateAction: (data: UpdateAuthModalStateActionParams) => void;
  setPromotionsPopupVisibilityAction: (data: SetPromotionsPopupVisibilityActionParams) => void;
}

export interface IState {
  submitLoading: boolean;
  isBtnPaymentClick: boolean;
  errorBlockHighlightTimeoutId: any;
  /**
   * Flag to check if user is exiting the cart view in order to continue to the payment page
   */
  isExitingToPayment: boolean;
  didViewReferralPrompt: boolean;
}
