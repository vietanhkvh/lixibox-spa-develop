import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import Icon from '../../../ui/icon';
import * as LAYOUT from '../../../../style/layout';

import { IProps } from './model';
import STYLE from './style';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
const logoUrl = CDN_ASSETS_PREFIX('/magazine/logo-magazine.png');

const renderIcon = ({ iconeName, style, innerStyle, handleClick = () => {} }) => {
  const iconProps = {
    name: iconeName,
    style: style,
    innerStyle: innerStyle,
    onClick: handleClick
  };
  return <Icon {...iconProps} />;
};

const renderView = (props) => {
  const { showHideMobileMagazineMenu } = props as IProps;

  return (
    <div style={STYLE}>
      {/** 1. Fix top bar */}
      <div style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, STYLE.fixTop)}>
        {/** 1.1. MENU ICON*/}
        <div style={Object.assign({}, LAYOUT.flexContainer, LAYOUT.flexContainer.center)}>
          {renderIcon({
            iconeName: 'menu',
            style: STYLE.menuIcon,
            innerStyle: STYLE.menuIcon.inner,
            handleClick: () => showHideMobileMagazineMenu(true)
          })}
        </div>

        {/** 1.2. Close search icon */}

        {/** 1.3. LOGO */}
        <NavLink to={'/magazine'} style={STYLE.logo}>
          <Image style={STYLE.logoImg} src={logoUrl} alt={''} />
        </NavLink>

        {/** 1.5. Toggle Search */}
        <div style={Object.assign({}, LAYOUT.flexContainer, LAYOUT.flexContainer.center)}>
          {renderIcon({
            iconeName: 'search',
            style: STYLE.menuIcon,
            innerStyle: STYLE.menuIcon.inner
          })}
        </div>
      </div>
    </div>
  );
};

export default renderView;
