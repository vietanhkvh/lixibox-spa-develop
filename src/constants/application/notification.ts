export const NOTIFICATION_TYPE = {
  ORDER_CONFIRMATION: 'order/confirmation',
  ORDER_CANCELLED: 'order/order_cancelled',
  ORDER_PROCESSED: 'order/order_processed',
  PAYMENT_RECEIVED: 'order/payment_received',
  PARTIAL_SHIPPED: 'order/partial_shipped',
  ORDER_REMIND: 'order/order_remind',
  PARTIAL_ORDER_CANCELLED: 'order/partial_order_cancelled',
  FEEDBACK: 'order/feedback'
};

export const NOTIFICATION_TYPE_VALUE = {
  'order/confirmation': {
    title: 'Đã đặt hàng',
    type: 'success'
  },

  'order/order_cancelled': {
    title: 'Đã được huỷ',
    type: 'error'
  },

  'order/order_processed': {
    title: 'Đã chuyển đi',
    type: 'success'
  },

  'order/payment_received': {
    title: 'Đã nhận hàng',
    type: 'success'
  },
  'order/partial_shipped': {
    title: 'Đã giao hàng',
    type: 'success'
  },

  'order/order_remind': {
    title: 'Đang chờ',
    type: 'refresh'
  },

  'order/partial_order_cancelled': {
    title: 'Đã huỷ một phần đơn hàng',
    type: 'error'
  },

  'order/feedback': {
    title: 'Đã feedback',
    type: 'success'
  },

  'box/waiting_available': {
    title: 'Đang chờ',
    type: 'refresh'
  }
};
