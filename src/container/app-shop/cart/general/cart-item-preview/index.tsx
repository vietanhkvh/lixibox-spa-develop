import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import { formatCartItemPrice } from '../../../../../utils/currency';
import { formatDateTime } from '../../../../../utils/date-time';
import { generateTestId } from 'utils/test-utils';
import { DATETIME_FORMAT_TYPE } from '../../../../../constants/application/global';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import { FREE_PURHASE_TYPE } from '../../../../../constants/application/purchase';
import { CartItem } from 'types/api/cart';
import style from './style.module.scss';

interface IProps {
  className: string;
  item: CartItem;
  classes?: { thumbnail?: string; info?: string };
}
const CartItemPreview = ({ item, className, classes }: IProps) => {
  const price = formatCartItemPrice(item);
  const tag = FREE_PURHASE_TYPE.includes(item.purchase_type) ? 'Quà tặng' : '';
  const showPreOrderNote = !!(item.is_pre_order && item.pre_order_release_date);

  return (
    <div
      className={classNames(style.cartItemPreview, className)}
      {...generateTestId({ name: 'cart-item-preview', id: item?.box?.slug })}
    >
      <div className={classNames(style.thumbnail, classes && classes.thumbnail)}>
        <Image
          {...generateTestId({ name: 'img-item-checkout' })}
          alt={''}
          className={style.content}
          src={item.box.primary_picture.medium_url}
        />
        {item.is_pre_order && <div className={style.imagePreorder}>Đặt trước</div>}
      </div>
      <div className={classNames(style.info, classes && classes.info)}>
        <div {...generateTestId({ name: 'title-item-checkout' })} className={style.label}>
          {item.box.name}
        </div>
        <div className={style.meta}>
          {!(item.quantity === 1 && !price) && <div className={style.quantity}>{item.quantity}x</div>}
          {price && (
            <div {...generateTestId({ name: 'price-item-checkout' })} className={style.price}>
              {price}
            </div>
          )}
        </div>
        {showPreOrderNote && (
          <div
            className={style.note}
            title={formatDateTime(item.pre_order_release_date, DATETIME_FORMAT_TYPE.FULL_INFO)}
          >
            <SvgIcon name={'history'} className={style.preOrderIcon} />
            {`Bạn sẽ nhận được hàng từ ${formatDateTime(item.pre_order_release_date, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}`}
          </div>
        )}
        <div className={style.tags}>{tag && <div className={style.tag}>{tag}</div>}</div>
      </div>
    </div>
  );
};
CartItemPreview.defaultProps = { className: '' };

export default CartItemPreview;
