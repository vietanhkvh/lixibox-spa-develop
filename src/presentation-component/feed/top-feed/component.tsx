import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from '../../ui/icon';
import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';

const Heading = () => {
  return (
    <div className={classnames(styles.heading, { [styles.desktop]: !isMobileVersion() })}>
      <div className={styles.headingTitle}>Nổi bật trong tuần</div>
    </div>
  );
};

function Item(item, index) {
  const linkProps = {
    key: item.id || index,
    className: styles.item,
    to: item.link
  };

  const imgProps = {
    alt: item.title,
    src: item.img
  };

  const iconProps = {
    className: styles.itemIcon,
    name: item.icon
  };

  return (
    <>
      <NavLink {...linkProps}>
        {!item.icon && (
          <div className={styles.itemImage}>
            {!!item.img && !!item.img.length && <Image {...imgProps} />}
            {''}
          </div>
        )}
        {!!item.icon && <SvgIcon {...iconProps} />}
        <div className={styles.itemName}>{item.title}</div>
      </NavLink>
      {!!isMobileVersion() && !!item.isLastItem && <div className={styles.isLastItem} />}
    </>
  );
}

const Content = ({ list }) => {
  return (
    <div className={classnames(styles.content, { [styles.desktop]: !isMobileVersion() })}>
      <div className={styles.panel}>
        {list.map((item, index) => Object.assign({}, item, { isLastItem: index === list.length - 1 })).map(Item)}
        {''}
      </div>
    </div>
  );
};

interface TopFeedProps {
  list: Array<any>;
}
const TopFeed = ({ list }: TopFeedProps) => {
  if (!list || !list.length) return null;

  return (
    <div className={styles.container}>
      <Heading />
      <Content list={list} />
    </div>
  );
};

export default TopFeed;
