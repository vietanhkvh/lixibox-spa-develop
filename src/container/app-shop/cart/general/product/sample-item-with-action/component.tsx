import ItemWithAction from '../../item-with-action';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ProductBox } from 'types/api/shop';
import { CartState } from 'flows/cart/types';

interface IProps {
  product: ProductBox;
  cartStore: CartState;
  onClickProductItem?: (box: ProductBox) => void;
}
const SampleItemWithAction = ({
  product,
  cartStore: {
    cartDetail: { subtotal_price },
    cartList,
    constants: { threshold_to_pick_sample }
  },
  onClickProductItem
}: IProps) => {
  // FIXME: Fix constants reducer and remove redundant checks and fallback below
  const samplesInCart = cartList.filter((cartItem) => cartItem.purchase_type === PURCHASE_TYPE.SAMPLE);
  const thresholdToPickSample =
    typeof threshold_to_pick_sample === 'number' && !Number.isNaN(threshold_to_pick_sample)
      ? threshold_to_pick_sample
      : 1000000;
  const cartValue = subtotal_price || 0;
  const selectableSampleCount = cartValue < thresholdToPickSample ? 1 : 2;
  const cartHasMaximumSample = samplesInCart.length >= selectableSampleCount;
  const cartHasSample = !!samplesInCart.length;
  const isItemInCart = cartHasSample && samplesInCart.find((item) => item.box.id === product.id);

  const title = isItemInCart ? 'Bỏ ra' : 'Thêm vào giỏ';
  const icon = isItemInCart ? 'trash' : 'plus';
  const disabled = !isItemInCart && cartHasMaximumSample;

  return (
    <ItemWithAction
      action={{ title, icon, disabled }}
      onClickProductItem={onClickProductItem}
      product={product}
      purchaseType={PURCHASE_TYPE.SAMPLE}
      isShowPricing
      customPricing={{ price: 0 }}
      tag="Dùng thử"
      isShowDiscountPercentage={false}
      singleItemOnly
      testId={{ name: 'sample-item-with-action', id: product?.slug }}
    />
  );
};

export default SampleItemWithAction;
