import { formatCurrency } from '../../../../../../utils/currency';
import { isEmptyObject } from '../../../../../../utils';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import ItemWithAction from '../../item-with-action';
import { ProductBox } from 'types/api/shop';
import { PropsFromRedux } from './store';

interface RedeemableItemWithActionProps extends PropsFromRedux {
  product: ProductBox;
  onClickProductItem?: (box: ProductBox) => void;
}
const RedeemableItemWithAction = ({
  product,
  authStore: { profile },
  cartStore: { cartList, cartDetail },
  onClickProductItem
}: RedeemableItemWithActionProps) => {
  const isItemInCart = !!cartList.find(
    (cartItem) => cartItem.purchase_type === PURCHASE_TYPE.REDEEM && cartItem.box.id === product.id
  );

  const coinsInCart = isEmptyObject(cartDetail) ? 0 : cartDetail.total_coins;
  const totalCoinsInProfile = profile?.coins || 0;
  const remainingCoins = totalCoinsInProfile - coinsInCart;
  const additionalLixicoinRequired = product.coins_price - remainingCoins;
  const insufficientCoins = additionalLixicoinRequired > 0;

  const title = isItemInCart
    ? 'Bỏ ra'
    : insufficientCoins
    ? `Thiếu ${formatCurrency(additionalLixicoinRequired)} Lixicoin`
    : 'Thêm vào giỏ';

  const icon = isItemInCart ? 'trash' : insufficientCoins ? '' : 'plus';
  const disabled = !isItemInCart && insufficientCoins;

  return (
    <ItemWithAction
      action={{ title, icon, disabled }}
      onClickProductItem={onClickProductItem}
      product={product}
      purchaseType={PURCHASE_TYPE.REDEEM}
      isShowPricing={true}
      forcePriceUnit={'lixicoin'}
      singleItemOnly
      testId={{ name: 'redeemable-item-with-action', id: product?.slug }}
    />
  );
};

export default RedeemableItemWithAction;
