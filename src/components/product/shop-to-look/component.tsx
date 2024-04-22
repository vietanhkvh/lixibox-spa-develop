import { Component } from 'react';

import { IProps, IState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductShopToLook extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent({ props: this.props });
  }
}

export default ProductShopToLook;
