import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmptyKeyObject, isUndefined } from '../../../../utils/validate';
import { ROUTING_HOT_DEAL } from '../../../../routings/path';

import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class HotDealContainer extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  initData(hotDeal) {
    const total_pages =
      (!isUndefined(hotDeal) &&
        !isEmptyKeyObject(hotDeal, 'paging') &&
        !isEmptyKeyObject(hotDeal.paging, 'total_pages') &&
        hotDeal.paging.total_pages) ||
      0;

    const urlList: Array<any> = [];
    let searchParams = new URLSearchParams(window.location.search);

    for (let i = 1; i <= total_pages; i++) {
      searchParams.set('page', String(i));
      let queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_HOT_DEAL}${queryString}`
      });
    }

    if (urlList.length !== this.state.urlList.length) this.setState({ urlList });
  }

  componentDidMount() {
    const { fetchDataHotDealAction, location } = this.props;
    const page = location.search.split('=').pop() || 1;
    fetchDataHotDealAction({ page, perPage: 20 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { hotDeal } = nextProps;
    if (!isUndefined(hotDeal)) {
      let searchParams = nextProps.location.search;

      const prevPage =
        !isEmptyKeyObject(hotDeal, 'paging') && !isEmptyKeyObject(hotDeal.paging, 'current_page')
          ? hotDeal.paging.current_page
          : 0;

      const searchPage = searchParams.toString() ? Number(searchParams.split('=').pop()) : 1;

      if (prevPage !== 0 && prevPage !== searchPage) {
        this.props.fetchDataHotDealAction({ page: searchPage, perPage: 20 });
      }
    }
    if (!this.state.urlList.length) {
      this.initData(nextProps.hotDeal);
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HotDealContainer));
