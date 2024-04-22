import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import { ROUTING_SEARCH_PATH } from '../../../routings/path';
import SvgIcon from '../../../presentation-component/ui/icon';
import { isMobileVersion } from '../../../utils/responsive';
import { safeEncodeURIComponent } from '../../../utils/encode';
import FadedInSlider from 'presentation-component/general/desktop/faded-in-slider';

import styles from './style.module.scss';

interface ItemProps {
  item: any;
  onClick?: () => void;
}
const Item = ({ item, onClick }: ItemProps) => {
  const navLinkProps = {
    to: `${ROUTING_SEARCH_PATH}/${safeEncodeURIComponent(item)}`,
    className: classnames(styles.item, !isMobileVersion() && styles.desktop),
    onClick
  };

  const iconProps = {
    name: 'search',
    className: styles.itemIcon
  };

  return (
    <NavLink {...navLinkProps}>
      {!!isMobileVersion() && <SvgIcon {...iconProps} />}
      {item}
    </NavLink>
  );
};

export const renderView = ({ props, state }) => {
  const { list, onItemClick } = props;
  const { panelWidth } = state;

  return list && !!list.length ? (
    <div className={classnames(styles.container, { [styles.desktop]: !isMobileVersion() })}>
      <div className={`${styles.title} ${!isMobileVersion() && 'headline-typo'}`}>Tìm kiếm nhiều nhất</div>
      {isMobileVersion() ? (
        <div className={styles.list}>
          <div className={styles.panel} id={'search-popular-list'} style={{ width: panelWidth }}>
            {list.map((item, index) => (
              <Item key={`search-popular-item-${index}`} item={item} onClick={() => onItemClick(item, index)} />
            ))}
          </div>
        </div>
      ) : (
        <FadedInSlider template={Item} templateProps={{ onClick: onItemClick }} listItems={list} />
      )}
    </div>
  ) : null;
};

export default renderView;
