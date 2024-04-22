import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class SummaryNotificationList extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);

    this.state = INITIAL_STATE;
  }

  handleSelectProductId(productId) {
    this.setState({ productIdSelected: productId });
  }

  render() {
    return renderView(this.props, this.state.productIdSelected, this.handleSelectProductId.bind(this));
  }
}

export default SummaryNotificationList;
