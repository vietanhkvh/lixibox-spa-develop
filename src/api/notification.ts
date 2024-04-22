import { get } from '../config/restful-method';

/** Fetch user notification */
export interface IFetchNotificationListParam {
  page?: number;
  perPage?: number;
}

export const fetchNotificationList = ({ page = 1, perPage = 50 }: IFetchNotificationListParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/notifications${query}`,
    description: '[Notifications] Fetch user notification list /notifications',
    errorMesssage: `Can't fetch user notification list. Please try again`
  });
};
