import { openModalAction } from '../../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../../flows/like/action';
import { selectGiftAction, addItemToCartAction } from '../../../../flows/cart/action';
import { getMembershipAction } from '../../../../flows/lixicoin/action';

import { IProps } from './model';

export const mapStateToProps = (state) =>
  ({
    cartStore: state.cart,
    themeStore: state.theme,
    lixicoinStore: state.lixicoin,
    likedIdList: state.like.liked.id
  } as IProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    getMembershipAction: () => dispatch(getMembershipAction()),
    selectGiftAction: (data) => dispatch(selectGiftAction(data)),
    openModalAction: (data: any) => dispatch(openModalAction(data)),
    addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
    likeProductAction: (productId) => dispatch(likeProductAction(productId)),
    unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId))
  } as IProps);
