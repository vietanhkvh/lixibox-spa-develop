import * as React from 'react';
import MetaInfo from '../../../../container/app/meta-info';
import { isEmptyObject, isUndefined } from '../../../../utils/validate';
import { isMobileVersion } from '../../../../utils/responsive';

import FadeIn from '../../../layout/fade-in';
import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import Page404 from '../../../exception/404';

import { objectToHash } from '../../../../utils/encode';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../../constants/application/default';
// import BreadCrumb from '../../../../components/general/bread-crumb';//TODO: remove after apply new UI
import ProductList from '../../../../components/product/list';
import CategoryAddOnBanner from '../../../../components/banner/category-add-on';
// import CategoryNavigation from '../../../../components/navigation/category';//TODO: remove after apply new UI
import CategoryCover from '../../../../components/product/category-cover';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';

import { IProps, IState } from './model';
import STYLE from './style';
import FilterAside, {
  PriceFilter,
  BrandFilter,
  StockStatus
} from 'presentation-component/general/desktop-filter-asidebar';
import { getUrlParameter } from 'utils/format';
import MiniCategory from 'components/navigation/mini-category';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { getItemIndexAcrossPages } from 'utils/page';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.lastText} />
  </div>
);

const renderLoadingPlaceholder = () => (
  <div style={STYLE.placeholder}>
    {/*TODO: replace after adding A/B testing, place holder for old filter */}
    {/* <LoadingPlaceholder style={STYLE.placeholder.title} /> */}
    {/* <div style={STYLE.placeholder.control}>
      <div style={STYLE.placeholder.controlItem} />
      <div style={STYLE.placeholder.controlItem} />
    </div> */}
    <div style={STYLE.placeholder.productList}>{[...Array(12)].map(renderItemPlaceholder)}</div>
  </div>
);

const SubContainer = ({
  listMenu,
  history,
  bannerStore,
  location,
  productByCategory,
  categoryFilterHash,
  availableFilters,
  isFetchingAvailableFilters
}) => {
  const mainBannerHash = objectToHash({
    idBanner: BANNER_ID.CATEGORY_ADDON,
    limit: BANNER_LIMIT_DEFAULT
  });

  const bids = getUrlParameter(location.search, 'brands');
  const pl = getUrlParameter(location.search, 'pl');
  const ph = getUrlParameter(location.search, 'ph');
  const sort = getUrlParameter(location.search, 'sort');
  const stockStatus = getUrlParameter(location.search, 'stock_status');

  const isProductByCategoryExisted =
    !isEmptyObject(productByCategory) && !isUndefined(productByCategory[categoryFilterHash]);

  const categories = isProductByCategoryExisted && productByCategory[categoryFilterHash];

  const detectCurrentNodes = React.useCallback((listMenu, id, idParent) => {
    const { browse_nodes } = listMenu;
    const filterByID = (list, id) => list?.length > 0 && list?.filter((node) => id === node.id && node.sub_nodes);
    const filterByActive = (list) => list?.length > 0 && list?.filter((node) => node.activeMenu && node);
    if (!!idParent) {
      //get the biggest cate
      const browseNodesActive = filterByActive(browse_nodes);
      let nodeActive = (Array.isArray(browseNodesActive) && browseNodesActive?.length && browseNodesActive?.[0]) || {};

      //condition for find more sub nodes
      let isNextSubActive = true;

      //func check the sub nodes of it is active
      const isNextSubNodeActive = (nodeActive) => {
        return nodeActive?.sub_nodes?.length && nodeActive.sub_nodes.every((node) => node.activeMenu);
      };
      // array store tree node: 0.beauty, 1.bestseller
      let nodesActive = [nodeActive];

      //find the last of active menu nodes
      while (isNextSubActive) {
        const nodeArray = filterByActive(nodeActive?.sub_nodes);
        nodeActive = (Array.isArray(nodeArray) && nodeArray?.length > 0 && nodeArray?.[0]) || {};
        nodesActive = [...nodesActive, nodeActive];
        isNextSubActive = isNextSubNodeActive(nodeActive);
      }

      const nodesActLength = nodesActive?.length;
      //case sub_nodes empty, choose the parent of it node
      if (nodesActive[nodesActLength - 1]?.sub_nodes?.length === 0) nodeActive = nodesActive[nodesActLength - 2];
      return nodeActive;
    }
    return filterByID(browse_nodes, id)?.[0];
  }, []);

  const menuCateMini = React.useMemo(
    () => detectCurrentNodes(listMenu, categories?.browse_node?.id, categories?.browse_node?.parent_id),
    [categories?.browse_node?.id, categories?.browse_node?.parent_id, detectCurrentNodes, listMenu]
  );

  const minLimit = (availableFilters && availableFilters.pl) || 0;

  const maxLimit = (availableFilters && availableFilters.ph) || 0;

  const brandList = (availableFilters && availableFilters.brands) || [];

  const categoryAddOnnBannerItem =
    (bannerStore?.bannerList &&
      bannerStore?.bannerList[mainBannerHash] &&
      bannerStore?.bannerList[mainBannerHash][0]) ||
    null;

  const filterAside = {
    list: [
      {
        id: 'brandfilter',
        template: BrandFilter,
        propsTemplate: { history, pl, ph, bids, sort, brandList, isLoading: isFetchingAvailableFilters }
      },
      {
        id: 'pricefilter',
        template: PriceFilter,
        propsTemplate: { history, pl, ph, bids, sort, minLimit, maxLimit }
      },
      {
        id: 'stockStatus',
        template: StockStatus,
        propsTemplate: { history, pl, ph, bids, sort, stockStatus }
      }
    ]
  };

  return (
    <FadeIn style={STYLE.desktopSubContent}>
      <MiniCategory menu={menuCateMini} />
      <FilterAside {...filterAside} />
      <CategoryAddOnBanner banner={categoryAddOnnBannerItem} />
    </FadeIn>
  );
};

const renderMainContainer = ({
  history,
  location,
  listMenu,
  categoryFilter,
  handleChangeSort,
  productByCategory,
  handleSelectBrand,
  categoryFilterHash,
  viewGroupTrackingList,
  likedIdList,
  fetchFilteredProductsByCategory,
  openModalAction,
  selectGiftAction,
  likeProductAction,
  unLikeProductAction,
  addItemToCartAction,
  onItemClick
}) => {
  const isProductByCategoryExisted =
    !isEmptyObject(productByCategory) && !isUndefined(productByCategory[categoryFilterHash]);

  const productListProps = {
    history,
    column: 4,
    location,
    listMenu,
    viewGroupTrackingList,
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    key: categoryFilterHash,
    idCategory: categoryFilter,
    onSelectSort: handleChangeSort,
    onSelectBrand: handleSelectBrand,
    categoryFilterHash,
    productByCategory: (isProductByCategoryExisted && productByCategory[categoryFilterHash]) || {},
    fetchFilteredProductsByCategory,
    hiddenToolBar: true,
    onItemClick
  };

  const firstProduct =
    (isProductByCategoryExisted &&
      productByCategory[categoryFilterHash] &&
      productByCategory[categoryFilterHash].boxes &&
      productByCategory[categoryFilterHash].boxes[0]) ||
    null;

  return (
    <div style={STYLE.desktopMainContent}>
      {!!isProductByCategoryExisted && !!firstProduct && (
        <MetaInfo
          url={window.location.href}
          info={{
            url: window.location.href,
            type: `product`,
            title: productByCategory[categoryFilterHash].browse_node.name,
            description: `${productByCategory[categoryFilterHash].browse_node.name} | Lixibox shop box mỹ phẩm cao cấp, trị mụn, dưỡng da và các sản phẩm máy rửa mặt cho các loại da.`,
            image: firstProduct.primary_picture && firstProduct.primary_picture.large_url,
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

      {isProductByCategoryExisted ? <ProductList {...productListProps} /> : renderLoadingPlaceholder()}
    </div>
  );
};

function renderDesktop({
  props,
  state,
  handleChangeSort,
  handleSelectBrand,
  fetchFilteredProductsByCategory,
  createParamCategory
}) {
  const {
    history,
    location,
    productByCategory,
    productByCategoryNotFound,
    menuStore: { listMenu },
    match: {
      params: { categoryFilter }
    },
    bannerStore,
    trackingStore: { viewGroupTrackingList },
    perPage,
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    availableFilters,
    isFetchingAvailableFilters
  } = props as IProps;

  const page = parseInt(getUrlParameter(location.search, 'page') || '1');

  const { categoryFilterHash } = state as IState;
  const subContainer = {
    listMenu,
    history,
    bannerStore,
    location,
    productByCategory,
    availableFilters,
    categoryFilterHash,
    isFetchingAvailableFilters
  };
  const splitLayoutProps = {
    subContainer: <SubContainer {...subContainer} />,
    mainContainer: renderMainContainer({
      history,
      location,
      listMenu,
      categoryFilter,
      handleChangeSort,
      productByCategory,
      handleSelectBrand,
      categoryFilterHash,
      viewGroupTrackingList,
      likedIdList,
      fetchFilteredProductsByCategory,
      openModalAction,
      selectGiftAction,
      likeProductAction,
      unLikeProductAction,
      addItemToCartAction,
      onItemClick: (box, index) => {
        gatewayTrackViewContentFromList({
          source: ViewedSource.CATEGORY,
          sourceId: categoryFilter,
          index: getItemIndexAcrossPages({
            itemIndexInPage: index,
            currentPage: page,
            perPage
          }),
          box
        });
      }
    })
  };
  return (
    <div className={'product-category-container'} style={STYLE}>
      <CategoryCover categorySlug={categoryFilter} />
      {/* <BreadCrumb listMenu={listMenu} selectedSlug={location.pathname} /> */}

      <WrapLayout style={STYLE.wrap}>
        {!!productByCategoryNotFound ? <Page404 /> : <SplitLayout {...splitLayoutProps} />}
      </WrapLayout>
    </div>
  );
}

export default renderDesktop;
