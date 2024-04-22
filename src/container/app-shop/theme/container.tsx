import { Component } from 'react';
import { connect } from 'react-redux';

import { getUrlParameter, getUrlQuery, getQueryString } from '../../../utils/format';
import { ROUTING_SHOP_INDEX } from '../../../routings/path';
import { ROUTING_THEME_DETAIL_PATH } from '../../../routings/path';
import { isCompareObject, isUndefined } from '../../../utils/validate';
import { KEY_WORD } from '../../../constants/application/key-word';
import { stringToHash, objectToHash, objectHash } from '../../../utils/encode';
import { isMobileVersion } from '../../../utils/responsive';
import { scrollElement } from '../../../utils/scroll';
import { filterBrandsWithSelection } from '../../../utils/brand';
import { GROUP_OBJECT_TYPE } from '../../../constants/application/group-object-type';
import { MODAL_DISCOUNT_CODE_DETAIL } from '../../../constants/application/modal';
import { gatewayTrackViewItemList, gatewayTrackViewTheme } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class ThemeContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
    this.fetchFilteredProducts = this.fetchFilteredProducts.bind(this);
  }

  fetchFilteredProducts(queries) {
    const {
      history,
      location,
      perPage,
      match: {
        params: { idSpecial: id }
      },
      fetchProductByThemeIdAction,
      fetchThemeBoxesAction
    } = this.props;

    const page = this.getPage();

    let primaryQuery: {
      pl?: string;
      ph?: string;
      brands?: string;
      bids?: string;
      stock_status?: string;
      sort?: string;
    } = {};
    ['pl', 'ph', 'brands', 'bids', 'sort', 'stock_status'].forEach(
      (key) => (primaryQuery[key] = getUrlParameter(location.search, key))
    );
    Object.assign(primaryQuery, queries);
    const queryString = getQueryString(primaryQuery);
    const route = `${ROUTING_THEME_DETAIL_PATH}/${id}${queryString ? '?'.concat(queryString) : ''}`;
    history.push(route);

    this.setState({ isLoading: true }, () => fetchProductByThemeIdAction({ id }));
    fetchThemeBoxesAction({
      id,
      brands: primaryQuery.brands || '',
      bids: primaryQuery.bids || '',
      pl: primaryQuery.pl || '',
      ph: primaryQuery.ph || '',
      stockStatus: primaryQuery.stock_status || '',
      sort: primaryQuery.sort || '',
      page,
      perPage
    });
  }

  init(props = this.props) {
    const {
      perPage,
      location,
      themeStore: { boxes },
      fetchProductByThemeIdAction,
      fetchThemeBoxesAction,
      match: {
        params: { idSpecial }
      }
    } = props;

    const page = this.getPage();
    const brands = getUrlParameter(location.search, 'brands') || '';
    const bids = getUrlParameter(location.search, 'bids') || '';
    const pl = getUrlParameter(location.search, 'pl') || '';
    const ph = getUrlParameter(location.search, 'ph') || '';
    const sort = getUrlParameter(location.search, 'sort');
    const stockStatus = getUrlParameter(location.search, 'stock_status') || '';

    const keyHashTheme = this.generateBoxesQueryId(props);

    this.setState({ isLoading: true }, () => fetchProductByThemeIdAction({ id: idSpecial }));
    fetchThemeBoxesAction({
      id: idSpecial,
      brands,
      bids,
      pl,
      ph,
      sort,
      stockStatus,
      page,
      perPage
    });

    !isUndefined(boxes.byQuery[keyHashTheme]) && this.initPagination(props);

    this.requestTracking(this.props);
  }

  initPagination(props = this.props) {
    const {
      perPage,
      match: {
        params: { idSpecial }
      },
      themeStore: { boxes }
    } = props;

    const page = this.getPage();
    const brands = getUrlParameter(window.location.search, 'brands') || '';
    const bids = getUrlParameter(window.location.search, 'bids') || '';
    const pl = getUrlParameter(window.location.search, 'pl') || '';
    const ph = getUrlParameter(window.location.search, 'ph') || '';
    const stockStatus = getUrlParameter(window.location.search, 'stock_status') || '';
    const sort = getUrlParameter(window.location.search, 'sort');
    const params = { id: idSpecial, brands, bids, pl, ph, stockStatus, sort, page, perPage };
    const keyHash = objectHash(params);

    const { total_pages } =
      (boxes.byQuery[keyHash] && boxes.byQuery[keyHash].filter && boxes.byQuery[keyHash].filter.paging) || 0;

    const urlList: Array<any> = [];
    let searchQuery = this.getSearchQueryNotPage();
    const route = `${ROUTING_THEME_DETAIL_PATH}/${idSpecial}`;
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

  requestTracking(props) {
    const {
      location,
      trackingViewGroupAction,
      trackingStore: { viewGroupTrackingList },
      match: {
        params: { idSpecial }
      }
    } = props;

    const trackingCode = getUrlParameter(location.search, KEY_WORD.TRACKING_CODE);
    const keyHashCode = stringToHash(idSpecial);

    trackingCode &&
      0 < trackingCode.length &&
      isUndefined(viewGroupTrackingList[keyHashCode]) &&
      trackingViewGroupAction({
        groupObjectType: GROUP_OBJECT_TYPE.THEME,
        groupObjectId: idSpecial,
        campaignCode: trackingCode
      });
  }

  getPage(search?: '') {
    const page = new URLSearchParams(search || window.location.search).get('page') || 1;
    return page;
  }

  getSearchQueryNotPage() {
    const brands = getUrlParameter(window.location.search, 'brands') || '';
    const bids = getUrlParameter(window.location.search, 'bids') || '';
    const pl = getUrlParameter(window.location.search, 'pl') || '';
    const ph = getUrlParameter(window.location.search, 'ph') || '';
    const stockStatus = getUrlParameter(window.location.search, 'stock_status') || '';
    const sort = getUrlParameter(window.location.search, 'sort');

    let searchQueryList: Array<any> = [];
    if (!!brands) searchQueryList.push(`brands=${brands}`);
    if (!!bids) searchQueryList.push(`bids=${bids}`);
    if (!!pl && !!ph) searchQueryList.push(`pl=${pl}&ph=${ph}`);
    if (!!sort) searchQueryList.push(`sort=${sort}`);
    if (!!stockStatus) searchQueryList.push(`stock_status=${stockStatus}`);

    return searchQueryList.length > 0 ? `?${searchQueryList.join('&')}` : '';
  }

  generateBoxesQueryId(props) {
    const {
      location,
      perPage,
      match: {
        params: { idSpecial }
      }
    } = props;

    const page = this.getPage(location.search);
    const brands = getUrlParameter(location.search, 'brands') || '';
    const bids = getUrlParameter(location.search, 'bids') || '';
    const pl = getUrlParameter(location.search, 'pl') || '';
    const ph = getUrlParameter(location.search, 'ph') || '';
    const sort = getUrlParameter(location.search, 'sort');
    const stockStatus = getUrlParameter(location.search, 'stock_status') || '';
    const params = { id: idSpecial, brands, bids, pl, ph, sort, stockStatus, page, perPage };
    const keyHash = objectHash(params);
    return keyHash;
  }

  handleFilterSubmit(queries) {
    this.fetchFilteredProducts(queries);
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state as IState;

    let eleInfo = this.getPositionElementById('theme-detail-menu');

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

  componentDidMount() {
    this.init(this.props);
    isMobileVersion() && window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleAutoScrollDown() {
    setTimeout(() => {
      if (0 !== window.scrollY || !!isMobileVersion()) return;

      const themeHeadingTitle = document.getElementById('theme-heading-title');
      if (!themeHeadingTitle) return;
    }, 1000);
  }

  shouldDisplaySections(search) {
    const params = new URLSearchParams(search);

    const notFirstPage = ![null, '1'].includes(params.get('page'));
    const anyOtherFilterExists =
      ![null, ''].includes(params.get('brands')) ||
      ![null, ''].includes(params.get('bids')) ||
      ![null, ''].includes(params.get('pl')) ||
      ![null, ''].includes(params.get('ph')) ||
      ![null, ''].includes(params.get('stock_status')) ||
      ![null, '', 'default'].includes(params.get('sort'));

    const shouldHide = notFirstPage || anyOtherFilterExists;
    return !shouldHide;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
    this.props.clearDataProductByThemeIdAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    const {
      location,
      history,
      fetchThemeBoxesAction,
      fetchThemeSectionAction,
      match: {
        params: { idSpecial }
      },
      themeStore: { isProductByThemeIdSuccess, isProductByThemeIdFail, productByThemeId, boxes }
    } = this.props;
    const nextPage = this.getPage(nextProps.location.search);
    const nextBrands = getUrlParameter(nextProps.location.search, 'brands') || '';
    const nextBids = getUrlParameter(nextProps.location.search, 'bids') || '';
    const nextPl = getUrlParameter(nextProps.location.search, 'pl') || '';
    const nextPh = getUrlParameter(nextProps.location.search, 'ph') || '';
    const nextSort = getUrlParameter(nextProps.location.search, 'sort');
    const nextStockStatus = getUrlParameter(nextProps.location.search, 'stock_status');
    const nextPerPage = nextProps.perPage;

    const nextQuery = getUrlQuery(nextProps.location.search);
    const pageQueryChanged =
      getUrlQuery(location.search)['page'] !== nextQuery['page'] ||
      getUrlQuery(location.search)['brands'] !== nextQuery['brands'] ||
      getUrlQuery(location.search)['sort'] !== nextQuery['sort'] ||
      getUrlQuery(location.search)['pl'] !== nextQuery['pl'] ||
      getUrlQuery(location.search)['ph'] !== nextQuery['ph'] ||
      getUrlQuery(location.search)['stock_status'] !== nextQuery['stock_status'];

    if (idSpecial !== nextProps.match.params.idSpecial) {
      this.setState({ isLoading: true }, () =>
        this.props.fetchProductByThemeIdAction({ id: nextProps.match.params.idSpecial })
      );
    }

    if (idSpecial !== nextProps.match.params.idSpecial || pageQueryChanged) {
      const themeFilterHeading: any = document.getElementById('theme-filter-heading');
      if (!!themeFilterHeading) {
        const stickyTopRootVariableCSS =
          parseInt(getComputedStyle(document.body)?.getPropertyValue('--sticky-top-banner-height')) || 0;

        setTimeout(() => {
          const scrollTo =
            themeFilterHeading.offsetTop -
            (isMobileVersion() ? themeFilterHeading.offsetHeight : 120 + stickyTopRootVariableCSS);
          scrollElement({
            x: 0,
            y: scrollTo,
            isAnimation: true
          });
        }, 1100);
      }

      fetchThemeBoxesAction({
        id: nextProps.match.params.idSpecial,
        brands: nextBrands,
        bids: nextBids,
        pl: nextPl,
        ph: nextPh,
        sort: nextSort,
        stockStatus: nextStockStatus,
        page: nextPage,
        perPage: nextPerPage
      });
    }

    if (
      idSpecial !== nextProps.match.params.idSpecial ||
      (idSpecial === nextProps.match.params.idSpecial && location.search !== nextProps.location.search)
    ) {
      this.setState({ showSubCategory: false, showFilter: false });
      this.requestTracking(nextProps);
    }

    if (!isProductByThemeIdSuccess && nextProps.themeStore.isProductByThemeIdSuccess) {
      const keyHashBoxes = this.generateBoxesQueryId(nextProps);
      const themeBoxes = nextProps?.themeStore?.boxes?.byQuery?.[keyHashBoxes]?.boxes || [];
      this.handleSetBrandsArrayFilter(keyHashBoxes, nextProps.themeStore?.boxes);

      // fetch sections
      const keyHashTheme = objectToHash({ id: nextProps.match.params.idSpecial });
      const theme = !!nextProps.themeStore.productByThemeId && nextProps.themeStore.productByThemeId[keyHashTheme];
      const sections = (theme && theme.sections) || [];
      sections.forEach((section) =>
        fetchThemeSectionAction({ id: nextProps.match.params.idSpecial, sectionId: section.id })
      );
      theme?.theme &&
        gatewayTrackViewItemList({
          source: ViewedSource.THEME,
          sourceId: theme?.theme?.slug,
          id: theme?.theme?.slug,
          name: theme?.theme?.name,
          items: themeBoxes
        });
    }

    if (boxes.fetching && !nextProps.themeStore.boxes.fetching && !nextProps.themeStore.boxes.errored) {
      this.initPagination(nextProps);
    }

    !isProductByThemeIdFail && nextProps.themeStore.isProductByThemeIdFail && history.push(ROUTING_SHOP_INDEX);

    // Set meta for SEO
    const params = { id: idSpecial };
    const keyHash = objectToHash(params);

    if (
      isUndefined(productByThemeId[keyHash]) &&
      !!nextProps.themeStore &&
      !!nextProps.themeStore.productByThemeId &&
      !!nextProps.themeStore.productByThemeId[keyHash]
    ) {
      this.handleAutoScrollDown();
      this.handleSetMetaInfor();
      gatewayTrackViewTheme({ theme: nextProps?.themeStore?.productByThemeId?.[keyHash]?.theme });
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { themeStore } = this.props;
    if (
      !isCompareObject(themeStore?.boxes, prevProps.themeStore?.boxes) &&
      !themeStore?.boxes.fetching &&
      themeStore?.boxes.loaded
    ) {
      const keyHashBoxes = this.generateBoxesQueryId(this.props);
      this.handleSetBrandsArrayFilter(keyHashBoxes, themeStore?.boxes);

      themeStore?.boxes?.byQuery?.[keyHashBoxes]?.boxes?.length && this.handleSetMetaInfor();
    }
  }

  configureScrollPositionOnContentLoad() {
    if (isMobileVersion()) return 0;

    const desktopFilter = document.getElementById('desktop-list-header');
    const FILTER_HEADER_COMPENSATION = 10;
    const scrollPosition = desktopFilter ? desktopFilter.offsetTop - FILTER_HEADER_COMPENSATION : 0;
    return scrollPosition;
  }

  handleClickDiscountCode(discountCode) {
    const { openModalAction } = this.props;
    openModalAction(MODAL_DISCOUNT_CODE_DETAIL({ discountCode }));
  }

  handleSetBrandsArrayFilter(keyHashBoxes, boxes) {
    const brands = boxes?.byQuery?.[keyHashBoxes]?.available_filters?.brands || [];
    const filterBrands = filterBrandsWithSelection('set', brands);
    this.setState({ isLoading: false, filterBrands });
  }

  handleSetMetaInfor() {
    const { match, themeStore, updateMetaInfoAction } = this.props;
    const params = { id: match?.params?.idSpecial || '' };
    const keyHash = objectToHash(params);

    const themeTitle = !!themeStore?.productByThemeId?.[keyHash]?.theme
      ? `${themeStore?.productByThemeId?.[keyHash]?.theme?.name} | Lixibox Best Deals`
      : '';

    const themeDescription =
      themeStore?.productByThemeId?.[keyHash]?.theme?.seo_description || 'Thông tin chương trình khuyến mãi';

    const themeImg = themeStore?.productByThemeId?.[keyHash]?.theme?.top_banner?.large_url || '';

    const themebreadcrumbListName = themeStore?.productByThemeId?.[keyHash]?.theme?.name || '';

    updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com/theme/${params.id}`,
        type: 'product',
        title: themeTitle,
        description: themeDescription,
        keyword: 'Theme',
        image: themeImg
      },
      structuredData: {
        breadcrumbList: [
          {
            position: 2,
            name: themebreadcrumbListName,
            item: `https://www.lixibox.com/theme/${params.id}`
          }
        ]
      }
    });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleClickDiscountCode: this.handleClickDiscountCode.bind(this),
      handleFilterSubmit: this.handleFilterSubmit.bind(this),
      generateBoxesQueryId: this.generateBoxesQueryId.bind(this),
      shouldDisplaySections: this.shouldDisplaySections.bind(this)
    };

    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ThemeContainer);
