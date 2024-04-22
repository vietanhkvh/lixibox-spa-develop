import { getCsrfToken } from '../utils/auth';
import { get, post, del } from '../config/restful-method';

export const likeProduct = (productId: string) => {
  const csrf_token = getCsrfToken();

  return post({
    path: `/boxes/${productId}/like`,
    data: { csrf_token },
    description: '[Like] Love product /boxes/:id/like',
    errorMesssage: `Can't like this product. Please try again`
  });
};

export const unLikeProduct = (productId: string) => {
  const csrf_token = getCsrfToken();

  return del({
    path: `/boxes/${productId}/unlike?csrf_token=${csrf_token}`,
    description: '[Like] Un love productt /boxes/:id/unlike',
    errorMesssage: `Can't unlike this product. Please try again`
  });
};

/** Get list all liked box id (minimal list, only include box id) */
export const fetchListLikedBoxId = () =>
  get({
    path: `/user/liked_box_ids`,
    description: '[Like] Get list all liked box id /user/liked_box_ids',
    errorMesssage: `Can't get list all liked box id. Please try again`
  });

export interface IFetchLikedBoxesListParam {
  page?: number;
  perPage?: number;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'all';
}

/** Fetch user wish list (liked boxes) */
export const fetchListLikedBoxes = ({ page = 1, perPage = 50, stockStatus = 'all' }: IFetchLikedBoxesListParam) => {
  const query = `?page=${page}&per_page=${perPage}&stock_status=${stockStatus}`;

  return get({
    path: `/user/liked_boxes${query}`,
    description: '[Like] Get list all liked boxed /user/liked_boxes',
    errorMesssage: `Can't get list all liked boxed. Please try again`
  });
};
