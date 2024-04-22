import { NavLink } from 'react-router-dom';

import MainBlock from '../../../container/layout/main-block';
import ViewMore from '../view-more';
import ItemList from '../item-list';
import { decodeEntities } from '../../../utils/encode';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';

import STYLE from './style';

const mainBlockContent = ({ url, list, onItemClick }) => {
  const mainItem = Array.isArray(list) ? list[0] : null;
  const itemList = Array.isArray(list) ? list.slice(0, 2) : [];

  const itemListProps = {
    list: itemList,
    showDescription: false,
    showViewGroup: false,
    onItemClick
  };
  return (
    0 !== list.length && (
      <div>
        <div style={STYLE.magazineCategory.boxContent}>
          <NavLink
            to={`${ROUTING_MAGAZINE_DETAIL_PATH}/${mainItem.slug}`}
            style={STYLE.magazineCategory.boxContent.largeItem}
          >
            <div
              style={STYLE.magazineCategory.boxContent.largeItem.itemImage(
                decodeEntities(mainItem.cover_image.original_url)
              )}
            >
              <div style={STYLE.magazineCategory.boxContent.largeItem.itemInfo.textImg}>{mainItem.title}</div>
            </div>
          </NavLink>
          <div style={STYLE.magazineCategory.boxContent.listSubItem}>
            <ItemList {...itemListProps} />
          </div>
        </div>
        <ViewMore url={url} />
      </div>
    )
  );
};

const renderView = ({ title, url, list, onItemClick }) => {
  const mainBlockProps = {
    title: title,
    showHeader: true,
    showViewMore: false,
    textAlignType: 'center',
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
