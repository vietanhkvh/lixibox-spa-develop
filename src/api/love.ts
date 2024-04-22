import { getCsrfToken } from '../utils/auth';
import { get, post } from '../config/restful-method';

export interface ILoveListParam {
  sort: 'asc' | 'desc';
  page: number;
  perPage: number;
}

export const fetchLoveList = ({ sort = 'desc', page = 1, perPage = 5 }: ILoveListParam) => {
  const query = `?sort[created_at]=${sort}&page=${page}&per_page=${perPage}`;

  return get({
    path: `/loves${query}`,
    description: '[Love] Get love list /love',
    errorMesssage: `Can't get love list. Please try again`
  });
};

export interface ILoveDetailParam {
  id: number;
}

export const getLoveDetail = ({ id }: ILoveDetailParam) =>
  get({
    path: `/loves/${id}`,
    description: '[Love] Get love detail /love/:id',
    errorMesssage: `Can't get love detail. Please try again`
  });

// TODO: move to unboxing context
export const addLove = ({ sharedUrl }) => {
  return post({
    path: `/unboxing`,
    data: {
      csrf_token: getCsrfToken(),
      shared_url: sharedUrl
    },
    description: '[Love] User add love /unboxing',
    errorMesssage: `Can't add love. Please try again`
  });
};

export const getLoveBoxById = ({ id }) =>
  get({
    path: `/loves/box/${id}`,
    description: '[Love] Get love box by id /love/box/:id',
    errorMesssage: `Can't get love box by id. Please try again`
  });
