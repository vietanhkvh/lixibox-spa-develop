import { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import SvgIcon from '../../ui/icon';
import styles from './style.module.css';
import { isMobileVersion } from 'utils';

function TabItem(item, index) {
  if (!item) return null;

  const itemProps = {
    key: `item-${item.id || index}`,
    ref: (element) => (this.tabsRef.current[index] = element),
    onClick: () => !!this.onSelect && this.onSelect(item),
    className: classnames(styles.item, {
      [styles.isEqually]: !!this.isEqually,
      [styles.isSelected]: !!item.selected
    })
  };

  const iconProps = {
    name: item.icon,
    className: classnames(styles.icon, this.iconClassName)
  };

  if (!!item.link)
    return (
      <NavLink {...itemProps} to={item.link}>
        {!!item.icon && <SvgIcon {...iconProps} />}
        {item.title}
      </NavLink>
    );

  return (
    <div {...itemProps}>
      {!!item.icon && <SvgIcon {...iconProps} />}
      {item.title}
    </div>
  );
}

interface TabProps {
  id: number | string;
  title?: string;
  status?: string;
  selected?: boolean;
  path?: string;
}
interface MobileTabHeaderProps {
  tabs: Array<TabProps>;
  onSelect?: (TabProps) => any;
  isEqually?: boolean;
  isBorderStyle?: boolean;
  animate?: boolean;
  className?: string;
  iconClassName?: string;
}
const MobileTabHeader = ({
  tabs,
  onSelect,
  isEqually,
  isBorderStyle,
  animate,
  className,
  iconClassName
}: MobileTabHeaderProps) => {
  const tabsRef = useRef([]);

  const scrollSelectedTabIntoView = (tabs: Array<TabProps>) => {
    tabs?.every((tab, index) => {
      if (tab.selected) {
        const element = tabsRef.current[index];
        element &&
          element.scrollIntoView({
            behavior: animate ? 'smooth' : 'auto',
            inline: 'center',
            block: 'nearest'
          });
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    isMobileVersion() && scrollSelectedTabIntoView?.(tabs); //FIXME: not use for desktop, create the desktop component version
  }, [tabs]);

  if (!tabs || !tabs.length) return null;

  return (
    <div className={classnames(styles.container, { [styles.isBorderStyle]: !!isBorderStyle }, className)}>
      <div className={styles.panel}>
        {tabs.map(TabItem, {
          tabsRef,
          iconClassName,
          isBorderStyle,
          onSelect,
          isEqually: isEqually && tabs.length <= 3
        })}
        <div className={styles.offset} />
      </div>
    </div>
  );
};
MobileTabHeader.defaultProps = {
  onSelect: () => {},
  isEqually: true,
  isBorderStyle: false,
  animate: false,
  className: '',
  iconClassName: ''
};

export default MobileTabHeader;
