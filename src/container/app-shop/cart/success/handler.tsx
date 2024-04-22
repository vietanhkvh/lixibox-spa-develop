import { reportException } from '../../../../tracking/sentry';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../../constants/application/alert';
import { isEmptyObject } from '../../../../utils/validate';
import { auth } from '../../../../utils/auth';

import { IProps, IState } from './model';

export function handleClipboard(idSelector) {
  try {
    const { openAlert } = this.props;
    const shareLink = document.querySelector(idSelector);
    null !== shareLink && shareLink.focus();
    null !== shareLink && (shareLink as HTMLInputElement).setSelectionRange(0, 1000);

    // Copy to the clipboard
    document.execCommand('copy');

    openAlert(ALERT_CLIPBOARD_SUCCESS);
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Handler | handleClipboard |' });
  }
}

export function handleCreateAccount() {
  try {
    const { inputPassword } = this.state as IState;

    if (auth.loggedIn() || !inputPassword.valid) {
      return;
    }

    this.setState({ submitLoading: true } as IState);
    const {
      cartStore: {
        deliveryConfig: { deliveryGuestAddress, deliveryUserPickupStoreAddress }
      },
      updateGuestPasswordAction
    } = this.props as IProps;

    const email = !isEmptyObject(deliveryGuestAddress)
      ? deliveryGuestAddress.email
      : !isEmptyObject(deliveryUserPickupStoreAddress)
      ? deliveryUserPickupStoreAddress.email
      : '';

    const password = inputPassword && !!inputPassword.value ? inputPassword.value.trim() : '';

    email.length > 0 && password.length > 0 && updateGuestPasswordAction({ email, password });
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Handler | handleCreateAccount |' });
  }
}

export function handleInputOnChange(value, valid, target) {
  try {
    const updateInputValue = {};
    updateInputValue[target] = { value, valid };

    this.setState(updateInputValue as IState);
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Handler | handleInputOnChange |' });
  }
}

export function handleGetMomoPaymentAddressUrl() {
  try {
    const {
      cartStore: { orderInfo }
    } = this.props;

    if (!orderInfo || 6 !== orderInfo.payment_method) return;

    this.props.getMomoPaymentAddressUrlAction({ orderNumber: orderInfo.number });
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Handler | handleGetMomoPaymentAddressUrl |' });
  }
}

export function handleGetOnepayPaymentAddressUrl() {
  try {
    const {
      cartStore: { orderInfo }
    } = this.props;

    if (!orderInfo || !(3 === orderInfo.payment_method || 4 === orderInfo.payment_method)) return;

    this.props.getOnepayPaymentAddressUrlAction({ orderNumber: orderInfo.number });
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Handler | handleGetMomoPaymentAddressUrl |' });
  }
}
