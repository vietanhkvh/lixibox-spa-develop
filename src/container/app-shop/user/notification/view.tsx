import { objectToHash } from '../../../../utils/encode';
import NotificationComponent from '../../../../components/notification';

import { IState, IProps } from './model';

const renderView = ({ props, state }) => {
  const {
    notificationStore: { notificationList, isFetchNotificationSuccess },
    perPage
  } = props as IProps;

  const { urlList, page } = state as IState;
  const params = { page, perPage };
  const keyHash = objectToHash(params);

  const notificationInfo = notificationList?.[keyHash] || {};

  const notifList = notificationInfo?.notifications || [];

  const { current_page, per_page, total_pages } = notificationInfo?.paging || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const _urlList = notifList.length > 0 ? urlList : [];

  const summaryNotificationListProps = {
    showHeader: false,
    list: notifList,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    isFetchNotificationSuccess
  };

  return (
    <div className={'user-notification-container'}>{<NotificationComponent {...summaryNotificationListProps} />}</div>
  );
};

export default renderView;
