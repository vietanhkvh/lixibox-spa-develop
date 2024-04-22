import { NavLink } from 'react-router-dom';

import { ROUTING_SHOP_INDEX } from '../../../routings/path';
import SvgIcon from 'presentation-component/ui/icon';
import style from './style.module.scss';

const renderLogo = () => {
  const linkProps = {
    title: 'Lixibox',
    to: ROUTING_SHOP_INDEX,
    className: style.logo
  };

  return (
    <NavLink {...linkProps}>
      <SvgIcon name={'logo-text'} className={style.text} />
    </NavLink>
  );
};

export default renderLogo;
