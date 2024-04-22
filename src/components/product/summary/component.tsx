import { Component } from 'react';

import { IProductSummaryProps, IProductSummaryState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class ProductSummary extends Component<IProductSummaryProps, IProductSummaryState> {
  static defaultProps: IProductSummaryProps = DEFAULT_PROPS;

  constructor(props: IProductSummaryProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default ProductSummary;
