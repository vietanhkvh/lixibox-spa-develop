import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { decodeEntities } from '../../../utils';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import AsideBlock from '../../../container/layout/aside-block';
import Loading from '../../ui/loading';
import Icon from '../../ui/icon';

import STYLE from './style';
import styles from './style.module.scss';

const renderMenuItem = (menu, navigateTo) => {
  const angleIconProps = {
    name: 'angle-right',
    style: STYLE.menuItem.title.icon.container(menu.sub_nodes.length <= 0),
    innerStyle: STYLE.menuItem.title.icon.inner(menu.activeMenu),
    onClick: () => navigateTo(`${ROUTING_PRODUCT_CATEGORY_PATH}/${menu.slug}`)
  };

  const linkProps = {
    to: `${ROUTING_PRODUCT_CATEGORY_PATH}/${menu.slug}`,
    style: STYLE.menuItem.title.text
  };

  const textLinkProps = {
    key: `menu-text-main-${menu.id}`,
    className: classNames(
      styles.menuItemTitleTextMainContainer,
      menu.activeMenu && styles.menuItemTitleTextMainContainerActive
    )
  };

  return (
    <div key={`filte-menu-${menu.id}`} style={STYLE.menuItem}>
      <div style={STYLE.menuItem.title.container}>
        <Icon {...angleIconProps} />
        <NavLink {...linkProps}>
          {<div {...textLinkProps}>{decodeEntities(menu.name || menu.vn_name)}</div>}
          {'' !== menu.vn_name && <div style={STYLE.menuItem.title.text.sub}>{decodeEntities(menu.vn_name)}</div>}
        </NavLink>
      </div>

      {menu && menu.sub_nodes && menu.sub_nodes.length > 0 && true === menu.activeMenu && (
        <div style={STYLE.subItem}>
          {menu && Array.isArray(menu.sub_nodes) && menu.sub_nodes.map((sub) => renderMenuItem(sub, navigateTo))}
        </div>
      )}
    </div>
  );
};

const renderContent = ({ listMenu, navigateTo }) =>
  listMenu.browse_nodes && 0 === listMenu.browse_nodes.length ? (
    <Loading />
  ) : (
    listMenu &&
    Array.isArray(listMenu.browse_nodes) &&
    listMenu.browse_nodes.map((item) => renderMenuItem(item, navigateTo))
  );

const renderView = ({ listMenu, title, navigateTo }) => {
  const asideBlockProps = {
    title,
    style: {},
    content: renderContent({ listMenu, navigateTo })
  };

  return (
    <div style={STYLE.container}>
      <AsideBlock {...asideBlockProps} />
    </div>
  );
};

export default renderView;
