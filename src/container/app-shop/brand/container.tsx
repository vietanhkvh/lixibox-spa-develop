import { Component } from 'react';
import { connect } from 'react-redux';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

import { stringToHash, objectToHash } from '../../../utils/encode';
import { isUndefined } from '../../../utils/validate';
import { getUrlParameter } from '../../../utils/format';
import { GROUP_OBJECT_TYPE } from '../../../constants/application/group-object-type';
import { ROUTING_BRAND_DETAIL_PATH } from '../../../routings/path';
import { KEY_WORD } from '../../../constants/application/key-word';
import { gatewayTrackViewBrand, gatewayTrackViewItemList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class BrandContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init(props = this.props, stockStatus = '', shouldNavigate = false) {
    const {
      brandStore,
      trackingStore: { viewGroupTrackingList },
      fetchProductByBrandIdAction,
      fetchBrandListAction,
      match: {
        params: { idBrand }
      },
      trackingViewGroupAction,
      history,
      location,
      perPage
    } = props;

    const page = this.getPage();

    const pl = getUrlParameter(location.search, 'pl') || '';
    const ph = getUrlParameter(location.search, 'ph') || '';
    const sort = getUrlParameter(location.search, 'sort') || '';
    const _stockStatus = shouldNavigate ? stockStatus : getUrlParameter(location.search, 'stock_status') || '';

    const params = { id: idBrand, page, perPage, pl, ph, sort, stockStatus: _stockStatus };
    const keyHashBrand = objectToHash(params);

    fetchProductByBrandIdAction(params);
    fetchBrandListAction();
    if (shouldNavigate) {
      const query = new URLSearchParams(window.location.search);
      _stockStatus ? query.set('stock_status', _stockStatus) : query.delete('stock_status');
      history.push(`${window.location.pathname}?${query.toString()}`);
    }
    !isUndefined(brandStore.productByBrandId[keyHashBrand]) && this.initPagination(props);

    const trackingCode = getUrlParameter(location.search, KEY_WORD.TRACKING_CODE);

    /** Tracking view group */
    const keyHashCode = stringToHash(idBrand);

    // Fisrt tracking
    trackingCode &&
      0 < trackingCode.length &&
      isUndefined(viewGroupTrackingList[keyHashCode]) &&
      trackingViewGroupAction({
        groupObjectType: GROUP_OBJECT_TYPE.BRAND,
        groupObjectId: idBrand,
        campaignCode: trackingCode
      });
  }

  fetchFilteredProductsByBrand(query) {
    this.init(this.props, query?.stock_status || '', true);
  }

  initPagination(props = this.props) {
    const {
      match: {
        params: { idBrand }
      },
      brandStore: { productByBrandId },
      perPage
    } = props;

    const page = this.getPage();
    const params = { id: idBrand, page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (productByBrandId[keyHash] && productByBrandId[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_BRAND_DETAIL_PATH}/${idBrand}?page=${i}`
      });
    }

    this.setState({ urlList });
  }

  getPage() {
    const page = getUrlParameter(window.location.search, 'page') || 1;
    this.setState({ page });

    return page;
  }

  componentDidMount() {
    this.init(this.props);
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state as IState;

    let eleInfo = this.getPositionElementById('brand-detail-menu');

    eleInfo &&
      eleInfo.top <= 0 &&
      !isSubCategoryOnTop &&
      this.setState({
        isSubCategoryOnTop: true,
        heightSubCategoryToTop: window.scrollY
      });

    heightSubCategoryToTop >= window.scrollY && isSubCategoryOnTop && this.setState({ isSubCategoryOnTop: false });
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    return el && el.getBoundingClientRect();
  }

  handleViewMore() {
    this.setState({ canViewMore: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {}, true);
    this.props.clearDataBrandsByIdAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      perPage,
      location,
      updateMetaInfoAction,
      match: {
        params: { idBrand }
      },
      brandStore: { isProductByBrandIdSuccess, productByBrandId }
    } = this.props;
    const page = this.getPage();
    const nextParams = { id: nextProps.match.params.idBrand, page, perPage };
    const nextKeyHash = objectToHash(nextParams);
    const nextProductByBrandId = nextProps.brandStore.productByBrandId[nextKeyHash];
    const nextBoxes = nextProductByBrandId?.boxes;
    const nextBrand = nextProductByBrandId?.brand;

    if (
      idBrand !== nextProps.match.params.idBrand ||
      (idBrand === nextProps.match.params.idBrand && location.search !== nextProps.location.search)
    ) {
      this.init(nextProps);
    }

    if (!isProductByBrandIdSuccess && nextProps.brandStore.isProductByBrandIdSuccess) {
      this.initPagination(nextProps);

      if (nextBrand) {
        gatewayTrackViewBrand({ brand: nextBrand });
        gatewayTrackViewItemList({
          source: ViewedSource.BRAND,
          sourceId: nextBrand.slug,
          id: nextBrand.slug,
          name: nextBrand.name,
          items: nextBoxes
        });
      }
    }

    // Set meta for SEO
    const params = { id: idBrand, page, perPage };
    const keyHash = objectToHash(params);

    ((isUndefined(productByBrandId[keyHash]) && !isUndefined(nextProps.brandStore.productByBrandId[keyHash])) ||
      !isUndefined(productByBrandId[keyHash])) &&
      !!nextProps.brandStore.productByBrandId[keyHash] &&
      !!nextProps.brandStore.productByBrandId[keyHash].brand &&
      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/brands/${nextProps.match.params.idBrand}`,
          type: 'article',
          title: `Thương hiệu ${nextProps.brandStore.productByBrandId[keyHash].brand.name} | Lixibox`,
          description: nextProps.brandStore.productByBrandId[keyHash].brand.description,
          keyword: `${nextProps.brandStore.productByBrandId[keyHash].brand.name}, lixibox, makeup, skincare, halio, okame`,
          image: CDN_ASSETS_PREFIX('/meta/cover.png')
        }
      });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleViewMore: this.handleViewMore.bind(this),
      fetchFilteredProductsByBrand: this.fetchFilteredProductsByBrand.bind(this)
    };
    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BrandContainer);
