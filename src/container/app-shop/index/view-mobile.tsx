import TrackVisibility from 'lixibox-react-on-screen';

import Loading from '../../../components/ui/loading';
import CountdownPanel from '../../../components/countdown/panel';
import BannerCarousel from '../../../components/banner/carousel';
import SearchPopular from '../../../components/product/search-popular';
import MobileCategory from '../../../components/container/mobile-category';

import { objectToHash } from '../../../utils/encode';
import { isEmptyObject, isUndefined } from '../../../utils/validate';
import { TrackInViewport } from 'utils/visibility';

import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../constants/application/default';
import { BEST_SELLING_PARAMS, NEW_PRODUCT_PARAMS } from '../../../constants/application/product';

import ProductItem from '../../../presentation-component/product/product-item';
import ItemCarousel from '../../../presentation-component/item-list-hoc/item-carousel';
import ItemVerticalList from '../../../presentation-component/item-list-hoc/item-vertical-list';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import GeneralModal from 'presentation-component/modal/general-modal/component';
import MobileProductCategory from 'presentation-component/general/mobile-product-category';
import { ROUTING_HOT_DEAL } from 'routings/path';
import { gatewayTrackSearch, gatewayTrackViewAllItems, gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { SearchSource } from 'constants/application/search';
import STYLE from './style';
import styles from './style.module.scss';

const renderMobile = ({
  props,
  state,
  handleFeatureBanner,
  handleFetchHotBoxes,
  handleFetchNewProducts,
  handleFetchPopularSearch,
  handleFetchWatchedList,
  handleFetchRecommendationBox,
  handleOpenCategoryModal,
  handleCloseCategoryModal
}) => {
  const {
    bannerStore,
    menuStore: {
      mobileHomeMenu,
      listMenu: { browse_nodes: browseNodes }
    },
    shopStore: { hotDeal, productByCategory, recommendationBox, recommendationBoxPaging },
    userStore: { userWatchedList },
    countdownStore,
    searchStore,
    setLastSearchSourceAction
  } = props;

  const {
    isFetchedFeatureBanner,
    isFetchedHotBoxes,
    isFetchedNewProducts,
    isFetchedPopularSearch,
    isFetchedWatchedList,
    isPriorotyBlock,
    isModalCategoryOpen
  } = state;

  const mainBannerHash = objectToHash({
    idBanner: BANNER_ID.HOME_PAGE,
    limit: BANNER_LIMIT_DEFAULT
  });
  const listMainBanner = bannerStore.bannerList[mainBannerHash] || [];

  const featureBannerHash = objectToHash({
    idBanner: BANNER_ID.HOME_FEATURE,
    limit: BANNER_LIMIT_DEFAULT
  });
  const listFeatureBanner = bannerStore.bannerList[featureBannerHash] || [];

  const popularSearchList = searchStore.trendingSearch.keywords;

  const bestSellingHash = objectToHash({
    categoryId: BEST_SELLING_PARAMS.idCategory,
    limit: NEW_PRODUCT_PARAMS.limit
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

  return (
    <div className={'shop-index-container'} style={STYLE}>
      <BannerCarousel list={listMainBanner} isShowIndicator={true} />
      <MobileCategory list={mobileHomeMenu} />
      <SeparateLine />
      {!!countdownStore && Array.isArray(countdownStore.list) && !!countdownStore.list.length && (
        <>
          {' '}
          <CountdownPanel data={countdownStore.list[countdownStore.list.length - 1]} />
          <SeparateLine />
        </>
      )}

      {/* <ContainerFeedback {...listFeedbackProps} /> */}
      {!isPriorotyBlock ? (
        <div>
          <h2 className={'hidden-element'}>
            Box bán chạy | Lixibox - Bringing affordable luxury to the urban population
          </h2>
          {!!hotDeal?.boxes?.length && (
            <>
              <TrackVisibility offset={200}>
                <TrackInViewport>
                  <ItemCarousel
                    viewMore={'Xem tất cả'}
                    viewMoreLink={ROUTING_HOT_DEAL}
                    title={'Hot Deal'}
                    onViewMoreClick={() => {
                      gatewayTrackViewAllItems({ source: ViewedSource.HOME_HOT_DEAL });
                    }}
                  >
                    {hotDeal.boxes.map((product, index) => (
                      <ProductItem
                        key={product.id || index}
                        product={product}
                        isFullPadding
                        isShowVariants
                        onClick={() =>
                          gatewayTrackViewContentFromList({ source: ViewedSource.HOME_HOT_DEAL, box: product, index })
                        }
                      />
                    ))}
                  </ItemCarousel>
                </TrackInViewport>
              </TrackVisibility>
              <SeparateLine />
            </>
          )}
          <TrackVisibility offset={200}>
            <TrackInViewport onVisible={() => !isFetchedHotBoxes && handleFetchHotBoxes?.()}>
              <ItemCarousel
                viewMore={'Xem tất cả'}
                viewMoreLink={'/category/best-selling-beauty-box'}
                title={'Box bán chạy'}
                onViewMoreClick={() => gatewayTrackViewAllItems({ source: ViewedSource.HOME_BEST_SELLING_BOXES })}
              >
                {bestSellingList.map((box, index) => (
                  <ProductItem
                    key={box.id || index}
                    product={box}
                    isFullPadding
                    isShowVariants
                    onClick={() =>
                      gatewayTrackViewContentFromList({ source: ViewedSource.HOME_BEST_SELLING_BOXES, box, index })
                    }
                  />
                ))}
              </ItemCarousel>
            </TrackInViewport>
          </TrackVisibility>

          <TrackVisibility offset={200}>
            <TrackInViewport onVisible={() => !isFetchedFeatureBanner && handleFeatureBanner?.()}>
              {Array.isArray(listFeatureBanner) && !!listFeatureBanner.length ? (
                <BannerCarousel list={listFeatureBanner} isGreyBg={true} />
              ) : (
                <SeparateLine />
              )}
            </TrackInViewport>
          </TrackVisibility>

          <h2 className={'hidden-element'}>Sản phẩm mới nhất | Mỹ Phẩm, Dưỡng Da, Trị Mụn, Skincare, Makeup</h2>
          <TrackVisibility offset={200}>
            <TrackInViewport onVisible={() => !isFetchedNewProducts && handleFetchNewProducts?.()}>
              <>
                <ItemCarousel
                  viewMoreLink={'/category/new-products'}
                  viewMore={'Xem tất cả'}
                  title={'Mua lẻ mới nhất'}
                  onViewMoreClick={() =>
                    gatewayTrackViewAllItems({ source: ViewedSource.HOME_NEWEST_INDIVIDUAL_BOXES })
                  }
                >
                  {newProductsList.map((box, index) => (
                    <ProductItem
                      key={box.id || index}
                      product={box}
                      isFullPadding
                      isShowVariants
                      onClick={() =>
                        gatewayTrackViewContentFromList({
                          source: ViewedSource.HOME_NEWEST_INDIVIDUAL_BOXES,
                          box,
                          index
                        })
                      }
                    />
                  ))}
                </ItemCarousel>
                <SeparateLine />
              </>
            </TrackInViewport>
          </TrackVisibility>

          <h2 className={'hidden-element'}>
            Từ khóa tìm kiếm phổ biến nhất | Lixibox - Bringing affordable luxury to the urban population
          </h2>
          <TrackVisibility offset={200}>
            <TrackInViewport onVisible={() => !isFetchedPopularSearch && handleFetchPopularSearch?.()}>
              <>
                <SearchPopular
                  list={popularSearchList}
                  onItemClick={(item) => {
                    setLastSearchSourceAction({ source: SearchSource.TRENDING });
                    gatewayTrackSearch({ keyword: item || '', source: SearchSource.TRENDING });
                  }}
                />
                <SeparateLine />
              </>
            </TrackInViewport>
          </TrackVisibility>

          <TrackVisibility offset={200}>
            <TrackInViewport onVisible={() => !isFetchedWatchedList && handleFetchWatchedList?.()}>
              {0 !== watchedList.length ? (
                <>
                  {' '}
                  <ItemCarousel title={'Sản phẩm đã xem'}>
                    {watchedList.map((box, index) => (
                      <ProductItem
                        key={box.id || index}
                        product={box}
                        isFullPadding
                        isShowVariants={false}
                        onClick={() =>
                          gatewayTrackViewContentFromList({ source: ViewedSource.HOME_RECENT_VIEWED, box, index })
                        }
                      />
                    ))}
                  </ItemCarousel>
                  <SeparateLine />
                </>
              ) : null}
            </TrackInViewport>
          </TrackVisibility>

          <h2 className={'hidden-element'}>
            Sản phẩm dành riêng cho bạn | Mỹ Phẩm, Dưỡng Da, Trị Mụn, Skincare, Makeup
          </h2>

          {!!recommendationBox.length && (
            <ItemVerticalList title={'Dành riêng cho bạn'}>
              {recommendationBox.map((box, index) => (
                <ProductItem
                  key={box.id || index}
                  product={box}
                  isFullPadding
                  isShowVariants
                  onClick={() =>
                    gatewayTrackViewContentFromList({ source: ViewedSource.HOME_RECOMMENDATION, box, index })
                  }
                />
              ))}
            </ItemVerticalList>
          )}

          {(recommendationBoxPaging.current_page !== recommendationBoxPaging.total_pages ||
            0 === recommendationBoxPaging.current_page) && (
            <TrackVisibility offset={10}>
              <TrackInViewport onVisible={() => handleFetchRecommendationBox?.()}>
                <Loading />
              </TrackInViewport>
            </TrackVisibility>
          )}
        </div>
      ) : (
        <Loading style={{ height: 400 }} />
      )}
      <GeneralModal
        isOpen={isModalCategoryOpen}
        title="Danh Mục Sản Phẩm"
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        classes={{ header: styles.header }}
        testId={{ name: 'modal-product-category' }}
        onRightActionClick={() => {
          handleCloseCategoryModal();
        }}
        onRequestClose={() => {
          handleCloseCategoryModal();
        }}
      >
        <MobileProductCategory data={browseNodes} handleCloseModal={handleCloseCategoryModal} expandedMode />
      </GeneralModal>
    </div>
  );
};

export default renderMobile;
