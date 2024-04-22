import { updateMetaInfoAction } from '../../../flows/meta/action';
import {
  fetchProductByThemeIdAction,
  clearDataProductByThemeIdAction,
  fetchThemeBoxesAction,
  fetchThemeSectionAction
} from '../../../flows/theme/action';
import { fetchBannerAction, fetchThemeAction } from '../../../flows/banner/action';
import { trackingViewGroupAction, saveProductTrackingAction } from '../../../flows/tracking/action';
import { openModalAction } from '../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../flows/like/action';
import { selectGiftAction, addItemToCartAction } from '../../../flows/cart/action';

import { IProps } from './model';

export const mapStateToProps = (state) =>
  ({
    themeStore: state.theme,
    bannerStore: state.banner,
    trackingStore: state.tracking,
    likedIdList: state.like.liked.id
  } as IProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    fetchProductByThemeIdAction: (data: any) => dispatch(fetchProductByThemeIdAction(data)),
    trackingViewGroupAction: (data: any) => dispatch(trackingViewGroupAction(data)),
    saveProductTrackingAction: (data: any) => dispatch(saveProductTrackingAction(data)),
    fetchMainBanner: (data) => dispatch(fetchBannerAction(data)),
    fetchThemeAction: (): void => dispatch(fetchThemeAction()),
    fetchThemeBoxesAction: (data) => dispatch(fetchThemeBoxesAction(data)),
    fetchThemeSectionAction: (data) => dispatch(fetchThemeSectionAction(data)),
    updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
    clearDataProductByThemeIdAction: () => dispatch(clearDataProductByThemeIdAction()),
    openModalAction: (data: any) => dispatch(openModalAction(data)),
    selectGiftAction: (data) => dispatch(selectGiftAction(data)),
    likeProductAction: (productId) => dispatch(likeProductAction(productId)),
    unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
    addItemToCartAction: (data) => dispatch(addItemToCartAction(data))
  } as IProps);
