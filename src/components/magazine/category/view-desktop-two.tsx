import { NavLink } from 'react-router-dom';

import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';
import { decodeEntities } from '../../../utils/encode';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import MainBlock from '../../../container/layout/main-block';
import ViewGroup from '../view-group';

import STYLE from './style';

const mainBlockContent = ({ url, list, onItemClick }) => {
  const categoryTwoStyle = STYLE.magazineCategory.categoryTwoContent;
  return (
    <div>
      <div style={STYLE.magazineCategory.categoryTwoContent}>
        <div style={categoryTwoStyle}>
          {Array.isArray(list) &&
            list.map((item, index) => {
              const linkProps = {
                key: `magazine-category-two-${item.id}`,
                onClick: () => onItemClick?.(item, index),
                to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
                style: categoryTwoStyle.itemWrap
              };

              return (
                <NavLink {...linkProps}>
                  <div style={categoryTwoStyle.itemWrap.itemImage(decodeEntities(item.cover_image.original_url))} />
                  <div style={categoryTwoStyle.itemWrap.itemInfo}>
                    <div style={STYLE.title}>{item.title}</div>
                    <div style={STYLE.description}>{item.description}</div>
                    <ViewGroup
                      txtView={item.views}
                      txtTime={formatDateTime(item.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
                    />
                  </div>
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const renderView = ({ title, url, list, onItemClick }) => {
  const mainBlockProps = {
    title: title,
    showHeader: true,
    showViewMore: false,
    content: mainBlockContent({ url, list, onItemClick }),
    style: {}
  };

  return (
    <div className={'magazine-category'}>
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
