import { NavLink } from 'react-router-dom';

import { decodeEntities } from '../../../utils/encode';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';
import MainBlock from '../../../container/layout/main-block';

import { IProps } from './model';
import STYLE from './style';

const mainBlockContent = ({ list, onItemClick }) => {
  return (
    <div style={STYLE.boxContent.container}>
      <div style={STYLE.boxContent.listSubItem.container}>
        {Array.isArray(list) &&
          list.map((item, index) => {
            const linkProps = {
              key: `sub-item-magazine-${item.id}`,
              onClick: () => onItemClick?.(item, index),
              to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
              style: STYLE.boxContent.listSubItem.subItem.container
            };
            return (
              <NavLink {...linkProps}>
                <div
                  style={STYLE.boxContent.listSubItem.subItem.itemImage(decodeEntities(item.cover_image.original_url))}
                />
                <div style={STYLE.boxContent.listSubItem.subItem.itemInfo.infoTitle}>{item.title}</div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

const renderView = (props: IProps) => {
  const { list, onItemClick } = props as IProps;
  const mainBlockProps = {
    showHeader: false,
    showViewMore: false,
    textAlignType: 'center',
    content: mainBlockContent({ list, onItemClick }),
    style: {}
  };

  return (
    <div className={'magazine-category'}>
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
