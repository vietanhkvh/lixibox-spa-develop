import { get } from '../config/restful-method';

export const fetchBrandList = () =>
  get({
    path: `/brands`,
    description: 'Get Brand list',
    errorMesssage: `Can't get list brands. Please try again`
  });

export const fetchProductByBrandId = ({
  id,
  pl = '',
  ph = '',
  sort = 'newest',
  stockStatus = '',
  page = 1,
  perPage = 12
}) => {
  const stockStatuses = stockStatus.split(',');
  const query =
    `?page=${page}` +
    `&per_page=${perPage}` +
    `&pl=${pl}` +
    `&ph=${ph}` +
    `&sort=${sort}` +
    `&stock_status=${stockStatuses.length === 1 ? stockStatuses[0] : ''}`;

  return get({
    path: `/brands/${id}${query}`,
    description: '[Brands] Fetch product list by brand id /brands/',
    errorMesssage: `Can't fetch product by brand id. Please try again`
  });
};
