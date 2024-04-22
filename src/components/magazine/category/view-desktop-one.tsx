import { NavLink } from 'react-router-dom';

import MainBlock from '../../../container/layout/main-block';
import { decodeEntities } from '../../../utils/encode';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';
import * as LAYOUT from '../../../style/layout';

import ItemList from '../item-list';

import STYLE from './style';
import ViewGroup from '../view-group';

const mainBlockContent = ({ url, list, onItemClick }) => {
  const categoryOneStyle = STYLE.magazineCategory.categoryOneContent;
  const mainItem = Array.isArray(list) ? list[0] : null;
  const itemList = Array.isArray(list) ? list.slice(0, 2) : [];

  const itemListProps = {
    list: itemList,
    showDescription: false,
    showViewGroup: false,
    style: { width: '100%', textAlign: 'center' as const },
    onItemClick: (item, index) => onItemClick?.(item, index)
  };
  return (
    0 !== list.length && (
      <div>
        <div style={categoryOneStyle}>
          <div style={categoryOneStyle.listSubItem}>
            <ItemList {...itemListProps} />
          </div>
          <NavLink to={`${ROUTING_MAGAZINE_DETAIL_PATH}/${mainItem.slug}`} style={categoryOneStyle.largeItem}>
            <div style={Object.assign({}, STYLE.largeTitle, STYLE.textAlignStyle.center)}>{mainItem.title}</div>
            <div style={categoryOneStyle.largeItem.itemImage(decodeEntities(mainItem.cover_image.original_url))}></div>
            <div style={Object.assign({}, STYLE.description, STYLE.textAlignStyle.center)}>{mainItem.description}</div>
            <ViewGroup
              style={LAYOUT.flexContainer.center}
              txtView={mainItem.views}
              txtTime={formatDateTime(mainItem.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
            />
          </NavLink>
        </div>
        {/* <ViewMore url={url} /> */}
      </div>
    )
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
