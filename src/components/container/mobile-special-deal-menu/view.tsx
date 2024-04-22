import { NavLink } from 'react-router-dom';

import * as LAYOUT from '../../../style/layout';
import { ROUTING_SPECIAL_DEALS } from '../../../routings/path';
import Icon from '../../ui/icon';

import STYLE from './style';
import { ISpecialDealMenuProps } from './model';

const renderIcon = ({ iconName, style, innerStyle, onClick = () => {} }) => (
  <Icon name={iconName} style={style} innerStyle={innerStyle} onClick={onClick} />
);

const renderGroup = ({ list }) => {
  return (
    <div style={STYLE.menu.contentGroup.content}>
      {Array.isArray(list) &&
        list.map((item) => {
          const linkProps = {
            to: `${ROUTING_SPECIAL_DEALS}/${item.slug}`,
            key: `category-special-deal-item-${item.id}`,
            style: STYLE.menu.item
          };
          return (
            <NavLink {...linkProps}>
              <div style={STYLE.menu.item.title}>{item.title}</div>
            </NavLink>
          );
        })}
    </div>
  );
};

export function renderComponent({ props, handleHideSpecialDealMenu }) {
  const {
    menuStore: { isShowSpecialDealMenu },
    categoryList
  } = props as ISpecialDealMenuProps;

  const containerStyle = Object.assign(
    {},
    LAYOUT.flexContainer.justify,
    LAYOUT.flexContainer.verticalFlex,
    STYLE,
    true === isShowSpecialDealMenu && STYLE.show
  );

  const logoStyle = STYLE.menu.heading.logoGroup.logo;
  const headerStyle = STYLE.menu.heading;

  return (
    <div id={'mobile-special-deal-menu'} style={containerStyle}>
      {/** List menu */}
      <div style={STYLE.menu}>
        <div style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, headerStyle)}>
          <div style={headerStyle.logoGroup}>
            {renderIcon({
              iconName: 'logo-line',
              style: logoStyle.line,
              innerStyle: logoStyle.line.inner
            })}
            {renderIcon({
              iconName: 'logo-text',
              style: logoStyle.text,
              innerStyle: logoStyle.text.inner
            })}
          </div>
          {renderIcon({
            iconName: 'close',
            style: headerStyle.closePanel,
            innerStyle: headerStyle.closePanel.inner,
            onClick: handleHideSpecialDealMenu
          })}
        </div>
        <div className={'scroll-view'} style={STYLE.menu.contentGroup}>
          {renderGroup({ list: categoryList })}
        </div>
      </div>
    </div>
  );
}
