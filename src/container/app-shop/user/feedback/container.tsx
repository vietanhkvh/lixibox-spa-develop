import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class FeedbackContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init({
    perPageNotFeedback,
    perPageFeedbacked,
    fetchUserFeedbacksAction,
    fetchUserBoxesToFeedbackAction,
    pageNotFeedback,
    pageFeedbacked
  }) {
    const paramNotFeedbacks = {
      page: pageNotFeedback,
      perPage: perPageNotFeedback
    };
    const paramFeedbackeds = {
      page: pageFeedbacked,
      perPage: perPageFeedbacked
    };

    fetchUserBoxesToFeedbackAction(paramNotFeedbacks);
    fetchUserFeedbacksAction(paramFeedbackeds);
  }

  componentDidMount() {
    const {
      perPageNotFeedback,
      perPageFeedbacked,
      fetchUserFeedbacksAction,
      fetchUserBoxesToFeedbackAction,
      feedbackStore: { userBoxesToFeedback, userFeedbacks }
    } = this.props as IProps;

    const { pageNotFeedback, pageFeedbacked } = this.state as IState;

    this.init({
      perPageNotFeedback,
      perPageFeedbacked,
      fetchUserFeedbacksAction,
      fetchUserBoxesToFeedbackAction,
      pageNotFeedback,
      pageFeedbacked
    });
    const urlNotFeedbackList = this.initPagination({
      page: pageNotFeedback,
      perPage: perPageNotFeedback,
      list: userBoxesToFeedback
    });
    const urlFeedbackedList = this.initPagination({
      page: pageFeedbacked,
      perPage: perPageFeedbacked,
      list: userFeedbacks
    });

    this.setState({ urlNotFeedbackList, urlFeedbackedList });
  }

  initPagination = ({ page, perPage, list }) => {
    const params = { page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (list[keyHash] && list[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `#`
      });
    }

    return urlList || [];
  };

  handleNotFeedbackPaginationClick(val) {
    const { perPageNotFeedback, fetchUserBoxesToFeedbackAction } = this.props as IProps;

    const { pageNotFeedback } = this.state as IState;

    !isNaN(val) &&
      this.handlePaginationClick({
        prevPage: pageNotFeedback,
        nextPage: val,
        perPage: perPageNotFeedback,
        action: fetchUserBoxesToFeedbackAction,
        isFeedbacked: false
      });
  }

  handleFeedbackedPaginationClick(val) {
    const { perPageFeedbacked, fetchUserFeedbacksAction } = this.props as IProps;

    const { pageFeedbacked } = this.state as IState;
    !isNaN(val) &&
      this.handlePaginationClick({
        prevPage: pageFeedbacked,
        nextPage: val,
        perPage: perPageFeedbacked,
        action: fetchUserFeedbacksAction,
        isFeedbacked: true
      });
  }

  handlePaginationClick({ prevPage, nextPage, perPage, action, isFeedbacked }) {
    if (!isNaN(nextPage) && prevPage !== nextPage) {
      const params = { page: nextPage, perPage };
      isFeedbacked
        ? this.setState({ pageFeedbacked: nextPage }, () => action(params))
        : this.setState({ pageNotFeedback: nextPage }, () => action(params));
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      feedbackStore: {
        isAddFeedbackSuccess,
        isFetchNotFeedbackSuccess,
        isFetchFeedbackedSuccess,
        isEditFeedbackSuccess
      },
      fetchUserFeedbacksAction,
      fetchUserBoxesToFeedbackAction
    } = this.props;

    const paramFeedbacked = {
      page: this.state.pageFeedbacked,
      perPage: nextProps.perPageFeedbacked
    };

    // Fetch new not feedback list, page: 1
    if (!isAddFeedbackSuccess && nextProps.feedbackStore.isAddFeedbackSuccess) {
      this.setState({ pageNotFeedback: 1, pageFeedbacked: 1 });
      fetchUserBoxesToFeedbackAction({
        page: 1,
        perPage: nextProps.perPageNotFeedback
      });
    }

    !isEditFeedbackSuccess &&
      nextProps.feedbackStore.isEditFeedbackSuccess &&
      fetchUserFeedbacksAction(paramFeedbacked);

    if (!isFetchFeedbackedSuccess && nextProps.feedbackStore.isFetchFeedbackedSuccess) {
      const urlFeedbackedList = this.initPagination({
        page: this.state.pageFeedbacked,
        perPage: nextProps.perPageFeedbacked,
        list: nextProps.feedbackStore.userFeedbacks
      });
      this.setState({ urlFeedbackedList });
    }

    if (!isFetchNotFeedbackSuccess && nextProps.feedbackStore.isFetchNotFeedbackSuccess) {
      const urlNotFeedbackList = this.initPagination({
        page: this.state.pageNotFeedback,
        perPage: nextProps.perPageNotFeedback,
        list: nextProps.feedbackStore.userBoxesToFeedback
      });
      this.setState({ urlNotFeedbackList });
      fetchUserFeedbacksAction({
        page: this.state.pageFeedbacked,
        perPage: nextProps.perPageFeedbacked
      });
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleNotFeedback: this.handleNotFeedbackPaginationClick.bind(this),
      handleFeedbacked: this.handleFeedbackedPaginationClick.bind(this)
    };
    return renderView(args);
  }
}

export default FeedbackContainer;
