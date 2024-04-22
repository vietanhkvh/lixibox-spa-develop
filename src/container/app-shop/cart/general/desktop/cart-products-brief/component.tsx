import SvgIcon from '../../../../../../presentation-component/ui/icon';
import CartItemPreview from '../../cart-item-preview';
import { sortedCartItems } from '../../../../../../utils/cart';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface IProps {
  cartStore: any;
}

const CartProductsBrief = ({ cartStore: { cartList } }: IProps) => {
  return (
    <div className={style.cartProductsBrief} {...generateTestId({ name: 'cart-products-brief' })}>
      <div className={style.title}>
        <SvgIcon name="cart" className={style.icon} />
        <div className={style.text}>
          THÔNG TIN ĐƠN HÀNG<span>({cartList.length} sản phẩm)</span>
        </div>
      </div>
      <div className={style.products}>
        {sortedCartItems(cartList).map((cartProduct) => (
          <CartItemPreview
            key={cartProduct.id}
            item={cartProduct}
            className={style.product}
            classes={{ info: style.productInfo }}
          />
        ))}
      </div>
    </div>
  );
};

export default CartProductsBrief;
