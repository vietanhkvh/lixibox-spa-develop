import { Component } from 'react';

import { TYPE_UPDATE } from '../../../constants/application/cart';
import { ROUTING_SHOP_INDEX } from '../../../routings/path';
import { isCompareObject } from '../../../utils/validate';
import { CartItem } from 'types/api/cart';
import { ProductBox } from 'types/api/shop';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import View from './view';

class CartList extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChangeQuantity(
    boxId: number,
    oldValue: number,
    newValue: number,
    purchaseType: number,
    isWishList: boolean,
    box: ProductBox,
    cartItem: CartItem
  ) {
    const { update } = this.props as IProps;

    update({
      type: TYPE_UPDATE.QUANTITY,
      data: {
        cartItem,
        box,
        boxId,
        quantity: newValue - oldValue,
        purchaseType
      },
      isWishList: isWishList || false
    });
  }

  shouldComponentUpdate(nextProps: IProps) {
    const { isCheckedDiscount, list, isShowDiscountCodeMessage, isLoading } = this.props;

    if (!isCompareObject(list, nextProps.list)) return true;
    if (isCheckedDiscount !== nextProps.isCheckedDiscount) return true;
    if (isCheckedDiscount !== nextProps.isCheckedDiscount) return true;
    if (isShowDiscountCodeMessage !== nextProps.isShowDiscountCodeMessage) return true;
    if (isLoading !== nextProps.isLoading) return true;

    return false;
  }

  handleContinueAddCart() {
    const { isPrivateMode, privateModeLink, showHideCartSumaryLayoutAction }: any = this.props;

    showHideCartSumaryLayoutAction?.(false);
    this.props.history.push(isPrivateMode ? privateModeLink : ROUTING_SHOP_INDEX);
  }

  render() {
    return (
      <View
        {...{
          userInfo: this.props.userInfo,
          isReceivedBirthdayGift: this.props.isReceivedBirthdayGift,
          isReadOnly: this.props.isReadOnly,
          list: this.props.list,
          style: this.props.style,
          isLoading: this.props.isLoading,
          isPrivateMode: this.props.isPrivateMode,
          isCheckedDiscount: this.props.isCheckedDiscount,
          cartItemStyle: this.props.cartItemStyle,
          isShowDiscountCodeMessage: this.props.isShowDiscountCodeMessage,
          isForceHideBuyLater: this.props.isForceHideBuyLater,
          handleChangeQuantity: this.handleChangeQuantity.bind(this),
          handleContinueAddCart: this.handleContinueAddCart.bind(this),
          className: this.props.className,
          compactView: this.props.compactView,
          confirmationType: this.props.confirmationType,
          onItemClick: this.props.onItemClick,
          withHeader: this.props.withHeader,
          withExpander: this.props.withExpander,
          openLinkInNewTab: this.props.openLinkInNewTab
        }}
      />
    );
  }
}

export default CartList;
