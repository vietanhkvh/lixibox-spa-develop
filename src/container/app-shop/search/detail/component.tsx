import { Component, MouseEvent } from 'react';
import { generatePath } from 'react-router-dom-v5-compat';

import { scrollElement } from '../../../../utils/scroll';
import { isUndefined } from '../../../../utils/validate';
import { decodeRouteParam, objectToHash, safeEncodeURIComponent } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { ROUTING_PRODUCT_DETAIL, ROUTING_SEARCH_PATH } from '../../../../routings/path';
import { filterBrandsWithSelection } from '../../../../utils/brand';
import { storageKey } from '../../../../constants/application/client-storage';
import {
  gatewayTrackLeaveSearchImmediately,
  gatewayTrackViewContentFromList,
  gatewayTrackViewSearchItem,
  gatewayTrackViewSearchResults
} from 'tracking/gateway';
import { SearchVersion } from 'constants/application/search';
import { ProductBox } from 'types/api/shop';
import { ContentType, ViewedSource } from 'tracking/constants';
import { getItemIndexAcrossPages } from 'utils/page';

import View from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class SearchDetail extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS as IProps;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init(props = this.props, stockStatus = '', shouldNavigate = false, isSearchAll = true) {
    const {
      perPage,
      location,
      searchAllAction,
      history,
      match: {
        params: { keyWordSearch: _keyWordSearch }
      },
      searchStore: { lastSearchSource }
    } = props as IProps;
    const keyWordSearch = decodeRouteParam(_keyWordSearch);
    const page = this.getPage(location.search);
    const brands = getUrlParameter(location.search, 'brands') || '';
    const bids = getUrlParameter(location.search, 'bids') || '';
    const pl = getUrlParameter(location.search, 'pl') || '';
    const ph = getUrlParameter(location.search, 'ph') || '';
    const sort = getUrlParameter(location.search, 'sort') || '';
    const _stockStatus = shouldNavigate ? stockStatus : getUrlParameter(location.search, 'stock_status') || '';

    this.setState({ page }, () => {
      const searchSource = localStorage.getItem(storageKey.SEARCH_ORIGIN) || '';
      localStorage.removeItem(storageKey.SEARCH_ORIGIN);
      const params = {
        keyword: keyWordSearch,
        page,
        perPage,
        brands,
        bids,
        pl,
        ph,
        sort,
        stockStatus: _stockStatus,
        searchSource
      };

      isSearchAll && searchAllAction(params);
      if (shouldNavigate) {
        const query = new URLSearchParams(window.location.search);
        _stockStatus ? query.set('stock_status', _stockStatus) : query.delete('stock_status');
        history.push(`${window.location.pathname}?${query.toString()}`);
      }
      scrollElement({ x: 0, y: 0, isAnimation: true });
    });

    gatewayTrackViewSearchResults({ keyword: keyWordSearch, version: SearchVersion.V2, source: lastSearchSource });
  }

  fetchFilteredProductsByKeyword(query) {
    this.init(this.props, query?.stock_status || '', true, false);
  }

  componentDidMount() {
    this.init(this.props);
    this.initData(this.props);
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
    const keyword = decodeRouteParam(this.props.match.params.keyWordSearch);
    this.state.isExitingWithoutAction && gatewayTrackLeaveSearchImmediately({ keyword, version: SearchVersion.V2 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentKeyword = decodeRouteParam(this.props.match.params.keyWordSearch);
    const nextKeyWord = decodeRouteParam(nextProps.match.params.keyWordSearch);
    const page = this.getPage(nextProps.location.search);

    if (
      page !== this.state.page ||
      currentKeyword !== nextKeyWord ||
      this.props.location.search !== nextProps.location.search ||
      this.props.searchStore.toggleSubmitSearch !== nextProps.searchStore.toggleSubmitSearch
    ) {
      this.init(nextProps);
    }
    this.initData(nextProps);

    // Reset isExitingWithoutAction when keyword changes
    if (currentKeyword && currentKeyword !== nextKeyWord) {
      this.state.isExitingWithoutAction &&
        gatewayTrackLeaveSearchImmediately({ keyword: currentKeyword, version: SearchVersion.V2 });
      this.setState({ isExitingWithoutAction: true });
    }

    if (this.props.location.search !== nextProps.location.search) {
      this.setState({ isExitingWithoutAction: false });
    }

    if (!this.props.searchStore.isSearchAllSuccess && nextProps.searchStore.isSearchAllSuccess) {
      const {
        location,
        match: {
          params: { keyWordSearch: _keyWordSearch }
        },
        searchStore: { dataSearchAll },
        perPage
      } = this.props;
      const keyWordSearch = decodeRouteParam(_keyWordSearch);
      const page = this.getPage(location.search);
      const keyHash = objectToHash({ keyword: keyWordSearch, page, perPage });
      const brands =
        !!dataSearchAll &&
        !!dataSearchAll[keyHash] &&
        !!dataSearchAll[keyHash].available_filters &&
        Array.isArray(dataSearchAll[keyHash].available_filters.brands)
          ? dataSearchAll[keyHash].available_filters.brands
          : [];
      const filterBrands = filterBrandsWithSelection('set', brands);
      this.setState({ filterBrands });
    }
  }

  getPage(url) {
    const page = Number(getUrlParameter(url, 'page') || 1);
    return page;
  }

  initData(props = this.props) {
    const {
      match: {
        params: { keyWordSearch: _keyWordSearch }
      },
      searchStore: { dataSearchAll },
      location,
      perPage
    } = props;
    const keyWordSearch = decodeRouteParam(_keyWordSearch);
    const page = this.getPage(location.search);

    const params = { keyword: keyWordSearch, page, perPage };
    const keyHash = objectToHash(params);

    const total_pages =
      (dataSearchAll &&
        !isUndefined(dataSearchAll[keyHash]) &&
        dataSearchAll[keyHash].paging &&
        dataSearchAll[keyHash].paging.total_pages) ||
      0;
    const urlList: Array<any> = [];
    let searchQuery = this.getSearchQueryNotPage();
    const route = `${ROUTING_SEARCH_PATH}/${safeEncodeURIComponent(keyWordSearch)}`;
    const mainRoute = searchQuery.length > 0 ? `${route}${searchQuery}&` : `${route}?`;

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${mainRoute}page=${i}`
      });
    }

    this.setState({ urlList });
  }

  getSearchQueryNotPage() {
    const brands = getUrlParameter(window.location.search, 'brands') || '';
    const bids = getUrlParameter(window.location.search, 'bids') || '';
    const pl = getUrlParameter(window.location.search, 'pl') || '';
    const ph = getUrlParameter(window.location.search, 'ph') || '';
    const stockStatus = getUrlParameter(window.location.search, 'stock_status') || '';

    let searchQueryList: Array<any> = [];
    if (!!brands) searchQueryList.push(`brands=${brands}`);
    if (!!bids) searchQueryList.push(`bids=${bids}`);
    if (!!pl && !!ph) searchQueryList.push(`pl=${pl}&ph=${ph}`);
    if (!!stockStatus) searchQueryList.push(`stock_status=${stockStatus}`);

    return searchQueryList.length > 0 ? `?${searchQueryList.join('&')}` : '';
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state as IState;

    let eleInfo = this.getPositionElementById('search-detail-menu');

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

  onItemClick(product: ProductBox, index: number, e: MouseEvent<HTMLElement>) {
    // Prevent directly redirect to product detail page. Wait for the setState to get into effect and then trigger the redirect manually.
    // NOTE: This is a workaround for the issue that the redirect is triggered before the state is updated. This causes isExitingWithoutAction state to be always true.
    // TODO: This should be removed after the component is migrated to the functional component. Functional component shouldn't cause this issue.
    e.preventDefault();

    const {
      match: {
        params: { keyWordSearch: _keyWordSearch }
      },
      perPage
    } = this.props;
    const { page } = this.state;
    const keyWordSearch = decodeRouteParam(_keyWordSearch);

    gatewayTrackViewContentFromList({
      source: ViewedSource.SEARCH,
      sourceId: keyWordSearch,
      box: product,
      index: getItemIndexAcrossPages({
        itemIndexInPage: index,
        perPage,
        currentPage: page
      })
    });
    gatewayTrackViewSearchItem({
      keyword: keyWordSearch,
      version: SearchVersion.V2,
      type: ContentType.PRODUCT,
      box: product
    });

    this.setState({ isExitingWithoutAction: false }, () => {
      this.props.history.push(generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: product?.slug || '' }));
    });
  }

  render() {
    return (
      <View
        {...{
          props: this.props,
          state: this.state,
          fetchFilteredProductsByKeyword: this.fetchFilteredProductsByKeyword.bind(this),
          onItemClick: this.onItemClick.bind(this)
        }}
      />
    );
  }
}

export default SearchDetail;
