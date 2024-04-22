import { Component } from 'react';
import { connect } from 'react-redux';

import { KEY_WORD } from '../../../../constants/application/key-word';
import { isUndefined } from '../../../../utils/validate';
import { getUrlParameter } from '../../../../utils/format';
import { GROUP_OBJECT_TYPE } from '../../../../constants/application/group-object-type';
import { categoryFilterUrlParser } from '../../../../utils/uri';
import { stringToHash, objectToHash } from '../../../../utils/encode'; //objectToHash
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../../routings/path';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../../constants/application/default';
import { ViewedSource } from 'tracking/constants';

import { IProps, IState } from './model';
import { renderComponent } from './view';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { mapDispatchToProps, mapStateToProps } from './store';
import { gatewayTrackViewCategory, gatewayTrackViewItemList } from 'tracking/gateway';

class ProductCategoryContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  createParamCategory(perPage, location, categoryFilter) {
    let searchQuery = this.createParamsSearch(perPage, location);
    const query = new URLSearchParams(searchQuery);
    //TODO: remove after applying new UI
    // query.set('stock_status', shouldNavigate ? stockStatus : getUrlParameter(location.search, 'stock_status') || '');
    searchQuery = `?${query.toString()}`;
    const params = { idCategory: categoryFilter, searchQuery };
    return { params, query };
  }

  init(props = this.props, stockStatus = '', shouldNavigate = false) {
    const {
      updateMenuSelected,
      fetchProductByCategory,
      history,
      match: {
        params: { categoryFilter }
      },
      fetchBannerAction,
      perPage,
      location
    } = props;

    const paramsCate = this.createParamCategory(perPage, location, categoryFilter);
    const { params, query } = paramsCate;
    this.setState({ categoryFilterHash: objectToHash(params) }, () => fetchProductByCategory(params));

    if (shouldNavigate) {
      stockStatus ? query.set('stock_status', stockStatus) : query.delete('stock_status');
      history.push(`${window.location.pathname}?${query.toString()}`);
    }

    /** Update menu selected -> re render menu selected on left navigation*/
    updateMenuSelected(categoryFilter || '');

    this.handleTracking(props);

    const fetchCategoryAddOnBannerParam = {
      idBanner: BANNER_ID.CATEGORY_ADDON,
      limit: BANNER_LIMIT_DEFAULT
    };
    fetchBannerAction(fetchCategoryAddOnBannerParam);
  }

  createParamsSearch(perPage, location) {
    const page = getUrlParameter(location.search, 'page') || 1;
    const brands = getUrlParameter(location.search, 'brands') || '';
    const sort = getUrlParameter(location.search, 'sort') || '';
    // Min Price
    const pl = getUrlParameter(location.search, 'pl') || '';
    // Max Price
    const ph = getUrlParameter(location.search, 'ph') || '';
    const stockStatus = getUrlParameter(location.search, 'stock_status') || '';

    let searchQuery = '?';
    searchQuery = !!brands ? `${searchQuery}brands=${brands}` : searchQuery;
    searchQuery = !!sort ? `${searchQuery}&sort=${sort}` : searchQuery;
    searchQuery = !!page ? `${searchQuery}&page=${page}` : searchQuery;
    searchQuery = !!perPage ? `${searchQuery}&per_page=${perPage}` : searchQuery;
    searchQuery = !!pl && !!ph ? `${searchQuery}&pl=${pl}&ph=${ph}` : searchQuery;
    searchQuery = stockStatus ? `${searchQuery}&stock_status=${stockStatus}` : searchQuery;

    return searchQuery;
  }

  fetchFilteredProductsByCategory(query) {
    this.init(this.props, query?.stock_status || '', true);
  }

  handleTracking(props = this.props) {
    const {
      match: {
        params: { categoryFilter }
      },
      trackingStore: { viewGroupTrackingList },
      trackingViewGroupAction
    } = props;

    const trackingCode = getUrlParameter(window.location.search, KEY_WORD.TRACKING_CODE);
    const keyHashCode = stringToHash(categoryFilter);
    const productId = categoryFilterUrlParser(categoryFilter);

    // Tracking code
    trackingCode &&
      0 < trackingCode.length &&
      isUndefined(viewGroupTrackingList[keyHashCode]) &&
      trackingViewGroupAction({
        groupObjectType: GROUP_OBJECT_TYPE.BROWSE_NODE,
        groupObjectId: productId.idCategory,
        campaignCode: trackingCode
      });
  }

  handleChangeSort(sort) {
    const {
      history,
      match: {
        params: { categoryFilter }
      }
    } = this.props as IProps;

    const brands = getUrlParameter(window.location.search, 'brands') || '';
    const url = `${ROUTING_PRODUCT_CATEGORY_PATH}/${categoryFilter}`;

    let searchQueryList: Array<string> = [];
    if (!!brands) searchQueryList.push(`brands=${brands}`);
    if (!!sort) searchQueryList.push(`sort=${sort}`);

    history.push(`${url}${searchQueryList.length > 0 ? `?${searchQueryList.join('&')}` : ''}`);
  }

  handleSelectBrand(selectBrand) {
    const {
      history,
      match: {
        params: { categoryFilter }
      }
    } = this.props as IProps;

    const brandSlug = getUrlParameter(window.location.search, 'brands') || '';
    let url = `${ROUTING_PRODUCT_CATEGORY_PATH}/${categoryFilter}`;
    url = brandSlug === selectBrand.brand_slug ? url : `${url}?brands=${selectBrand.brand_slug}`;

    history.push(url);
  }

  handleFormatOldUrl(slug) {
    if (!slug || !slug.includes('_')) return '';

    const filters = slug.split('_');
    let url = `${ROUTING_PRODUCT_CATEGORY_PATH}/${filters[0]}?`;
    for (let i = 1, len = filters.length; i < len; i++) {
      url += this.handleCreateFilter(filters[i]);
      if (i !== len - 1) url += '&';
    }

    return url;
  }

  handleCreateFilter(str) {
    if (!str || str.trim().length === 0) return '';

    if (str.indexOf('price-') === 0) return `sort=${str}`;
    if (str.indexOf('page-') === 0) return `page=${str.replace('page-', '')}`;

    return `brands=${str}`;
  }

  componentDidMount() {
    // Migrated from componentWillMount
    const {
      history,
      location: { search },
      match: {
        params: { categoryFilter }
      },
      menuStore: { listMenu }
    } = this.props;

    if (!search && categoryFilter.includes('_')) {
      const url = this.handleFormatOldUrl(categoryFilter);
      url && !!url.length && history.push(url);
    }
    // End of migration

    this.init();
    !listMenu?.browse_nodes?.length && this.props.fetchListMenuAction();
  }

  handleOpenCategoryModal(state) {
    this.setState({ isOpenCategoryModal: state });
  }

  /**
   * Update state categoryFilter when change category
   *
   * @param nextProps Next Props received when change category
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { categoryFilter }
      },
      perPage,
      location,
      productByCategory
    } = this.props as IProps;
    /** compare current filter vs next filter */
    if (
      this.createParamsSearch(perPage, location) !== this.createParamsSearch(nextProps.perPage, nextProps.location) ||
      (nextProps &&
        nextProps.match &&
        nextProps.match.params &&
        categoryFilter !== nextProps.match.params.categoryFilter)
    ) {
      this.init(nextProps);
    }

    if (
      !productByCategory[this.state.categoryFilterHash] &&
      nextProps.productByCategory[this.state.categoryFilterHash]
    ) {
      const node = nextProps.productByCategory[this.state.categoryFilterHash].browse_node;
      const boxes = nextProps.productByCategory[this.state.categoryFilterHash].boxes;
      if (node) {
        gatewayTrackViewCategory({ category: node });
        gatewayTrackViewItemList({
          source: ViewedSource.CATEGORY,
          sourceId: node.slug,
          id: node.slug,
          name: node.name,
          items: boxes
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearDataProductByCategoryAction();
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      handleChangeSort: this.handleChangeSort.bind(this),
      handleSelectBrand: this.handleSelectBrand.bind(this),
      handleOpenCategoryModal: this.handleOpenCategoryModal.bind(this),
      fetchFilteredProductsByCategory: this.fetchFilteredProductsByCategory.bind(this),
      createParamCategory: this.createParamCategory.bind(this)
    };
    return renderComponent.bind(this)(renderViewProps);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProductCategoryContainer);
