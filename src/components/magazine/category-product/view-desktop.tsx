import { NavLink } from 'react-router-dom';

import { decodeEntities } from '../../../utils/encode';
import { ROUTING_MAGAZINE_DETAIL_PATH } from '../../../routings/path';

import { IProps } from './model';
import STYLE from './style';

const renderView = ({ list, onItemClick }: IProps) => (
  <div style={STYLE.productContent}>
    {Array.isArray(list) &&
      list.map((item, index) => {
        const linkProps = {
          key: `magazine-category-product-${item.id}`,
          onClick: () => onItemClick?.(item, index),
          to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
          style: STYLE.productContent.itemWrap
        };

        return (
          <NavLink {...linkProps}>
            <div style={STYLE.productContent.itemWrap.imgWrap}>
              <div
                style={STYLE.productContent.itemWrap.imgWrap.itemImage(decodeEntities(item.cover_image.original_url))}
              />
            </div>
            <div style={STYLE.productContent.itemWrap.itemInfo}>
              <div style={STYLE.title}>{item.title.toLowerCase()}</div>
            </div>
          </NavLink>
        );
      })}
  </div>
);

export default renderView;
