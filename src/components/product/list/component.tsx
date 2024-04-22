import { Component } from 'react';

import { getUrlParameter } from '../../../utils/format';
import { CATEGORY_FILTER } from '../../../constants/application/category.config';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import { isCompareObject, isEmptyKeyObject } from '../../../utils/validate';

import { IProps, IState } from './model';
import { renderComponent } from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ContainerProductList extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    // Migrated from componentWillMount ////////
    const { listMenu, productByCategory } = this.props as IProps;

    const browseNodes = (!isEmptyKeyObject(listMenu, 'browse_nodes') && listMenu.browse_nodes) || [];

    const categoryId =
      (!isEmptyKeyObject(productByCategory, 'browse_node') &&
        !isEmptyKeyObject(productByCategory.browse_node, 'id') &&
        productByCategory.browse_node.id) ||
      0;

    const list = this.getCategoryList(browseNodes, categoryId);
    this.setState({ categorySlideList: list.length > 0 ? list.pop() : [] });
    ////////////////////////////////////////////

    this.initData();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  /**
   * @param nextProps Next Props received when change category
   *
   * 1. Update category filter has
   * 2. Re-init data
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listMenu, productByCategory } = nextProps as IProps;

    if (
      !isEmptyKeyObject(this.props, 'productByCategory') &&
      !isCompareObject(this.props.productByCategory, productByCategory)
    ) {
      const browseNodes = (!isEmptyKeyObject(listMenu, 'browse_nodes') && listMenu.browse_nodes) || [];

      const list = this.getCategoryList(
        browseNodes,
        (productByCategory && productByCategory.browse_node && productByCategory.browse_node.id) || 0
      );
      this.setState({ categorySlideList: list.length > 0 ? list.pop() : [] });
    }

    this.initData(nextProps);
  }

  componentWillUnmount() {
    window.addEventListener('scroll', () => {});
  }

  handleShowFilter() {
    const { isShowFilter } = this.state;

    this.setState({
      isShowFilter: !isShowFilter,
      isShowCategoryModal: false,
      isShowSort: false
    });
  }

  handleShowSort() {
    const { isShowSort } = this.state;

    this.setState({
      hoverSort: !isShowSort,
      isShowSort: !isShowSort,
      isShowCategoryModal: false,
      isShowFilter: false
    });
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state;

    let eleInfo = this.getPositionElementById('sub-category');

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

  moveItemOnTop({ list, slug }) {
    if (!Array.isArray(list) || list.length === 0) return [];

    if (list[0].brand_slug === slug) return list;

    const brands = list.filter((_item) => _item.brand_slug === slug);
    const tmpList = list.filter((_item) => _item.brand_slug !== slug);
    return brands && !!brands.length ? [brands[0], ...tmpList] : [];
  }

  /** Check data exist or not to fetch */
  initData(props = this.props) {
    const { location, idCategory, brandShowNumber = 0, productByCategory } = props as IProps;

    /** Paging */
    const total_pages =
      (!isEmptyKeyObject(productByCategory, 'paging') &&
        !isEmptyKeyObject(productByCategory.paging, 'total_pages') &&
        productByCategory.paging.total_pages) ||
      0;

    const urlList: Array<any> = [];
    let searchParams = new URLSearchParams(window.location.search);
    const route = `${ROUTING_PRODUCT_CATEGORY_PATH}/${idCategory}`;

    for (let i = 1; i <= total_pages; i++) {
      searchParams.set('page', String(i));
      let queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

      urlList.push({
        number: i,
        title: i,
        link: `${route}${queryString}`
      });
    }

    /** Get sort type from categoryFilter */
    let sortValue = getUrlParameter(location.search, 'sort') || '';
    /** If empty -> Init defalut value "newest" */
    sortValue = !!sortValue && sortValue.length > 0 ? sortValue : 'newest';

    // Get brand slug. Note: Only get first brand was selected
    let brandValue = getUrlParameter(location.search, 'brands') || '';

    let brandList =
      !!productByCategory &&
      !!productByCategory.available_filters &&
      Array.isArray(productByCategory.available_filters.brands)
        ? productByCategory.available_filters.brands
        : [];

    // Check index of brand. If it greater than brandShowNumber - 1, it mean isShowViewMoreBrand equals true
    if (!!brandList.length && !!brandValue) {
      for (let i = 0, len = brandList.length; i < len; i++) {
        if (brandValue === brandList[i].brand_slug && i >= brandShowNumber - 1) {
          this.setState({ isShowViewMoreBrand: true });
          break;
        }
      }
    } else {
      this.setState({ isShowViewMoreBrand: false });
    }

    this.setState({
      sortList:
        CATEGORY_FILTER && CATEGORY_FILTER.sort && Array.isArray(CATEGORY_FILTER.sort.value)
          ? CATEGORY_FILTER.sort.value.map((sortItem) => {
              sortItem.selected = sortItem.key === sortValue;
              return sortItem;
            })
          : [],
      hoverSort: false,
      brandSlugSelected: brandValue,
      urlList,
      brandList
    } as IState);
  }

  /**
   * Change value for sort selectbox
   *
   * @param _sort : sort value
   */
  selectSort(_sort) {
    const { onSelectSort } = this.props;

    /** Set state for update layout sort select */
    this.setState(
      (prevState, props) =>
        ({
          sortList: Array.isArray(prevState.sortList)
            ? prevState.sortList.map((sort) => {
                sort.selected = sort.key === _sort.key;
                return sort;
              })
            : [],
          hoverSort: false
        } as IState),
      () => {
        onSelectSort(_sort.key);
      }
    );
  }

  onMouseEnter() {
    this.setState({
      hoverSort: true,
      isShowFilter: false,
      isShowCategoryModal: false
    });
  }

  onMouseLeave() {
    this.setState({
      hoverSort: false,
      isShowFilter: false,
      isShowCategoryModal: false
    });
  }

  handleShowCategoryModal(categoryList, isShow, item = {}) {
    this.setState((prevState, props) => ({
      categoryList,
      itemSelected: [...this.state.itemSelected, item],
      isShowCategoryModal: isShow,
      isShowFilter: false,
      isShowSort: false,
      saveStepCategoryList: [...this.state.saveStepCategoryList, prevState.categoryList]
    }));
  }

  handleCloseCategoryModal() {
    this.setState({
      isShowSort: false,
      isShowFilter: false,
      isShowCategoryModal: false
    });
  }

  handleBackCategoryModal() {
    const { saveStepCategoryList } = this.state;

    if (saveStepCategoryList && saveStepCategoryList.length === 1) {
      this.setState({
        isShowCategoryModal: false,
        categoryList: [],
        itemSelected: [],
        saveStepCategoryList: []
      });
    } else {
      this.state.itemSelected.pop();

      this.setState({
        isShowCategoryModal: true,
        categoryList: saveStepCategoryList.pop(),
        itemSelected: this.state.itemSelected
      });
    }
  }

  getCategoryList(categories, categoryId) {
    let list: Array<any> = [];
    let found = false;

    function recurse(categories) {
      const length = categories.length;

      for (let i = 0; i < length; i++) {
        list.push(categories[i].sub_nodes);

        // Found the category!
        if (categories[i].id === categoryId) {
          found = true;
          break;
        } else {
          // Are there sub_nodes?
          if (categories[i].sub_nodes.length > 0) {
            recurse(categories[i].sub_nodes);
            if (found) {
              break;
            }
          }
        }
        list.pop();
      }
    }

    Array.isArray(categories) && categories.length > 0 && recurse(categories);

    return list;
  }

  handleShowViewMoreBrand() {
    this.setState({ isShowViewMoreBrand: !this.state.isShowViewMoreBrand });
  }

  /**
   * Handle when select / un-select brand item
   */
  handleSelectBrand(brand) {
    this.props.onSelectBrand(brand);
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default ContainerProductList;
