import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import STYLE from './style';
import style from './style.module.scss';

import {
  ROUTING_PRODUCT_CATEGORY_PATH,
  ROUTING_THEME_DETAIL_PATH,
  ROUTING_SPECIAL_DEALS
} from '../../../../routings/path';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import CountdownPanel from 'components/countdown/panel';
const BannerThemeDefault = CDN_ASSETS_PREFIX('/banner/best-deal.png');

const renderItemPlaceholder = (item) => <div className={'ani-bg'} style={STYLE.placeholder.item} key={item}></div>;

const renderLoadingPlaceholder = () => <div style={STYLE.placeholder}>{[1, 2, 3, 4].map(renderItemPlaceholder)}</div>;

const generateImageProps = (item) => ({
  style: STYLE.list.image,
  alt: item.name || '',
  src:
    !!item.banner && !!item.banner.url && item.banner.url !== '/images/original/missing.png'
      ? item.banner.url
      : BannerThemeDefault
});

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

const renderItem = (item, $index) => {
  const imgProps = generateImageProps(item);

  const url = generateUrl({ type: item.object_type, slug: item.slug });

  return (
    <NavLink to={url} key={`item-theme-${$index}`}>
      <div className={'wrapLayout'} style={Object.assign({}, STYLE.list.item)}>
        <Image {...imgProps} />
        <div style={STYLE.list.title}>{item.name}</div>
      </div>
    </NavLink>
  );
};

export function renderComponent() {
  const { promotions, countdownStore } = this.props;
  const { list } = countdownStore;
  return (
    <div style={STYLE}>
      {!promotions || !promotions.length ? (
        renderLoadingPlaceholder()
      ) : (
        <div style={STYLE.list}>
          <div className={style.countdownPanel}>
            {!!countdownStore?.list?.length && <CountdownPanel size={'normal'} data={list?.[list.length - 1]} />}
          </div>
          {promotions.map(renderItem)}
        </div>
      )}
    </div>
  );
}
