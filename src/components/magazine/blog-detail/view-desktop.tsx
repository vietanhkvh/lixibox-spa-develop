import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import ProductSlider from '../../../presentation-component/general/desktop/product-slider-with-heading';
import ProductItem from '../../../presentation-component/product/product-item';

import LoadingPlaceholder from '../../ui/loading-placeholder';
import { isMobileVersion } from '../../../utils/responsive';
import Icon from '../../ui/icon';
import MagazineImageSlider from '../../../components/magazine/image-slider';

import { isEmptyObject, isEmptyKeyObject } from '../../../utils/validate';
import { renderHtmlContent } from '../../../utils/html';
import { ROUTING_MAGAZINE, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';
import { gatewayTrackViewContentFromList, gatewayTrackViewedMagazineFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

interface ICombinedProductSlider {
  dataList: Array<any>;
  title: string;
  viewMoreTitle?: string;
  viewMoreLink?: string;
  isShowViewMore?: boolean;
  [key: string]: any;
}

const CombinedProductSlider = ({ dataList, ...props }: ICombinedProductSlider) => {
  const dataProps = dataList.map((product) => ({ key: product.id, product }));

  return <ProductSlider data={dataProps} template={ProductItem} {...props} />;
};

export const renderLoadingPlaceholder = () => (
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

const renderDesktop = (props: IProps) => {
  const { magazine, magazineRelatedBlogList, idPost } = props as IProps;

  const magazineImageProps = {
    title: 'Bài viết liên quan',
    column: 5,
    showViewMore: false,
    data: magazineRelatedBlogList || [],
    onItemClick: (magazine, index) => {
      gatewayTrackViewedMagazineFromList({
        source: ViewedSource.MAGAZINE_DETAIL_RELATED_MAGAZINES,
        sourceId: idPost,
        index,
        magazine
      });
    }
  };

  return true === isEmptyObject(magazine) ? (
    renderLoadingPlaceholder()
  ) : (
    <div className={'magazine-blog-detail'}>
      {/* Header */}
      <div style={STYLE.headerWrap}>
        <Image style={STYLE.headerWrap.imgWrap} src={magazine.cover_image.original_url} alt={magazine.title} />
        <div style={STYLE.headerWrap.blogTitle}>{magazine.title}</div>

        <div style={STYLE.headerWrap.blogSubInfo}>
          {!!magazine.category && (
            <NavLink
              to={`${ROUTING_MAGAZINE_CATEGORY_PATH}/${magazine.category.slug}`}
              style={STYLE.headerWrap.blogSubInfo.sub}
            >
              <Icon name={'menu'} style={STYLE.headerWrap.blogSubInfo.icon} innerStyle={{ height: 12 }} />
              <span style={STYLE.headerWrap.blogSubInfo.text}>{magazine.category.name}</span>
            </NavLink>
          )}

          {!!magazine.author && (
            <div style={STYLE.headerWrap.blogSubInfo.sub}>
              <Icon name={'user'} style={STYLE.headerWrap.blogSubInfo.icon} innerStyle={{ height: 15 }} />
              <span style={STYLE.headerWrap.blogSubInfo.text}>{`Tác giả: ${magazine.author.name}`}</span>
            </div>
          )}
        </div>

        <div style={STYLE.headerWrap.desc}>{magazine.description}</div>

        <div style={STYLE.headerWrap.blogSubInfo.line} />
      </div>
      {/* Content */}
      <div
        className={classnames(styles.magazineContent, styles.desktop)}
        id="magazine-content"
        style={STYLE.contentWrap}
      >
        {renderHtmlContent({
          content: magazine.content,
          isReplaceVideoEmbed: true,
          isSantitizeHtml: false
        })}
      </div>
      {/* Tag magazine */}
      {0 !== magazine.tags.length && (
        <div style={STYLE.tagWrap.container}>
          <div style={STYLE.mobile.tagWrap.list}>
            <div style={STYLE.tagWrap.header}>Tags:</div>
            {magazine &&
              Array.isArray(magazine.tags) &&
              magazine.tags.map((item, index) => {
                const linkProps = {
                  to: `${ROUTING_MAGAZINE}/tag/${item.replace('#', '')}`,
                  key: `link-tag-${index}`
                };
                return (
                  <NavLink {...linkProps}>
                    <span key={`tag-${index}`} style={STYLE.tagWrap.tag}>
                      {item}
                    </span>
                  </NavLink>
                );
              })}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 800, margin: '0 auto' }} id={'fb-comments-panel'}></div>

      {/* Magazine related */}
      {Array.isArray(magazineRelatedBlogList) && !!magazineRelatedBlogList.length && (
        <MagazineImageSlider {...magazineImageProps} />
      )}

      {/* Relate product*/}
      {!isEmptyKeyObject(magazine, 'related_boxes') &&
        Array.isArray(magazine.related_boxes) &&
        magazine.related_boxes.length > 0 && (
          <div style={STYLE.productSlide}>
            <CombinedProductSlider
              dataList={magazine.related_boxes}
              title={`Sản phẩm trong bài viết`}
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.MAGAZINE_RELATED_BOXES,
                  sourceId: idPost,
                  index,
                  box
                });
              }}
            />
          </div>
        )}
    </div>
  );
};

export default renderDesktop;
