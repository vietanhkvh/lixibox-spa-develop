import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { ROUTING_MAGAZINE } from '../../../routings/path';

import * as LAYOUT from '../../../style/layout';
import STYLE from './style';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
const logoUrl = CDN_ASSETS_PREFIX('/magazine/logo-magazine.png');

const renderLogo = () => {
  const linkProps = {
    to: ROUTING_MAGAZINE,
    style: Object.assign({}, LAYOUT.flexContainer.center, LAYOUT.flexContainer.verticalCenter, STYLE.logo)
  };

  return (
    <NavLink {...linkProps}>
      <Image
        {...{
          style: STYLE.logoImg,
          src: logoUrl,
          alt: `Can't load`
        }}
      />
    </NavLink>
  );
};

export default renderLogo;
