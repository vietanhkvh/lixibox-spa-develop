import { Component } from 'react';

import { ROUTING_CHECK_OUT } from '../../../routings/path';

import { renderComponent } from './view';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';

class CheckoutModalMobile extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  private xDown: any = null;
  private yDown: any = null;

  constructor(props: IProps) {
    super(props);

    this.state = INITIAL_STATE;
  }

  handleCloseModal() {
    this.setState({ isCloseCheckoutModal: true });
  }

  handleShowRemoveConfirm() {
    this.setState({ isRemoveConfirmation: !this.state.isRemoveConfirmation });
  }

  handleTouchStart(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    Math.abs(xDiff) > Math.abs(yDiff) &&
      xDiff > 0 &&
      this.setState({
        removeConfirmation: true
      } as IState);

    this.xDown = null;
    this.yDown = null;
  }

  handleRemoveCart() {
    this.handleCloseModal();
    this.setState({ isRemoveConfirmation: false });
  }

  handleNavigateToCheckout() {
    'function' === typeof this.handleCloseModal && this.handleCloseModal();
    setTimeout(() => {
      this.props.history && 'function' === typeof this.props.history.push && this.props.history.push(ROUTING_CHECK_OUT);
    }, 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data.product.name !== nextProps.data.product.name) {
      return true;
    }
    if (this.props.data.product.price !== nextProps.data.product.price) {
      return true;
    }
    if (this.props.data.product.image !== nextProps.data.product.image) {
      return true;
    }
    if (this.state.isCloseCheckoutModal !== nextState.isCloseCheckoutModal) {
      return true;
    }
    if (this.state.isRemoveConfirmation !== nextState.isRemoveConfirmation) {
      return true;
    }

    return false;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleCloseModal: this.handleCloseModal.bind(this),
      handleTouchStart: this.handleTouchStart.bind(this),
      handleTouchMove: this.handleTouchMove.bind(this),
      handleShowRemoveConfirm: this.handleShowRemoveConfirm.bind(this),
      handleRemoveCart: this.handleRemoveCart.bind(this)
    };

    return renderComponent(args);
  }
}

export default CheckoutModalMobile;
