import { PureComponent } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { ICartInfoProps, ICartInfoState } from './model';
import { renderComponent } from './view';

class CartInfo extends PureComponent<ICartInfoProps, ICartInfoState> {
  static defaultProps: ICartInfoProps = DEFAULT_PROPS;

  constructor(props: ICartInfoProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  toggleCollapse() {
    this.setState(
      (prevState, props) =>
        ({
          collapse: !prevState.collapse
        } as ICartInfoState)
    );
  }

  componentDidMount() {
    false === this.props.isAllowCollapse &&
      this.setState(
        (prevState, props) =>
          ({
            collapse: false
          } as ICartInfoState)
      );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    false === nextProps.isAllowCollapse &&
      this.setState(
        (prevState, props) =>
          ({
            collapse: false
          } as ICartInfoState)
      );
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default CartInfo;
