import { fetchExpertsTrackingGroupAction, clearDataExpertsTrackingGroupAction } from '../../../flows/tracking/action';
import { openModalAction } from '../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { addItemToCartAction } from '../../../flows/cart/action';

import { IProps } from './model';

export const mapStateToProps = (state) =>
  ({
    trackingStore: state.tracking,
    likedIdList: state.like.liked.id
  } as IProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    fetchExpertsTrackingGroup: (code) => dispatch(fetchExpertsTrackingGroupAction(code)),
    clearDataExpertsTrackingGroupAction: () => dispatch(clearDataExpertsTrackingGroupAction()),
    openModalAction: (data: any) => dispatch(openModalAction(data)),
    likeProductAction: (productId) => dispatch(likeProductAction(productId)),
    unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
    addItemToCartAction: (data) => dispatch(addItemToCartAction(data))
  } as IProps);
