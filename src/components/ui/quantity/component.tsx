import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IQuantityProps, IQuantityState } from './model';
import { renderComponent } from './view';

class Quantity extends Component<IQuantityProps, IQuantityState> {
  static defaultProps: IQuantityProps = DEFAULT_PROPS;
  private timeoutUpdate: any;

  constructor(props: IQuantityProps) {
    super(props);
    this.state = INITIAL_STATE(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      valueDisplay: nextProps.value
    } as IQuantityState);
  }

  handleIncreaseValue() {
    this.changeValue(1);
  }

  handleDecreaseValue() {
    if (1 === this.state.valueDisplay) {
      return;
    }

    this.changeValue(-1);
  }

  resetAnimating() {
    this.setState(
      {
        resetAnimating: true,
        valueAnimating: false
      } as IQuantityState,
      () => {
        setTimeout(() => {
          this.setState({
            resetAnimating: false
          } as IQuantityState);
        }, 20);
      }
    );
  }

  changeValue(offset = 1) {
    clearTimeout(this.timeoutUpdate);

    this.setState(
      (prevState) => {
        return {
          valueAnimating: true,
          valueDisplay: prevState.valueDisplay + offset
        } as IQuantityState;
      },
      () => {
        setTimeout(() => {
          this.resetAnimating();
        }, 200);
      }
    );

    this.timeoutUpdate = setTimeout(() => {
      this.updateValue();
    }, 500);
  }

  updateValue() {
    const { action, value } = this.props as IQuantityProps;
    const { valueDisplay } = this.state as IQuantityState;

    value !== valueDisplay && action({ oldValue: value, newValue: valueDisplay });
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default Quantity;
