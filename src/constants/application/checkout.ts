import { ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT, ROUTING_CHECK_OUT_SUCCESS } from '../../routings/path';
import { TRACKING_ELM_TYPE } from '../../constants/api/tracking';

export const CHECKOUT_PHASES = [
  {
    id: 1,
    name: ROUTING_CHECK_OUT,
    path: ROUTING_CHECK_OUT,
    code: TRACKING_ELM_TYPE.CHECKOUT_CART.HEADING.CART,
    title: 'Giỏ hàng',
    generalTitle: 'Mua hàng',
    icon: 'cart'
  },
  {
    id: 2,
    name: ROUTING_CHECK_OUT_PAYMENT,
    path: ROUTING_CHECK_OUT_PAYMENT,
    code: TRACKING_ELM_TYPE.CHECKOUT_CART.HEADING.PAYMENT,
    title: 'Thanh toán',
    generalTitle: '', //'Địa Chỉ Giao Hàng',
    icon: 'card'
  },
  {
    id: 3,
    name: ROUTING_CHECK_OUT_SUCCESS,
    path: ROUTING_CHECK_OUT_SUCCESS,
    code: TRACKING_ELM_TYPE.CHECKOUT_CART.HEADING.SUCCESS,
    title: 'Hoàn tất',
    icon: 'tick'
  }
];
