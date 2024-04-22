import { NavLink } from 'react-router-dom';

import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';

import { IProps } from './model';
import STYLE from './style';

const renderView = (props) => {
  const { item, column, lastChild, style, onClick } = props as IProps;

  const linkProps = {
    key: `small-video-${item.id}`,
    onClick: (e) => onClick?.(e, item),
    to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
    style: Object.assign({}, STYLE.videoContainer(column), style, lastChild && STYLE.lastChild)
  };

  return (
    <NavLink {...linkProps}>
      <div style={STYLE.video(item.cover_image.original_url)}>
        <div style={STYLE.videoIcon}></div>
      </div>
      <div style={STYLE.contentWrap}>
        <div style={STYLE.contentWrap.title}>{item.title || ''}</div>
      </div>
    </NavLink>
  );
};

export default renderView;
