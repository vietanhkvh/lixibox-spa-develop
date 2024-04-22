import { objectToHash } from '../../../../utils/encode';
import { isEmptyKeyObject } from '../../../../utils/validate';
import SummaryWatchedList from '../../../../components/watched';

import { IState, IProps } from './model';

const renderView = ({ props, state }) => {
  const {
    perPage,
    userStore: { userWatchedList, isFetchUserWatchedList },
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction
  } = props as IProps;

  const { urlList, page } = state as IState;

  const params = { page, perPage };
  const keyHash = objectToHash(params);

  const watchedListInfo = (userWatchedList && userWatchedList[keyHash]) || {};
  const watchedList =
    (!isEmptyKeyObject(watchedListInfo, 'recently_viewed_boxes') &&
      Array.isArray(watchedListInfo.recently_viewed_boxes) &&
      watchedListInfo.recently_viewed_boxes) ||
    [];

  const { current_page, per_page, total_pages } = (!isEmptyKeyObject(watchedListInfo, 'paging') &&
    watchedListInfo.paging) || { current_page: 0, per_page: 0, total_pages: 0 };

  const _urlList = watchedList.length > 0 ? urlList : [];

  const summaryWatchedListProps = {
    showHeader: false,
    list: watchedList,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    isFetchUserWatchedList
  };

  return (
    <div className={'user-watched-container'}>
      <SummaryWatchedList {...summaryWatchedListProps} />
    </div>
  );
};

export default renderView;
