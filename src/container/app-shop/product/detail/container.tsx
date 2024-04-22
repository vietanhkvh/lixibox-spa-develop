import { Component } from 'react';

import { reportException } from '../../../../tracking/sentry';
import { stringToHash, objectToHash } from '../../../../utils/encode';
import { isUndefined, isEmptyObject, isEmptyKeyObject } from '../../../../utils/validate';
import { isSafeData } from '../../../../utils/check-safe-data';
import { getUrlParameter } from '../../../../utils/format';
import { MODAL_SIZE_GUIDE } from '../../../../constants/application/modal';
import { isMobileVersion, getDeviceVersion } from '../../../../utils/responsive';
import { getBoxBadges } from 'utils/product';
import { KEY_WORD } from '../../../../constants/application/key-word';
import { storageKey } from 'constants/application/client-storage';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../../routings/path';
import { SIGN_IN_STATE } from 'constants/application/global';
import { gatewayTrackViewBadge, gatewayTrackViewContent } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

import { IProductDetailContainerProps, IProductDetailContainerState, CombinedProduct } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import renderDesktopVersion from './view/desktop';
import renderMobileVersion from './view/mobile';

class ProductDetailContainer extends Component<IProductDetailContainerProps, IProductDetailContainerState> {
  static defaultProps: IProductDetailContainerProps = DEFAULT_PROPS;

  constructor(props: IProductDetailContainerProps) {
    super(props);
    this.state = INITIAL_STATE(props.match.params.idProduct);
  }

  componentDidMount() {
    const idProduct = this.props.match.params.idProduct;
    const extractedNumber = parseInt(idProduct);
    const isSlugWithNumber = !isNaN(extractedNumber) && extractedNumber + '' === idProduct;

    if (!!isSlugWithNumber) return;

    const trackingCode = getUrlParameter(this.props.location.search, KEY_WORD.TRACKING_CODE) || '';
    const expTrackingCode = getUrlParameter(this.props.location.search, KEY_WORD.EXP_TRACKING_CODE) || '';
    const referrerObjectType = getUrlParameter(this.props.location.search, KEY_WORD.REFERRER_OBJECT_TYPE) || '';
    const referrerObjectId = getUrlParameter(this.props.location.search, KEY_WORD.REFERRER_OBJECT_ID) || '';

    this.setState(
      {
        trackingCode,
        expTrackingCode,
        referrerObjectType,
        referrerObjectId
      },
      this.initData
    );

    window.addEventListener(
      'scroll',
      !!isMobileVersion() ? this.handleScrollGroupBtn.bind(this) : this.setFixedPayment.bind(this)
    );

    this.props.fetchBoxFeedbackSummaryAction({ slug: idProduct });
  }

  onVariantSelect(slug) {
    const {
      shopStore: { productDetail },
      getProductDetailAction,
      history
    } = this.props;

    const nextProduct = productDetail[stringToHash(slug)];
    if (!nextProduct) {
      this.setState({ nextVariantId: slug });
      getProductDetailAction({ productId: slug });
      return;
    }

    history?.push(`${ROUTING_PRODUCT_DETAIL_PATH}/${slug}`);
  }

  handleScrollGroupBtn() {
    const { isPriceBtnOnTop, heightPriceBtnToTop = 0 } = this.state;

    let eleInfo = this.getPositionElementById('product-detail-group-btn');

    eleInfo &&
      eleInfo.top <= 0 &&
      !isPriceBtnOnTop &&
      this.setState({
        isPriceBtnOnTop: true,
        heightPriceBtnToTop: window.scrollY
      });

    heightPriceBtnToTop >= window.scrollY && isPriceBtnOnTop && this.setState({ isPriceBtnOnTop: false });
  }

  setFixedPayment() {
    const { isFixedToolbar } = this.state;
    let scrollTop = this.getScrollTop();
    const SCROLL_TOP_VALUE_TO_FIX = 730;

    scrollTop >= SCROLL_TOP_VALUE_TO_FIX
      ? !isFixedToolbar && this.setState({ isFixedToolbar: true })
      : isFixedToolbar && this.setState({ isFixedToolbar: false });
  }

  getScrollTop() {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollTop;
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    return el && el.getBoundingClientRect();
  }

  getTopElementById = (id) => {
    const ele = document.getElementById(id);

    if (ele !== null) {
      const infoEle = ele.getBoundingClientRect();
      return (infoEle && infoEle.top) || 0;
    }

    return 0;
  };
  componentDidUpdate(prevProps: Readonly<IProductDetailContainerProps>): void {
    const {
      shopStore: { boxFeedbackable, productDetail },
      authStore,
      fetchReviewableBoxesAction
    } = this.props;
    const { feedbackPosition = 0, discussionPosition = 0, idProductHash } = this.state;
    const product = productDetail[idProductHash];

    if (isMobileVersion()) {
      const feedbackPos = this.getTopElementById('product-detail-feedback');
      feedbackPos > feedbackPosition && this.setState({ feedbackPosition: feedbackPos });

      const discussionPos = this.getTopElementById('product-detail-discussion');
      discussionPos > discussionPosition && this.setState({ discussionPosition: discussionPos });
    }

    if (
      prevProps?.authStore?.signInStatus !== SIGN_IN_STATE.LOGIN_SUCCESS &&
      authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS
    ) {
      if (!boxFeedbackable.fetching && !!product?.box?.id) {
        fetchReviewableBoxesAction(product.box.id);
      }
    }
  }

  componentWillUnmount() {
    isMobileVersion() && this.props.updateProductNameMobileAction('');
    window.addEventListener('scroll', () => {});

    this.props.clearDataProdutDetailAction();
    this.props.clearDataDiscussionsBoxesAction();
  }

  /**
   * Check data exist or not to fetch
   *
   * Init data from
   * - current props
   * - next props
   */
  initData() {
    const {
      getProductDetailAction,
      shopStore: { productDetail }
    } = this.props as IProductDetailContainerProps;

    const { idProductHash, idProduct } = this.state as IProductDetailContainerState;

    /**
     * Check data in store by hash key
     * If not exist -> fetch data product detail
     */

    /** Product detail */
    getProductDetailAction({ productId: idProduct, isTrackingViewBox: true });

    this.initFeedbackPagination(this.props);

    // Tracking campaign code
    this.state.trackingCode &&
      0 < this.state.trackingCode.length &&
      this.trackingProduct(productDetail[idProductHash], this.state.trackingCode);
  }

  trackingProduct(product, trackingCode) {
    try {
      const { saveProductTrackingAction } = this.props;
      const isSaveProductTrackingCode = !!product && !!trackingCode && !trackingCode.length && !!product.box;

      isSaveProductTrackingCode &&
        'function' === typeof saveProductTrackingAction &&
        saveProductTrackingAction({
          boxId: product.box.id,
          slug: product.box.slug,
          trackingCode
        });
    } catch (e) {
      reportException(e, {
        type: 'TEST_EXCEPTION',
        message: 'Can not save product tracking code: inner function'
      });
    }
  }

  initFeedbackPagination(props = this.props) {
    const {
      feedbackPerPage,
      shopStore: { boxFeedback }
    } = props as IProductDetailContainerProps;
    const { idProduct, feedbackPage } = this.state as IProductDetailContainerState;

    const params = {
      productId: idProduct,
      page: feedbackPage,
      perPage: feedbackPerPage
    };
    const keyHash = objectToHash(params);

    const { total_pages } = (boxFeedback[keyHash] && boxFeedback[keyHash].paging) || 0;

    const feedbackUrlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      feedbackUrlList.push({
        number: i,
        title: i,
        link: `#`
      });
    }

    this.setState({ feedbackUrlList });
  }

  handleFeedbackPaginationClick(_page) {
    this.handleScrollToFeedback();

    const { feedbackPerPage, fetchFeedbackBoxesAction } = this.props as IProductDetailContainerProps;
    const { idProduct, feedbackPage } = this.state as IProductDetailContainerState;

    if (!isNaN(_page) && feedbackPage !== _page) {
      const params = {
        productId: idProduct,
        page: _page,
        perPage: feedbackPerPage
      };
      this.setState({ feedbackPage: _page, isLoadingFeedback: true }, () =>
        setTimeout(fetchFeedbackBoxesAction(params), 3000)
      );
    }
  }

  handleScrollToFeedback() {
    const elem = document.getElementById('product-detail-feedback');
    elem !== null && elem.scrollIntoView();
  }

  /**
   * Handle when receive new props
   * - CHANGE PRODUCT ID
   * 1. compare with current product id
   * 2. update state
   */
  UNSAFE_componentWillReceiveProps(nextProps: IProductDetailContainerProps) {
    const {
      trackingViewBoxAction,
      shopStore: {
        productDetail,
        isGetProductDetailFail,
        isFetchBoxFeedbackSuccess,
        isFetchBoxesCategoriesSuccess,
        boxesCategories
      },
      match: {
        params: { idProduct }
      }
    } = nextProps;

    const {
      fetchStoreBoxesAction,
      fetchProvinceListAction,
      fetchBoxesCategoriesAction,
      getLandingPagesDataAction,
      fetchFeedbackPictureAction,
      fetchDiscountCodesBoxesAction,
      provinceStore: { provinceList },
      history
    } = this.props;

    const { expTrackingCode, idProductHash, referrerObjectType, referrerObjectId, nextVariantId } = this.state;
    const product = productDetail[idProductHash];

    if (
      this.props.shopStore.productDetail !== productDetail &&
      nextVariantId &&
      productDetail[stringToHash(nextVariantId)]
    ) {
      history?.push(`${ROUTING_PRODUCT_DETAIL_PATH}/${nextVariantId}`);
      this.setState({ nextVariantId: '' });
    }

    if (this.props.shopStore) {
      if (Array.isArray(this.props.shopStore.isGetProductDetailFail)) {
        isGetProductDetailFail.indexOf(idProduct) >= 0 && this.setState({ isFetchProductDetailFail: true });
      }
    }

    if (
      !!this.props.shopStore.isLoadingProductDetail &&
      !nextProps.shopStore.isLoadingProductDetail &&
      !isEmptyObject(product) &&
      !!this.state.isPriorotyBlock
    ) {
      // TODO: Outdated logic with GA4
      // {
      //   let productInfo = nextProps.shopStore.productDetail[idProductHash];

      //   if (window.dataLayer && !!productInfo && !!productInfo.box) {
      //     'function' === typeof window.dataLayer.push &&
      //       window.dataLayer.push({
      //         productID: productInfo.box.id,
      //         productTitle: productInfo.box.name,
      //         productPrice: productInfo.box.price_sale_off || productInfo.box.price
      //       });
      //   }
      // }
      this.setState({ isPriorotyBlock: false });

      this.handleFetchListFeedback();

      // Check product which sell on store
      fetchStoreBoxesAction({ productId: idProduct });

      // Fetch discount code for boxes, user can choose discount code
      fetchDiscountCodesBoxesAction({ productId: idProduct, limit: 5 });

      // Fetch boxes categories
      fetchBoxesCategoriesAction({ productId: idProduct });

      fetchFeedbackPictureAction({ productId: idProduct });
      getLandingPagesDataAction({ productId: idProduct });

      /** Get province list */
      if (
        isUndefined(provinceList) ||
        isEmptyObject(provinceList) ||
        isUndefined(provinceList.list) ||
        provinceList.list.length === 0
      ) {
        setTimeout(fetchProvinceListAction, 1000);
      }

      /** Fetch product by lustre brands */
      if (!isEmptyObject(product) && Array.isArray(product.box_products)) {
        const lustreFilteredList = product.box_products.filter((item) => item.product.brand.slug === 'lustre');

        !!lustreFilteredList &&
          lustreFilteredList.length === product.box_products.length &&
          this.props.fetchProductByBrandIdAction({
            id: 'lustre',
            page: 1,
            perPage: 20
          });
      }
    }

    if (this.props.match.params.idProduct !== idProduct) {
      /** Update state */
      this.setState(
        {
          idProduct: idProduct,
          idProductHash: stringToHash(idProduct),
          feedbackPage: 1,
          isFetchListFeedback: false,
          isPriorotyBlock: true,
          isLoadingFeedback: true,
          isFetchSavingBox: false,
          isFetchRelatedBox: false,
          isFetchWatchedList: false,
          isFetchMagazineForBox: false,
          isFetchLoveBox: false,
          isFetchShopTheLook: false
        } as IProductDetailContainerState,
        this.initData
      );

      this.props.fetchBoxFeedbackSummaryAction({ slug: idProduct });
    }

    if (
      !this.props.shopStore.isGetProductDetailSuccess &&
      !!nextProps.shopStore.isGetProductDetailSuccess &&
      !!nextProps.shopStore.isTrackingViewBox
    ) {
      try {
        trackingViewBoxAction({
          boxId: idProduct,
          expertTrackingItemCode: expTrackingCode,
          referrerObjectType,
          referrerObjectId
        } as any);
      } catch (e) {}
      this.trackingProduct(product, this.state.trackingCode);
    }

    try {
      // Tracking for expert
      !this.props.trackingStore.isTrackingViewBoxSuccess &&
        !!nextProps.trackingStore &&
        !!nextProps.trackingStore.trackingCode &&
        !!nextProps.trackingStore.trackingCode.length &&
        !!nextProps.trackingStore.isTrackingViewBoxSuccess &&
        'function' === typeof this.trackingProduct &&
        this.trackingProduct(product, nextProps.trackingStore.trackingCode);
    } catch (e) {
      reportException(e, {
        type: 'TEST_EXCEPTION',
        message: 'Can not save product tracking code: outer function'
      });
    }

    !this.props.shopStore.isFetchBoxFeedbackSuccess &&
      isFetchBoxFeedbackSuccess &&
      this.setState({ isLoadingFeedback: false }, () => this.initFeedbackPagination(nextProps));

    // Tracking
    if (
      !isEmptyKeyObject(this.props, 'shopStore') &&
      !isEmptyKeyObject(this.props.shopStore, 'isFetchBoxesCategoriesSuccess') &&
      !this.props.shopStore.isFetchBoxesCategoriesSuccess &&
      !!isFetchBoxesCategoriesSuccess &&
      product?.box
    ) {
      gatewayTrackViewContent({ box: product?.box, categories: boxesCategories });
      const hasViewSource = localStorage.getItem(storageKey.TRACKING_IS_PRODUCT_VIEWED_FROM_SOURCE) === 'true';
      localStorage.removeItem(storageKey.TRACKING_IS_PRODUCT_VIEWED_FROM_SOURCE);
      !hasViewSource &&
        getBoxBadges(product?.box).forEach((badge) => {
          gatewayTrackViewBadge({
            box: product?.box,
            badge,
            source: ViewedSource.BOX_DETAIL,
            sourceId: product?.box?.lixibox_id
          });
        });
    }
  }

  handleFetchListFeedback() {
    const { idProduct, feedbackPage } = this.state as IProductDetailContainerState;

    /** Get feedback boxes by product id or slug */
    const { fetchFeedbackBoxesAction, feedbackPerPage } = this.props;

    const params = {
      productId: idProduct,
      page: feedbackPage,
      perPage: feedbackPerPage
    };
    this.setState({ isFetchListFeedback: true, isLoadingFeedback: true }, () => fetchFeedbackBoxesAction(params));
  }
  getCombinedProduct(): CombinedProduct {
    const {
      shopStore: { productDetail, productDetailSummary }
    } = this.props;
    const { idProductHash } = this.state as IProductDetailContainerState;

    const product = productDetail[idProductHash];
    const productSummary = productDetailSummary[idProductHash];
    const combinedProduct = {
      box: null,
      id: 0,
      slug: '',
      name: '',
      brand: '',
      brandUrl: '',
      currentPrice: 0,
      oldPrice: 0,
      rating: { count: 0, avg_rate: 0 },
      love: 0,
      picture: [],
      video: [],
      stock: 0,
      storeStock: 0
    };

    if (isUndefined(product)) {
      if (!isUndefined(productSummary)) {
        Object.assign(combinedProduct, {
          box: productSummary,
          id: productSummary.id,
          slug: productSummary.slug,
          name: productSummary.name,
          currentPrice: productSummary.price,
          oldPrice: productSummary.original_price,
          rating: productSummary.rating,
          love: productSummary.like_count,
          picture: [{ large_url: productSummary.primary_picture.medium_url }],
          video: [],
          stock: productSummary.stock,
          storeStock: productSummary.store_stock
        });
      }
    } else {
      const brandName = isSafeData(product, ['box', 'box_products', '0', 'product', 'brand'])
        ? product.box.box_products[0].product.brand.name
        : '';

      Object.assign(combinedProduct, {
        box: product.box,
        id: product.box ? product.box.id : 0,
        slug: product.box ? product.box.slug : '',
        name: product.box ? product.box.name : '',
        brandUrl: isSafeData(product, ['box', 'box_products', '0', 'product', 'brand'])
          ? product.box.box_products[0].product.brand.slug
          : '',
        brand: !!product && !!product.box && !!product.box.is_individual ? (null !== brandName ? brandName : '') : '',
        currentPrice: product && product.box ? product.box.price : 0,
        oldPrice: product.box.original_price,
        rating: product.box.rating,
        love: product.box.like_count,
        picture: product.box.pictures,
        video: product.box.videos || [],
        stock: product.box.stock,
        storeStock: product.box.store_stock
      });
    }

    return combinedProduct;
  }

  handleSizeGuideClick(imageUrl) {
    this.props.openModalAction(MODAL_SIZE_GUIDE({ image: imageUrl }));
  }

  handleDisplayStoreModal(state) {
    this.setState({ isOpenStoreModal: state });
  }

  handleDisplayStoreMapModal(state, storeMapUrl = '') {
    this.setState({ isOpenStoreMapModal: state, storeMapUrl });
  }

  handleDisplayCitySelectionModal(state) {
    this.setState({ isOpenCitySelectionModal: state });
  }

  handleDisplaySizeGuideModal(state) {
    this.setState({ isOpenSizeGuideModal: state });
  }

  handleDisplayDiscountModal(state) {
    this.setState({ isOpenDiscountCodeModal: state });
  }

  handleDisplaySavingBoxModal(state) {
    this.setState({ isOpenSavingBoxModal: state });
  }

  handleSetOpenFeedbackModal(state) {
    this.setState({ isOpenFeedbackModal: state });
  }

  handleSetOpenDiscussionModal(state) {
    this.setState({ isOpenDiscussionModal: state });
  }

  handleDisplayCashbackInfoModal(state) {
    this.setState({ isOpenCashbackInfoModal: state });
  }

  render() {
    const switchView = {
      MOBILE: () => renderMobileVersion.bind(this)(),
      DESKTOP: () => renderDesktopVersion.bind(this)()
    };

    return switchView[getDeviceVersion()]();
  }
}

export default ProductDetailContainer;
