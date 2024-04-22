import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUrlParameter } from '../../../utils/format';

import { objectToHash } from '../../../utils/encode';
import { FEEDABLE_TYPE } from '../../../constants/application/feedable';
import { isMobileVersion } from '../../../utils/responsive';
import { GROUP_OBJECT_TYPE } from '../../../constants/application/group-object-type';
import { MAGAZINE_LIST_TYPE } from '../../../constants/application/magazine';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../constants/application/default';
import { BEST_SELLING_PARAMS, NEW_PRODUCT_PARAMS } from '../../../constants/application/product';
import { CDN_ASSETS_PREFIX, categoryFilterApiFormat } from '../../../utils/uri';
import { gatewayTrackViewHome } from 'tracking/gateway';

import renderView from './view';
import { IProps, IState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ShopIndexContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  timerRecommendationPending: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
    this.timerRecommendationPending = false;
  }

  /**
   * Init data for product / box component
   * - if without data: dispatch action to get
   * - if exsit data from state: nothing action
   */
  initData() {
    const {
      fetchMainBanner,
      fetchDataHotDealAction,
      trackingViewGroupAction,
      fetchCountdownListAction,
      fetchMobileHomeMenuAction,
      countdownStore: { isLoaded, isFetching }
    } = this.props as IProps;

    /** Home page banner */
    const fetchHomeBannerParam = {
      idBanner: BANNER_ID.HOME_PAGE,
      limit: BANNER_LIMIT_DEFAULT
    };

    fetchMainBanner(fetchHomeBannerParam);
    isMobileVersion() && fetchMobileHomeMenuAction();

    // Fetch browse nodes
    // 0 === categorySlideList.length && !isMobileVersion() && fetchListMenuAction();

    /** Tracking view group */
    setTimeout(() => {
      trackingViewGroupAction({
        groupObjectType: GROUP_OBJECT_TYPE.HOME_PAGE,
        groupObjectId: GROUP_OBJECT_TYPE.HOME_PAGE
      });
    }, 3000);

    /** Get hot deal data */
    fetchDataHotDealAction({ page: 1, perPage: 15 });

    /** Fetch count down */
    !isLoaded && !isFetching && fetchCountdownListAction();
  }

  generateCategoryHash(categoryFilterStatus) {
    /** Combine category filter hash by id category & params query */
    const [idCategory, params] = categoryFilterApiFormat(categoryFilterStatus);
    return objectToHash({ idCategory, params });
  }

  handleFeatureBanner() {
    const { fetchMainBanner } = this.props;
    const { isFetchedFeatureBanner, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedFeatureBanner) {
      const fetchFeatureBannerParam = {
        idBanner: BANNER_ID.HOME_FEATURE,
        limit: BANNER_LIMIT_DEFAULT
      };

      fetchMainBanner(fetchFeatureBannerParam);
      this.setState({ isFetchedFeatureBanner: true });
    }
  }

  handleFetchHotBoxes() {
    const { fetchHomeProductByCategoryAction } = this.props;
    const { isFetchedHotBoxes, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedHotBoxes) {
      fetchHomeProductByCategoryAction({
        categoryId: BEST_SELLING_PARAMS.idCategory
      });
      this.setState({ isFetchedHotBoxes: true });
    }
  }

  handleFetchMagazineList() {
    const { fetchMagazineListAction } = this.props;
    const { isFetchedMagazineList, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedMagazineList) {
      const fetchDefaultMagazineParam = {
        page: 1,
        perPage: 12,
        type: MAGAZINE_LIST_TYPE.DEFAULT
      };

      !isMobileVersion() && fetchMagazineListAction(fetchDefaultMagazineParam);
      this.setState({ isFetchedMagazineList: true });
    }
  }

  handleFetchNewProducts() {
    const { fetchHomeProductByCategoryAction } = this.props;
    const { isFetchedNewProducts, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedNewProducts) {
      fetchHomeProductByCategoryAction({
        categoryId: NEW_PRODUCT_PARAMS.idCategory
      });
      this.setState({ isFetchedNewProducts: true });
    }
  }

  handleFetchPopularSearch() {
    const { getTrendingKeywordsAction } = this.props;
    const { isFetchedPopularSearch, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedPopularSearch) {
      getTrendingKeywordsAction({ limit: 10 });
      this.setState({ isFetchedPopularSearch: true });
    }
  }

  handleFetchWatchedList() {
    const { fetchUserWatchedListAction } = this.props;
    const { isFetchedWatchedList, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedWatchedList) {
      const fetchWatchedListParam = { page: 1, perPage: 25 };
      fetchUserWatchedListAction(fetchWatchedListParam);
      this.setState({ isFetchedWatchedList: true });
    }
  }

  handleFetchActivityFeed() {
    const { fecthActivityFeedListAction } = this.props;
    const { isFetchedActivityFeed, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    if (!isFetchedActivityFeed) {
      !isMobileVersion() &&
        fecthActivityFeedListAction &&
        fecthActivityFeedListAction({ limit: 5, feedType: FEEDABLE_TYPE.LOVE });
      this.setState({ isFetchedActivityFeed: true });
    }
  }

  handleFetchFooterBanner() {
    const { fetchMainBanner } = this.props;
    const { isFetchedFooterBanner, isPriorotyBlock } = this.state;

    if (!!isPriorotyBlock) {
      return;
    }

    const fetchFooterBannerParam = {
      idBanner: BANNER_ID.FOOTER,
      limit: BANNER_LIMIT_DEFAULT
    };

    if (!isFetchedFooterBanner) {
      !!fetchMainBanner && fetchMainBanner(fetchFooterBannerParam);
      this.setState({ isFetchedFooterBanner: true });
    }
  }

  handleFetchRecommendationBox() {
    const {
      fetchRecommendationBox,
      shopStore: { recommendationBoxPaging, recommendationBoxPageIndex, isFetchRecommendationBox }
    } = this.props;

    const isPreventLoading = !!isFetchRecommendationBox || !!this.timerRecommendationPending;
    if (isPreventLoading) return;

    const page =
      0 === recommendationBoxPageIndex
        ? 1 // First load with page 1
        : recommendationBoxPageIndex >= recommendationBoxPaging.total
        ? 0 // Stop load set page 0
        : recommendationBoxPageIndex + 1; // Next page, increate 1

    if (!!page) {
      /* Prevent loop loading in 500 mili second */
      this.timerRecommendationPending = true;
      setTimeout(() => (this.timerRecommendationPending = false), 500);

      /** Fetch new data */
      fetchRecommendationBox({ page });
    }
  }

  handleOpenCategoryModal = () => {
    this.setState((state) => ({ isModalCategoryOpen: true }));
  };

  handleCloseCategoryModal = () => {
    this.setState((state) => ({ isModalCategoryOpen: false }));
  };

  componentDidMount() {
    const becomeToParams = getUrlParameter(this.props.location.search, 'refresh_user');
    if ('true' === becomeToParams) {
      this.props.clearCartAction();
      this.props.clearDeliveryConfigAction();
      this.props.fetchUserProfileAction();
    }

    // Get data
    this.initData();

    // Set meta for SEO
    this.props.updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com`,
        type: 'article',
        title: 'Lixibox | GWP (Gift with purchase) | Bringing affordable luxury to the urban population',
        description:
          'Lixibox là kênh mua sắm mỹ phẩm, máy làm đẹp, mẹ và bé, chăm sóc răng miệng chính hãng với quà tặng kèm miễn phí (Lixibox GWP) trị giá lên đến 2 triệu cho mọi đơn hàng.',
        keyword:
          'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre, Lixibox GWP, GWP vietnam, gift with purchase, quà tặng kèm, GWP là gì?',
        image: CDN_ASSETS_PREFIX('/meta/cover.png')
      },
      structuredData: {
        breadcrumbList: []
      }
    });

    gatewayTrackViewHome();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      bannerStore: { bannerList }
    } = this.props;

    const mainBannerHash = objectToHash({
      idBanner: BANNER_ID.HOME_PAGE,
      limit: BANNER_LIMIT_DEFAULT
    });

    const isLoadingDoneBannerDone =
      !!bannerList &&
      !!bannerList[mainBannerHash] &&
      !bannerList[mainBannerHash].length &&
      !!nextProps.bannerStore.bannerList &&
      !!nextProps.bannerStore.bannerList[mainBannerHash] &&
      !!nextProps.bannerStore.bannerList[mainBannerHash].length;

    if (isLoadingDoneBannerDone) {
      this.setState({ isPriorotyBlock: false });
    }
  }

  componentWillUnmount() {
    const {
      clearDataHotDealAction,
      clearDataMagazineListAction,
      clearDataActivityFeedListAction,
      clearDataProductByCategoryAction
    } = this.props;

    clearDataHotDealAction();
    clearDataMagazineListAction();
    clearDataActivityFeedListAction();
    clearDataProductByCategoryAction();
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleFeatureBanner: this.handleFeatureBanner.bind(this),
      handleFetchHotBoxes: this.handleFetchHotBoxes.bind(this),
      handleFetchMagazineList: this.handleFetchMagazineList.bind(this),
      handleFetchNewProducts: this.handleFetchNewProducts.bind(this),
      generateCategoryHash: this.generateCategoryHash.bind(this),
      handleFetchPopularSearch: this.handleFetchPopularSearch.bind(this),
      handleFetchWatchedList: this.handleFetchWatchedList.bind(this),
      handleFetchActivityFeed: this.handleFetchActivityFeed.bind(this),
      handleFetchFooterBanner: this.handleFetchFooterBanner.bind(this),
      handleFetchRecommendationBox: this.handleFetchRecommendationBox.bind(this),
      handleOpenCategoryModal: this.handleOpenCategoryModal.bind(this),
      handleCloseCategoryModal: this.handleCloseCategoryModal.bind(this)
    };

    return renderView(args);
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ShopIndexContainer));
