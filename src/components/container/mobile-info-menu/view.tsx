import { NavLink } from 'react-router-dom';

import * as LAYOUT from '../../../style/layout';
import Icon from '../../ui/icon';

import STYLE from './style';
import { IInfoMobileMenuProps } from './model';
import { aboutMenuList, introBuyMenuList } from './initialize';

const renderIcon = ({ iconName, style, innerStyle, onClick = () => {} }) => (
  <Icon name={iconName} style={style} innerStyle={innerStyle} onClick={onClick} />
);

const renderItem = ({ text, slug, key }) => {
  const linkProps = {
    to: slug,
    key: `info-item-${key}`,
    style: STYLE.menu.item
  };
  return (
    <NavLink {...linkProps}>
      <div style={STYLE.menu.item.text}>{text}</div>
    </NavLink>
  );
};

const renderGroup = ({ list, name }) => {
  return (
    <div style={STYLE.menu.contentGroup.content}>
      <div style={STYLE.menu.item.title}>{name}</div>
      {Array.isArray(list) &&
        list.map((item, index) => {
          return renderItem({ text: item.name, slug: item.slug, key: index });
        })}
    </div>
  );
};

export function renderComponent({ props, handleHideInfoMobileMenu }) {
  const {
    menuStore: { isShowInfoMenu }
  } = props as IInfoMobileMenuProps;

  const containerStyle = Object.assign(
    {},
    LAYOUT.flexContainer.justify,
    LAYOUT.flexContainer.verticalFlex,
    STYLE,
    true === isShowInfoMenu && STYLE.show
  );

  const logoStyle = STYLE.menu.heading.logoGroup.logo;
  const headerStyle = STYLE.menu.heading;

  return (
    <div className={'mobile-info-menu'} style={containerStyle}>
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
            onClick: handleHideInfoMobileMenu
          })}
        </div>
        <div className={'scroll-view'} style={STYLE.menu.contentGroup}>
          {renderGroup({ list: aboutMenuList, name: 'Thông tin' })}
          {renderGroup({ list: introBuyMenuList, name: 'Hướng dẫn mua hàng' })}
        </div>
      </div>
    </div>
  );
}
