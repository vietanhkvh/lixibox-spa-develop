import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileFilterHeader from '../../../../presentation-component/general/mobile-filter-header';
import { getUrlParameter } from '../../../../utils/format';
import MetaInfo from '../../../../container/app/meta-info';
import WrapLayout from '../../../layout/wrap';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';
import CategoryCover from '../../../../components/product/category-cover';
import { isEmptyObject, isUndefined } from '../../../../utils/validate';
import Pagination from '../../../../components/general/pagination';

import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../presentation-component/general/mobile/no-content-placeholder';
import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';

import { ROUTING_PRODUCT_CATEGORY_PATH, ROUTING_SHOP_INDEX } from '../../../../routings/path';

import Page404 from '../../../exception/404';
import STYLE from './style';
import styles from './style.module.scss';
import { IProps, IState } from './model';
import { renderItemPlaceholder } from './view-desktop';
import GeneralModal from 'presentation-component/modal/general-modal/component';
import classNames from 'classnames';
import MobileProductCategory from 'presentation-component/general/mobile-product-category';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { getItemIndexAcrossPages } from 'utils/page';

const renderLoadingPlaceholder = () => (
  <div style={STYLE.placeholder}>
    <LoadingPlaceholder style={STYLE.placeholder.title} />
    <div style={STYLE.placeholder.productList}>{[1, 2, 3, 4].map(renderItemPlaceholder)}</div>
  </div>
);

function renderMobile({
  props,
  state,
  handleChangeSort,
  handleSelectBrand,
  handleOpenCategoryModal,
  fetchFilteredProductsByCategory
}) {
  const {
    location,
    productByCategory,
    productByCategoryNotFound,
    match: {
      params: { categoryFilter }
    },
    history,
    menuStore,
    perPage
  } = props as IProps;

  const page = parseInt(getUrlParameter(location.search, 'page') || '1');

  const { categoryFilterHash, isOpenCategoryModal } = state as IState;

  const isProductByCategoryExisted =
    !isEmptyObject(productByCategory) && !isUndefined(productByCategory[categoryFilterHash]);

  const firstProduct =
    isProductByCategoryExisted &&
    productByCategory &&
    productByCategory[categoryFilterHash] &&
    productByCategory[categoryFilterHash].boxes &&
    productByCategory[categoryFilterHash].boxes[0];

  const bids = getUrlParameter(location.search, 'brands');
  const pl = getUrlParameter(location.search, 'pl');
  const ph = getUrlParameter(location.search, 'ph');
  const sort = getUrlParameter(location.search, 'sort');
  const stockStatus = getUrlParameter(location.search, 'stock_status');

  const minPrice =
    (productByCategory &&
      productByCategory[categoryFilterHash] &&
      productByCategory[categoryFilterHash].available_filters &&
      productByCategory[categoryFilterHash].available_filters.pl) ||
    0;
  const maxPrice =
    (productByCategory &&
      productByCategory[categoryFilterHash] &&
      productByCategory[categoryFilterHash].available_filters &&
      productByCategory[categoryFilterHash].available_filters.ph) ||
    0;

  const brandList =
    (productByCategory &&
      productByCategory[categoryFilterHash] &&
      productByCategory[categoryFilterHash].available_filters &&
      productByCategory[categoryFilterHash].available_filters.brands) ||
    0;

  const mobileScreenHeaderProps = {
    subTitle: 'Chuyên mục: ',
    title:
      !!productByCategory &&
      productByCategory[categoryFilterHash] &&
      (productByCategory[categoryFilterHash].browse_node.name ||
        productByCategory[categoryFilterHash].browse_node.vn_name ||
        ''),
    isShowIcon: true,
    onClick: () => handleOpenCategoryModal(true)
  };

  const mobileFilterHeaderProps = {
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

  const browseNodes = (!!menuStore.listMenu && menuStore.listMenu.browse_nodes) || [];

  const { current_page, per_page, total_pages } =
    !!productByCategory && !!productByCategory[categoryFilterHash] && !!productByCategory[categoryFilterHash].paging
      ? productByCategory[categoryFilterHash].paging
      : {
          current_page: 0,
          per_page: 0,
          total_pages: 0
        };

  const urlList: Array<any> = [];
  let searchParams = new URLSearchParams(window.location.search);
  const route = `${ROUTING_PRODUCT_CATEGORY_PATH}/${categoryFilter}`;

  for (let i = 1; i <= total_pages; i++) {
    searchParams.set('page', String(i));
    let queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

    urlList.push({
      number: i,
      title: i,
      link: `${route}${queryString}`
    });
  }

  const onItemClick = (box, index) => {
    gatewayTrackViewContentFromList({
      source: ViewedSource.CATEGORY,
      sourceId: categoryFilter,
      box,
      index: getItemIndexAcrossPages({
        itemIndexInPage: index,
        currentPage: page,
        perPage
      })
    });
  };

  return (
    <div className={'product-category-container'} style={STYLE}>
      <CategoryCover categorySlug={categoryFilter} />
      {!!isProductByCategoryExisted && !!firstProduct && (
        <MetaInfo
          url={window.location.href}
          info={{
            url: window.location.href,
            type: `product`,
            title: productByCategory[categoryFilterHash].browse_node.name,
            description: `${productByCategory[categoryFilterHash].browse_node.name} | Lixibox shop box mỹ phẩm cao cấp, trị mụn, dưỡng da và các sản phẩm máy rửa mặt cho các loại da.`,
            image: firstProduct.primary_picture.large_url,
            keyword: 'máy rửa mặt, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, halio, lustre'
          }}
          product={{
            id: firstProduct.id,
            slug: window.location.href,
            brand: 'lixibox',
            stock: 10,
            condition: 'new',
            priceAmount: firstProduct.price_sale_off,
            priceCurrency: 'VND',
            retailerItemId: firstProduct.id,
            rating: firstProduct.rating
          }}
        />
      )}
      <WrapLayout>
        {!!productByCategoryNotFound ? (
          <Page404 />
        ) : isProductByCategoryExisted ? (
          <>
            <MobileAutoDisplayHeader row={2}>
              <MobileScreenHeader {...mobileScreenHeaderProps} />
              <MobileFilterHeader {...mobileFilterHeaderProps} />
            </MobileAutoDisplayHeader>

            <div style={STYLE.mobileList}>
              {!!isProductByCategoryExisted && productByCategory[categoryFilterHash].boxes.length ? (
                <>
                  <ItemVerticalList>
                    {isProductByCategoryExisted &&
                      productByCategory[categoryFilterHash].boxes.map((box, index) => (
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
                      handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                    }}
                  />
                </>
              ) : (
                <NoContentPlaceholder
                  title="Không tìm thấy sản phẩm"
                  info="Vui lòng thử lại và chọn cho mình sản phẩm yêu thích bạn nhé"
                  logo={NO_CONTENT_LOGO.SHIPMENT}
                  action={{ text: 'Tiếp tục mua sắm' }}
                  onClick={() => history.push(ROUTING_SHOP_INDEX)}
                  className={styles.noContentPlaceholder}
                />
              )}
            </div>
          </>
        ) : (
          renderLoadingPlaceholder()
        )}
      </WrapLayout>
      <GeneralModal
        isOpen={isOpenCategoryModal}
        title="Danh Mục Sản Phẩm"
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        classes={{ header: styles.header, clientArea: classNames(styles.clientArea, 'withScrollbar') }}
        className={classNames(styles.header)}
        testId={{ name: 'modal-product-category' }}
        onRightActionClick={() => {
          handleOpenCategoryModal(false);
        }}
        onRequestClose={() => {
          handleOpenCategoryModal(false);
        }}
      >
        <MobileProductCategory
          data={browseNodes}
          isOpenedOnHeader
          handleCloseModal={() => {
            handleOpenCategoryModal(false);
          }}
          expandedMode
          selectedProduct={productByCategory?.[categoryFilterHash]?.browse_node || {}}
          isUsedOnModal
        />
      </GeneralModal>
    </div>
  );
}

export default renderMobile;
