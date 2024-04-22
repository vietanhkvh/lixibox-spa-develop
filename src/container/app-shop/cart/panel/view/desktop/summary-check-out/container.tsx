import { Component } from 'react';

import { DEFAULT_PROPS } from './initialize';
import { IProps } from './model';
import renderView from './view';

class CartSummaryCheckOut extends Component<IProps> {
  static defaultProps: IProps = DEFAULT_PROPS;

  componentDidMount() {
    this.initData();
  }

  initData() {
    const {
      fetchSuggestionDiscountCodesAction,
      cartStore: { suggestionDiscountCodes },
      getCartAction
    } = this.props as IProps;

    setTimeout(() => {
      suggestionDiscountCodes && suggestionDiscountCodes.length === 0 && fetchSuggestionDiscountCodesAction();
    }, 2000);

    getCartAction();
  }

  render() {
    const renderViewProps = {
      props: this.props
    };

    return renderView(renderViewProps);
  }
}

export default CartSummaryCheckOut;
