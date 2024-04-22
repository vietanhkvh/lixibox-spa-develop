import MetaInfo from '../../../../container/app/meta-info';
import FadeIn from '../../../layout/fade-in';
import WrapLayout from '../../../layout/wrap';
import MainBlock from '../../../layout/main-block';

import Image from 'presentation-component/ui/image';
import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';

import DesktopFilterToolbar from '../../../../presentation-component/general/desktop-filter-toolbar';

import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileFilterHeader from '../../../../presentation-component/general/mobile-filter-header';
import { decodeRouteParam, objectToHash } from '../../../../utils/encode';
import { isUndefined } from '../../../../utils/validate';
import { getUrlParameter } from '../../../../utils/format';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';
import { isMobileVersion, getDeviceVersion } from '../../../../utils/responsive';
import FilterAside, {
  BrandFilter,
  PriceFilter,
  StockStatus
} from 'presentation-component/general/desktop-filter-asidebar';
import Pagination from 'presentation-component/ui/pagination';
import SplitLayout from 'container/layout/split/container';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import STYLE from './style';
import styles from './style.module.scss';
import { IState, IProps } from './model';

const imageEmptyCart = CDN_ASSETS_PREFIX('/search/empty-search.png');

const renderItemPlaceholder = (item) => (
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
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderEmpty = () => (
  <div style={STYLE.empty}>
    <Image alt={''} src={imageEmptyCart} style={STYLE.empty.image} />
    <div style={STYLE.empty.content}>
      <div style={STYLE.empty.content.title}>Không tìm thấy</div>
      <div style={STYLE.empty.content.description}>Vui lòng thử lại với sản phẩm khác.</div>
      <div style={STYLE.empty.content.description}>Ví dụ: halio, okame, lustre...</div>
    </div>
  </div>
);

const renderContent = ({ dataSearchList, isLoading, onItemClick }) => {
  const currentPage = dataSearchList?.paging?.current_page || 0;
  const perPage = dataSearchList?.paging?.per_page || 0;
  const totalPages = dataSearchList?.paging?.total_pages || 0;

  return isLoading ? (
    renderLoadingPlaceholder()
  ) : dataSearchList.boxes && 0 !== dataSearchList.boxes.length ? (
    <div className={styles.contentWrapper}>
      <div style={STYLE.mobileList}>
        {!!dataSearchList && !!dataSearchList.boxes && (
          <ItemVerticalList column={!!isMobileVersion() ? 2 : 4}>
            {!!dataSearchList?.boxes &&
              dataSearchList.boxes.map((box, index) => (
                <ProductItem
                  key={box.id || index}
                  product={box}
                  isFullPadding
                  onClick={(_, e) => onItemClick?.(box, index, e)}
                />
              ))}
          </ItemVerticalList>
        )}
      </div>
      <Pagination
        {...{
          currentPage: currentPage,
          perPage: perPage,
          totalPages: totalPages
        }}
      />
    </div>
  ) : (
    renderEmpty()
  );
};

const View = ({ props, state, fetchFilteredProductsByKeyword, onItemClick }) => {
  const {
    match: {
      params: { keyWordSearch: _keyWordSearch }
    },
    history,
    searchStore: { dataSearchAll, isFetchingSearchAll },
    perPage,
    isFetchingAvailableFilters
  } = props as IProps;
  const keyWordSearch = decodeRouteParam(_keyWordSearch);
  const { filterBrands: brandList } = state;

  const { page } = state as IState;

  const params = { keyword: keyWordSearch, page, perPage };
  const keyHash = objectToHash(params);

  const dataSearchList = dataSearchAll && !isUndefined(dataSearchAll[keyHash]) ? dataSearchAll[keyHash] : {};
  const title = keyWordSearch;

  const bids = getUrlParameter(window.location.search, 'brands');
  const pl = getUrlParameter(window.location.search, 'pl');
  const ph = getUrlParameter(window.location.search, 'ph');
  const sort = getUrlParameter(window.location.search, 'sort');
  const pageF = getUrlParameter(window.location.search, 'page') || 1;
  const stockStatus = getUrlParameter(window.location.search, 'stock_status');
  const minPrice = (dataSearchList && dataSearchList.available_filters && dataSearchList.available_filters.pl) || 0;
  const maxPrice = (dataSearchList && dataSearchList.available_filters && dataSearchList.available_filters.ph) || 0;

  const renderProductProps = {
    dataSearchList,
    isLoading: isFetchingSearchAll,
    onItemClick
  };

  const mobileScreenHeaderProps = {
    subTitle: 'Tìm kiếm: ',
    title,
    isShowIcon: false
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
    onSubmit: fetchFilteredProductsByKeyword
  };

  const mainBlockMobileProps = {
    showHeader: false,
    showViewMore: false,
    content: (
      <div>
        <MobileAutoDisplayHeader row={2}>
          <MobileScreenHeader {...mobileScreenHeaderProps} />
          <MobileFilterHeader {...mobileFilterHeaderProps} />
        </MobileAutoDisplayHeader>
        {renderContent(renderProductProps)}
      </div>
    ),
    style: {}
  };

  const switchVersion = {
    MOBILE: () => <MainBlock {...mainBlockMobileProps} />,
    DESKTOP: () =>
      DesktopContainer({
        dataSearchList,
        isLoading: isFetchingSearchAll,
        onItemClick
      })
  };
  const renderSubContainer = (history) => {
    const filterAside = {
      list: [
        {
          id: 'brandfilter',
          template: BrandFilter,
          propsTemplate: { history, pl, ph, bids, sort, page: pageF, brandList, isLoading: isFetchingAvailableFilters }
        },
        {
          id: 'pricefilter',
          template: PriceFilter,
          propsTemplate: {
            history,
            pl,
            ph,
            bids,
            sort,
            page: pageF,
            minLimit: minPrice,
            maxLimit: maxPrice,
            isLoading: isFetchingAvailableFilters
          },
          isDisplayDiveLine: !!brandList?.length
        },
        {
          id: 'stockStatus',
          template: StockStatus,
          propsTemplate: { history, pl, ph, bids, sort, page: pageF, stockStatus }
        }
      ]
    };
    return (
      <FadeIn>
        <FilterAside {...filterAside} />
      </FadeIn>
    );
  };
  const renderMainContainer = (renderProductProps, desktopAutoDisplayToolbarProps) => {
    return (
      <>
        <DesktopFilterToolbar {...desktopAutoDisplayToolbarProps} />
        {renderContent(renderProductProps)}
      </>
    );
  };
  const DesktopContainer = ({ dataSearchList, isLoading, onItemClick }) => {
    const renderProductProps = {
      dataSearchList,
      isLoading,
      onItemClick
    };

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
      onSubmit: fetchFilteredProductsByKeyword,
      hiddenToolBar: true
    };

    const splitLayoutProps = {
      subContainer: renderSubContainer(history),
      mainContainer: renderMainContainer(renderProductProps, desktopAutoDisplayToolbarProps)
    };
    return <SplitLayout {...splitLayoutProps} />;
  };

  return (
    <div className={'search-container'} style={STYLE.container}>
      <MetaInfo
        url={window.location.href}
        info={{
          url: window.location.href,
          title: `Tìm kiếm: ${title}`
        }}
      />
      <WrapLayout>{switchVersion[getDeviceVersion()]()}</WrapLayout>
    </div>
  );
};

export default View;
