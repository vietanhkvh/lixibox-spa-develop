import { MODAL_REASON_CANCEL_ORDER } from '../../../../constants/application/modal';
import { stringToHash } from '../../../../utils/encode';
import { IState, IProps } from './model';

export function init(props: IProps) {
  const {
    match: {
      params: { orderNumber }
    },
    getOrderAction,
    getStoresOrderAction,
    fetchConstantsAction
  } = props;

  const isOnlineOrder = !window.location.pathname.includes('store-purchases');
  isOnlineOrder ? getOrderAction({ number: orderNumber }) : getStoresOrderAction({ number: orderNumber });
  fetchConstantsAction();

  this.setState({ isLoading: true } as IState);
}

export function handleGetMomoPaymentAddressUrl(orderNumber) {
  if (!orderNumber) return;

  this.props.getMomoPaymentAddressUrlAction({ orderNumber });
}

export function handleGetOnepayPaymentAddressUrl(orderNumber) {
  if (!orderNumber) return;

  this.props.getOnepayPaymentAddressUrlAction({ orderNumber });
}

export function handleChangeToCOD({ orderId }) {
  this.props.changePaymentToCODAction({ orderId });
}

export function handleCancelOrder() {
  const {
    openModalAction,
    cancelOrderAction,
    orderStore: { orderList, cancelOrderReasonList },
    match: {
      params: { orderNumber }
    }
  } = this.props;

  const keyHash = stringToHash(orderNumber);
  const data = (!!orderList && !!orderList[keyHash] && orderList[keyHash].order) || null;

  openModalAction(
    MODAL_REASON_CANCEL_ORDER({
      data: {
        number: data.number,
        cancelOrderAction,
        cancelOrderReasonList,
        order: data
      }
    })
  );
}
