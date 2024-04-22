import { updateMenuSelectedAction, fetchListMenuAction } from '../../../../flows/menu/action';
import { fetchProductByCategoryAction, clearDataProductByCategoryAction } from '../../../../flows/shop/action';
import { trackingViewGroupAction } from '../../../../flows/tracking/action';
import { updateMetaInfoAction } from '../../../../flows/meta/action';
import { openModalAction } from '../../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction } from '../../../../flows/like/action';
import { selectGiftAction, addItemToCartAction } from '../../../../flows/cart/action';
import { fetchBannerAction } from '../../../../flows/banner/action';

import { IProps } from './model';

export const mapStateToProps = (state) =>
  ({
    menuStore: state.menu,
    trackingStore: state.tracking,
    productByCategory: state.shop.productByCategory,
    availableFilters: state.shop.availableFilters,
    isFetchingAvailableFilters: state.shop.isFetchingAvailableFilters,
    productByCategoryNotFound: state.shop.productByCategoryNotFound,
    likedIdList: state.like.liked.id,
    bannerStore: state.banner
  } as IProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    fetchListMenuAction: () => dispatch(fetchListMenuAction()),
    updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
    fetchProductByCategory: (data) => dispatch(fetchProductByCategoryAction(data)),
    trackingViewGroupAction: (data: any) => dispatch(trackingViewGroupAction(data)),
    updateMenuSelected: (categoryFilter) => dispatch(updateMenuSelectedAction(categoryFilter)),
    clearDataProductByCategoryAction: () => dispatch(clearDataProductByCategoryAction()),
    openModalAction: (data: any) => dispatch(openModalAction(data)),
    selectGiftAction: (data) => dispatch(selectGiftAction(data)),
    likeProductAction: (productId) => dispatch(likeProductAction(productId)),
    unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
    addItemToCartAction: (data) => dispatch(addItemToCartAction(data)),
    fetchBannerAction: (data) => dispatch(fetchBannerAction(data))
  } as IProps);
