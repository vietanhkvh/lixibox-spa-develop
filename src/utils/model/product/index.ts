import { ProductBox } from '../../../types/api/shop';

interface GetProductStockNoticeProps {
  box: ProductBox;
}
export const getProductStockNotice = ({
  box
}: GetProductStockNoticeProps): {
  shouldShow: boolean;
  notice: string;
} => {
  let notice = '',
    shouldShow = false;

  if (!box) return { shouldShow, notice };

  const stock = box.stock || 0;
  const storeStock = box.store_stock || 0;

  const isPreorderBox = box.pre_order_status === 'pending';
  const isSaleable = !!box.is_saleable;
  const isOnlineOutOfStock = stock <= 0;
  const isStoreOutOfStock = storeStock <= 0;
  const isRejected = box.status === 'rejected';
  const canOrder = isPreorderBox || !(!isSaleable || isOnlineOutOfStock || isRejected);

  const shouldShowRemainingStock = stock >= 1 && stock <= 5 && canOrder && isPreorderBox;
  const isReaminingAtStore = isOnlineOutOfStock && !isStoreOutOfStock;
  const shouldShowOutOfStock = !canOrder;

  shouldShow = shouldShowRemainingStock || isReaminingAtStore || shouldShowOutOfStock;

  if (shouldShowRemainingStock) {
    notice = `Chỉ còn ${stock} sản phẩm`;
  } else if (isReaminingAtStore) {
    notice = 'Chỉ còn tại cửa hàng';
  } else if (shouldShowOutOfStock) {
    notice = 'Sản phẩm tạm thời hết hàng';
  }

  return { shouldShow, notice };
};
