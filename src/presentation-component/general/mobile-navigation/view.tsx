import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ROUTING_CHECK_OUT, ROUTING_SHOP_INDEX, ROUTING_USER_ORDER } from '../../../routings/path';
import SvgIcon from '../../../presentation-component/ui/icon';
import SearchPanel from 'container/search-panel';
import AnimationClock from 'components/countdown/animation-clock';
import { auth } from '../../../utils/auth';

import { DROPDOWN_MENU } from './constant';
import { IMobileNavigationProps } from './model';
import styles from './style.module.scss';

const Cart = ({ cartList, history }) => {
  const containerProps = {
    onClick: () => history.push(ROUTING_CHECK_OUT),
    className: styles.cart
  };

  const iconProps = {
    name: 'cart',
    className: styles.cart
  };

  let totalQuantity = 0;
  Array.isArray(cartList) && cartList.map((item) => (totalQuantity += item.quantity));

  return (
    <div {...containerProps}>
      <SvgIcon {...iconProps} />
      {cartList && cartList.length > 0 && <span className={styles.cartNumber}>{totalQuantity}</span>}
    </div>
  );
};

const Left = ({ history, isCountDown = true, countdownStore }) => {
  const backProps = {
    name: 'angle-left',
    className: styles.backIcon,
    onClick: () => (history.length >= 3 ? history.goBack() : history.push(ROUTING_SHOP_INDEX))
  };

  const logoProps = {
    name: 'logo-text',
    className: styles.logoIcon,
    type: 'link',
    link: ROUTING_SHOP_INDEX
  };

  const countdownProps = {
    size: 'small',
    icon: { position: 'right', name: { main: 'flash', divide: 'divide' } },
    enable: {
      day: {
        block: false
      },
      hour: {
        block: true,
        text: false
      },
      minute: {
        block: true,
        text: false
      },
      second: {
        block: true,
        text: false
      }
    }
  };

  const isCountDownStore = !!countdownStore && Array.isArray(countdownStore.list) && !!countdownStore.list.length;

  return (
    <div className={styles.left}>
      <SvgIcon {...backProps} />
      {isCountDown && isCountDownStore ? (
        <AnimationClock data={countdownStore.list[countdownStore.list.length - 1]} {...countdownProps} />
      ) : (
        <SvgIcon {...logoProps} />
      )}
    </div>
  );
};

const Right = ({ cartList, handleDisplayDropdown, history, isShowDropDown }) => {
  const moreProps = {
    name: 'more',
    className: classnames(styles.more, { [styles.hidden]: !isShowDropDown }),
    onClick: () => handleDisplayDropdown(true)
  };

  const cartProps = {
    cartList,
    history
  };

  return (
    <div className={styles.right}>
      <SearchPanel {...{ classes: { container: styles.search } }} />
      <Cart {...cartProps} />
      <SvgIcon {...moreProps} />
    </div>
  );
};

function DropDownItem(item, index) {
  if (!item) return null;

  const iconProps = {
    name: item.icon,
    className: classnames(styles.dropdownIcon, styles[`dropdownIcon-${item.icon}`])
  };

  const itemProps = {
    className: styles.downdownItem,
    key: item.id || index
  };

  let action = () => {};

  if (item.requireLogin && !auth.loggedIn()) return null;

  if (!!item.actionType) {
    switch (item.actionType) {
      case 'sharing':
        const browserNavigator: any = navigator;
        if (!browserNavigator || !browserNavigator.share) return null;

        action = () => {
          // TODO: testing on device finalize sharing
          browserNavigator
            .share({
              title: document.title,
              text: 'Lixibox',
              url: window.location.href
            })
            .then(() => console.log('Chia sẻ thành công'))
            .catch((error) => console.log('Cancelled: Chia sẻ không thành công', error));
        };

      // eslint-disable-next-line
      case 'support':
        if (this.pathname.indexOf(ROUTING_USER_ORDER) < 0) return null;
        break;
    }
  }

  return (
    <NavLink target={item.linkTarget} to={item.link || '#'} onClick={action} {...itemProps}>
      <SvgIcon {...iconProps} />
      <div className={styles.dropdownTitle}>{item.title}</div>
    </NavLink>
  );
}

const DropDown = ({ isShowDropdown, onClick, pathname }) => {
  if (!DROPDOWN_MENU.length) return null;

  const dropdownProps = {
    className: classnames(styles.dropdown, !!isShowDropdown && styles.show),
    onClick: () => onClick(false)
  };

  const overlayProps = {
    onClick: () => onClick(false),
    className: styles.dropdownOverlay
  };

  return (
    <>
      {!!isShowDropdown && <div {...overlayProps}></div>}
      <div {...dropdownProps}>
        {DROPDOWN_MENU.map(DropDownItem, { pathname })}
        {''}
      </div>
    </>
  );
};

export function renderComponent() {
  const {
    history,
    cartStore: { cartList },
    location: { pathname },
    isTranspanentMode,
    isCountDown = true,
    countdownStore,
    withDownloadAppBar
  } = this.props as IMobileNavigationProps;

  const { isShowDropdown, backListDisplayDropDown } = this.state;

  const dropdownProps = {
    isShowDropdown,
    pathname,
    onClick: this.handleDisplayDropdown.bind(this)
  };

  const isHomePage = pathname === ROUTING_SHOP_INDEX;
  const containerProps = {
    className: classnames(styles.container, {
      [styles['isHomePage']]: !!isHomePage,
      [styles.isTransparent]: !!isTranspanentMode
    }),
    onTouchMove: (e) => e.preventDefault()
  };

  const rightProps = {
    history,
    handleDisplayDropdown: this.handleDisplayDropdown.bind(this),
    cartList: cartList?.some((box) => box.editable === true) ? cartList : [],
    isShowDropDown: -1 === backListDisplayDropDown.indexOf(pathname)
  };

  const pixelPanelProps = {
    className: classnames(styles.fixed, withDownloadAppBar && styles.withDownloadAppBar)
  };

  return (
    <div {...containerProps}>
      <div {...pixelPanelProps}>
        <Left history={history} isCountDown={isCountDown} countdownStore={countdownStore} />
        <Right {...rightProps} />
        <DropDown {...dropdownProps} />
      </div>
    </div>
  );
}
