import { Component } from 'react';

import { scrollElement } from '../../../utils/scroll';
import { objectToHash } from '../../../utils/encode';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class ProductDiscussion extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleInputOnChange(e) {
    const val = e.target.value;
    if (' ' === val || 0 === val.length) {
      this.setState({ txtComment: '' });
      return;
    }
    this.setState({ txtComment: val });
  }

  handleOnKeyUp(e) {
    const {
      productId,
      discussionStore: { isAddingDiscussion }
    } = this.props;
    let val = e.target.value.trim();
    !isAddingDiscussion && !!val.length && 13 === e.keyCode && this.addComment(productId, val);
  }

  handleAddComment() {
    const {
      productId,
      discussionStore: { isAddingDiscussion }
    } = this.props;
    const { txtComment } = this.state;
    !isAddingDiscussion && !!txtComment && 0 !== txtComment.length && this.addComment(productId, txtComment);
  }

  addComment(productId, content) {
    if (!content || !content.trim().length) return;

    const { addDiscussion, addDiscussionComment, perPage } = this.props;
    const { replyComment } = this.state;

    if (!replyComment) {
      addDiscussion({ productId, content, page: 1, perPage });
    } else {
      addDiscussionComment({ id: replyComment.id, content });
    }

    this.setState({ page: 1, replyComment: null });
    const input: any = document.getElementById('box-detail-discussion-input');
    !!input && (input.value = '');
  }

  handleSetReplyComment(comment) {
    this.setState({ replyComment: comment });

    const input: any = document.getElementById('box-detail-discussion-input');
    const inputValue = !!comment ? `@${comment.user_name} ` : '';

    if (!!input) {
      input.focus();
      setTimeout(() => (input.value = inputValue), 250);
    }
  }

  initPagination(props = this.props) {
    const {
      perPage,
      discussionStore: { boxDiscussions },
      productId,
      scrollId
    } = props as IProps;
    const { page, isFirstLoading } = this.state as IState;

    const params = { productId, page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (boxDiscussions[keyHash] && boxDiscussions[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `#`
      });
    }

    this.setState({ urlList });

    isFirstLoading ? this.setState({ isFirstLoading: false }) : this.handleScrollById(scrollId);
  }

  handlePaginationClick(_page) {
    const { perPage, productId, scrollToElementNum, fetchDiscussionsBoxes } = this.props as IProps;

    const { page } = this.state as IState;

    scrollToElementNum > 0 && scrollElement({ x: 0, y: scrollToElementNum });

    if (!isNaN(_page) && page !== _page) {
      const params = { productId, page: _page, perPage };
      this.setState({ isLoading: true, page: _page }, () => setTimeout(fetchDiscussionsBoxes(params), 3000));
    }
  }

  handleScrollById(scrollId) {
    if (scrollId && scrollId.length > 0) {
      const elem = document.getElementById(scrollId);
      elem !== null && elem.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      discussionStore: { isAddDiscussionSuccess, isAddDiscussionCommentSuccess, isFetchDiscussionSuccess },
      fetchDiscussionsBoxes,
      productId,
      perPage
    } = this.props;

    nextProps.productId &&
      productId !== nextProps.productId &&
      fetchDiscussionsBoxes({
        productId: nextProps.productId,
        page: 1,
        perPage
      });

    !isAddDiscussionSuccess &&
      nextProps.discussionStore.isAddDiscussionSuccess &&
      this.setState({ page: 1, txtComment: '' });

    if (!isAddDiscussionCommentSuccess && nextProps.discussionStore.isAddDiscussionCommentSuccess) {
      this.setState({ page: 1, txtComment: '' });
      fetchDiscussionsBoxes({ productId, page: 1, perPage });
    }

    if (!isFetchDiscussionSuccess && nextProps.discussionStore.isFetchDiscussionSuccess) {
      this.setState({ isLoading: false }, () => this.initPagination(nextProps));
    }
  }

  handleFetchApi() {
    const { fetchDiscussionsBoxes, productId, perPage } = this.props as IProps;

    const { isFetchApi } = this.state;

    if (!!isFetchApi) {
      return;
    }

    productId && productId.length > 0 && fetchDiscussionsBoxes({ productId, page: 1, perPage });

    this.setState({ isFetchApi: true });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleAddComment: this.handleAddComment.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      handleOnKeyUp: this.handleOnKeyUp.bind(this),
      handlePaginationClick: this.handlePaginationClick.bind(this),
      handleFetchApi: this.handleFetchApi.bind(this),
      handleSetReplyComment: this.handleSetReplyComment.bind(this)
    };
    return renderComponent(args);
  }
}

export default ProductDiscussion;
