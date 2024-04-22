import { generatePath, matchPath } from 'react-router-dom';
import { safeEncodeURIComponent } from 'utils/encode';
import {
  ROUTING_BRAND_DETAIL,
  ROUTING_MAGAZINE,
  ROUTING_PRODUCT_CATEGORY,
  ROUTING_SEARCH_DETAIL,
  ROUTING_SEARCH_MAGAZINE
} from 'routings/path';
import { SearchSuggestionResponse } from 'flows/search/reducer.type';

export const getSearchLink = ({
  keyword,
  isMagazineSearch = false
}: {
  keyword: string;
  isMagazineSearch?: boolean;
}) => {
  const encodedKeyword = safeEncodeURIComponent(keyword);

  if (!encodedKeyword) return '';

  return isMagazineSearch
    ? generatePath(ROUTING_SEARCH_MAGAZINE, { keyword: encodedKeyword })
    : generatePath(ROUTING_SEARCH_DETAIL, { keyWordSearch: encodedKeyword });
};

export const getIsOnProductSearchRoute = (pathname: string): boolean => {
  const matchProductSearch = matchPath<{ keyWordSearch: string }>(pathname, {
    path: ROUTING_SEARCH_DETAIL,
    exact: false
  });

  return !!matchProductSearch;
};

export const getIsOnMagazineOrMagazineSearchRoute = (pathname: string): boolean => {
  const matchMagazineSearch = matchPath<{ keyword: string }>(pathname, {
    path: ROUTING_SEARCH_MAGAZINE,
    exact: false
  });
  const matchMagazine = matchPath<{ keyword: string }>(pathname, {
    path: ROUTING_MAGAZINE,
    exact: false
  });

  return !!matchMagazineSearch || !!matchMagazine;
};

export const getKeywordFromUrl = (pathname): string => {
  const matchProductSearch = matchPath<{ keyWordSearch: string }>(pathname, {
    path: ROUTING_SEARCH_DETAIL,
    exact: true
  });
  const matchMagazineSearch = matchPath<{ keyword: string }>(pathname, {
    path: ROUTING_SEARCH_MAGAZINE,
    exact: true
  });

  return matchProductSearch?.params?.keyWordSearch || matchMagazineSearch?.params?.keyword || '';
};

interface GetSuggestionLinkParams {
  suggestion: SearchSuggestionResponse;
  pathname: string;
}
export const getSuggestionLink = ({ suggestion, pathname }: GetSuggestionLinkParams): string => {
  if (!suggestion || !suggestion.type) return '';

  if (suggestion.type === 'mixed' && suggestion.keyword) {
    return getSearchLink({
      keyword: suggestion.keyword,
      isMagazineSearch: getIsOnMagazineOrMagazineSearchRoute(pathname)
    });
  }

  switch (suggestion.type) {
    case 'mixed':
      if (!suggestion.keyword) return '';
      return getSearchLink({
        keyword: suggestion.keyword,
        isMagazineSearch: getIsOnMagazineOrMagazineSearchRoute(pathname)
      });
    case 'brand':
      if (!suggestion.slug) return '';
      return generatePath(ROUTING_BRAND_DETAIL, { idBrand: suggestion.slug });
    case 'category':
      if (!suggestion.slug) return '';
      return generatePath(ROUTING_PRODUCT_CATEGORY, { categoryFilter: suggestion.slug });
    default:
      return '';
  }
};
