import { objectToHash } from '../../../../utils/encode';
import { isEmptyKeyObject } from '../../../../utils/validate';
import WaitList from '../../../../components/wait-list';

import { IState, IProps } from './model';

const renderView = ({ props, state }) => {
  const {
    userStore: { userWaitList, isFetchUserWaitList, isLoadingUserWaitList },
    perPage,
    openModalAction,
    addItemToCartAction
  } = props as IProps;

  const { urlList, page } = state as IState;

  const params = { page, perPage };
  const keyHash = objectToHash(params);

  const waitListInfo = (userWaitList && userWaitList[keyHash]) || {};
  const waitList =
    (!isEmptyKeyObject(waitListInfo, 'boxes') && Array.isArray(waitListInfo.boxes) && waitListInfo.boxes) || [];

  const { current_page, per_page, total_pages } = (!isEmptyKeyObject(waitListInfo, 'paging') &&
    waitListInfo.paging) || { current_page: 0, per_page: 0, total_pages: 0 };
  const _urlList = waitList.length > 0 ? urlList : [];

  const waitListProps = {
    showHeader: false,
    list: waitList,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    openModalAction,
    addItemToCartAction,
    isFetchUserWaitList,
    isLoadingUserWaitList
  };

  return (
    <div className={'user-wait-container'}>
      <WaitList {...waitListProps} />
    </div>
  );
};

export default renderView;
