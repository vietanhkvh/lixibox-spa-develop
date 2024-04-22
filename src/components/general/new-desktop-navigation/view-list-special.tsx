import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';
import { decodeEntities } from 'utils';
import { ISpecialComponent } from './model';
import WrapLayout from 'container/layout/wrap/container';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { ROUTING_PRODUCT_CATEGORY_PATH, ROUTING_SPECIAL_DEALS, ROUTING_THEME_DETAIL_PATH } from 'routings/path';
import { NavLink } from 'react-router-dom';

const BannerThemeDefault = CDN_ASSETS_PREFIX('/banner/best-deal.png');

const generateImageSrc = (item) =>
  !!item.banner && !!item.banner.url && item.banner.url !== '/images/original/missing.png'
    ? item.banner.url
    : BannerThemeDefault;

//TODO: create new one at util, duplicated at promotions view
const generateUrl = ({ type, slug }) => {
  switch (type) {
    case 'Theme':
      return `${ROUTING_THEME_DETAIL_PATH}/${slug}`;
    case 'SpecialDeal':
      return `${ROUTING_SPECIAL_DEALS}/${slug}`;
    case 'BrowseNode':
      return `${ROUTING_PRODUCT_CATEGORY_PATH}/${slug}`;
    case 'Redeem':
    case 'GWP':
    default:
      return slug ? `/${slug.replace(/^\//, '')}` : '#';
  }
};
const SpecialComponent: React.FC<ISpecialComponent> = (props) => {
  const { onMouseLeave, promotions } = props;

  //Logic display image banner in number banner responses
  //3: 3, 5, 6, 9, 10
  //4: 7, 11, 12
  //2: 4
  const column = (length) => {
    switch (true) {
      case length === 7 || length === 11 || length === 12:
        return 4;
      case length === 4:
        return 2;
      default:
        return 3;
    }
  };

  const girdTemplate = (column) => {
    const COLUMN_GAP = 16;
    const columnSpacing = COLUMN_GAP * (column - 1);
    return [...Array(column)].reduce((res, _, index) => {
      const width = 100 / column;
      if (index === 0) {
        return `calc(${width}% - ${columnSpacing / column}px)`;
      }
      return `${res} calc(${width}% - ${columnSpacing / column}px)`;
    }, '');
  };

  const containerProps = {
    key: `sub-nav-banner`,
    className: style.specialModal
  };

  return (
    <WrapLayout {...containerProps}>
      <div className={style.detailCatCol}>
        <div
          className={classnames('link-sub-nav-panel-box', style.subCategory)}
          style={{ gridTemplateColumns: `${girdTemplate(column(promotions?.length))}` }}
        >
          {Array.isArray(promotions) &&
            promotions.map((item, index) => {
              if (!item) return null;
              const imgLink = `url(${generateImageSrc(item)})`;
              const url = generateUrl({ type: item.object_type, slug: item.slug });
              return (
                <NavLink className={style.content} to={url} key={`item-theme-${index}`} onClick={onMouseLeave}>
                  <div key={`menu-box-outer-${item.id}`} className={style.col}>
                    <div
                      className={style.background}
                      style={{
                        backgroundImage: imgLink,
                        paddingTop: 'normal' ? '41.66%' : '80.392%'
                      }}
                    />
                    <div className={style.desciption}>{decodeEntities(item.name)}</div>
                  </div>
                </NavLink>
              );
            })}
        </div>
      </div>
    </WrapLayout>
  );
};

export default SpecialComponent;
