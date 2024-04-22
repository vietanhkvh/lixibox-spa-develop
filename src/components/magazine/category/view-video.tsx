import { NavLink } from 'react-router-dom';

import VideoItem from '../video-item';
import TagLine from '../tag-line';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';

import STYLE from './style';

const renderMainVideo = ({ categoryVideoStyle, mainVideo }) => {
  const mainNavLinkProps = {
    to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${mainVideo.slug}`,
    style: categoryVideoStyle.largeVideoGroup.container
  };

  const mainVideoOuterProps = {
    style: categoryVideoStyle.video((mainVideo && mainVideo.cover_image && mainVideo.cover_image.original_url) || '')
  };

  return (
    <NavLink {...mainNavLinkProps}>
      <div {...mainVideoOuterProps}>
        <div style={categoryVideoStyle.videoIcon} />
      </div>
      <div style={categoryVideoStyle.contentWrap}>
        <div style={categoryVideoStyle.contentWrap.title}>{(mainVideo && mainVideo.title) || ''}</div>
        <div style={categoryVideoStyle.contentWrap.description}>{(mainVideo && '#' + mainVideo.description) || ''}</div>
      </div>
    </NavLink>
  );
};

const mainBlockContent = ({ list, onItemClick }) => {
  const categoryVideoStyle = STYLE.magazineCategory.categoryVideoContent;
  const mainVideo = Array.isArray(list) ? list[0] : null;
  const videoList = Array.isArray(list) ? list.slice(1, 5) : [];

  return 0 === list.length ? null : (
    <div>
      <TagLine title={'Video'} />

      <div style={categoryVideoStyle.container}>
        {renderMainVideo({ mainVideo, categoryVideoStyle })}

        <div style={categoryVideoStyle.smallVideoGroup.container}>
          {Array.isArray(videoList) &&
            videoList.map((item, index) => (
              <VideoItem
                key={`video-item-${item.id}`}
                item={item}
                lastChild={index > 1}
                onClick={(_, magazine) => onItemClick?.(magazine, index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const renderView = ({ title, list, onItemClick }) => {
  return list && 0 !== list.length ? mainBlockContent({ list, onItemClick }) : null;
};

export default renderView;
