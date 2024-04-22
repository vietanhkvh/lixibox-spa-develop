import { get } from '../config/restful-method';

export const fetchSpecialDealList = ({ page = 1, perPage = 10 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/special_deals${query}`,
    description: '[Special Deals] Get special deal list /special_deals',
    errorMesssage: `Can't get special deal list. Please try again`
  });
};

export const fetchSpecialDealBySlug = ({ slug }) =>
  get({
    path: `/special_deals/${slug}`,
    description: '[Special Deals] Get special deal /special_deals/:id',
    errorMesssage: `Can't get special deal by id or slug of special_deal. Please try again`
  });
