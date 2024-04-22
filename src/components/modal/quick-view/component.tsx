import { Component } from 'react';
import { connect } from 'react-redux';

import { stringToHash } from '../../../utils/encode';
import { isUndefined } from '../../../utils/validate';
import { getUrlParameter, getUrl } from '../../../utils/format';
import { KEY_WORD } from '../../../constants/application/key-word';

import { mapStateToProps, mapDispatchToProps } from './store';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IQuickViewProps, IQuickViewState } from './model';
import { renderComponent } from './view';

class QuickView extends Component<IQuickViewProps, IQuickViewState> {
  static defaultProps: IQuickViewProps = DEFAULT_PROPS;

  constructor(props: IQuickViewProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const {
      data,
      shopStore: { productDetail },
      fetchBoxesCategoriesAction,
      getProductDetailAction
    } = this.props;

    const trackingCode = getUrlParameter(this.props.data.slug, KEY_WORD.TRACKING_CODE) || '';

    /** Product detail */
    true === isUndefined(productDetail[stringToHash(data.slug)]) && getProductDetailAction({ productId: data.slug });

    // Fetch boxes categories
    fetchBoxesCategoriesAction({ productId: data && data.slug });

    trackingCode && 0 < trackingCode.length && this.trackingProduct(this.props.data, trackingCode);
  }

  trackingProduct(product, trackingCode) {
    const { saveProductTracking } = this.props;

    false === isUndefined(product) &&
      0 < trackingCode.length &&
      saveProductTracking({
        boxId: product.id,
        slug: getUrl(product.slug),
        trackingCode: trackingCode
      });
  }

  UNSAFE_componentWillReceiveProps(nextProps: IQuickViewProps) {
    const {
      closeModal,
      shopStore: {
        addToWaitList: { isSuccess }
      },
      cartStore: { isCartSummaryVisible }
    } = this.props;

    if (isCartSummaryVisible) {
      this.setState({ isLoadingAddToCard: false });
      closeModal();
    }

    const nextListLikedIdLen = (nextProps.listLikedId && nextProps.listLikedId.length) || 0;
    const listLikedIdLen = (this.props.listLikedId && this.props.listLikedId.length) || 0;
    if (nextListLikedIdLen !== listLikedIdLen) {
      this.setState({
        isLoadingLove: false
      } as IQuickViewState);
    }

    !isSuccess && nextProps.shopStore.addToWaitList.isSuccess && this.setState({ isAddToWaitListSuccess: true });
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(QuickView);
