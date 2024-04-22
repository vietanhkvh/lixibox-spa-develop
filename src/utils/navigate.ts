import { storageKey } from 'constants/application/client-storage';
import { AUTHENTICATOR_ROUTES } from 'constants/application/path';
import { getUrlParameter, getUrlQuery } from './format';

/** Navigate to free link */
export const navigateFreeLink = (url: string) => (window.location.href = url);

/** Navigate to new tab link */
export const navigateNewTab = (url: string) => window.open(url);

/** Navigate to Magazine Page */
export const navigateMagazine = () => (window.location.href = '/magazine');

/** Navigate to Lixicoint Convert */
export const navigateLixicointConvert = () => (window.location.href = '/lixicoin');

/** Navigate to Expert Page */
export const navigateExpert = () => (window.location.href = process.env.REACT_APP_EXPERT_FQDN);

/** Navigate to Admin Page */
export const navigateAdmin = () => (window.location.href = process.env.REACT_APP_ADMIN_FQDN);

/* navigate with params filter */
export const navigateWithParams = (history, paramsObj, overideParams: Array<string> = []) => {
  const { pathname } = window.location;
  /** Get object of url query from location seach */

  const urlQueryObj = getUrlQuery(window.location.search);

  /**  Remove orveride params */
  overideParams.map((param) => delete urlQueryObj[param]);

  /** combine current params with new params */
  const combinedUrlQueryObj = Object.assign({}, urlQueryObj, paramsObj);

  /** Build new string of params url */
  const urlQueryKeys = Object.keys(combinedUrlQueryObj);
  const combinedUrlQurey = !!urlQueryKeys.length
    ? urlQueryKeys
        .map((key) => {
          if (0 === combinedUrlQueryObj[key] || !combinedUrlQueryObj[key].length) return null;
          return `${key}=${combinedUrlQueryObj[key]}`;
        })
        .filter((item) => !!item)
        .join('&')
    : '';

  // if (!combinedUrlQurey) return;

  /** Redirect to current link new new url */
  !!history && history.push && history.push(`${pathname}?${combinedUrlQurey}`);
};

export const setReferrer = (key: string = storageKey.REFERRAL_REDIRECT) => {
  const referrerPathname = window.location.pathname.toLowerCase();
  if (!AUTHENTICATOR_ROUTES.includes(referrerPathname)) {
    localStorage.setItem(key, window.location.pathname + window.location.search);
  }
};

interface SetCustomReferrer {
  key?: string;
  value?: string;
}
export const setCustomReferrer = ({ key, value }: SetCustomReferrer) => {
  const _storageKey = key || storageKey.REFERRAL_REDIRECT;
  localStorage.setItem(_storageKey, value);
};

export const createParamsSearch = (perPage = 24, location = window.location, paramsChange?: any) => {
  const { pageNew = 1, brandsNew = '', sortNew = '', plNew = '', phNew = '', stockStsNew = '' } = paramsChange;
  const page = pageNew || getUrlParameter(location.search, 'page');
  const brands = brandsNew || getUrlParameter(location.search, 'brands');
  const sort = sortNew || getUrlParameter(location.search, 'sort');
  // Min Price
  const pl = plNew || getUrlParameter(location.search, 'pl');
  // Max Price
  const ph = phNew || getUrlParameter(location.search, 'ph');
  const stockStatus = stockStsNew || getUrlParameter(location.search, 'stock_status');

  let searchQuery = '?';
  searchQuery = !!brands ? `${searchQuery}brands=${brands}` : searchQuery;
  searchQuery = !!sort ? `${searchQuery}&sort=${sort}` : searchQuery;
  // searchQuery = !!pl && !!ph ? `${searchQuery}&pl=${pl}&ph=${ph}` : searchQuery;
  searchQuery = !!page ? `${searchQuery}&page=${page}` : searchQuery;
  searchQuery = !!perPage ? `${searchQuery}&per_page=${perPage}` : searchQuery;
  searchQuery = !!pl && !!ph ? `${searchQuery}&pl=${pl}&ph=${ph}` : searchQuery;
  searchQuery = stockStatus ? `${searchQuery}&stock_status=${stockStatus}` : searchQuery;

  return searchQuery;
};
