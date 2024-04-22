import { PureComponent } from 'react';

import { ROUTING_MAGAZINE_CATEGORY_PATH, ROUTING_MAGAZINE_TAG_PATH } from '../../../../routings/path';
import { isUndefined, isEmptyObject } from '../../../../utils/validate';
import { getUrlParameter } from '../../../../utils/format';
import { objectToHash } from '../../../../utils/encode';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

class MagazineCategoryContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  initPagination(props = this.props) {
    const {
      match: { params },
      magazineStore: { magazineCategory, magazineTagName },
      perPage
    } = props;

    const slug = this.getSlug(params);

    const page = this.getPage();
    const param = { slug, page, perPage };
    const keyHash = objectToHash(param);
    const url = this.isTagNameCategory(params) ? ROUTING_MAGAZINE_TAG_PATH : ROUTING_MAGAZINE_CATEGORY_PATH;
    const data = this.isTagNameCategory(params) ? magazineTagName : magazineCategory;

    const { total_pages } = (data[keyHash] && data[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${url}/${slug}?page=${i}`
      });
    }

    this.setState({ urlList });
  }

  getPage() {
    const page = getUrlParameter(window.location.search, 'page') || 1;
    this.setState({ page });

    return page;
  }

  getSlug = (params) => {
    return params?.idTag || params?.idCategory;
  };

  isTagNameCategory = (params) => !!params?.idTag;

  handleFetchMagazineByTagNameOrCategory(props = this.props) {
    const {
      perPage,
      fetchMagazineCategory,
      fetchMagazineByTagName,
      match: { params },
      magazineStore: { magazineCategory, magazineTagName }
    } = props as IProps;

    const { page } = this.state as IState;

    const slug = this.getSlug(params);
    const param = { slug, page, perPage };
    const keyHash = objectToHash(param);

    this.isTagNameCategory(params)
      ? isUndefined(magazineTagName[keyHash]) && fetchMagazineByTagName(param)
      : isUndefined(magazineCategory[keyHash]) && fetchMagazineCategory(param);

    this.initPagination(this.props);
  }

  updatePriorityBlock(props = this.props) {
    const {
      perPage,
      magazineDefaultParams,
      match: { params },
      magazineStore: { magazineDashboard, magazineList, magazineCategory, magazineTagName }
    } = props as IProps;

    const { page, isPriorityBlock } = this.state as IState;

    const slug = this.getSlug(params);
    const param = { slug, page, perPage };
    const keyHash = objectToHash(param);

    const isFullData = this.isTagNameCategory(params)
      ? !isUndefined(magazineTagName[keyHash])
      : !isUndefined(magazineCategory[keyHash]);

    isPriorityBlock &&
      isFullData &&
      !isEmptyObject(magazineDashboard) &&
      !isUndefined(magazineList[objectToHash(magazineDefaultParams)]) &&
      this.setState({ isPriorityBlock: false });
  }

  componentDidMount() {
    const {
      fetchMagazineList,
      magazineDefaultParams,
      fetchMagazineDashboard,
      // fetchMagazineListAction,
      magazineStore: { magazineDashboard, magazineList }
    } = this.props as IProps;

    this.handleFetchMagazineByTagNameOrCategory(this.props);

    const keyHashMagazineDefault = objectToHash(magazineDefaultParams);
    isUndefined(magazineList[keyHashMagazineDefault]) && fetchMagazineList(magazineDefaultParams);

    isEmptyObject(magazineDashboard) && fetchMagazineDashboard();

    this.state.isPriorityBlock && this.updatePriorityBlock(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    const {
      perPage,
      updateMetaInfoAction,
      match: {
        params: { idCategory, idTag }
      },
      magazineStore: { magazineCategory, magazineTagName }
    } = this.props;

    this.state.isPriorityBlock && this.updatePriorityBlock(nextProps);

    (idCategory !== nextProps.match.params.idCategory || idTag !== nextProps.match.params.idTag) &&
      this.setState({ page: 1 }, () => this.handleFetchMagazineByTagNameOrCategory(nextProps));

    // Check param paging change
    const page = getUrlParameter(window.location.search, 'page') || 1;
    page !== this.state.page && this.setState({ page }, () => this.handleFetchMagazineByTagNameOrCategory(nextProps));

    this.initPagination(nextProps);

    // Set meta for SEO
    const slug = this.getSlug(nextProps.match.params);

    const nextPage = this.getPage();
    const param = { slug, page: nextPage, perPage };
    const keyHash = objectToHash(param);

    let url;
    let data;
    let nextData;

    if (this.isTagNameCategory(nextProps.match.params)) {
      data = magazineTagName;
      url = ROUTING_MAGAZINE_TAG_PATH;
      nextData = nextProps.magazineStore.magazineTagName;
    } else {
      data = magazineCategory;
      url = ROUTING_MAGAZINE_CATEGORY_PATH;
      nextData = nextProps.magazineStore.magazineCategory;
    }

    if (isUndefined(data[keyHash]) && !isUndefined(nextData[keyHash])) {
      const firstDetailMagazine =
        (nextData[keyHash].magazines && !!nextData[keyHash].magazines.length && nextData[keyHash].magazines[0]) || null;

      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com${url}/${slug}`,
          type: 'article',
          title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | Lixibox Beauty Magazine`,
          description: !!firstDetailMagazine
            ? firstDetailMagazine.description
            : 'Lixibox Magazine | Chia sẻ kiến thức mỹ phẩm, làm đẹp cùng Lixibox',
          keyword: !!firstDetailMagazine
            ? [slug, ...firstDetailMagazine.tags].join(', ')
            : 'lixibox, magazine, beauty blog, mỹ phẩm, làm đẹp, chia sẻ kiến thức làm đẹp',
          image: CDN_ASSETS_PREFIX('/meta/cover.png')
        },
        structuredData: {
          breadcrumbList: [
            {
              position: 2,
              name: `Magazine`,
              item: `https://www.lixibox.com/magazine`
            },
            {
              position: 3,
              name: `${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
              item: `https://www.lixibox.com${url}/${slug}`
            }
          ]
        }
      });
    }
  }
  componentWillUnmount() {
    this.props.clearDataMagazineAction();
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default MagazineCategoryContainer;
