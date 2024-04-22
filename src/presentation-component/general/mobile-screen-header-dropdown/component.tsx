import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import SvgIcon from '../../ui/icon';
import styles from './style.module.css';

function Item(item, index) {
  const navProps = {
    to: item.url,
    className: styles.nav,
    onClick: () => {
      !!this.onClick && this.onClick(item);
    }
  };

  const iconProps = {
    name: 'tick',
    className: styles.icon
  };
  return (
    <NavLink {...navProps}>
      {item.title}
      {item.selected && <SvgIcon {...iconProps} />}
    </NavLink>
  );
}

const MobileScreenHeaderDropdown = ({ isOpen, list, onClick = () => {} }) => {
  if (!list || !list.length) return null;

  return (
    <div className={classnames(styles.container, { [styles.isOpen]: !!isOpen })}>
      <div className={styles.overlay}></div>
      <div className={styles.list}>{list.map(Item, { onClick })}</div>
    </div>
  );
};

export default MobileScreenHeaderDropdown;
