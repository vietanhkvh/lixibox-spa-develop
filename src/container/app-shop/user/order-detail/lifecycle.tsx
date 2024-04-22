import { storageKey } from '../../../../constants/application/client-storage';
import { stringToHash } from '../../../../utils';
import { gatewayTrackPurchased } from 'tracking/gateway';
import { IState, IProps } from './model';

export function componentDidMount() {
  this.init(this.props);
  this.props.getCancelOrderReasonAction();
}

export function UNSAFE_componentWillReceiveProps(nextProps: IProps) {
  const {
    authStore: { profile: user },
    orderStore: { isGetOrderSuccess },
    cartStore: {
      momoPaymentAddreessUrl,
      isFetchingMomoPaymentAddreessUrl,
      isFetchingOnepayPaymentAddreessUrl,
      onepayPaymentAddreessUrl
    },
    match: {
      params: { orderNumber }
    }
  } = this.props;

  const keyHash = stringToHash(orderNumber);
  const order =
    (!!nextProps.orderStore.orderList &&
      !!nextProps.orderStore.orderList[keyHash] &&
      nextProps.orderStore.orderList[keyHash].order) ||
    null;

  if (!isGetOrderSuccess && nextProps.orderStore.isGetOrderSuccess) {
    const isPendingPurchaseByOnepayTracking =
      localStorage.getItem(storageKey.MOE_PURCHASE_BY_ONEPAY_TRACKING_PENDING) === 'true';
    const isPendingPurchaseByMomoTracking =
      localStorage.getItem(storageKey.MOE_PURCHASE_BY_MOMO_TRACKING_PENDING) === 'true';

    this.setState({ isLoading: false } as IState);
    if (order) {
      if (isPendingPurchaseByOnepayTracking) {
        gatewayTrackPurchased({ order, user });
        localStorage.removeItem(storageKey.MOE_PURCHASE_BY_ONEPAY_TRACKING_PENDING);
      }
      if (isPendingPurchaseByMomoTracking) {
        gatewayTrackPurchased({ order, user });
        localStorage.removeItem(storageKey.MOE_PURCHASE_BY_MOMO_TRACKING_PENDING);
      }
    }
  }

  /** Update after get momo address url */
  const isGetMomoPaymentAddreessUrlDone =
    !!isFetchingMomoPaymentAddreessUrl &&
    !nextProps.cartStore.isFetchingMomoPaymentAddreessUrl &&
    '' === momoPaymentAddreessUrl &&
    !!nextProps.cartStore.momoPaymentAddreessUrl.length;

  if (!!isGetMomoPaymentAddreessUrlDone) {
    window.location.href = nextProps.cartStore.momoPaymentAddreessUrl;
  }

  /** Update after get onepay address url */
  const isGetOnepayPaymentAddreessUrlDone =
    !!isFetchingOnepayPaymentAddreessUrl &&
    !nextProps.cartStore.isFetchingOnepayPaymentAddreessUrl &&
    '' === onepayPaymentAddreessUrl &&
    !!nextProps.cartStore.onepayPaymentAddreessUrl.length;

  if (!!isGetOnepayPaymentAddreessUrlDone) {
    window.location.href = nextProps.cartStore.onepayPaymentAddreessUrl;
  }
}
