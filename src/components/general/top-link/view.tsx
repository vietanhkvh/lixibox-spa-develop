import { NavLink } from 'react-router-dom';

import AdLink from '../../../presentation-component/ui/ad-link';
import { getNavLink } from '../../../utils/validate';
import WrapLayout from '../../../container/layout/wrap';
import Icon from '../../ui/icon';
import STYLE from './style';

const renderLinkItem = (item, $index) => {
  const navLinkProps = {
    title: item.title,
    to: item.href,
    style: STYLE.rightLink.link,
    key: `item-right-link-${$index}`
  };

  const iconProps = {
    name: item.icon,
    style: STYLE.rightLink.icon,
    innerStyle: STYLE.rightLink.innerIcon(item.icon)
  };

  return (
    <NavLink {...navLinkProps}>
      <Icon {...iconProps} />
      {item.title}
    </NavLink>
  );
};

const renderLink = ({ rightLink }) => (
  <div style={STYLE.rightLink.container}>{Array.isArray(rightLink) && rightLink.map(renderLinkItem)}</div>
);

const renderView = ({ selected, rightLink }) => (
  <div className={'top-link'} style={STYLE}>
    <WrapLayout style={STYLE.wrap}>
      <AdLink
        to={getNavLink((selected && selected.links && !!selected.links.length && selected.links[0]) || '')}
        style={STYLE.topBannerLink}
      >
        {(!!selected && selected.name) || ''}
      </AdLink>
      {renderLink({ rightLink })}
    </WrapLayout>
  </div>
);

export default renderView;
