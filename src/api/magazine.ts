import { get } from '../config/restful-method';

export interface IFetchMagazineListParam {
  page?: number;
  perPage?: number;
  type: 'default' | 'video-post' | 'quote-post';
}

export const fetchMagazineList = ({ page = 1, perPage = 10, type = 'default' }: IFetchMagazineListParam) => {
  const query = `?page=${page}&per_page=${perPage}&filter[post_type]=${type}`;

  return get({
    path: `/magazines${query}`,
    description: '[Magazine] Get magazine list /magazines',
    errorMesssage: `Can't get magazine list. Please try again`
  });
};

export const fetchMagazineDashboard = () =>
  get({
    path: `/magazines/dashboard`,
    description: '[Magazine] Get magazine dashboard list /magazines/dashboard',
    errorMesssage: `Can't get magazine dashboard list. Please try again`
  });

/**
 * Fetch magazine category by slug (id)
 */
export const fetchMagazineCategory = ({ slug, page, perPage }) => {
  const query = `?page=${page}&per_page=${perPage}`;
  return get({
    path: `/magazines/category/${slug}${query}`,
    description: '[Magazine] Get magazine category by slug /magazines/category/:id',
    errorMesssage: `Can't get magazine category by slug (id). Please try again`
  });
};

/**
 * Fetch magazine by slug (id)
 */
export const fetchMagazineBySlug = ({ slug }) =>
  get({
    path: `/magazines/${slug}`,
    description: '[Magazine] Get magazine by slug /magazines/',
    errorMesssage: `Can't get magazine by slug (id). Please try again`
  });

/**
 * Fetch magazine related blogs by slug (id)
 */
export const fetchMagazineRelatedBlog = ({ slug }) =>
  get({
    path: `/magazines/${slug}/related_blogs`,
    description: '[Magazine] Get magazine related blogs by slug /magazines/:id/related_blogs',
    errorMesssage: `Can't get magazine related blogs by slug (id). Please try again`
  });

/**
 * Fetch magazine related boxes by slug (id)
 */
export const fetchMagazineRelatedBox = ({ slug, limit }) =>
  get({
    path: `/magazines/${slug}/related_boxes?limit=${limit}`,
    description: '[Magazine] Get magazine related boxes by slug /magazines/:id/related_boxes',
    errorMesssage: `Can't get magazine related boxes by slug (id). Please try again`
  });

/**
 * Fetch magazine by tag name
 */
export const fetchMagazineByTagName = ({ slug, page, perPage }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/magazines/tag/${slug}${query}`,
    description: '[Magazine] Get magazine by tag name /magazines/tag/:id',
    errorMesssage: `Can't get magazine by tag name. Please try again`
  });
};

/**
 * Fetch search magazine by keyword
 */
export const fetchMagazineByKeyword = ({ keyword, page, perPage, searchSource = '' }) => {
  const query = new URLSearchParams();
  query.set(`keyword`, keyword);
  searchSource && query.set('search_source', searchSource);
  query.set(`page`, page);
  query.set(`per_page`, perPage);

  return get({
    path: `/magazines/search?${query.toString()}`,
    description: '[Magazine] Get search magazine /magazines/search',
    errorMesssage: `Can't get search magazine by keyword. Please try again`
  });
};
