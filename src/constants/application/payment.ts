export const PAYMENT_METHOD_TYPE = {
  BANK: {
    id: 2,
    title: 'Chuyển khoản'
  },

  ATM: {
    id: 3,
    title: 'Thẻ nội địa'
  },

  ONEPAY: {
    id: 4,
    title: 'Thẻ quốc tế'
  },

  ONEPAY_SUCCESS: {
    id: 1, // When checkout success then payment method equal 1 not 4
    title: 'Online bằng thẻ tín dụng'
  },

  COD: {
    id: 5,
    title: 'Tiền mặt'
  },

  MOMO: {
    id: 6,
    title: 'Ví MoMo'
  }
};

export const PAYMENT_ICONS: Array<{ id: number; icon: string }> = [
  { id: 2, icon: 'color-bank-transfer' },
  { id: 3, icon: 'color-atm' },
  { id: 4, icon: 'color-visa' },
  { id: 1, icon: 'color-visa' },
  { id: 5, icon: 'color-cod' },
  { id: 6, icon: 'color-momo' }
];

export const PAYMENT_METHOD_TITLE = {
  0: 'Chưa xác định',
  1: 'Online bằng thẻ tín dụng',
  2: 'Chuyển khoản',
  3: 'Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)',
  4: 'Thanh toán bằng thẻ quốc tế Visa, Master, JCB',
  5: 'Tiền mặt',
  6: 'Ví MoMo'
};

export const PAYMENT_STATUS = {
  failed: 'Giao dịch không thành công',
  paid: 'Giao dịch thành công',
  payment_pending: 'Giao dịch đang chờ'
};

export const STR_PAYMENT_STATUS = {
  failed: 'failed',
  success: 'success',
  pending: 'pending',
  payment_pending: 'payment_pending',
  paid: 'paid'
};

export const GIFT_MESSAGE_WORDS_LIMIT_DEFAULT = 75;

export const PAYMENT_PHASES = {
  address: {
    id: 'addressBlock',
    index: 0
  },
  deliveryMethod: {
    id: 'deliveryMethodBlock',
    index: 1
  },
  giftMessage: {
    id: 'giftMessageBlock',
    index: 2
  },
  paymentMethod: {
    id: 'paymentMethodBlock',
    index: 3
  },
  invoice: {
    id: 'invoiceBlock',
    index: 4
  },
  deliveryNote: {
    id: 'deliveryNoteBlock',
    index: 5
  }
};
