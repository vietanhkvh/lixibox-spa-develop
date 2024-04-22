import { NavLink } from 'react-router-dom';

import { renderHtmlContent } from '../../../utils/html';
import { isEmptyObject } from '../../../utils/validate';
import { isMobileVersion } from '../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewContentFromList, gatewayTrackViewedMagazineFromList } from 'tracking/gateway';

import MagazineCategory from '../../magazine/category';
import LoadingPlaceholder from '../../ui/loading-placeholder';
import { ROUTING_MAGAZINE, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';
import { MAGAZINE_CATEGORY_TYPE } from '../../../constants/application/magazine-category';
import Image from 'presentation-component/ui/image';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import ProductItem from '../../../presentation-component/product/product-item';
import ItemCarousel from '../../../presentation-component/item-list-hoc/item-carousel';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const AVATAR = CDN_ASSETS_PREFIX('/user/avatar.png');

export const Placeholder = () => (
  <div>
    <LoadingPlaceholder
      style={Object.assign({}, STYLE.placeholder.mainImg, isMobileVersion() && STYLE.placeholder.mainImgMobile)}
    />
    <div style={STYLE.placeholder.iconGroup}>
      <LoadingPlaceholder style={STYLE.placeholder.iconGroup.dateGroup} />
      <LoadingPlaceholder style={STYLE.placeholder.iconGroup.socialGroup} />
    </div>
    <LoadingPlaceholder style={STYLE.placeholder.title} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '80%' })} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '60%' })} />
    <LoadingPlaceholder style={Object.assign({}, STYLE.placeholder.content, { width: '40%' })} />
  </div>
);

const Cover = ({ magazine }) => {
  if (!magazine || !magazine.cover_image || !magazine.cover_image.original_url) return null;

  return <Image className={styles.magazineCover} src={magazine.cover_image.original_url} alt={magazine.title} />;
};

const SummaryInfo = ({ magazine }) => {
  if (!magazine) return null;

  const navProps = {
    className: styles.category,
    to: `${ROUTING_MAGAZINE_CATEGORY_PATH}/${!!magazine.category && magazine.category.slug}`
  };

  return (
    <div className={styles.summaryInfo}>
      {!!magazine.category && <NavLink {...navProps}>{magazine.category.name}</NavLink>}

      <div className={styles.title}>{magazine.title}</div>

      <div className={styles.user}>
        <Image alt="" src={AVATAR} className={styles.avatar} />
        {magazine.author.name}
      </div>
    </div>
  );
};

const renderMobile = (props: IProps) => {
  const { magazine, magazineRelatedBlogList, idPost } = props as IProps;

  const magazineCategoryProps = {
    title: 'Bài viết liên quan',
    type: MAGAZINE_CATEGORY_TYPE.ONE.type,
    list: (magazineRelatedBlogList && !!magazineRelatedBlogList.length && magazineRelatedBlogList.slice(0, 4)) || [],
    onItemClick: (magazine, index) => {
      gatewayTrackViewedMagazineFromList({
        source: ViewedSource.MAGAZINE_DETAIL_RELATED_MAGAZINES,
        sourceId: idPost,
        index,
        magazine
      });
    }
  };

  const renderItem = (item, index) => {
    const linkProps = {
      to: `${ROUTING_MAGAZINE}/tag/${item.replace('#', '')}`,
      key: `link-tag-${index}`,
      style: STYLE.mobile.tagWrap.tag
    };
    return <NavLink {...linkProps}>{item}</NavLink>;
  };

  return true === isEmptyObject(magazine) ? (
    <Placeholder />
  ) : (
    <div className={'magazineDetail'}>
      <Cover magazine={magazine} />
      <SummaryInfo magazine={magazine} />
      <div className={styles.magazineContent} id={'magazine-content'}>
        <div className={styles.description}>{magazine.description}</div>
        {renderHtmlContent({
          content: magazine.content,
          isReplaceVideoEmbed: true,
          isSantitizeHtml: false
        })}
      </div>

      {!!magazine.tags.length && (
        <>
          <div style={STYLE.mobile.tagWrap.container}>
            <div style={STYLE.mobile.tagWrap.header}>Tags:</div>
            <div style={STYLE.mobile.tagWrap.list}>
              {magazine && Array.isArray(magazine.tags) && magazine.tags.map(renderItem)}
            </div>
          </div>
          <SeparateLine />
        </>
      )}

      <div style={{ width: '100%' }} id={'fb-comments-panel'}></div>
      <SeparateLine />
      {!!magazineRelatedBlogList.length && <MagazineCategory {...magazineCategoryProps} />}

      {!!magazine.related_boxes && !!magazine.related_boxes.length && (
        <>
          <ItemCarousel title={'Sản phẩm trong bài viết'}>
            {magazine.related_boxes.map((product, index) => (
              <ProductItem
                key={product.id || index}
                product={product}
                isFullPadding
                onClick={() => {
                  gatewayTrackViewContentFromList({
                    source: ViewedSource.MAGAZINE_RELATED_BOXES,
                    sourceId: idPost,
                    index,
                    box: product
                  });
                }}
              />
            ))}
          </ItemCarousel>
          <SeparateLine />
        </>
      )}
    </div>
  );
};

export default renderMobile;
