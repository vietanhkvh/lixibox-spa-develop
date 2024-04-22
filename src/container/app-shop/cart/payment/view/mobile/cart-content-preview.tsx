import { Fragment } from 'react';

import { sortedCartItems } from '../../../../../../utils/cart';
import { generateTestId } from 'utils/test-utils';
import SvgIcon from '../../../../../../presentation-component/ui/icon';
import CartItemPreview from '../../../general/cart-item-preview';
import style from '../style.module.scss';

interface IProps {
  content: any;
}

const CartContentPreview = ({ content }: IProps) => {
  return (
    <div className={style.cartContentPreview} {...generateTestId({ name: 'cart-content-preview' })}>
      <div className={style.header}>
        <SvgIcon name="cart" className={style.icon} />
        <div className={style.title}>THÔNG TIN ĐƠN HÀNG</div>
      </div>
      <div className={style.body}>
        {sortedCartItems(content).map((cartItem) => (
          <Fragment key={cartItem.id}>
            <CartItemPreview item={cartItem} />
            <div className={style.divider} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CartContentPreview;
