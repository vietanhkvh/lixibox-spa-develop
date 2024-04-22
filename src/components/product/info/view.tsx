import { NavLink } from 'react-router-dom';

import { ROUTING_BRAND_DETAIL_PATH, ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';
import { CAPACITY_TYPE } from '../../../constants/application/capacity';
import { TAB_INFO_STATUS } from '../../../constants/application/product';
import { formatCurrency } from '../../../utils/currency';
import { renderHtmlContent } from '../../../utils/html';
import { createBreakDownLine } from '../../../utils/format';
import { isMobileDevice, isMobileVersion } from '../../../utils/responsive';
import GeneralModal from '../../../presentation-component/modal/general-modal';
import Image from 'presentation-component/ui/image';

import TabInfo from '../tab-info';
import SvgIcon from '../../../presentation-component/ui/icon';

import { IProductInfoProps, IProductInfoState } from './model';
import STYLE from './style';
import styles from './style.module.css';
import pdStyles from './product-description.module.css';
import { isEmptyObject } from '../../../utils/validate';

const renderCategory = ({ title, name, link = '', nameStyle = {} }) =>
  link ? (
    <NavLink to={link} style={STYLE.category}>
      <span style={STYLE.category.title}>{title}</span>
      <span style={Object.assign({}, STYLE.category.name, nameStyle)}>{name}</span>
    </NavLink>
  ) : (
    <div style={STYLE.category}>
      <span style={STYLE.category.title}>{title}</span>
      <span style={Object.assign({}, STYLE.category.name, nameStyle)}>{name}</span>
    </div>
  );

const renderProductInfo = ({ list, onItemClick }) => (
  <div style={STYLE.productDetail}>
    {Array.isArray(list) &&
      list.map((item, index) => {
        const name = item?.product?.name || '';
        const quantity = item?.quantity || 0;
        const price = item?.product?.original_price || 0;
        const link = !!item?.product?.saleable
          ? `${ROUTING_PRODUCT_DETAIL_PATH}/${item?.product?.individual_box_slug || item?.product?.slug || '#'}`
          : '#';
        const onLinkClick = () => {
          !!item?.product?.saleable && onItemClick?.(item, index);
        };
        const imgUrl = item?.product?.primary_picture?.medium_url || '';
        const brandName = item?.product?.brand?.name || '';
        const brandSlug = item?.product?.brand?.slug || '';
        const brandLink = brandSlug ? `${ROUTING_BRAND_DETAIL_PATH}/${brandSlug}` : '#';
        const country = item?.product?.country || '';
        const madeInCountry = item?.product?.made_in_country || '';
        const capacity = item?.product?.capacity || '';
        const arr = capacity.length > 0 ? capacity.split(' ') : [];
        const capacityText = arr.length > 1 ? CAPACITY_TYPE[arr[1]] : '';

        return (
          <div key={index} style={STYLE.productDetail.inforWrap}>
            <div style={STYLE.productDetail.infoGroup.container}>
              <NavLink
                title={name}
                to={link}
                onClick={() => onLinkClick?.()}
                style={STYLE.productDetail.infoGroup.imgWrap}
              >
                <Image style={STYLE.productDetail.infoGroup.imgWrap.img} src={imgUrl} alt={name} />
              </NavLink>
              <div style={STYLE.productDetail.infoGroup.info}>
                <NavLink
                  title={name}
                  to={link}
                  onClick={() => onLinkClick?.()}
                  style={STYLE.productDetail.infoGroup.info.productName}
                >
                  {name}
                </NavLink>
                {!!brandName &&
                  renderCategory({
                    title: `Hãng`,
                    name: brandName,
                    nameStyle: { color: '#00B0FF', fontWeight: '600' },
                    link: brandLink
                  })}
                {!!country && renderCategory({ title: `Thương hiệu`, name: country })}
                {!!madeInCountry && renderCategory({ title: `Sản xuất tại`, name: madeInCountry })}
                {!!capacity && renderCategory({ title: capacityText, name: capacity })}
                {!!price && renderCategory({ title: `Giá`, name: formatCurrency(price, { suffix: true }) })}
                {!!quantity && renderCategory({ title: `Số lượng`, name: quantity })}
              </div>
            </div>
          </div>
        );
      })}
  </div>
);

const renderProductList = ({ list, onItemClick }) => {
  return (
    <div className={styles.boxProductList}>
      <div className={styles.boxProductListHeading}>Danh sách sản phẩm</div>
      {Array.isArray(list) &&
        list.map((item, index) => {
          const name = item?.product?.name || '';
          const quantity = item?.quantity || 0;
          const price = item?.product?.original_price || 0;
          const link = !!item?.product?.saleable
            ? `${ROUTING_PRODUCT_DETAIL_PATH}/${item?.product?.individual_box_slug || item?.product?.slug || '#'}`
            : '#';
          const imgUrl = item?.product?.primary_picture?.medium_url || '';

          return (
            <NavLink
              {...{ title: name, to: link, onClick: () => onItemClick?.(item, index), className: styles.navLink }}
            >
              <Image {...{ className: styles.img, src: imgUrl, alt: name }} />
              <div className={styles.bplInfo}>
                <div className={styles.bplName}>{name}</div>
                <div className={styles.bplPrice}>
                  <span>{`${quantity}x `} </span>
                  {formatCurrency(price, { suffix: true })}
                </div>
              </div>
              <SvgIcon name={'angle-right'} className={styles.bplIcon} />
            </NavLink>
          );
        })}
    </div>
  );
};

const renderInfoIndividualBox = ({ item }) => {
  const productBrandImage =
    typeof item === 'object' && item.product && item.product.brand && item.product.brand.brand_image_url;
  return isEmptyObject(item) && isEmptyObject(item.product) ? null : (
    <div className={'tab-info'} style={Object.assign({}, STYLE.brandInfo.group, { marginBottom: 12, marginTop: 8 })}>
      {!!productBrandImage && <Image style={STYLE.brandInfo.brandImg} src={productBrandImage} alt={''} />}
      <div style={STYLE.brandInfo.content}>
        {item &&
          item.product &&
          item.product.brand &&
          renderCategory({
            title: `Hãng:`,
            name: item.product.brand.name || '',
            link: `${ROUTING_BRAND_DETAIL_PATH}/${item.product.brand.slug}`,
            nameStyle: STYLE.category.name.brand
          })}
        {item &&
          item.product &&
          item.product.country &&
          renderCategory({
            title: `Thương hiệu:`,
            name: item.product.country || ''
          })}
        {item &&
          item.product &&
          item.product.made_in_country &&
          renderCategory({
            title: `Sản xuất tại:`,
            name: item.product.made_in_country || ''
          })}
        {item &&
          item.product &&
          item.product.capacity &&
          renderCategory({
            title: `Dung tích:`,
            name: item.product.capacity || ''
          })}
      </div>
    </div>
  );
};

export function renderComponent({ props, state, handleViewMore, handleDisplayMobileInfoModal }) {
  const { product, bundledProducts, onBundleItemClick } = props as IProductInfoProps;
  const { canViewMore, isOpenMobileInfoModal } = state as IProductInfoState;

  const data = (!!product && !!product.box && product.box.box_products) || [];
  const isIndividual = !!product && !!product.box && product.box.is_individual;
  const isBundle = !!product?.box?.is_bundle;
  const shouldDisplayRelatedBoxes =
    (!isIndividual && !!data.length) || (isBundle && bundledProducts.loaded && !!bundledProducts.index.length);
  const relatedBoxes = !isIndividual ? data : isBundle ? bundledProducts.index : [];
  const idProduct = (!!product && !!product.box && product.box.slug) || '';
  let shortDescription = createBreakDownLine(
    (!!product && !!product.box && product.box.short_description) || product.box.long_description || ''
  );
  const hiddenDesc = !canViewMore;
  const LIMIT_TEXT_LENGTH = 280;
  shortDescription = hiddenDesc ? shortDescription.substring(0, LIMIT_TEXT_LENGTH) : shortDescription;
  const longDescription =
    (!!product && !!product.box && product.box.long_description) || product.box.short_description || '';

  const usageProps = {
    data,
    idProduct,
    isIndividual,
    type: TAB_INFO_STATUS.usage,
    title: `Cách sử dụng`
  };

  const ingredientProps = {
    data,
    idProduct,
    isIndividual,
    type: TAB_INFO_STATUS.ingredients,
    title: `Thành phần`
  };

  const isShowBrandInfo =
    !!isIndividual &&
    !!product.box &&
    !!product.box.box_products &&
    !!product.box.box_products.length &&
    !!product.box.box_products[0].product &&
    !!product.box.box_products[0].product.brand &&
    !!product.box.box_products[0].product.brand.description &&
    product.box.box_products[0].product.brand.description.length > 50;

  return (
    <div style={STYLE} className={'user-select-all'}>
      <div style={STYLE.productInfo.container}>
        <div style={STYLE.productInfo.viewMoreGroup}>
          {!!isMobileDevice() && <div style={STYLE.productInfo.infoTitle}>Thông tin sản phẩm</div>}
          {hiddenDesc ? (
            <div style={STYLE.productInfo.htmlContent}>
              {renderHtmlContent({
                content: shortDescription,
                style: STYLE.productInfo.desc
              })}
              <span
                style={STYLE.productInfo.viewMore}
                onClick={() => (isMobileVersion() ? handleDisplayMobileInfoModal(true) : handleViewMore())}
              >
                ... Xem thêm
              </span>
            </div>
          ) : (
            <div className={pdStyles.productDescription}>
              {renderHtmlContent({
                content: longDescription,
                isSantitizeHtml: false,
                style: STYLE.productInfo.desc
              })}
            </div>
          )}
        </div>
        {shouldDisplayRelatedBoxes &&
          !isMobileVersion() &&
          renderProductInfo({ list: relatedBoxes, onItemClick: onBundleItemClick })}
        {shouldDisplayRelatedBoxes &&
          !!isMobileVersion() &&
          renderProductList({
            list: relatedBoxes,
            onItemClick: onBundleItemClick
          })}
        <div style={STYLE.tabContainer} id={'tab-container'}>
          {!!isIndividual && (
            <div style={STYLE.tabContainer.brandContainer}>
              {renderInfoIndividualBox({
                item: (data && !!data.length && data[0]) || {}
              })}
              {!!isShowBrandInfo && data && !!data.length && (
                <NavLink
                  to={`${ROUTING_BRAND_DETAIL_PATH}/${data[0].product.brand.slug}`}
                  style={STYLE.brandInfo.description}
                >
                  {product.box.box_products[0].product.brand.description}
                </NavLink>
              )}
              {!!isMobileVersion() && <InfoLabel onClick={() => handleDisplayMobileInfoModal(true)} />}
            </div>
          )}
          {!!isIndividual && !isMobileVersion() && <TabInfo {...usageProps} />}
          {!!isIndividual && !isMobileVersion() && <TabInfo {...ingredientProps} />}
        </div>
      </div>
      {!!isMobileVersion() && (
        <GeneralModal
          isOpen={isOpenMobileInfoModal}
          title={'Thông tin sản phẩm'}
          rightIcon={'close'}
          onRightActionClick={() => handleDisplayMobileInfoModal(false)}
          onRequestClose={() => handleDisplayMobileInfoModal(false)}
        >
          <div className={styles.productMobileInfoModal}>
            <div className={pdStyles.productDescription}>
              {renderHtmlContent({
                content: longDescription,
                isSantitizeHtml: false,
                style: STYLE.productInfo.desc
              })}
            </div>
            {renderInfoIndividualBox({
              item: (data && !!data.length && data[0]) || {}
            })}
            {!!isShowBrandInfo && (
              <div style={STYLE.brandInfo.description}>{product.box.box_products[0].product.brand.description}</div>
            )}

            <TabInfo {...usageProps} isForceShow={true} />
            <TabInfo {...ingredientProps} isForceShow={true} />
          </div>
        </GeneralModal>
      )}
    </div>
  );
}

const InfoLabel = ({ onClick }) => {
  return (
    <div className={styles.infoLabelGroup} onClick={onClick}>
      <div className={styles.infoLabel}>
        Cách sử dụng
        <SvgIcon name={'angle-right'} className={styles.icon} />
      </div>
      <div className={styles.infoLabel}>
        Thành phần
        <SvgIcon name={'angle-right'} className={styles.icon} />
      </div>
    </div>
  );
};
