import { PURCHASE_TYPE } from 'constants/application/purchase';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { Order, OrderBox } from 'types/api/order';

export interface GetRepresentableOrderValueParams {
  order?: Order;
}
export const getRepresentableOrderValue = ({ order }: GetRepresentableOrderValueParams): number => {
  return (order?.order_boxes || []).reduce(
    (total, item) =>
      total +
      ([PURCHASE_TYPE.NORMAL, PURCHASE_TYPE.ADDON].includes(item?.purchase_type)
        ? (item?.price || 0) * (item?.quantity || 1)
        : [PURCHASE_TYPE.GIFT, PURCHASE_TYPE.SAMPLE].includes(item?.purchase_type)
        ? (item?.gift_price || 0) * (item?.quantity || 1)
        : 0),
    0
  );
};

export interface GetRepresentableOrderTotalPriceParams {
  order?: Order;
}
export const getRepresentableOrderTotalPrice = ({ order }: GetRepresentableOrderTotalPriceParams): number => {
  return order?.total_price || 0;
};

export interface GetRepresentableOrderServicePricesParams {
  order?: Order;
}
export interface RepresentableOrderServicePrice {
  name: string;
  price: number;
  description?: string;
}
export const getRepresentableOrderServicePrices = ({
  order
}: GetRepresentableOrderServicePricesParams): [RepresentableOrderServicePrice[], number] => {
  const representableServicePrices: RepresentableOrderServicePrice[] = [];

  const isShippable = order?.shipping?.code !== SHIPPING_TYPE.USER_PICKUP;
  const originalShippingPrice = order?.original_shipping_price || 0;

  isShippable &&
    originalShippingPrice > 0 &&
    representableServicePrices.push({
      name: 'Giao hàng',
      price: originalShippingPrice
    });

  const servicePrices = order?.service_prices || [];
  servicePrices.forEach((service) => {
    service?.service?.name &&
      service?.price &&
      representableServicePrices.push({
        name: service?.service?.name || '',
        price: service?.price || 0,
        description: service?.service?.description
      });
  });

  const totalServicePrice = representableServicePrices.reduce((total, service) => total + service.price, 0);

  return [representableServicePrices, totalServicePrice];
};

export interface GetRepresentableOrderPriceReductionsParams {
  order?: Order;
}
export interface OrderValueReductionItem {
  title: string;
  icon: string;
  value: number;
}
/**
 * Reducible price items
 * - Discount code reduction
 * - Cart items
 *   - PURCHASE_TYPE.ADDON
 *   - PURCHASE_TYPE.REDEEM
 *   - PURCHASE_TYPE.GIFT
 *   - PURCHASE_TYPE.SAMPLE
 * - Cashback
 * - Shipping fee
 */
export const getRepresentableOrderPriceReductions = ({
  order
}: GetRepresentableOrderPriceReductionsParams): OrderValueReductionItem[] => {
  const reductions: OrderValueReductionItem[] = [];

  // Discount code reduction
  (order?.discount_price || order?.promotions_price) &&
    reductions.push({
      title: 'Giảm giá',
      icon: 'discount-code',
      value: order?.discount_price || order?.promotions_price
    });

  // Cart items
  (order?.order_boxes || [])
    .filter((item) => [PURCHASE_TYPE.GIFT, PURCHASE_TYPE.SAMPLE].includes(item?.purchase_type) && item?.gift_price)
    .forEach((item) => {
      reductions.push({
        title: item?.box?.name || '',
        icon: 'gift',
        value: (item?.gift_price || 0) * (item?.quantity || 1)
      });
    });

  // Cashback
  order?.cashback?.balance_used &&
    reductions.push({
      title: 'Dùng số dư hoàn tiền',
      icon: 'dollar-time',
      value: order.cashback.balance_used
    });

  // Shipping fee
  const isShippable = order?.shipping?.code !== SHIPPING_TYPE.USER_PICKUP;
  const shippingFeeSavings = (order?.original_shipping_price || 0) - (order?.shipping_price || 0);

  isShippable &&
    shippingFeeSavings > 0 &&
    reductions.push({
      title: 'Giảm phí giao hàng',
      icon: 'delivery',
      value: shippingFeeSavings
    });

  return reductions;
};

export const getOrderBoxPrice = (item: OrderBox): number => {
  if ([PURCHASE_TYPE.NORMAL, PURCHASE_TYPE.ADDON].includes(item.purchase_type)) {
    return (item.price || 0) * (item.quantity || 1);
  }

  return 0;
};
