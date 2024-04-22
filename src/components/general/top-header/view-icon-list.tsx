import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import { auth } from '../../../utils/auth';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { ROUTING_USER_WISHLIST } from '../../../routings/path';

import style from './style.module.scss';
const renderFavoriteIcon = (loggedin) => {
  const iconProps = {
    name: 'heart-line',
    className: style.iconInnerList
  };

  return (
    <NavLink className={classnames(style.iconWrapper, style.iconItem)} to={ROUTING_USER_WISHLIST}>
      <SvgIcon {...iconProps} />
      {renderTooltip('WISH LIST')}
    </NavLink>
  );
};

const renderCartIcon = (list, onCartIconClick) => {
  const containerProps = {
    onClick: onCartIconClick,
    className: classnames(style.iconItem, style.iconWrapper)
  };

  const iconProps = {
    name: 'cart',
    className: style.iconInnerList
  };

  const isExistNormalProduct = list.some((product) => product.purchase_type === PURCHASE_TYPE.NORMAL);
  const totalQuantity =
    isExistNormalProduct && Array.isArray(list) ? list?.reduce((curr, item) => item.quantity + curr, 0) : 0;

  return (
    <div {...containerProps}>
      <SvgIcon {...iconProps} />
      {list && list.length > 0 && totalQuantity > 0 && (
        <span className={style.amountCart}>{totalQuantity > 99 ? '99+' : totalQuantity}</span>
      )}
      {renderTooltip('CART')}
    </div>
  );
};

export const renderTooltip = (text) => (
  <div className={style.tooltip}>
    <div className={style.group}>
      <div className={style.text}>{text}</div>
      <div className={style.icon}></div>
    </div>
  </div>
);

const renderIconList = ({ list, onCartIconClick }) => (
  <div className={style.iconList}>
    {renderFavoriteIcon(auth.loggedIn())}
    {renderCartIcon(list || [], onCartIconClick)}
  </div>
);

export default renderIconList;
