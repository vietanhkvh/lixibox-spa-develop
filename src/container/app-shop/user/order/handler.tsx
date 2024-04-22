import { ORDER_TYPE } from '../../../../constants/application/order';

export const generateMobileTab = ({ status }) => {
  const originalList = [
    {
      id: 0,
      title: 'Tất cả',
      status: ''
    },
    {
      id: 1,
      title: 'Chưa thanh toán',
      status: `${ORDER_TYPE.UNPAID},${ORDER_TYPE.PAYMENT_PENDING}`
    },
    {
      id: 2,
      title: 'Đã xác nhận',
      status: `${ORDER_TYPE.CONFIRMED},${ORDER_TYPE.PAID}`
    },
    {
      id: 3,
      title: 'Đang đợi giao hàng',
      status: ORDER_TYPE.SHIPPED
    },
    {
      id: 4,
      title: 'Đã nhận hàng',
      status: ORDER_TYPE.FULFILLED
    },
    {
      id: 5,
      title: 'Đã hủy',
      status: ORDER_TYPE.CANCELLED
    },
    {
      id: 6,
      title: 'Đã trả hàng',
      status: ORDER_TYPE.RETURNED
    }
  ];

  return originalList.map((item) => ({
    ...item,
    selected: item.status === status
  }));
};
