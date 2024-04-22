import { objectToHash } from '../../../utils/encode';
import { isMobileVersion, getDeviceVersion } from '../../../utils/responsive';
import { getUrlParameter } from '../../../utils/format';
import { renderHtmlContent } from '../../../utils/html';

import Image from 'presentation-component/ui/image';

import MobileAutoDisplayHeader from '../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../presentation-component/general/mobile-screen-header';
import MobileFilterHeader from '../../../presentation-component/general/mobile-filter-header';
import SeparateLine from '../../../presentation-component/ui/separate-line';

import ProductItem from '../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../presentation-component/item-list-hoc/item-vertical-list';

import Pagination from 'components/general/pagination';
import LoadingPlaceholder from '../../../components/ui/loading-placeholder';
import NoContent from '../../../container/exception/404';

import WrapLayout from '../../layout/wrap';
import SplitLayout from '../../layout/split';
import MainBlock from '../../layout/main-block';

import { ERROR_TEXT_NO_PRODUCT } from '../../../config';

import STYLE from './style';
import { IState, IProps } from './model';
import FilterAside, {
  BrandScroll,
  PriceFilter,
  StockStatus
} from 'presentation-component/general/desktop-filter-asidebar';
import style from './style.module.scss';
import DesktopFilterToolbar from 'presentation-component/general/desktop-filter-toolbar';
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

const renderLoadingPlaceholder = () => {
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div style={STYLE.placeholder}>
      {isMobileVersion() && (
        <LoadingPlaceholder
          style={Object.assign({}, STYLE.placeholder.title, isMobileVersion() && STYLE.placeholder.titleMobile)}
        />
      )}
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderContent = ({
  list,
  paginationProps,
  productBrandList,
  sort,
  bids,
  minPrice,
  maxPrice,
  pl,
  ph,
  stockStatus,
  fetchFilteredProductsByBrand,
  history,
  isFetchingProductByBrandId,
  onItemClick
}) => {
  const noContentProps = { isShowNavigation: false, ...ERROR_TEXT_NO_PRODUCT };

  const desktopAutoDisplayToolbarProps = {
    history,
    brandList: [],
    sort,
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus,
    onSubmit: fetchFilteredProductsByBrand,
    hiddenToolBar: true
  };

  return isFetchingProductByBrandId ? (
    renderLoadingPlaceholder()
  ) : !Array.isArray(list) || list.length === 0 ? (
    <NoContent {...noContentProps} />
  ) : (
    <div style={{ paddingTop: 0 }}>
      {!!productBrandList && !!productBrandList.brand && !isMobileVersion() && (
        <DesktopFilterToolbar {...desktopAutoDisplayToolbarProps} />
      )}
      {!!list.length && (
        <ItemVerticalList column={!!isMobileVersion() ? 2 : 4}>
          {list.map((box, index) => (
            <ProductItem key={box.id || index} product={box} isFullPadding onClick={() => onItemClick?.(box, index)} />
          ))}
        </ItemVerticalList>
      )}
      <Pagination {...paginationProps} />
    </div>
  );
};

const BrandContent = ({ description, hiddenDesc, handleViewMore }) => {
  return (
    <div style={STYLE.subContent.wrap.content}>
      <div style={STYLE.subContent.wrap.content.description}>
        {
          <div style={STYLE.productInfo.htmlContent}>
            {renderHtmlContent({
              content: description,
              style: STYLE.productInfo.desc,
              formatRNAsLineBreak: true
            })}
            {isMobileVersion() && hiddenDesc && (
              <span style={STYLE.productInfo.viewMore} onClick={handleViewMore}>
                ... Xem thêm
              </span>
            )}
          </div>
        }
      </div>
    </div>
  );
};

const renderSubContent = ({
  brandDetail,
  canViewMore,
  handleViewMore,
  history,
  pl,
  ph,
  minLimit,
  maxLimit,
  brandsList,
  stockStatus
}) => {
  const existedImage =
    brandDetail &&
    brandDetail.brand_image_url !== null &&
    brandDetail.brand_image_url !== '/images/original/missing.png';
  const hiddenDesc = !canViewMore;
  const LIMIT_TEXT_LENGTH = 280;
  let description = (brandDetail && brandDetail.description) || '';
  description = isMobileVersion() && hiddenDesc ? description.substring(0, LIMIT_TEXT_LENGTH) : description;

  const filterProps = {
    list: [
      {
        id: 'pricefilter',
        template: PriceFilter,
        propsTemplate: { history, pl, ph, minLimit, maxLimit }
      },
      {
        id: 'stockStatus',
        template: StockStatus,
        propsTemplate: { history, pl, ph, stockStatus }
      },
      {
        id: 'brandscroll',
        template: BrandScroll,
        propsTemplate: { brandsList }
      }
    ],
    classes: { container: style.filterContainer, item: style.filterItem }
  };
  return (
    <>
      <div style={STYLE.subContent.container(existedImage)}>
        <div style={STYLE.subContent.wrap.container(existedImage)}>
          {existedImage && (
            <Image
              style={STYLE.subContent.wrap.imgContainer()}
              src={(brandDetail && brandDetail.brand_image_url) || ''}
              alt="Brand"
            />
          )}
          <BrandContent description={description} hiddenDesc={hiddenDesc} handleViewMore={handleViewMore} />
        </div>
        <div className={style.div} />
        {!isMobileVersion() && <FilterAside {...filterProps} />}
      </div>

      {!!isMobileVersion() && <SeparateLine />}
    </>
  );
};

const renderView = ({ props, state, handleViewMore, fetchFilteredProductsByBrand }) => {
  const {
    perPage,
    brandStore,
    brandStore: { list, isFetchingProductByBrandId },
    match: {
      params: { idBrand }
    },
    history
  } = props as IProps;
  const { urlList, page, canViewMore } = state as IState;

  const keyHashBrand = objectToHash({ id: idBrand, page, perPage });

  const productBrandList = brandStore.productByBrandId[keyHashBrand] || [];
  const brandBoxesList = (productBrandList && productBrandList.boxes) || [];
  const brandDetail = (productBrandList && productBrandList.brand) || {};
  const _urlList = 0 !== brandBoxesList.length ? urlList : [];

  const { current_page, per_page, total_pages } = (0 !== productBrandList.length && productBrandList.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const paginationProps = {
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  };

  const title = productBrandList && productBrandList.brand ? `Thương hiệu: #${productBrandList.brand.name}` : '';

  const mobileScreenHeaderProps = {
    subTitle: 'Thương hiệu: ',
    title: !!productBrandList && !!productBrandList.brand && productBrandList.brand.name,
    isShowIcon: false
  };

  const bids = getUrlParameter(window.location.search, 'brands');
  const pl = getUrlParameter(window.location.search, 'pl');
  const sort = getUrlParameter(window.location.search, 'sort');
  const ph = getUrlParameter(window.location.search, 'ph');
  const stockStatus = getUrlParameter(window.location.search, 'stock_status');
  const minPrice =
    (!!productBrandList && !!productBrandList.available_filters && productBrandList.available_filters.pl) || 0;
  const maxPrice =
    (!!productBrandList && !!productBrandList.available_filters && productBrandList.available_filters.ph) || 2000000;

  const onItemClick = (box, index) => {
    gatewayTrackViewContentFromList({
      source: ViewedSource.BRAND,
      sourceId: idBrand,
      box,
      index: getItemIndexAcrossPages({
        itemIndexInPage: index,
        currentPage: current_page,
        perPage: per_page
      })
    });
  };

  const mobileFilterHeaderProps = {
    sort,
    history,
    brandList: [],
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus,
    onSubmit: fetchFilteredProductsByBrand
  };
  const content = () =>
    renderContent({
      list: brandBoxesList,
      paginationProps,
      productBrandList,
      sort,
      bids,
      minPrice,
      maxPrice,
      pl,
      ph,
      stockStatus,
      fetchFilteredProductsByBrand,
      history,
      isFetchingProductByBrandId,
      onItemClick
    });

  const mainBlockMobileProps = {
    showHeader: false,
    showViewMore: false,
    content: content(),
    style: {}
  };

  const mainBlockDesktopProps = {
    title,
    style: {},
    showHeader: false,
    showViewMore: false,
    content: content()
  };

  const switchVersion = {
    MOBILE: mainBlockMobileProps,
    DESKTOP: mainBlockDesktopProps
  };

  const mainBlockProps = switchVersion[getDeviceVersion()];

  const splitLayoutProps = {
    subContainer: renderSubContent({
      brandDetail,
      canViewMore,
      handleViewMore,
      history,
      pl,
      ph,
      minLimit: minPrice,
      maxLimit: maxPrice,
      brandsList: list,
      stockStatus
    }),
    mainContainer: <MainBlock {...mainBlockProps}></MainBlock>
  };

  return (
    <div style={STYLE.container} className={'brand-container'}>
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={2}>
          <MobileScreenHeader {...mobileScreenHeaderProps} />
          <MobileFilterHeader {...mobileFilterHeaderProps} />
        </MobileAutoDisplayHeader>
      )}
      <WrapLayout>
        {!!brandDetail.description ? (
          <SplitLayout {...splitLayoutProps} />
        ) : (
          <MainBlock {...mainBlockProps}></MainBlock>
        )}
      </WrapLayout>
    </div>
  );
};

export default renderView;
