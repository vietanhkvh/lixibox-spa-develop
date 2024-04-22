import { get, post } from '../config/restful-method';
import { getCsrfToken } from '../utils/auth';

export const addDiscussion = ({ productId, content }) => {
  const data = {
    csrf_token: getCsrfToken(),
    box_id: productId,
    content: content
  };

  return post({
    path: `/discussions`,
    data,
    description: '[Discussion] Add discussion /discussions',
    errorMesssage: `Can't add discussion. Please try again`
  });
};

export const addDiscussionComment = ({ id, content }) => {
  const data = {
    csrf_token: getCsrfToken(),
    id: id,
    content: content
  };

  return post({
    path: `/discussions/${id}/comments`,
    data,
    description: '[Discussion] Add discussion comment /discussions/:id/comments',
    errorMesssage: `Can't add discussion comment. Please try again`
  });
};

export const fetchDiscussionsBoxes = ({ productId, page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/boxes/${productId}/discussions${query}`,
    description: '[Discussion] Fetch list discussions boxes /boxes/:id/discussions',
    errorMesssage: `Can't fetch data. Please try again`
  });
};
