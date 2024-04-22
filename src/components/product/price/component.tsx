import { Component } from 'react';

import { IProductPriceProps, IProductPriceState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductPrice extends Component<IProductPriceProps, IProductPriceState> {
  static defaultProps: IProductPriceProps = DEFAULT_PROPS;

  constructor(props: IProductPriceProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default ProductPrice;
