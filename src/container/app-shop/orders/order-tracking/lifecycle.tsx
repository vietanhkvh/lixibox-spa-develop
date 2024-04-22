import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';
import { auth } from '../../../../utils/auth';

import { IProps } from './model';

export function componentDidMount() {
  const {
    fetchOrderTrackingByCode,
    match: {
      params: { idNumber }
    },
    fetchUserOrderListAction
  } = this.props as IProps;

  // User login and don't have tracking code number id then fetch latest order
  if (!!idNumber) {
    this.fetchData(idNumber.trim(), fetchOrderTrackingByCode);
  } else {
    auth.loggedIn() && !this.state.isFetchNewestOrder && fetchUserOrderListAction({ page: 1, perPage: 1, status: '' });

    const trackingInputElement = document.getElementById('tracking-input');
    !!trackingInputElement && trackingInputElement.focus();
  }
}

export function UNSAFE_componentWillReceiveProps(nextProps) {
  const {
    fetchOrderTrackingByCode,
    userStore: { userOrderList, isFetchUserOrderList }
  } = nextProps;

  const {
    userStore,
    cartStore: { momoPaymentAddreessUrl, isFetchingMomoPaymentAddreessUrl }
  } = this.props;

  if (
    auth.loggedIn() &&
    !isEmptyObject(userOrderList) &&
    !isEmptyObject(userStore) &&
    !userStore.isFetchUserOrderList &&
    isFetchUserOrderList
  ) {
    const params = { page: 1, perPage: 1, filter: '' };
    const keyHash = objectToHash(params);
    const orderList = userOrderList[keyHash];

    const codeSearch =
      (!isEmptyObject(orderList) &&
        Array.isArray(orderList.orders) &&
        orderList.orders.length > 0 &&
        orderList.orders[0].number) ||
      '';

    !!codeSearch && this.fetchData(codeSearch, fetchOrderTrackingByCode);
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
}
