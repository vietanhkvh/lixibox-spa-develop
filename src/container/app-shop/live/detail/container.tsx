import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTING_AUTH_SIGN_IN } from '../../../../routings/path';
import { MODAL_SIGN_IN } from '../../../../constants/application/modal';
import { isCompareObject } from '../../../../utils/validate';
import { isMobileVersion } from '../../../../utils/responsive';
import { getPusherInstance } from '../../../../utils/pusher/setup';
import { LIVE_STREAM_PUSHER } from '../../../../utils/pusher/config';
import { setReferrer } from 'utils/navigate';

import renderView from './view';
import { IProps, IState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ShopIndexContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  private pusher: any;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    const {
      match,
      displayLiveBackgroundAction,
      fetchLiveCommentListAction,
      liveDetailStore: liveDetail,
      getLiveDetailAction
    } = this.props;
    const slug = !!match && !!match.params ? match.params.id : '';

    const playingVideoSlug = (!!liveDetail && liveDetail.slug) || '';

    playingVideoSlug !== slug && getLiveDetailAction({ slug });
    fetchLiveCommentListAction({ slug });

    displayLiveBackgroundAction(true);

    this.initPusher();
  }

  initPusher() {
    const { updateDataFromSocketAction } = this.props;
    try {
      this.pusher = getPusherInstance();
      if (!this.pusher) return; /* Can not init pusher */

      const { match } = this.props;
      const slug = !!match && !!match.params ? match.params.id : '';
      if (!slug || !slug.length) return; /* Can not get box slug to init  */

      if (!LIVE_STREAM_PUSHER) return; /* Can not get config to init */

      // const channelName
      var channel = this.pusher.subscribe(`${LIVE_STREAM_PUSHER.PREFIX}-${slug}`);

      !!LIVE_STREAM_PUSHER.EVENT &&
        LIVE_STREAM_PUSHER.EVENT.map((event) =>
          channel.bind(event, function (data) {
            const payload = 'object' === typeof data ? data : JSON.parse(data);
            updateDataFromSocketAction({ type: event, data: payload });
          })
        );
    } catch (e) {}
  }

  componentWillUnmount() {
    const { match } = this.props;
    const slug = !!match && !!match.params ? match.params.id : '';
    !!this.pusher && this.pusher.unsubscribe(`${LIVE_STREAM_PUSHER.PREFIX}-${slug}`);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !!this.props.isAddCartLoadingStore &&
      !nextProps.isAddCartLoadingStore &&
      !this.props.isAddCartSuccessStore &&
      !!nextProps.isAddCartSuccessStore
    ) {
      this.setState({ isShowAddToCartSuccessModal: true });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isCompareObject(this.props.liveDetailStore, nextProps.liveDetailStore)) return true;
    if (!isCompareObject(this.props.liveRepliesCommentListStore, nextProps.liveRepliesCommentListStore)) return true;
    if (!isCompareObject(this.props.authStore.signInStatus, nextProps.authStore.signInStatus)) return true;
    if (this.props.isCreatingLiveCommentStore !== nextProps.isCreatingLiveCommentStore) return true;
    if (this.props.liveCommentListStore.length !== nextProps.liveCommentListStore.length) return true;
    if (this.props.receiveNewCommentStore !== nextProps.receiveNewCommentStore) return true;
    if (this.props.receiveNewRelyCommentStore !== nextProps.receiveNewRelyCommentStore) return true;
    if (this.props.isFetchLiveCommentListStore !== nextProps.isFetchLiveCommentListStore) return true;
    if (this.props.isFetchLiveCommentListStore !== nextProps.isFetchLiveCommentListStore) return true;
    if (!!this.props.isAddCartLoadingStore && !nextProps.isAddCartLoadingStore) return true;
    if (!this.props.isAddCartSuccessStore && !!nextProps.isAddCartSuccessStore) return true;

    if (!isCompareObject(this.state.isShowMobileTabModal, nextState.isShowMobileTabModal)) return true;
    if (this.state.isShowAddToCartSuccessModal !== nextState.isShowAddToCartSuccessModal) return true;

    return false;
  }

  handleOpenThread({ id }) {
    const { match, fetchLiveRepliesCommentListAction } = this.props;

    const slug = !!match && !!match.params ? match.params.id : '';
    fetchLiveRepliesCommentListAction({ slug, commentId: id });
  }

  handleOpenTopicModal(state) {}

  handleRequestLogin() {
    if (!isMobileVersion()) {
      this.props.openModalAction(MODAL_SIGN_IN());
    } else {
      setReferrer();
      this.props.history.push(ROUTING_AUTH_SIGN_IN);
    }
  }

  handleOnSelectHighLightInfo(index) {
    this.setState({ isShowMobileTabModal: index * 1 });
  }

  handleCreateNewComment({ content, threadId }) {
    if (!!this.props.isCreatingLiveCommentStore) return;

    const { match } = this.props;
    const slug = !!match && !!match.params ? match.params.id : '';
    if (!slug || !slug.length) return;

    this.props.createLiveCommentAction({ slug, content, commentId: threadId });
  }

  handleAddDiscountCode(discountCode) {
    this.props.addDiscountCodeAction({ discountCode });
  }

  handleAddToCart(product) {
    if (!product) return;

    this.props.addItemToCartAction({ box: product, boxId: product.id });
    this.setState({ selectedProduct: product });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ShopIndexContainer));
