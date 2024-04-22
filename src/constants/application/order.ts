export const ORDER_TYPE = {
  CANCELLED: 'cancelled',
  CONFIRMED: 'confirmed',
  FULFILLED: 'fulfilled',
  SHIPPED: 'shipped',
  PAID: 'paid',
  UNPAID: 'unpaid',
  REFUNDED: 'refunded',
  RETURNED: 'returned',
  PAYMENT_PENDING: 'payment_pending',
  PENDING: 'pending',
  AT_STORE: 'at_store'
};

export const ORDER_STATUS = {
  cancelled: 'Đã huỷ',
  cancelled_refund: 'Đã huỷ',
  refunded: 'Đã hoàn tiền',
  returned: 'Đã huỷ',
  unpaid: 'Chưa thanh toán',
  payment_pending: 'Đang chờ xác thực',
  confirmed: 'Đã xác nhận',
  paid: 'Đã thanh toán',
  shipped: 'Đang đợi giao hàng',
  fulfilled: 'Đã nhận hàng'
};

/** TODO: Refactor */
export const ORDER_TYPE_VALUE = {
  cancelled: {
    title: ORDER_STATUS.cancelled,
    type: 'cancel',
    colorType: 'red'
  },

  confirmed: {
    title: ORDER_STATUS.confirmed,
    type: 'waiting',
    colorType: 'blue'
  },

  fulfilled: {
    title: ORDER_STATUS.fulfilled,
    type: 'success',
    colorType: 'green'
  },
  shipped: {
    title: ORDER_STATUS.shipped,
    type: 'success',
    colorType: 'blue'
  },

  paid: {
    title: ORDER_STATUS.paid,
    type: 'success',
    colorType: 'blue'
  },

  unpaid: {
    title: ORDER_STATUS.unpaid,
    type: 'waiting',
    colorType: 'yellow'
  },

  refunded: {
    title: ORDER_STATUS.refunded,
    type: 'cancel',
    colorType: 'red'
  },

  returned: {
    title: ORDER_STATUS.returned,
    type: 'cancel',
    colorType: 'red'
  },

  payment_pending: {
    title: ORDER_STATUS.payment_pending,
    type: 'waiting',
    colorType: 'yellow'
  },

  default: {
    title: '',
    type: '',
    colorType: 'red'
  }
};

export const SHIPMENT_TYPE = {
  UNPAID: 'unpaid',
  CREATED: 'created',
  PICKING: 'picking',
  PICKED: 'picked',
  PACKED: 'packed',
  REQUESTED: 'requested',
  SHIPPED: 'shipped',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled',
  RETURNING: 'returning'
};

export const SHIPMENT_STATUS = {
  unpaid: 1,
  created: 1,
  picking: 2,
  picked: 2,
  packed: 2,
  requested: 2,
  shipped: 3,
  fulfilled: 5,
  cancelled: -1,
  returning: -1
};

export const ORDER_NOTE_FOR_USER = {
  CHECK_ID: {
    TITLE: 'Lưu ý',
    MESSAGE:
      'Vui lòng xác nhận chính xác thông tin cá nhân (thông qua CMND, giấy phép lái xe...) cho nhân viên giao hàng khi nhận hàng.'
  },
  CHECK_PRODUCT: {
    TITLE: 'Lưu ý',
    MESSAGE:
      'Vui lòng đồng kiểm với shipper trước khi nhận hàng. Mọi khiếu nại sau khi khách ký nhận sẽ không được giải quyết.'
  }
};
