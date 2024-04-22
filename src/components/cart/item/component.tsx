import { PureComponent } from 'react';

import { isEmptyKeyObject } from '../../../utils/validate';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { ICartItemProps, ICartItemState } from './model';
import renderComponent from './view';
import { isMobileDevice } from 'utils/responsive';

class CartItem extends PureComponent<ICartItemProps, ICartItemState> {
  static defaultProps: ICartItemProps = DEFAULT_PROPS;
  private xDown: any = null;
  private yDown: any = null;
  private highlightScheduler: NodeJS.Timeout | null = null;
  private PREFIX_ID = 'cart-item';

  constructor(props: ICartItemProps) {
    super(props);
    this.state = INITIAL_STATE;
    this.highlight = this.highlight.bind(this);
  }

  componentDidUpdate(prevProps) {
    prevProps.data.box.slug !== this.props.data.box.slug && this.highlight();
  }

  componentWillUnmount() {
    this.highlightScheduler && clearTimeout(this.highlightScheduler);
  }

  componentDidMount() {
    this.highlight();
  }

  highlight() {
    const { clearNewItemAction, data } = this.props;
    const HIGHLIGHT_TIMEOUT_MS = 5000;
    const highlightable = [
      PURCHASE_TYPE.REDEEM,
      PURCHASE_TYPE.GIFT,
      PURCHASE_TYPE.ADDON,
      PURCHASE_TYPE.SAMPLE,
      PURCHASE_TYPE.NORMAL
    ].includes(data.purchase_type);

    if (highlightable && data?.isNewItem) {
      this.setState({ highlight: true });

      if (!isMobileDevice()) {
        const element = document.getElementById(`${this.PREFIX_ID}-${data?.id}`);
        element && element.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }

      this.highlightScheduler = setTimeout(() => {
        clearNewItemAction && clearNewItemAction(data?.id);
        this.setState({ highlight: false });
      }, HIGHLIGHT_TIMEOUT_MS);
    }
  }

  handleTouchStart(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    const { data } = this.props;
    if (isEmptyKeyObject(data, 'removable') || !data.removable || !this.xDown || !this.yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    Math.abs(xDiff) > Math.abs(yDiff) &&
      xDiff > 0 &&
      this.setState({
        removeConfirmation: true
      } as ICartItemState);

    this.xDown = null;
    this.yDown = null;
  }

  render() {
    return renderComponent.bind(this)(this.props);
  }
}

export default CartItem;
