import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { isCompareObject, isEmptyKeyObject } from '../../../utils/validate';

import { IMobileNavigationProps, IMobileNavigationState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class MobileNavigation extends Component<IMobileNavigationProps, IMobileNavigationState> {
  static defaultProps: IMobileNavigationProps = DEFAULT_PROPS;
  private seachInput: any;

  constructor(props: IMobileNavigationProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { fetchCountdownListAction } = this.props;
    !!fetchCountdownListAction && fetchCountdownListAction();

    this.props.fetchListMenuAction();
  }
  /** Open / Close right menu : SHOPPING CART */
  toggleSearch(_state = true) {
    this.setState({ openSearch: _state }, () => {
      if (true === _state) {
        this.seachInput.focus();
      }
    });
  }

  shouldComponentUpdate(nextProps: IMobileNavigationProps, nextState) {
    const {
      cartStore: { cartDetail, suggestionDiscountCodes },
      location
    } = this.props;
    let prevQuantity = 0,
      nextQuantity = 0;

    if (this.state.isShowDropdown !== nextState.isShowDropdown) return true;
    if (location.pathname !== nextProps.location.pathname) return true;
    if (!isCompareObject(this.props.style, nextProps.style)) return true;

    !isEmptyKeyObject(cartDetail, 'cart_items') &&
      Array.isArray(cartDetail.cart_items) &&
      cartDetail.cart_items.map((item) => (prevQuantity += item.quantity));

    !isEmptyKeyObject(nextProps, 'cartStore') &&
      !isEmptyKeyObject(nextProps.cartStore, 'cartDetail') &&
      !isEmptyKeyObject(nextProps.cartStore.cartDetail, 'cart_items') &&
      Array.isArray(nextProps.cartStore.cartDetail.cart_items) &&
      nextProps.cartStore.cartDetail.cart_items.map((item) => (nextQuantity += item.quantity));

    if (
      !isEmptyKeyObject(nextProps, 'cartStore') &&
      !isEmptyKeyObject(nextProps.cartStore, 'suggestionDiscountCodes') &&
      !isCompareObject(suggestionDiscountCodes, nextProps.cartStore.suggestionDiscountCodes)
    ) {
      return true;
    }
    if (!isEmptyKeyObject(nextProps, 'countdownStore')) {
      return true;
    }
    if (prevQuantity !== nextQuantity) {
      return true;
    }

    return false;
  }

  handleDisplayDropdown(value) {
    this.setState({ isShowDropdown: value });
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileNavigation));
