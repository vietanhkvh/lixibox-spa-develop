import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';

import STYLE from './style';

const renderView = ({ title, url, list, titleStyle, type = 'normal', size = 'normal', onItemClick }) => {
  const renderItem = (item, index) => {
    const linkProps = {
      key: `img-${index}`,
      onClick: () => onItemClick?.(item, index),
      to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
      style: 'small' === size ? STYLE.desktop.container.smallItemSlider : STYLE.desktop.container.itemSlider
    };

    return (
      <NavLink {...linkProps}>
        <div style={STYLE.mobile.container.itemSliderPanel}>
          <Image alt={''} src={item.cover_image.large_url} style={STYLE.mobile.container.itemSliderPanelImg} />
          {'video' === type && <div style={STYLE.mobile.container.videoIcon} />}
        </div>
        <div style={STYLE.desktop.container.info}>
          <div style={STYLE.desktop.container.info.title}>{item.title}</div>
          <div style={STYLE.desktop.container.info.description}>{item.description}</div>
        </div>
      </NavLink>
    );
  };

  return list && Array.isArray(list) && list.length > 0 ? (
    <div className={'user-select-all'}>
      <NavLink to={url} style={Object.assign({}, STYLE.desktop.heading, titleStyle)}>
        {title}
      </NavLink>
      <div style={STYLE.desktop}>
        <div style={STYLE.desktop.container}>{list.map(renderItem)}</div>
      </div>
    </div>
  ) : null;
};

export default renderView;
