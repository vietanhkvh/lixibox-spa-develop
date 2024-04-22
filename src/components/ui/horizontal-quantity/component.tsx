import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IQuantityProps, IQuantityState } from './model';
import { renderComponent } from './view';

export const MIN_CART_ITEM_QUANTITY = 1;
export const MAX_CART_ITEM_QUANTITY_FALLBACK = 100;

class HorizontalQuantity extends Component<IQuantityProps, IQuantityState> {
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
      this.props.onDecreaseBelowMinimum(this.state.valueDisplay - 1);
      return;
    }

    this.changeValue(-1);
  }

  handleValueChange(value: number) {
    const { valueDisplay: prevValue } = this.state;
    const valueDelta = value - prevValue;

    this.setState({ enableQuantityEditMode: false });
    !!valueDelta && this.changeValue(valueDelta);
  }

  getQuantityLimits() {
    const {
      cartStore: {
        constants: { max_cart_item_quantity }
      }
    } = this.props;
    const maxCartItemQuantity = max_cart_item_quantity || MAX_CART_ITEM_QUANTITY_FALLBACK;

    return { minQuantity: MIN_CART_ITEM_QUANTITY, maxQuantity: maxCartItemQuantity };
  }

  handleInlineEditorValueChange(value: number) {
    const { valueDisplay: prevValue } = this.state;
    const valueDelta = value - prevValue;
    !!valueDelta && this.changeValue(valueDelta, false, 0);
  }

  onQuantityEditRequest() {
    this.setState({ enableQuantityEditMode: true });
  }

  onQuantityEditModalClose() {
    this.setState({ enableQuantityEditMode: false });
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

  changeValue(offset = 1, animate = true, timeout = 500) {
    clearTimeout(this.timeoutUpdate);

    this.setState(
      (prevState) => {
        return {
          valueAnimating: animate,
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
    }, timeout);
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

export default HorizontalQuantity;
