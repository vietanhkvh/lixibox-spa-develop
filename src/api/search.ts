import { SEARCH_PARAM_DEFAULT } from '../constants/application/default';
import { get } from '../config/restful-method';

export interface ISearchAllParam {
  keyword: string;
  page?: number;
  perPage?: number;
}

export const searchAll = ({
  keyword,
  searchSource = '',
  brands = '',
  bids = '',
  pl = '',
  ph = '',
  stockStatus = '',
  sort = '',
  page = SEARCH_PARAM_DEFAULT.PAGE,
  perPage = SEARCH_PARAM_DEFAULT.PER_PAGE
}) => {
  const query = new URLSearchParams();
  query.set('keyword', keyword);
  searchSource && query.set('search_source', searchSource);
  query.set('page', String(page));
  query.set('per_page', String(perPage));
  query.set('brands', brands);
  query.set('bids', bids);
  query.set('pl', pl);
  query.set('ph', ph);
  query.set('sort', sort);
  const stockStatuses = stockStatus.split(',');
  query.set('stock_status', stockStatuses.length === 1 ? stockStatuses[0] : '');

  return get({
    path: `/search/optimizations/?${query.toString()}`,
    description: '[Search] Search all product /search',
    errorMesssage: `Can't search product. Please try again`
  });
};

export const searchSuggestion = (keyword: string, limit) => {
  const query = `?keyword=${keyword}&limit=${limit}`;
  return get({
    path: `/search/optimizations/suggestions/${query}`,
    description: '[Search] Search  suggestion product /search/suggestion',
    errorMesssage: `Can't search product. Please try again`
  });
};

export interface MagazineSearchSuggestionApiParams {
  keyword: string;
  page?: number;
  perPage?: number;
}
/**
 * Fetch search suggestion magazine by keyword
 */
export const magazineSearchSuggestionApi = ({ keyword, page = 1, perPage = 5 }: MagazineSearchSuggestionApiParams) => {
  const query = `?keyword=${keyword}&page=${page}&per_page=${perPage}`;
  return get({
    path: `/magazines/search_suggestion${query}`,
    description: '[Search] Search magazine suggestion /magazines/search_suggestion',
    errorMesssage: `Can't search magazine. Please try again`
  });
};

export interface GetPopularSearchApiParams {
  limit?: number;
}
/** Search popular */
export const getPopularSearch = ({ limit = 5 }: GetPopularSearchApiParams) =>
  get({
    path: `/search/top_keywords?limit=${limit}`,
    description: '[Search] Get popular search keyword',
    errorMesssage: `Can't get data. Please try again`
  });

export interface GetHistorySearchApiParams {
  limit?: number;
}
/** Search history */
export const getHistorySearch = ({ limit = 5 }: GetHistorySearchApiParams) =>
  get({
    path: `/user/keywords?limit=${limit}`,
    description: '[Search] get history search',
    errorMesssage: `Can't get data. Please try again`
  });

/** Get search bar sections */
export const getSearchBarSectionsApi = () =>
  get({
    path: `/search_bar_sections`,
    description: '[Search] Get search bar sections',
    errorMesssage: `Can't get data. Please try again`
  });
