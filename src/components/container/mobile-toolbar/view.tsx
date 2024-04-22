import classnames from 'classnames';

import SvgIcon from '../../../presentation-component/ui/icon';

import { IMobileToolbarProps, IMobileToolbarState } from './model';
import styles from './style.module.css';

function renderContent(item, index) {
  if (!item) return null;

  const containerProps = {
    key: index,
    className: classnames(styles.item, {
      [styles.selectedItem]: item.selected.indexOf(this.selectedRouting) >= 0
    }),
    onClick: () => {
      this.onClick(item);
    }
  };

  const iconProps = {
    name: item.icon,
    className: classnames(styles.icon, styles[item.icon])
  };

  const titleProps = {
    className: styles.title
  };

  return (
    <div {...containerProps}>
      <SvgIcon {...iconProps} />
      <div {...titleProps}>{item.title}</div>
      {/* TODO: Implement notifications index page and enable the following element */}
      {false && item.code === 'user' && !!this.notificationUnreadCount && (
        <span className={styles.notiCount}>
          {this.notificationUnreadCount > 99 ? `99+` : this.notificationUnreadCount}
        </span>
      )}
    </div>
  );
}

export function renderComponent() {
  const { location, notificationUnreadCount } = this.props as IMobileToolbarProps;
  const { listNav, includedInComponent } = this.state as IMobileToolbarState;

  return includedInComponent.indexOf(location.pathname) < 0 ? null : (
    <div className={styles.container}>
      <div className={classnames(styles.fixed, 'bottom-fixed-element')}>
        {Array.isArray(listNav) &&
          listNav.map(renderContent, {
            selectedRouting: location.pathname,
            onClick: this.handleOnClick.bind(this),
            notificationUnreadCount
          })}
      </div>
    </div>
  );
}
