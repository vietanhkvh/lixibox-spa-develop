import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './style.module.scss';

function Item(item, index) {
  const isSelected = !!this.selectedSlug.length && this.selectedSlug === item.slug;

  return (
    <NavLink
      className={classnames(
        styles.item,
        { [styles.bold]: !!this.isBoldTitle },
        { [styles.bigger]: !!this.isBigTitle },
        { [styles.selected]: !!isSelected }
      )}
      to={`${this.urlPath}/${item.slug}`}
      title={item.name}
      key={`navigation-item-${item.slug}`}
    >
      {item.name}
    </NavLink>
  );
}

interface FAQNavigationProps {
  list: Array<any>;
  isWithNumberOrdering?: boolean;
  isWithoutBorder?: boolean;
  isBoldTitle?: boolean;
  isBigTitle?: boolean;
  selectedSlug?: string;
  onClick?: () => any;
  urlPath: string;
}
const FAQNavigation = ({
  list,
  isWithNumberOrdering = false,
  isWithoutBorder = false,
  isBoldTitle = false,
  isBigTitle = false,
  selectedSlug = '',
  onClick = () => {},
  urlPath
}: FAQNavigationProps) => {
  if (!list || !list.length) return null;
  return (
    <div onClick={onClick} className={classnames(styles.container, { [styles.isWithoutBorder]: !!isWithoutBorder })}>
      <div className={styles.list}>
        {list.map(Item, { urlPath, isBoldTitle, isBigTitle, selectedSlug, isWithNumberOrdering })}
      </div>
    </div>
  );
};

export default FAQNavigation;
