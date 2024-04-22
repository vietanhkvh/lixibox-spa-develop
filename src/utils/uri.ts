/* istanbul ignore next TODO: Refactor associated code and remove */
import { isEmptyObject, isExternalLink, isSameOriginLink } from './validate';
/* istanbul ignore next TODO: Refactor associated code and remove */
import { CATEGORY_FILTER } from '../constants/application/category.config';

/* istanbul ignore next TODO: Refactor associated code and remove */
/**
 * Parse url to category filter
 *
 * @sample: /makeup_chanel_lv_luis-vuition_200k-300k_newest_page-3
 *
 * 1. Split by _
 * 2. First item -> id category
 * 3. Check item splitted by regex
 *
 * @param categoryFilterUrl : uri parse from browser's url
 *
 * @return {Object} categoryFilter
 *  categoryFilter = {
 *    idCategory: string
 *    params: Array<key: string, value: string>
 *  }
 *
 */
export const categoryFilterUrlParser = (categoryFilterUrl: string): any => {
  const parserCategoryFilter = categoryFilterUrl.split('_');

  /**
   * categoryFilter : value after parsed
   * - idCategory : Category id. Ex: makeup
   * - list params : for filter. Ex: 200k-900k_newest_page-1
   */
  interface IParams {
    key: string;
    value: string | number;
  }
  interface ICategoryFilter {
    idCategory: string;
    params: Array<IParams>;
  }

  const categoryFilter: ICategoryFilter = {
    idCategory: '',
    params: []
  };

  /** Foreach list parse category */
  Array.isArray(parserCategoryFilter) &&
    parserCategoryFilter.forEach((item, $index) => {
      if (0 === $index) {
        /** Assign first item -> id category */
        categoryFilter.idCategory = parserCategoryFilter[0];
      } else if (CATEGORY_FILTER.price.pattern.test(item)) {
        /** Pattern min-max price */
        let price = item.split('-');

        /** Min price */
        categoryFilter.params.push({
          key: CATEGORY_FILTER.price.minPrice.key,
          value: price[0]
        });

        /** Max price */
        categoryFilter.params.push({
          key: CATEGORY_FILTER.price.maxPrice.key,
          value: price[1]
        });
      } else if (CATEGORY_FILTER.sort.value.filter((sortItem) => item === sortItem.key).length > 0) {
        /**
         * Sort:
         * - newest
         * - price-desc
         * - price-export
         */
        categoryFilter.params.push({
          key: CATEGORY_FILTER.sort.key,
          value: item
        });
      } else if (CATEGORY_FILTER.page.pattern.test(item)) {
        /** Pagination */
        categoryFilter.params.push({
          key: CATEGORY_FILTER.page.key,
          value: item.replace(CATEGORY_FILTER.page.textReplace, '')
        });
      } else {
        /** Brand */
        categoryFilter.params.push({
          key: CATEGORY_FILTER.brand.key,
          value: item
        });
      }
    });

  /** Default value for page: 1 */
  if (categoryFilter.params.filter((param) => param.key === CATEGORY_FILTER.page.key).length === 0) {
    categoryFilter.params.push({
      key: CATEGORY_FILTER.page.key,
      value: 1
    });
  }

  /** Default value for sort: newest */
  if (categoryFilter.params.filter((param) => param.key === CATEGORY_FILTER.sort.key).length === 0) {
    categoryFilter.params.push({
      key: CATEGORY_FILTER.sort.key,
      value: 'newest'
    });
  }
  return categoryFilter;
};

/* istanbul ignore next TODO: Refactor associated code and remove */
/**
 * Format category filter for api
 *
 * @param categoryFilter object: [return by func categoryFilterUrlParser()]

 * @return ...[categoryFilter.idCategory.value, paramsQueryString]
 */
export const categoryFilterApiFormat = (categoryFilter: any): Array<any> => {
  if (true === isEmptyObject(categoryFilter)) {
    return [0, ''];
  }

  let paramsQuery: Array<any> = [],
    paramsQueryString: string = '',
    listBrand: Array<any> = [];

  /** Parse data from category filter (get from params url )*/
  categoryFilter &&
    Array.isArray(categoryFilter.params) &&
    categoryFilter.params.forEach((params) => {
      switch (params.key) {
        case CATEGORY_FILTER.price.minPrice.key:
          paramsQuery.push(`pl=${params.value}`);
          break;

        case CATEGORY_FILTER.price.maxPrice.key:
          paramsQuery.push(`ph=${params.value}`);
          break;

        case CATEGORY_FILTER.sort.key:
          paramsQuery.push(`sort=${params.value}`);
          break;

        case CATEGORY_FILTER.page.key:
          paramsQuery.push(`page=${params.value}`);
          paramsQuery.push(`per_page=24`);
          break;

        case CATEGORY_FILTER.brand.key:
          listBrand.push(params.value);
          break;

        default:
          break;
      }
    });

  /** Sort list of brand by aphabet */
  listBrand = listBrand.sort();

  /** Push list brand into query string */
  if (listBrand.length > 0) {
    paramsQuery.unshift(`bids=${listBrand.join(',')}`);
  }

  /** Build query string */
  if (paramsQuery.length > 0) {
    paramsQueryString = `?${paramsQuery.join('&')}`;
  }
  return [categoryFilter.idCategory, paramsQueryString];
};

/** CDN End points */
export const CDN_ASSETS = (url: string) => `https://js.lixibox.com${url}`;

/** CDN s3 End point */
export const CDN_S3_ASSETS = (url: string) =>
  `https://lixibox-production-uploads.s3.ap-southeast-1.amazonaws.com/frontend${url}`;
/**
 * Add prefix domain for image url (image store in cloud)
 *
 * @param url image url
 */
export const CDN_ASSETS_PREFIX = (url: string) => CDN_ASSETS(`/image-assets${url}`);
export const CDN_JSON_ASSETS_PREFIX = (url: string) => CDN_ASSETS(`/json-assets${url}`);
export const CDN_JSON_S3_ASSETS_PREFIX = (url: string) => CDN_S3_ASSETS(`/json-assets${url}`);
export const generateFacebookShareUrl = ({ shareUrl, redirectUrl }: { shareUrl: string; redirectUrl: string }) => {
  try {
    const encodedShareUrl = encodeURIComponent(shareUrl);
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    return `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FB_APP_ID}&display=popup&href=${encodedShareUrl}&redirect_uri=${encodedRedirectUrl}`;
  } catch (e) {
    return null;
  }
};

export const fileAsDataURL = (file, callBack) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    callBack(reader.result);
  };

  reader.readAsDataURL(file);
};

export const fileAsDataURLAsync = (file): Promise<string | ArrayBuffer> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    try {
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
};

export const getLinkPath = (link: string) => {
  try {
    return new URL(link).pathname;
  } catch (e) {
    return link;
  }
};

// Example: removeQueryParamFromCurrentPath({ param: 'data', history })
export const removeQueryParamFromCurrentPath = ({
  history,
  param,
  mode
}: {
  history: any;
  param: string;
  mode: 'push' | 'replace';
}) => {
  try {
    const query = new URLSearchParams(history.location.search);
    query.delete(param);
    history[mode]({ search: query.toString() });
  } catch (e) {}
};

export const updateCurrentPathWithQueryParams = ({
  history,
  path,
  params,
  mode
}: {
  history: any;
  path: string;
  params: { [key: string]: string };
  mode: 'push' | 'replace';
}) => {
  try {
    if (!(path || params)) return;

    const query = new URLSearchParams(history.location.search);
    params && Object.keys(params).forEach((key) => query.set(key, params[key]));
    history[mode](Object.assign({}, query && { search: query.toString() }, path && { pathname: path }));
  } catch (e) {}
};

export const getPathFromUrl = (url: string) => {
  try {
    return new URL(url).pathname;
  } catch (e) {
    return '';
  }
};

export const pushUrlOrPath = (urlOrPath: string, history: any) => {
  if (!urlOrPath) return;

  // Is path
  if (urlOrPath.startsWith('/')) {
    history?.push(urlOrPath);
    return;
  }

  // Is same origin link
  if (isSameOriginLink(urlOrPath)) {
    const path = getPathFromUrl(urlOrPath);
    path && history?.push(path);
    return;
  }

  // Is different origin link
  window.open?.(urlOrPath, isExternalLink(urlOrPath) ? '_blank' : '_self');
};
