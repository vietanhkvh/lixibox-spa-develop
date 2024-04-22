import ItemWithAction from '../../item-with-action';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ProductBox } from 'types/api/shop';

interface IProps {
  product: ProductBox;
  onClickProductItem?: (box: ProductBox) => void;
}
const FreeDeliveryItemWithAction = ({ product, onClickProductItem }: IProps) => {
  return (
    <ItemWithAction
      key={product.id}
      product={product}
      action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
      onClickProductItem={onClickProductItem}
      purchaseType={PURCHASE_TYPE.NORMAL}
      isShowPricing
      testId={{ name: 'free-delivery-item-with-action', id: product?.slug }}
    />
  );
};

export default FreeDeliveryItemWithAction;
