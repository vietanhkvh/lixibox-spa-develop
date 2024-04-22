import { PureComponent } from 'react';
import { ViewedSource } from 'tracking/constants';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps } from './model';
import { renderComponent } from './view';

class FeedbackItem extends PureComponent<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleAddToCart() {
    const { item, addItemToCartAction, displayCartSumary } = this.props;

    this.setState({ isLoadingAddToCard: true });
    addItemToCartAction({
      box: item,
      boxId: item.box_id,
      quantity: 1,
      displayCartSumary,
      trackingSource: ViewedSource.BOX_FEEDBACKS
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (!this.props.isAddCartSuccess && nextProps.isAddCartSuccess) ||
      (!this.props.isAddCartFail && nextProps.isAddCartFail)
    ) {
      this.setState({ isLoadingAddToCard: false });
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleAddToCart: this.handleAddToCart.bind(this)
    };
    return renderComponent(args);
  }
}

export default FeedbackItem;
