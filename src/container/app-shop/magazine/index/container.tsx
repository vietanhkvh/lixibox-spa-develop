import { PureComponent } from 'react';

import { isEmptyObject } from '../../../../utils/validate';
import { getUrlParameter } from '../../../../utils/format';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class MagazineIndexContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  handleFetchMagazineDashboard() {
    const {
      magazineStore: { magazineDashboard },
      fetchMagazineDashboard
    } = this.props as IProps;
    isEmptyObject(magazineDashboard)
      ? fetchMagazineDashboard()
      : this.state.isPriorityBlock && this.setState({ isPriorityBlock: false });
  }

  componentDidMount() {
    const { fetchMagazineListAction, updateMetaInfoAction, magazineDefaultParams } = this.props as IProps;

    const page: any = getUrlParameter(window.location.search, 'page') || 1;
    const params = Object.assign({}, magazineDefaultParams, { page });
    this.setState({ page: parseInt(page) });
    fetchMagazineListAction(params);

    updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com/magazine`,
        type: 'article',
        title: 'Lixibox Magazine',
        description: 'Lixibox Magazine | Chia sẻ kiến thức mỹ phẩm, làm đẹp cùng Lixibox',
        keyword: 'mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, halio, lustre',
        image: CDN_ASSETS_PREFIX('/meta/cover.png')
      },
      structuredData: {
        breadcrumbList: [
          {
            position: 2,
            name: 'Lixibox Magazine',
            item: `https://www.lixibox.com/magazine`
          }
        ]
      }
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      magazineStore: { isFetchMagazineListSuccess, isFetchMagazineDashboardSuccess }
    } = this.props as IProps;
    const { magazineStore } = nextProps as IProps;

    !isFetchMagazineListSuccess &&
      magazineStore &&
      magazineStore.isFetchMagazineListSuccess &&
      this.state.isPriorityBlock &&
      this.handleFetchMagazineDashboard();

    !isFetchMagazineDashboardSuccess &&
      magazineStore &&
      magazineStore.isFetchMagazineDashboardSuccess &&
      this.state.isPriorityBlock &&
      this.setState({ isPriorityBlock: false });

    const page: any = getUrlParameter(window.location.search, 'page') || 1;
    if (page * 1 !== this.state.page) {
      const { fetchMagazineListAction, magazineDefaultParams } = this.props as IProps;
      const params = Object.assign({}, magazineDefaultParams, { page });
      this.setState({ page: parseInt(page) }, () => {
        fetchMagazineListAction(params);
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

export default MagazineIndexContainer;
