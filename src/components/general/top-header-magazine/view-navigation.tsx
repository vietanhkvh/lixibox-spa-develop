import { NavLink } from 'react-router-dom';

import * as LAYOUT from '../../../style/layout';
import { ROUTING_MAGAZINE, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';
import Icon from '../../ui/icon';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderNavigation = (props) => {
  const { param, categoryList } = props as IProps;

  const navProps = {
    style: Object.assign({}, LAYOUT.flexContainer.center, LAYOUT.flexContainer.verticalCenter, STYLE.navigation.nav)
  };

  const linkHomeProps = {
    key: `category-home`,
    to: `${ROUTING_MAGAZINE}`,
    className: styles.navigationNavLink,
    style: Object.assign({}, param === ROUTING_MAGAZINE && STYLE.navigation.nav.link.active)
  };

  return (
    <div style={STYLE.navigation}>
      {
        // Full category list, greater than 1 because add a element above (home)
        0 !== categoryList.length && (
          <nav {...navProps}>
            <NavLink {...linkHomeProps}>Trang chủ</NavLink>
            {Array.isArray(categoryList) &&
              categoryList.map((item, index) => {
                const linkProps = {
                  key: `category-${index}`,
                  to: `${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.slug}`,
                  className: styles.navigationNavLink,
                  activeStyle: STYLE.navigation.nav.link.active
                };

                return <NavLink {...linkProps}>{item.name}</NavLink>;
              })}
            <Icon name={'search'} style={STYLE.icon} innerStyle={STYLE.icon.inner} />
          </nav>
        )
      }
    </div>
  );
};

export default renderNavigation;
