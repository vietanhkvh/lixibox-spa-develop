import { NavLink } from 'react-router-dom';

import Icon from '../../ui/icon';

import { decodeEntities } from '../../../utils';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';

import * as LAYOUT from '../../../style/layout';
import { IState } from './model';
import STYLE from './style';

/**
 * Render List navigation
 * 1. Left: Main menu
 * 2. User info
 * 2.1 Favorite list
 * 2.2. Shopping cart
 */
function renderListNavigation() {
  const { /* listCategoryReject */ /* subMenuDesktop */ listRootNavigation } = this.state as IState;

  return (
    <nav style={Object.assign({}, LAYOUT.flexContainer.justify, STYLE.listNav.nav)}>
      {Array.isArray(listRootNavigation) && listRootNavigation.map((item) => renderItemNavigation.bind(this)(item))}
    </nav>
  );
}

function renderItemNavigation(item) {
  const { subMenuDesktop } = this.state;

  const styleItemNav = Object.assign(
    {},
    LAYOUT.flexContainer.left,
    LAYOUT.flexContainer.verticalCenter,
    STYLE.listNav.navText.main,
    STYLE.listNav.nav.navItem
  );

  const linkProps = {
    key: `menu-item-${item.id}`,
    to: item.link,
    onClick: () => {
      'function' === typeof item.tracking && item.tracking('click');
      if (item.id === 'special' || item.id === 'brand') return;
      this.hideMenuDesktop.bind(this)();
    },
    onMouseEnter: () => {
      'function' === typeof item.tracking && item.tracking('hover');
      this.startTimeoutShowMenu();
      this.showMenuDesktop(item.id);
      this.hadleLazyFetchData();
    },
    style: Object.assign({}, styleItemNav, item.id === subMenuDesktop.id && STYLE.listNav.navText.active)
  };

  const iconProps = {
    className: 'animate-shake',
    name: item.icon,
    style: STYLE.listNav.navText.icon,
    innerStyle: STYLE.listNav.navText.innerIcon
  };

  return (
    <NavLink {...linkProps}>
      {item.icon && <Icon {...iconProps} />}
      {decodeEntities(item.title)}
    </NavLink>
  );
}

export function renderListItemNavigation(listMenu, styleItemNav, subMenuDesktop, listCategoryReject) {
  return (
    'undefined' !== typeof listMenu.browse_nodes &&
    listMenu &&
    listMenu.browse_nodes[1] &&
    Array.isArray(listMenu.browse_nodes[1].sub_nodes) &&
    listMenu.browse_nodes[1].sub_nodes.map((menuItem) => {
      const categoryProps = {
        key: `menu-item-${menuItem.id}`,
        to: `${ROUTING_PRODUCT_CATEGORY_PATH}/${menuItem.slug}`,
        onClick: () => {
          this.setState({ isActiveMenu: false });
          this.hideMenuDesktop();
        },
        onMouseEnter: () => {
          this.startTimeoutShowMenu();
          this.showMenuDesktop(menuItem.id);
        },
        style: Object.assign({}, styleItemNav, menuItem.id === subMenuDesktop.id && STYLE.listNav.navText.active)
      };
      return listCategoryReject.indexOf(menuItem.id) < 0 && renderItemNavigation.bind(this)(categoryProps);
    })
  );
}

export default renderListNavigation;
