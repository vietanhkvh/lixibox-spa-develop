import { get } from '../config/restful-method';

export const fetchCartRecommendationList = ({ page = 1, perPage = 12 }) =>
  get({
    path: `/cart/recommendation/items?page=${page}&per_page=${perPage}`,
    description: '[Recommendations] Fetch Cart Recommendation List /recommendations',
    errorMesssage: `Can't get data. Please try again`
  });
