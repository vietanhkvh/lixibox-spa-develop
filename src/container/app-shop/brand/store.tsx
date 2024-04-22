import { updateMetaInfoAction } from '../../../flows/meta/action';
import {
  fetchProductByBrandIdAction,
  clearDataBrandsByIdAction,
  fetchBrandListAction
} from '../../../flows/brand/action';
import { trackingViewGroupAction, saveProductTrackingAction } from '../../../flows/tracking/action';
import { openModalAction } from '../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { selectGiftAction, addItemToCartAction } from '../../../flows/cart/action';

import { IProps } from './model';

export const mapStateToProps = (state) =>
  ({
    brandStore: state.brand,
    trackingStore: state.tracking,
    likedIdList: state.like.liked.id
  } as IProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    fetchProductByBrandIdAction: (data: any) => dispatch(fetchProductByBrandIdAction(data)),
    fetchBrandListAction: () => dispatch(fetchBrandListAction()),
    trackingViewGroupAction: (data: any) => dispatch(trackingViewGroupAction(data)),
    saveProductTrackingAction: (data: any) => dispatch(saveProductTrackingAction(data)),
    updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
    clearDataBrandsByIdAction: () => dispatch(clearDataBrandsByIdAction()),
    openModalAction: (data: any) => dispatch(openModalAction(data)),
    selectGiftAction: (data) => dispatch(selectGiftAction(data)),
    likeProductAction: (productId) => dispatch(likeProductAction(productId)),
    unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
    addItemToCartAction: (data) => dispatch(addItemToCartAction(data))
  } as IProps);
