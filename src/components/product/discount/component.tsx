import { Component } from 'react';

import { IProductDiscountProps, IProductDiscountState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductDiscount extends Component<IProductDiscountProps, IProductDiscountState> {
  static defaultProps: IProductDiscountProps = DEFAULT_PROPS;

  constructor(props: IProductDiscountProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleShowDiscountCode() {
    this.setState({ showDiscountCode: !this.state.showDiscountCode });
  }

  handleAddDiscountCode(code) {
    code &&
      this.props.handleOnClick({
        discountCode: code,
        isOpenCartSummary: false
      });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleShowDiscountCode: this.handleShowDiscountCode.bind(this),
      handleAddDiscountCode: this.handleAddDiscountCode.bind(this)
    };

    return renderComponent(args);
  }
}

export default ProductDiscount;
