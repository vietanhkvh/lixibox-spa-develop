import SummaryWishList from '../../../../components/wish-list';
import { isEmptyKeyObject } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';

import { IState, IProps } from './model';

const renderView = ({ props, state }) => {
  const {
    perPage,
    openAlertAction,
    likeStore: { liked, isFetchLikedListSuccess },
    cartStore: { isAddCartSuccess, isAddCartFail, isCartSummaryVisible }
  } = props as IProps;
  const { urlList, page } = state as IState;

  const params = { page, perPage };
  const keyHash = objectToHash(params);

  const wishListInfo = (!isEmptyKeyObject(liked, 'box') && liked.box[keyHash]) || {};

  const wishList = (!isEmptyKeyObject(wishListInfo, 'boxes') && wishListInfo.boxes) || [];

  const { current_page, per_page, total_pages } = (!isEmptyKeyObject(wishListInfo, 'paging') &&
    wishListInfo.paging) || { current_page: 0, per_page: 0, total_pages: 0 };
  const _urlList = wishList.length > 0 ? urlList : [];

  const summaryWishListProps = {
    showHeader: false,
    list: wishList,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    isAddCartFail,
    isAddCartSuccess,
    openAlertAction,
    isFetchLikedListSuccess,
    isCartSummaryVisible
  };

  return (
    <div className={'user-wish-container'}>
      <SummaryWishList {...summaryWishListProps} />
    </div>
  );
};

export default renderView;
