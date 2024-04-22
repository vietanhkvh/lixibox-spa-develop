import { Component } from 'react';

import {
  ROUTING_AUTH_CHECKOUT_FAST_TRACK,
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_SUCCESS
} from '../../../../routings/path';
import { PAYMENT_METHOD_TYPE, PAYMENT_PHASES } from '../../../../constants/application/payment';
import { isMobileVersion } from '../../../../utils/responsive';
import { isEmptyObject } from '../../../../utils/validate';
import { auth } from '../../../../utils/auth';

import { SHIPPING_TYPE } from '../../../../constants/application/shipping';
import { SHARED_MODAL_ID } from '../../../../constants/application/shared-modal';
import { REFEREE_SCHEMES_MODAL_INVOCATION_MODE } from '../../../../constants/application/referral';
import { AuthView } from 'components/auth-modal-block/desktop/model';
import { AUTH_VIEW } from 'components/auth-modal-block/desktop/constant';
import { setCustomReferrer } from 'utils/navigate';
import { gatewayTrackExitCart } from 'tracking/gateway';
import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import renderView from './view';

class CartContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleCheckout() {
    const {
      checkout,
      cartStore: {
        deliveryConfig: {
          addressId,
          giftMessage,
          noteMessage,
          shippingPackage,
          deliveryGuestAddress,
          deliveryUserPickupStoreAddress
        },
        phaseReadiness
      },
      setPaymentHighlightErrorBlockAction,
      resetPaymentHighlightErrorBlockAction
    } = this.props;
    if (!Object.keys(phaseReadiness.payment).every((key) => phaseReadiness.payment[key])) {
      const nonReadyPhase = Object.keys(PAYMENT_PHASES)
        .map((phase) =>
          Object.assign({}, PAYMENT_PHASES[phase], {
            ready: phaseReadiness.payment[phase] === undefined ? true : phaseReadiness.payment[phase]
          })
        )
        .sort((phase) => phase.index)
        .find((phase) => !phase.ready);
      if (!nonReadyPhase) return;
      setPaymentHighlightErrorBlockAction({ blockId: nonReadyPhase.id });
      this.setState({
        errorBlockHighlightTimeoutId: setTimeout(() => {
          resetPaymentHighlightErrorBlockAction();
        }, 1500)
      });
      return;
    }

    this.setState({ submitLoading: true, isBtnPaymentClick: true } as IState);

    if (shippingPackage !== SHIPPING_TYPE.USER_PICKUP && auth.loggedIn() && 0 !== addressId) {
      // Checkout for user
      checkout({
        addressId,
        giftMessage,
        shippingPackage,
        note: noteMessage,
        saveNewAddress: false,
        isGift: 0 !== giftMessage.length
      });
    } else if (
      shippingPackage !== SHIPPING_TYPE.USER_PICKUP &&
      !auth.loggedIn() &&
      !isEmptyObject(deliveryGuestAddress)
    ) {
      // Checkout for guest user
      checkout(
        Object.assign({}, deliveryGuestAddress, {
          giftMessage,
          note: noteMessage,
          isGift: 0 !== giftMessage.length
        })
      );
    } else if (shippingPackage === SHIPPING_TYPE.USER_PICKUP && !isEmptyObject(deliveryUserPickupStoreAddress)) {
      // Checkout for user pick up store
      checkout(
        Object.assign({}, deliveryUserPickupStoreAddress, {
          shippingPackage: SHIPPING_TYPE.USER_PICKUP,
          saveNewAddress: false,
          giftMessage,
          note: noteMessage,
          isGift: 0 !== giftMessage.length
        })
      );
    }
  }

  setAuthModalVisibility(visibility) {
    if (visibility) {
      this.props.updateAuthModalStateAction({ isAuthModalOpen: visibility });
    } else {
      this.props.updateAuthModalStateAction({
        isAuthModalOpen: visibility,
        authModalInitialView: AUTH_VIEW.CHECKOUT_FAST_TRACK
      });
    }
  }

  setAuthModalInitialView(view: AuthView) {
    this.props.updateAuthModalStateAction({ authModalInitialView: view });
  }

  onCheckoutContinueClick() {
    const {
      history,
      cartStore: {
        cartDetail: { referral, referral_code },
        promotionsViewCountSinceCheckoutMounted,
        representablePromotions,
        cartDiscountCodes
      },
      openSharedModalAction,
      setPromotionsPopupVisibilityAction
    } = this.props;
    const referrerReferralCode = referral?.referrer?.referral_code;

    if (!this.state.didViewReferralPrompt && referrerReferralCode && (!referral_code || !referral?.applied_scheme)) {
      this.setState({ didViewReferralPrompt: true });
      openSharedModalAction({
        id: SHARED_MODAL_ID.RefereeSchemesModal,
        data: { code: referrerReferralCode, mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITH_BUTTON }
      });
    } else {
      // TODO: Improvement: prompt for login before promting to see the offers
      const isAnyPromotionActionAvailable = representablePromotions.some((promotion) => promotion.isAnyActionAvailable);
      const isAnyDiscountCodeRepresentable = !!cartDiscountCodes.index?.length;

      if (
        promotionsViewCountSinceCheckoutMounted < 1 &&
        (isAnyPromotionActionAvailable || isAnyDiscountCodeRepresentable)
      ) {
        setPromotionsPopupVisibilityAction({ visibility: true });
        return;
      }

      if (auth.loggedIn()) {
        // this.setState({ isExitingToPayment: true });
        // history.push(ROUTING_CHECK_OUT_PAYMENT);
        this.handleCheckout();
      } else {
        if (isMobileVersion()) {
          setCustomReferrer({ value: ROUTING_CHECK_OUT });
          history.push({ pathname: ROUTING_AUTH_CHECKOUT_FAST_TRACK, state: { referrer: ROUTING_CHECK_OUT } });
        } else {
          this.setAuthModalVisibility(true);
        }
      }
    }
  }

  componentDidMount() {
    const {
      location,
      fetchAddOnList,
      fetchConstantsAction,
      cartStore: { addOnList },
      resetPaymentHighlightErrorBlockAction
    } = this.props;

    addOnList && 0 === addOnList.length && fetchAddOnList({ limit: 25 });

    fetchConstantsAction();
    resetPaymentHighlightErrorBlockAction();

    if (location.state?.authModalInitialView) {
      this.setAuthModalVisibility(true);
      this.setAuthModalInitialView(location.state.authModalInitialView);
    }
  }

  componentWillUnmount() {
    !isMobileVersion() && window.removeEventListener('scroll', () => {});
    clearTimeout(this.state.errorBlockHighlightTimeoutId);
    !this.state.isExitingToPayment && gatewayTrackExitCart();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      payment,
      history,
      cartStore: { isPaymentFail, isCheckoutFail, paymentSuccess, checkoutSuccess }
    } = this.props;

    const { isBtnPaymentClick } = this.state;

    if (!checkoutSuccess && nextProps.cartStore.checkoutSuccess && isBtnPaymentClick) {
      const currentMethodId = nextProps.cartStore.cartDetail.payment_method || PAYMENT_METHOD_TYPE.COD.id;
      payment({ paymentMethod: currentMethodId });
    }

    if (
      (!isCheckoutFail && nextProps.cartStore.isCheckoutFail) ||
      (!isPaymentFail && nextProps.cartStore.isPaymentFail) ||
      (!paymentSuccess && nextProps.cartStore.paymentSuccess)
    ) {
      // Prevent a situation: User checkout success and back to payment again
      // Reset isBtnPaymentClick === false, prevent to auto payment
      this.setState({
        submitLoading: false,
        isBtnPaymentClick: false
      } as IState);
    }

    // User have paid without onepay method
    !paymentSuccess && nextProps.cartStore.paymentSuccess && history.push(ROUTING_CHECK_OUT_SUCCESS);
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      handleCheckout: this.handleCheckout.bind(this),
      setAuthModalVisibility: this.setAuthModalVisibility.bind(this),
      onCheckoutContinueClick: this.onCheckoutContinueClick.bind(this)
    };

    return renderView(renderViewProps);
  }
}

export default CartContainer;
