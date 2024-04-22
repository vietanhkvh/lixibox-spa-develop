import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Location } from 'react-router-dom-v5-compat';

import Image from 'presentation-component/ui/image';
import MetaInfo from '../../../../container/app/meta-info';
import { getUrlParameter } from '../../../../utils/format';
import { isMobileVersion } from '../../../../utils/responsive';
import { decodeRouteParam, objectToHash, safeEncodeURIComponent } from '../../../../utils/encode';
import { usePrevious, useSearchParamsChangeEffect } from 'utils/hook';
import { storageKey } from '../../../../constants/application/client-storage';
import ItemCarousel from '../../../../presentation-component/item-list-hoc/item-carousel';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import ProductSlider from '../../../../presentation-component/general/desktop/product-slider-with-heading';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import ProductItem from '../../../../presentation-component/product/product-item';
import ImageSliderItem from '../../../../components/magazine/image-slider-item';
import Pagination from 'presentation-component/ui/pagination';
import MagazineMobileItem from '../../../../components/magazine/item';
import Loading from '../../../../components/ui/loading';
import WrapLayout from '../../../layout/wrap';
import * as ROUTINGS from 'routings/path';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import {
  gatewayTrackLeaveSearchImmediately,
  gatewayTrackViewAllItems,
  gatewayTrackViewContentFromList,
  gatewayTrackViewSearchItem,
  gatewayTrackViewSearchResults,
  gatewayTrackViewedMagazineFromList
} from 'tracking/gateway';
import { ContentType, ViewedSource } from 'tracking/constants';
import { SearchVersion } from 'constants/application/search';
import styles from './style.module.scss';
import { PropsFromRedux } from './store';

const imageEmptyCart = CDN_ASSETS_PREFIX('/search/empty-search.png');

const NotFound = () => (
  <div className={styles.empty}>
    <Image alt={''} src={imageEmptyCart} className={styles.image} />
    <div className={styles.content}>
      <div className={styles.title}>Không tìm thấy</div>
      <div className={styles.description}>Vui lòng thử lại với sản phẩm khác.</div>
      <div className={styles.description}>Ví dụ: halio, okame, lustre...</div>
    </div>
  </div>
);

interface ICombinedProductSlider {
  dataList: Array<any>;
  title: string;
  viewMoreTitle?: string;
  viewMoreLink?: string;
  isShowViewMore?: boolean;
  isShowVariants?: boolean;
  [key: string]: any;
}

const CombinedProductSlider = ({ isShowVariants = true, dataList, ...props }: ICombinedProductSlider) => {
  const dataProps = dataList.map((product) => ({ key: product.id, product, isShowVariants }));

  return <ProductSlider data={dataProps} template={ProductItem} {...props} className={styles.desktopProductCarousel} />;
};

const Result = ({ list, onItemClick }) => {
  return (
    <div className={styles.result}>
      <div className={styles.resultHeader}>Magazine</div>
      {list &&
        list.map((item, index) => {
          return isMobileVersion() ? (
            <MagazineMobileItem
              key={`item-${item.id}`}
              mobileSize={'small'}
              item={Object.assign({}, item, { author: undefined })}
              onClick={(_, magazine) => onItemClick?.(magazine, index)}
            />
          ) : (
            <div key={`item-${item.id}`} className={styles.item}>
              <ImageSliderItem
                item={Object.assign({}, item, { author: undefined })}
                type={''}
                column={1}
                onClick={(_, magazine) => onItemClick?.(magazine, index)}
              />
            </div>
          );
        })}
    </div>
  );
};

const ProductResult = ({ products, keyword, onItemClick, onViewMoreClick }) => {
  if (!products || !products.length) return null;
  const encodedKeyword = safeEncodeURIComponent(keyword);

  if (isMobileVersion()) {
    return (
      <ItemCarousel
        viewMore={'Xem tất cả'}
        viewMoreLink={`${ROUTINGS.ROUTING_SEARCH_PATH}/${encodedKeyword}`}
        onViewMoreClick={onViewMoreClick}
        title={'Sản phẩm'}
        className={styles.mobileProductCarousel}
      >
        {products.map((product, index) => (
          <ProductItem
            key={product.id || index}
            product={product}
            isFullPadding
            isShowVariants
            onClick={() => onItemClick?.(product, index)}
          />
        ))}
      </ItemCarousel>
    );
  }

  return (
    <WrapLayout>
      <CombinedProductSlider
        dataList={products}
        title={'Sản phẩm'}
        viewMoreLink={`${ROUTINGS.ROUTING_SEARCH_PATH}/${encodedKeyword}`}
        onViewMoreLinkClick={onViewMoreClick}
        isShowViewMore={true}
        onItemClick={onItemClick}
      />
    </WrapLayout>
  );
};

interface IMagazineSearchProps extends PropsFromRedux {
  location: Location;
}

const MagazineSearch: React.FC<IMagazineSearchProps> = ({
  fetchMagazineByKeywordAction,
  searchAllAction,
  magazineStore: { magazineKeyword, isLoading, magazineSearchPaging },
  location: { search },
  searchStore: { dataSearchAll, lastSearchSource }
}) => {
  const { keyword: _keyword } = useParams<{ keyword: string }>();
  const keyword = decodeRouteParam(_keyword);
  const keywordRef = useRef(keyword);
  const prevKeyword = usePrevious(keyword);
  const [hash, setHash] = useState('');
  /**
   * Triggered when user navigates to another page without executing any of the following action
   * - view a box detail
   * - view a magazine detail
   * - pagination button click
   * - sort
   * - filter
   */
  const isExitingWithoutAction = useRef(true);
  useSearchParamsChangeEffect(() => {
    isExitingWithoutAction.current = false;
  });
  useEffect(() => {
    // Reset isExitingWithoutAction when user search for another keyword
    if (prevKeyword && prevKeyword !== keyword) {
      isExitingWithoutAction.current &&
        gatewayTrackLeaveSearchImmediately({ keyword: keywordRef.current, version: SearchVersion.V2 });
      isExitingWithoutAction.current = true;
    }
  }, [keyword, prevKeyword]);
  useEffect(() => {
    gatewayTrackViewSearchResults({ keyword, version: SearchVersion.V2, source: lastSearchSource });

    return () => {
      isExitingWithoutAction.current &&
        gatewayTrackLeaveSearchImmediately({ keyword: keywordRef.current, version: SearchVersion.V2 });
    };
  }, []);

  const init = () => {
    const searchSource = localStorage.getItem(storageKey.SEARCH_ORIGIN) || '';
    localStorage.removeItem(storageKey.SEARCH_ORIGIN);
    const page = getUrlParameter(search, 'page') || 1;
    const searchParams = { keyword, page, perPage: 16 };
    setHash(objectToHash(searchParams));
    fetchMagazineByKeywordAction(Object.assign({}, searchParams, { searchSource }));

    searchAllAction({ keyword, perPage: 10, searchSource });
  };

  useEffect(() => {
    init();
  }, [keyword, search]);

  const displayableKeyword = keyword;

  const mobileScreenHeaderProps = {
    subTitle: 'Tìm kiếm: ',
    title: displayableKeyword,
    isShowIcon: false
  };

  const list = magazineKeyword ? magazineKeyword[hash] : [];

  const paginationProps = {
    perPage: magazineSearchPaging?.per_page || 0,
    totalPages: magazineSearchPaging?.total_pages || 0,
    currentPage: magazineSearchPaging?.current_page || 0
  };

  const keyHash = objectToHash({ keyword, page: 1, perPage: 10 });
  const dataSearchList = (dataSearchAll && dataSearchAll[keyHash]) || {};

  return (
    <div className={styles.container}>
      <MetaInfo
        url={window.location.href}
        info={{
          url: window.location.href,
          title: `Tìm kiếm: ${displayableKeyword}`
        }}
      />
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader {...mobileScreenHeaderProps} />
        </MobileAutoDisplayHeader>
      )}
      <ProductResult
        products={dataSearchList.boxes}
        keyword={displayableKeyword}
        onItemClick={(product, index) => {
          gatewayTrackViewContentFromList({ source: ViewedSource.SEARCH, sourceId: keyword, index, box: product });
          gatewayTrackViewSearchItem({ keyword, version: SearchVersion.V2, type: ContentType.PRODUCT, box: product });
          isExitingWithoutAction.current = false;
        }}
        onViewMoreClick={() => gatewayTrackViewAllItems({ source: ViewedSource.SEARCH, sourceId: keyword })}
      />
      {isLoading ? (
        <Loading />
      ) : !!list && !!list.length ? (
        <>
          <WrapLayout>
            <Result
              list={list}
              onItemClick={(magazine, index) => {
                gatewayTrackViewedMagazineFromList({ source: ViewedSource.SEARCH, sourceId: keyword, index, magazine });
                gatewayTrackViewSearchItem({
                  keyword,
                  version: SearchVersion.V2,
                  type: ContentType.MAGAZINE,
                  magazine
                });
                isExitingWithoutAction.current = false;
              }}
            />
          </WrapLayout>
          <Pagination {...paginationProps} />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default MagazineSearch;
