import { Component } from 'react';

import { IProductNameProps, IProductNameState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductName extends Component<IProductNameProps, IProductNameState> {
  static defaultProps: IProductNameProps = DEFAULT_PROPS;

  constructor(props: IProductNameProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent(this.props);
  }
}

export default ProductName;
