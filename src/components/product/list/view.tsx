import { NavLink } from 'react-router-dom';

import { KEY_WORD } from '../../../constants/application/key-word';
import { stringToHash } from '../../../utils/encode';
import { decodeEntities } from '../../../utils/encode';
import { getUrlParameter } from '../../../utils/format';
import { isMobileVersion, getDeviceVersion } from '../../../utils/responsive';
import { isUndefined, isEmptyObject, isEmptyKeyObject } from '../../../utils/validate';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import { ERROR_TEXT_NO_RESULT } from '../../../config';

import Icon from '../../ui/icon';
import FadeIn from '../../../container/layout/fade-in';
import Pagination from 'components/general/pagination';
import ProductDetailItem from '../detail-item';
import NoContent from '../../../container/exception/404';
import Image from 'presentation-component/ui/image';
import DesktopAutoDisplayToolbar from '../../../presentation-component/general/desktop-auto-display-toolbar';
import DesktopFilterToolbar from '../../../presentation-component/general/desktop-filter-toolbar';

import ProductItem from '../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../presentation-component/item-list-hoc/item-vertical-list';

import * as LAYOUT from '../../../style/layout';

import { IProps, IState } from './model';
import STYLE from './style';
import componentStyles from '../../../style/component.module.scss';
import styles from './style.module.scss';

const renderTooltip = ({ text }) => (
  <div className={'show-tooltip'} style={STYLE.tooltip}>
    <div style={STYLE.tooltip.group}>
      <div style={STYLE.tooltip.group.text}>{text}</div>
      <div style={STYLE.tooltip.group.icon} />
    </div>
  </div>
);

function renderDesktopVersion() {
  const {
    categoryFilterHash,
    productByCategory,
    history,
    fetchFilteredProductsByCategory,
    hiddenToolBar,
    onItemClick
  } = this.props as IProps;

  const noContentProps = { isShowNavigation: false, ...ERROR_TEXT_NO_RESULT };

  const { urlList } = this.state as IState;
  const { current_page, per_page, total_pages } = (!isEmptyKeyObject(productByCategory, 'paging') &&
    productByCategory.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  return (
    <div style={STYLE}>
      {/* TODO: remove after applying new UI */}
      {/** 1. Heading block: Title without view more */}
      {/* <Heading categoryName={categoryName} /> */}
      {ToolBar.bind(this)({
        productByCategory,
        categoryFilterHash,
        history,
        fetchFilteredProductsByCategory,
        hiddenToolBar
      })}

      {!!productByCategory && !!productByCategory.boxes && !!productByCategory.boxes.length ? (
        <>
          <ItemVerticalList column={4}>
            {productByCategory.boxes.map((box, index) => (
              <ProductItem
                key={box.id || index}
                product={box}
                isFullPadding
                onClick={() => onItemClick?.(box, index)}
              />
            ))}
          </ItemVerticalList>
          <Pagination
            {...{
              current: current_page,
              per: per_page,
              total: total_pages,
              urlList,
              handleClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </>
      ) : (
        <NoContent {...noContentProps} />
      )}
    </div>
  );
}

function ToolBar({ history, productByCategory, categoryFilterHash, fetchFilteredProductsByCategory, hiddenToolBar }) {
  const bids = getUrlParameter(window.location.search, 'brands');
  const pl = getUrlParameter(window.location.search, 'pl');
  const ph = getUrlParameter(window.location.search, 'ph');
  const sort = getUrlParameter(window.location.search, 'sort');
  const stockStatus = getUrlParameter(window.location.search, 'stock_status');

  const brandList =
    (productByCategory && productByCategory.available_filters && productByCategory.available_filters.brands) || [];

  const minPrice =
    (productByCategory && productByCategory.available_filters && productByCategory.available_filters.pl) || 0;

  const maxPrice =
    (productByCategory && productByCategory.available_filters && productByCategory.available_filters.ph) || 0;

  const desktopAutoDisplayToolbarProps = {
    sort,
    history,
    brandList,
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus,
    onSubmit: fetchFilteredProductsByCategory
  };
  const hidden = Object.assign({}, desktopAutoDisplayToolbarProps, { hiddenToolBar: hiddenToolBar });
  return !!hiddenToolBar ? (
    <DesktopFilterToolbar {...hidden} />
  ) : (
    <DesktopAutoDisplayToolbar>
      <DesktopFilterToolbar {...desktopAutoDisplayToolbarProps} />
    </DesktopAutoDisplayToolbar>
  );
}

function renderStatInfoMobile() {
  const { listMenu, title, productByCategory } = this.props as IProps;
  const { isShowCategoryModal, categoryList, isSubCategoryOnTop, itemSelected, isShowFilter } = this.state as IState;

  const browseNodes = (!isEmptyKeyObject(listMenu, 'browse_nodes') && listMenu.browse_nodes) || [];
  const categoryName =
    productByCategory && productByCategory.browse_node
      ? productByCategory.browse_node.vn_name || productByCategory.browse_node.name
      : title;

  const iconProps = {
    name: `angle-down`,
    style: STYLE.statInfoContainer.statInfo.count.icon,
    innerStyle: STYLE.statInfoContainer.statInfo.count.innerStyle
  };

  const item = itemSelected && itemSelected.length > 0 ? itemSelected[itemSelected.length - 1] : {};

  const isNotEmptyProductList =
    productByCategory && Array.isArray(productByCategory.boxes) && !!productByCategory.boxes.length;

  return (
    <div style={STYLE.statInfoContainer} id={'sub-category'}>
      <div
        style={Object.assign(
          {},
          LAYOUT.flexContainer.justify,
          STYLE.statInfoContainer.statInfo.container,
          isSubCategoryOnTop && STYLE.statInfoContainer.statInfo.isTop
        )}
      >
        <div
          style={STYLE.statInfoContainer.subCategory}
          onClick={() => this.handleShowCategoryModal.bind(this)(browseNodes, true)}
        >
          <div style={STYLE.statInfoContainer.statInfo.count}>
            <div style={STYLE.statInfoContainer.statInfo.count.title}>{decodeEntities(categoryName)}</div>
            <Icon {...iconProps} />
          </div>
        </div>
        {isNotEmptyProductList && (
          <div style={Object.assign({}, LAYOUT.flexContainer.right)}>{renderSortList.bind(this)()}</div>
        )}
        {(isShowCategoryModal || isShowFilter) && (
          <div
            style={STYLE.statInfoContainer.overlay}
            onClick={
              isShowCategoryModal
                ? () => this.handleShowCategoryModal.bind(this)(browseNodes, true)
                : this.handleShowFilter.bind(this)
            }
          />
        )}
      </div>
      {isShowCategoryModal && renderCategoryMobile.bind(this)({ list: categoryList, item })}
    </div>
  );
}

function renderStatInfoDesktop() {
  return (
    <div style={Object.assign({}, LAYOUT.flexContainer.justify, STYLE.statInfoContainer.statInfo.container)}>
      <div style={LAYOUT.flexContainer.left}>
        <div style={STYLE.statInfoContainer.statInfo.count}></div>
      </div>
      <div style={LAYOUT.flexContainer.right}>{renderSortList.bind(this)()}</div>
    </div>
  );
}

function renderStatInfo() {
  const switchView = {
    MOBILE: () => renderStatInfoMobile.bind(this)(),
    DESKTOP: () => renderStatInfoDesktop.bind(this)()
  };

  return switchView[getDeviceVersion()]();
}

const renderImgItem = ({ name, src, className, isBrandSelected = false }) => {
  const brandItemStyle = STYLE.brandList.brandItem.brand;

  const iconProps = {
    name: 'close',
    style: brandItemStyle.closeIconStyle,
    innerStyle: brandItemStyle.closeIconInnerStyle
  };

  const overlayDesktop = () =>
    !isBrandSelected ? null : (
      <div className={'overlay-remove'}>
        <Icon {...iconProps} />
      </div>
    );

  const overlayMobile = () =>
    !isBrandSelected ? null : (
      <div style={brandItemStyle.overlayMobile}>
        <Icon {...iconProps} />
      </div>
    );

  const switchOverlay = {
    MOBILE: () => overlayMobile(),
    DESKTOP: () => overlayDesktop()
  };

  const missingImage = src.includes('missing.png');

  return (
    <div
      style={Object.assign(
        {},
        brandItemStyle.container,
        isBrandSelected && STYLE.brandList.brandItem.selected,
        className && brandItemStyle.fallbackContainer
      )}
      className={className}
    >
      {missingImage ? (
        <span style={brandItemStyle.textContent}>{name}</span>
      ) : (
        <Image src={src} style={brandItemStyle.avatar} alt={`Thương hiệu: ${name}`} />
      )}
      {switchOverlay[getDeviceVersion()]()}
    </div>
  );
};

const renderBrandItem = ({ item, brandSlugSelected, handleClick }) => {
  const brandItemProps = {
    style: STYLE.brandList.brandItem.container,
    key: `brand-item-${item && item.brand_id}`,
    className: 'brand-container',
    onClick: () => handleClick(item)
  };

  const isBrandSelected = brandSlugSelected && brandSlugSelected === item.brand_slug;
  const className = isBrandSelected ? 'brand-item-selected' : 'brand-item';

  return (
    <div {...brandItemProps}>
      {renderImgItem({
        src: (item && item.brand_logo) || '',
        className,
        isBrandSelected,
        name: item.brand_name
      })}
      {!isMobileVersion() &&
        renderTooltip({
          text: isBrandSelected ? 'Xóa bộ lọc' : `${item && item.brand_name} (${item && item.count} sản phẩm)`
        })}
    </div>
  );
};

const renderViewMoreBrand = ({ handleClick, viewMoreNum }) => (
  <div style={STYLE.brandList.brandItem.container} onClick={handleClick} className={'brand-container'}>
    <div style={Object.assign({}, STYLE.brandList.brandItem.brand.container, STYLE.brandList.brandItem.brand.viewMore)}>
      <div style={STYLE.brandList.brandItem.brand.txtViewMore}>XEM THÊM</div>
      {viewMoreNum && `(+${viewMoreNum})`}
    </div>
  </div>
);

function renderBrandList() {
  const { brandShowNumber } = this.props;
  const { isShowViewMoreBrand, brandSlugSelected, brandList } = this.state;

  const viewMoreNum = Array.isArray(brandList) && !!brandList.length ? brandList.length - (brandShowNumber - 1) : 0;

  // Hide brand if it greater than brand show number
  let _brandList = !isShowViewMoreBrand && brandList.length > brandShowNumber ? brandList.slice(0, 17) : brandList;

  // Move brand selected on top of list
  if (isMobileVersion()) {
    _brandList = brandSlugSelected ? this.moveItemOnTop({ list: _brandList, slug: brandSlugSelected }) : _brandList;
  }

  return (
    <div style={STYLE.brandList.container}>
      {_brandList.map((item) =>
        renderBrandItem({
          item,
          brandSlugSelected,
          handleClick: this.handleSelectBrand.bind(this)
        })
      )}
      {!isShowViewMoreBrand &&
        viewMoreNum > 0 &&
        renderViewMoreBrand({
          handleClick: this.handleShowViewMoreBrand.bind(this),
          viewMoreNum
        })}
    </div>
  );
}

const renderIcon = ({ name, style = {}, innerStyle = {}, handleClick = () => {} }) => {
  const iconProps = {
    name,
    onClick: handleClick,
    style: Object.assign({}, STYLE.modal.wrap.group.icon, style),
    innerStyle: Object.assign({}, STYLE.modal.wrap.group.innerStyle, innerStyle)
  };

  return <Icon {...iconProps} />;
};

function renderCategoryMobile({ list, item }) {
  return (
    <div style={STYLE.modal.container(true)}>
      <div style={STYLE.modal.header}>
        <div style={STYLE.modal.header.wrap} onClick={() => this.handleBackCategoryModal.bind(this)()}>
          {renderIcon({
            name: `arrow-left`,
            style: STYLE.modal.header.icon,
            innerStyle: STYLE.modal.header.innerStyle
          })}
          <div style={STYLE.modal.header.name}>Quay lại</div>
        </div>
        {!isEmptyObject(item) && (
          <NavLink
            to={`${ROUTING_PRODUCT_CATEGORY_PATH}/${(item && item.slug) || ''}`}
            style={STYLE.modal.detailGroup}
            onClick={this.handleCloseCategoryModal.bind(this)}
          >
            <div style={STYLE.modal.detailGroup.subText}>Xem tất cả</div>
            <div style={STYLE.modal.detailGroup.text}>{decodeEntities((item && item.vn_name) || '')}</div>
          </NavLink>
        )}
      </div>
      <div className={'scroll-view'} style={STYLE.modal.wrap}>
        {Array.isArray(list) &&
          list.map((item, index) => {
            const linkProps = {
              to: `${ROUTING_PRODUCT_CATEGORY_PATH}/${item.slug}`,
              style: STYLE.modal.wrap.group.name,
              onClick: () => this.setState({ isShowCategoryModal: false })
            };

            return item.sub_nodes && item.sub_nodes.length > 0 ? (
              <div
                style={STYLE.modal.wrap.group}
                key={`category-item-${item.id}`}
                onClick={() => this.handleShowCategoryModal.bind(this)(item.sub_nodes, true, item)}
              >
                <div style={STYLE.modal.wrap.group.name}>
                  <div style={STYLE.modal.wrap.group.name.main}>{decodeEntities(item && item.vn_name)}</div>
                  <div style={STYLE.modal.wrap.group.name.sub}>{decodeEntities(item && item.name)}</div>
                </div>
                {renderIcon({ name: `angle-right` })}
              </div>
            ) : (
              <div style={STYLE.modal.wrap.group} key={`category-item-${item.id}`}>
                <NavLink {...linkProps}>
                  <div style={STYLE.modal.wrap.group.name.main}>{decodeEntities(item && item.vn_name)}</div>
                  <div style={STYLE.modal.wrap.group.name.sub}>{decodeEntities(item && item.name)}</div>
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function renderSortList() {
  const { sortList, hoverSort } = this.state;

  return (
    <div
      style={Object.assign({}, LAYOUT.flexContainer.right, STYLE.statInfoContainer.statInfo.sort)}
      onMouseEnter={this.onMouseEnter.bind(this)}
      onClick={this.handleShowSort.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}
    >
      <div className={styles.statInfoContainerStatInfoSortText} style={STYLE.statInfoContainer.statInfo.sort.text}>
        {' '}
        Sắp xếp theo:
      </div>

      {/** 2.1.2.1 Sort selected */}
      {Array.isArray(sortList) &&
        sortList.map(
          (sort, $index) =>
            true === sort.selected && (
              <div
                key={`sort-selected-${$index}`}
                style={Object.assign(
                  {},
                  LAYOUT.flexContainer.right,
                  STYLE.statInfoContainer.statInfo.sort.item,
                  STYLE.statInfoContainer.statInfo.sort.itemSelected.container,
                  hoverSort && STYLE.statInfoContainer.statInfo.sort.itemSelected.noBorder
                )}
              >
                <Icon
                  name={sort.icon}
                  style={STYLE.statInfoContainer.statInfo.sort.item.icon}
                  innerStyle={STYLE.statInfoContainer.statInfo.sort.item.inner}
                />
                <div
                  className={styles.statInfoContainerStatInfoSortItemTitleSelected}
                  style={Object.assign(
                    {},
                    STYLE.statInfoContainer.statInfo.sort.item.title,
                    STYLE.statInfoContainer.statInfo.sort.item.title.selected
                  )}
                >
                  {sort.title}
                </div>
              </div>
            )
        )}
      {/** 2.1.2.1 Sort in list */}
      <div
        style={Object.assign(
          {},
          STYLE.statInfoContainer.statInfo.sort.list,
          hoverSort && STYLE.statInfoContainer.statInfo.sort.list.show
        )}
      >
        {Array.isArray(sortList) &&
          sortList.map(
            (sort, $index) =>
              false === sort.selected && (
                <div
                  key={`sort-list-${$index}`}
                  className={styles.statInfoContainerStatInfoSortItemList}
                  style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.statInfoContainer.statInfo.sort.item)}
                  onClick={() => this.selectSort(sort)}
                >
                  <Icon
                    name={sort.icon}
                    style={STYLE.statInfoContainer.statInfo.sort.item.icon}
                    innerStyle={STYLE.statInfoContainer.statInfo.sort.item.inner}
                  />
                  <div style={STYLE.statInfoContainer.statInfo.sort.item.title}>{sort.title}</div>
                </div>
              )
          )}
      </div>
    </div>
  );
}

function renderProductList() {
  const {
    column,
    type,
    productByCategory,
    viewGroupTrackingList,
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    onItemClick
  } = this.props as IProps;
  const keyHashCode = stringToHash(
    (productByCategory && productByCategory.browse_node && productByCategory.browse_node.slug) || ''
  );

  return (
    <FadeIn
      style={Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.listContainer)}
      itemStyle={STYLE.column[column || 6]}
    >
      {productByCategory &&
        Array.isArray(productByCategory.boxes) &&
        productByCategory.boxes.map((product, index) => {
          product.slug = isUndefined(viewGroupTrackingList[keyHashCode])
            ? `${product.slug}`
            : `${product.slug}?${KEY_WORD.TRACKING_CODE}=${viewGroupTrackingList[keyHashCode].trackingCode}`;

          const productItemProps = {
            type,
            data: product,
            isShowQuickView: true,
            key: `product-list-item-${product.id}`,
            likedIdList,
            openModalAction,
            selectGiftAction,
            likeProductAction,
            unLikeProductAction,
            addItemToCartAction,
            onClick: () => onItemClick?.(product, index)
          };

          return <ProductDetailItem {...productItemProps} />;
        })}
    </FadeIn>
  );
}

function renderMobileVersion() {
  const { productByCategory } = this.props;
  const { urlList } = this.state;

  /**
   * Generate name for category:
   * - Get from store
   * - Or from props.title
   */

  const { current_page, per_page, total_pages } = (!isEmptyObject(productByCategory) && productByCategory.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };

  const noContentProps = { isShowNavigation: false, ...ERROR_TEXT_NO_RESULT };

  return (
    <div style={STYLE.container}>
      <div
        className={componentStyles.blockContent}
        style={Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.blockContent)}
      >
        {/** 2.1. Stat imfo: count product & sort product */}
        {renderStatInfo.bind(this)()}
        {/** 2.2 Brand list */}
        {renderBrandList.bind(this)()}
        {/** 2.2. Product list*/}

        {productByCategory.boxes && productByCategory.boxes.length ? (
          renderProductList.bind(this)()
        ) : (
          <NoContent {...noContentProps} />
        )}
        <Pagination
          {...{
            urlList,
            per: per_page,
            total: total_pages,
            current: current_page,
            handleClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </div>
    </div>
  );
}

export function renderComponent() {
  const switchView = {
    MOBILE: () => renderMobileVersion.bind(this)(),
    DESKTOP: () => renderDesktopVersion.bind(this)()
  };

  return switchView[getDeviceVersion()]();
}
