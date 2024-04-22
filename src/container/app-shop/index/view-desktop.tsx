import TrackVisibility from 'lixibox-react-on-screen';

import WrapLayout from '../../layout/wrap';
import Loading from '../../../components/ui/loading';
import BannerFeature from '../../../components/banner/feature';
import CountdownPanel from '../../../components/countdown/panel';
import BannerHomeMain from '../../../components/banner/home-main';
import SearchPopular from '../../../components/product/search-popular';
import BannerFooterShop from '../../../components/banner/footer-shop';

import ProductSlider from '../../../presentation-component/general/desktop/product-slider-with-heading';
import ProductItem from '../../../presentation-component/product/product-item';

import { objectToHash } from '../../../utils/encode';
import { TrackInViewport } from 'utils/visibility';
import { isEmptyObject, isUndefined } from '../../../utils/validate';
import { ROUTING_PRODUCT_CATEGORY_PATH, ROUTING_HOT_DEAL } from '../../../routings/path';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../constants/application/default';
import { BEST_SELLING_PARAMS, NEW_PRODUCT_PARAMS } from '../../../constants/application/product';
import { SearchSource } from 'constants/application/search';
import { gatewayTrackSearch, gatewayTrackViewAllItems, gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

import STYLE from './style';

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

  return <ProductSlider data={dataProps} template={ProductItem} {...props} />;
};

const renderDesktop = ({
  props,
  state,
  handleFeatureBanner,
  handleFetchHotBoxes,
  handleFetchMagazineList,
  handleFetchNewProducts,
  handleFetchPopularSearch,
  handleFetchWatchedList,
  handleFetchActivityFeed,
  handleFetchFooterBanner,
  handleFetchRecommendationBox
}) => {
  const {
    bannerStore,
    userStore: { userWatchedList },
    countdownStore,
    shopStore: { hotDeal, productByCategory, recommendationBox, recommendationBoxPaging },
    searchStore,
    setLastSearchSourceAction
  } = props;

  const {
    isFetchedFeatureBanner,
    isFetchedHotBoxes,
    isFetchedNewProducts,
    isFetchedPopularSearch,
    isFetchedWatchedList,
    isFetchedFooterBanner,
    isPriorotyBlock
  } = state;

  const mainBannerHash = objectToHash({
    idBanner: BANNER_ID.HOME_PAGE,
    limit: BANNER_LIMIT_DEFAULT
  });
  const mainBannerProps = {
    list: bannerStore.bannerList[mainBannerHash] || [],
    style: STYLE.mainBanner
  };

  const bestSellingHash = objectToHash({
    categoryId: BEST_SELLING_PARAMS.idCategory,
    limit: BEST_SELLING_PARAMS.limit
  });
  const bestSellingList =
    (!isEmptyObject(productByCategory) &&
      !isUndefined(productByCategory[bestSellingHash]) &&
      !isEmptyObject(productByCategory[bestSellingHash]) &&
      Array.isArray(productByCategory[bestSellingHash].boxes) &&
      productByCategory[bestSellingHash].boxes) ||
    [];

  const newProductsHash = objectToHash({
    categoryId: NEW_PRODUCT_PARAMS.idCategory,
    limit: NEW_PRODUCT_PARAMS.limit
  });
  const newProductsList =
    (!isEmptyObject(productByCategory) &&
      !isUndefined(productByCategory[newProductsHash]) &&
      !isEmptyObject(productByCategory[newProductsHash]) &&
      Array.isArray(productByCategory[newProductsHash].boxes) &&
      productByCategory[newProductsHash].boxes) ||
    [];

  const watchedListHash = objectToHash({ page: 1, perPage: 25 });
  const watchedList =
    (userWatchedList[watchedListHash] && userWatchedList[watchedListHash].recently_viewed_boxes) || [];

  const featureBannerHash = objectToHash({
    idBanner: BANNER_ID.HOME_FEATURE,
    limit: BANNER_LIMIT_DEFAULT
  });
  const listFeatureBanner = bannerStore.bannerList[featureBannerHash] || [];

  const popularSearchList = searchStore.trendingSearch.keywords;

  const footerBannerHash = objectToHash({
    idBanner: BANNER_ID.FOOTER,
    limit: BANNER_LIMIT_DEFAULT
  });
  const footerBannerProps = {
    list: bannerStore.bannerList[footerBannerHash] || []
  };

  // FIXME: No logic should be implemented in render. Remove logics from inside TrackVisibility
  return (
    <div style={STYLE}>
      <h1 className={'hidden-element'}>Lixibox - Bringing affordable luxury to the urban population</h1>
      <WrapLayout type={'larger'} style={STYLE.wrapBannerMain}>
        <BannerHomeMain {...mainBannerProps} />
      </WrapLayout>
      <WrapLayout>
        {!!countdownStore?.list?.length && (
          <CountdownPanel size={'large'} data={countdownStore.list[countdownStore.list.length - 1]} />
        )}

        {!isEmptyObject(hotDeal) && Array.isArray(hotDeal.boxes) && hotDeal.boxes.length ? (
          <div>
            <h2 className={'hidden-element'}>Box mới nhất | Sản phẩm làm đẹp mới nhất từ Lixibox</h2>
            <CombinedProductSlider
              dataList={hotDeal.boxes}
              title={'Hot Deal'}
              viewMoreLink={`${ROUTING_HOT_DEAL}`}
              isShowViewMore={true}
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({ source: ViewedSource.HOME_HOT_DEAL, box, index });
              }}
              onViewMoreLinkClick={() => {
                gatewayTrackViewAllItems({ source: ViewedSource.HOME_HOT_DEAL });
              }}
            />
          </div>
        ) : null}

        {!isPriorotyBlock ? (
          <div>
            <h2 className={'hidden-element'}>Box bán chạy | Halio - Top sản phẩm bán chạy tại Lixibox </h2>
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedHotBoxes && handleFetchHotBoxes?.()}>
                <CombinedProductSlider
                  dataList={bestSellingList}
                  title={'Box Bán Chạy'}
                  viewMoreLink={`${ROUTING_PRODUCT_CATEGORY_PATH}/${BEST_SELLING_PARAMS.idCategory}`}
                  isShowViewMore={true}
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({ source: ViewedSource.HOME_BEST_SELLING_BOXES, box, index });
                  }}
                  onViewMoreLinkClick={() => {
                    gatewayTrackViewAllItems({ source: ViewedSource.HOME_BEST_SELLING_BOXES });
                  }}
                />
              </TrackInViewport>
            </TrackVisibility>
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedFeatureBanner && handleFeatureBanner?.()}>
                <BannerFeature list={listFeatureBanner} />
              </TrackInViewport>
            </TrackVisibility>
            <h2 className={'hidden-element'}>
              Sản phẩm mới nhất | Tổng hợp sản phẩm làm đẹp mới nhất đến từ các thương hiệu nổi tiếng
            </h2>
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedNewProducts && handleFetchNewProducts?.()}>
                <CombinedProductSlider
                  dataList={newProductsList}
                  title={'Mua lẻ mới nhất'}
                  viewMoreLink={`${ROUTING_PRODUCT_CATEGORY_PATH}/${NEW_PRODUCT_PARAMS.idCategory}`}
                  isShowViewMore={true}
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({ source: ViewedSource.HOME_NEWEST_INDIVIDUAL_BOXES, box, index });
                  }}
                  onViewMoreLinkClick={() => {
                    gatewayTrackViewAllItems({ source: ViewedSource.HOME_NEWEST_INDIVIDUAL_BOXES });
                  }}
                />
              </TrackInViewport>
            </TrackVisibility>
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedWatchedList && handleFetchWatchedList?.()}>
                {0 !== watchedList.length ? (
                  <CombinedProductSlider
                    isShowVariants={false}
                    dataList={watchedList}
                    title={'Sản phẩm đã xem'}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({ source: ViewedSource.HOME_RECENT_VIEWED, box, index });
                    }}
                  />
                ) : null}
              </TrackInViewport>
            </TrackVisibility>
            <h2 className={'hidden-element'}>Halio | Từ khóa tìm kiếm phổ biến nhất | Top sản phẩm nổi bật lixibox</h2>
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedPopularSearch && handleFetchPopularSearch?.()}>
                <SearchPopular
                  list={popularSearchList}
                  onItemClick={(item) => {
                    setLastSearchSourceAction({ source: SearchSource.TRENDING });
                    gatewayTrackSearch({ keyword: item || '', source: SearchSource.TRENDING });
                  }}
                />
              </TrackInViewport>
            </TrackVisibility>
            <h2 className={'hidden-element'}>
              Sản phẩm dành riêng cho bạn | Lixibox - Bringing affordable luxury to the urban population
            </h2>
            {!!recommendationBox.length && (
              <CombinedProductSlider
                dataList={recommendationBox}
                title={'Dành riêng cho bạn'}
                onItemClick={(box, index) => {
                  gatewayTrackViewContentFromList({ source: ViewedSource.HOME_RECOMMENDATION, box, index });
                }}
              />
            )}
            {recommendationBoxPaging.current_page < 1 && (
              <TrackVisibility offset={10}>
                <TrackInViewport onVisible={() => handleFetchRecommendationBox?.()}>
                  <Loading />
                </TrackInViewport>
              </TrackVisibility>
            )}
            <TrackVisibility offset={200}>
              <TrackInViewport onVisible={() => !isFetchedFooterBanner && handleFetchFooterBanner?.()}>
                <BannerFooterShop {...footerBannerProps} />
              </TrackInViewport>
            </TrackVisibility>
          </div>
        ) : (
          <Loading style={{ height: 400 }} />
        )}
      </WrapLayout>
    </div>
  );
};

export default renderDesktop;
