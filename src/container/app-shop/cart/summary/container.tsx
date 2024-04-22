import { Component } from 'react';

import { TYPE_UPDATE } from '../../../../constants/application/cart';
import { PURCHASE_TYPE } from '../../../../constants/application/purchase';
import { ViewedSource } from 'tracking/constants';

import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import View from './view';

class CartSummary extends Component<IProps, IState> {
  private xDown: any = null;
  private yDown: any = null;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * Check data exist or not to fetch
   *
   * Init data from
   * - current props
   * - next props
   */
  initData() {
    const {
      cartStore: { suggestionDiscountCodesLoaded }
    } = this.props;
    this.props.getCartAction();
    suggestionDiscountCodesLoaded || this.props.fetchSuggestionDiscountCodesAction();
  }

  handleUpdateCart({ type, data: { cartItem, box, boxId, quantity, purchaseType } }) {
    const { addItemToCartAction, fetchAddOnListAction, removeItemFromCartAction } = this.props as IProps;

    switch (type) {
      case TYPE_UPDATE.QUANTITY:
        quantity < 0
          ? removeItemFromCartAction({
              cartItem,
              box,
              boxId,
              quantity: Math.abs(quantity),
              purchaseType
            })
          : addItemToCartAction({ box, boxId, quantity, purchaseType, trackingSource: ViewedSource.CART });
        break;

      default:
        break;
    }

    if (purchaseType === PURCHASE_TYPE.ADDON || purchaseType === PURCHASE_TYPE.GIFT) {
      fetchAddOnListAction({ limit: 25 });
    }
  }

  handleTouchStart(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    const { showHideCartSumaryLayoutAction } = this.props;
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0 && showHideCartSumaryLayoutAction?.(false);

    this.xDown = null;
    this.yDown = null;
  }

  handleSliderClick(incremental = false) {
    const {
      cartStore: { suggestionDiscountCodes }
    } = this.props;

    const { position = 0 } = this.state;

    if (incremental) {
      const length = (suggestionDiscountCodes && suggestionDiscountCodes.length) || 0;
      position < length - 1 && this.setState({ position: position + 1 });
    } else {
      position > 0 && this.setState({ position: position - 1 });
    }
  }

  render() {
    return (
      <View
        {...{
          state: this.state,
          props: this.props,
          handleTouchMove: this.handleTouchMove.bind(this),
          handleUpdateCart: this.handleUpdateCart.bind(this),
          handleTouchStart: this.handleTouchStart.bind(this),
          handleSliderClick: this.handleSliderClick.bind(this)
        }}
      />
    );
  }
}

export default CartSummary;
