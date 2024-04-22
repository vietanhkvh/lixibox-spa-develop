import React, { useState, useEffect } from 'react';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import { isMobileVersion } from 'utils';
import { auth } from 'utils/auth';
import { safeDecodeURIComponent, decodeRouteParam } from 'utils/encode';
import { debounceEvent } from 'utils/rate-limiter';
import { objectToHash } from 'utils/encode';
import { useKeyListener, usePrevious } from 'utils/hook';
import { pushUrlOrPath } from 'utils/uri';
import { SearchSource } from 'constants/application/search';
import { storageKey } from 'constants/application/client-storage';
import { gatewayTrackSearch, gatewayTrackSearchAutoComplete, gatewayTrackViewedSearchPanel } from 'tracking/gateway';
import { SearchSourceType } from 'constants/application/search.type';
import { ROUTING_BRAND_DETAIL } from 'routings/path';
import {
  SearchBarSectionPersonalizedMessageResponse,
  SearchBarSectionPromotionMessageResponse,
  SearchBarSectionTopBrandResponse,
  SearchBarSectionTopCategoryResponse,
  SearchSuggestionResponse
} from 'flows/search/reducer.type';
import { ProductBox } from 'types/api/shop';
import tracking from './tracking';
import {
  getIsOnMagazineOrMagazineSearchRoute,
  getIsOnProductSearchRoute,
  getKeywordFromUrl,
  getSearchLink
} from './utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

const getSearchSuggestionQuery = (keyword: string) => ({ keyword, limit: 5 });
const getMagazineSearchSuggestionQuery = (keyword: string) => ({ keyword, page: 1, perPage: 5 });

interface ViewProps {
  keyword: string;

  // Sections
  personalizedMessages: SearchBarSectionPersonalizedMessageResponse[];
  promotionMessages: SearchBarSectionPromotionMessageResponse[];
  topBrands: SearchBarSectionTopBrandResponse[];
  topCategories: SearchBarSectionTopCategoryResponse[];
  searchedKeywords: string[];
  trendingKeywords: string[];
  categorizedSuggestions: SearchSuggestionResponse[];
  suggestedProducts: ProductBox[];
  searchSuggestionKeywords: string[];
  magazineSearchSuggestionKeywords: string[];

  onAutoCompleteClick: (keyword: string, originId?: string) => void;
  onKeywordClick: (params: {
    id?: string;
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    [key: string]: any;
  }) => void;
  isPanelVisible: boolean;
  isOnMagazineRoute: boolean;

  placeholder: string;
  onClick: (keyword: string) => void;
  onChange: (keyword: string) => void;
  onSubmit: (source: SearchSourceType) => void;
  onReset: () => void;
  onRequestClose: () => void;
  onPromotionMessageClick?: (params: {
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    message: string;
    id: SearchSourceType;
    link?: string;
  }) => void;
}

interface SearchSuggestionProps extends PropsFromRedux {
  isPanelVisible: boolean;
  setIsPanelVisible: (isPanelVisible: boolean) => void;
}
const SearchSuggestion: React.FC<SearchSuggestionProps> = ({
  isPanelVisible,
  setIsPanelVisible,
  cartStore: { constants },
  searchStore: { searchSuggestion, magazineSearchSuggestion, searchHistory, trendingSearch, searchBarSections },
  getTrendingKeywordsAction,
  getSearchHistoryAction,
  searchSuggestionAction,
  magazineSearchSuggestionAction,
  getSearchBarSectionsAction,
  setLastSearchSourceAction,
  toggleSubmitSearchAction
}) => {
  const history = useHistory();
  const location = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const wasPanelVisible = usePrevious(isPanelVisible);

  const onRequestClose = () => {
    tracking.closeModal();
    setIsPanelVisible(false);
  };

  // Register Escape key to close the suggestion modal
  useKeyListener('Escape', onRequestClose);

  // Set searchKeyword from URL, if the session is on a search page
  useEffect(() => {
    const keywordFromUrl = getKeywordFromUrl(location.pathname);
    if (!searchKeyWord && keywordFromUrl) setSearchKeyWord(safeDecodeURIComponent(keywordFromUrl));
  }, [location.pathname]);

  // Set a listener to update searchKeyword from URL
  useEffect(() => {
    const unlisten = history.listen(() => {
      !getIsOnProductSearchRoute(history.location.pathname) && setSearchKeyWord('');
      const keywordFromUrl = getKeywordFromUrl(history.location.pathname);
      keywordFromUrl && setSearchKeyWord(decodeRouteParam(keywordFromUrl));
    });
    return () => {
      unlisten();
    };
  }, []);

  // Fetch trending keywords and search history when the panel opens
  useEffect(() => {
    if (!wasPanelVisible && isPanelVisible) {
      getTrendingKeywordsAction({ limit: 5 });
      getSearchBarSectionsAction();
      !!auth.loggedIn() && getSearchHistoryAction({ limit: 5 });
      !!searchKeyWord?.trim() && fetchSearchSuggestions(searchKeyWord);
      gatewayTrackViewedSearchPanel({ keyword: searchKeyWord });
    }
  }, [isPanelVisible, wasPanelVisible, searchKeyWord]);

  // Define search suggestion fetcher
  const fetchSearchSuggestions = debounceEvent(300)((keyword) => {
    if (keyword.trim()) {
      getIsOnMagazineOrMagazineSearchRoute(location.pathname) &&
        magazineSearchSuggestionAction(getMagazineSearchSuggestionQuery(keyword));
      searchSuggestionAction(getSearchSuggestionQuery(keyword));
    }
  });

  // TODO: Add tracking info
  // Define search suggestion autocomplete handler
  const onAutoCompleteClick = (keyword: any, origin?: SearchSourceType) => {
    switch (origin) {
      case SearchSource.SUGGESTED_KEYWORDS:
        setSearchKeyWord(keyword?.keyword);
        fetchSearchSuggestions(keyword?.keyword);
        gatewayTrackSearchAutoComplete({
          keyword: keyword?.keyword || '',
          source: origin,
          sourceId: searchKeyWord,
          suggestedKeywordType: keyword?.type || undefined
        });
        break;
      case SearchSource.TRENDING_KEYWORDS:
      default:
        if (typeof keyword === 'string') {
          setSearchKeyWord(keyword);
          fetchSearchSuggestions(keyword);
          origin && gatewayTrackSearchAutoComplete({ keyword, source: origin });
        }
    }
    setLastSearchSourceAction({ source: SearchSource.AUTOCOMPLETE });
  };

  const onKeywordClick = ({ id: originId, e, ...otherParams }: { id: SearchSourceType; [key: string]: any }) => {
    e?.preventDefault();

    switch (originId) {
      case SearchSource.HISTORY: {
        const { keyword, link } = otherParams;

        tracking.clickHistoryKeyword();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, 'history');
        setLastSearchSourceAction({ source: SearchSource.HISTORY });
        gatewayTrackSearch({ keyword: searchKeyWord, source: SearchSource.HISTORY, sourceId: keyword });

        link && pushUrlOrPath(link, history);
        break;
      }
      case SearchSource.TRENDING_KEYWORDS: {
        const { keyword, link } = otherParams;

        tracking.clickPopularKeyword();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, 'trending');
        setLastSearchSourceAction({ source: SearchSource.TRENDING_KEYWORDS });
        gatewayTrackSearch({ keyword: searchKeyWord, source: SearchSource.TRENDING_KEYWORDS, sourceId: keyword });

        link && pushUrlOrPath(link, history);
        break;
      }
      case SearchSource.SUGGESTED_KEYWORDS: {
        const { keyword, link } = otherParams;

        // tracking.clickSuggestionKeyword();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, 'autocomplete');
        setLastSearchSourceAction({ source: SearchSource.SUGGESTED_KEYWORDS });
        gatewayTrackSearch({
          keyword: searchKeyWord,
          source: SearchSource.SUGGESTED_KEYWORDS,
          sourceId: (keyword?.type === 'mixed' ? keyword?.keyword : keyword?.slug) || undefined,
          suggestedKeywordType: keyword?.type || undefined
        });

        link && pushUrlOrPath(link, history);
        break;
      }
      case SearchSource.SUGGESTED_PRODUCTS: {
        const { product, path } = otherParams;

        // tracking.clickSuggestionProduct();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, 'autocomplete');
        setLastSearchSourceAction({ source: SearchSource.SUGGESTED_PRODUCTS });
        gatewayTrackSearch({
          keyword: searchKeyWord,
          source: SearchSource.SUGGESTED_PRODUCTS,
          sourceId: product?.slug
        });

        path && pushUrlOrPath(path, history);
        break;
      }
      case SearchSource.SUGGESTED_PRODUCTS_VIEW_ALL: {
        const { keyword, link } = otherParams;

        // tracking.clickViewAll();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, 'autocomplete');
        setLastSearchSourceAction({ source: SearchSource.SUGGESTED_PRODUCTS_VIEW_ALL });
        gatewayTrackSearch({ keyword, source: SearchSource.SUGGESTED_PRODUCTS_VIEW_ALL });

        link && pushUrlOrPath(link, history);
        break;
      }
      // NOTE: Obsolete
      case SearchSource.SUGGESTED_MAGAZINE_KEYWORDS: {
        const { keyword, link } = otherParams;

        tracking.clickMagazineSuggestionResult();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, `autocomplete`);
        setLastSearchSourceAction({ source: SearchSource.SUGGESTION });
        gatewayTrackSearch({ keyword, source: SearchSource.SUGGESTED_MAGAZINE_KEYWORDS });

        link && pushUrlOrPath(link, history);
        break;
      }
      // NOTE: Obsolete
      case 'product-results' as any: {
        const { keyword } = otherParams;

        tracking.clickBoxSuggestionResult();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, `autocomplete`);
        setLastSearchSourceAction({ source: SearchSource.SUGGESTION });
        gatewayTrackSearch({ keyword });
        break;
      }
      case SearchSource.TOP_BRANDS: {
        const { brand } = otherParams;

        // tracking.clickTopBrand();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, SearchSource.TOP_BRANDS);
        setLastSearchSourceAction({ source: SearchSource.TOP_BRANDS });
        gatewayTrackSearch({ keyword: searchKeyWord, source: SearchSource.TOP_BRANDS, sourceId: brand?.slug });

        brand?.slug && pushUrlOrPath(generatePath(ROUTING_BRAND_DETAIL, { idBrand: brand?.slug }), history);
        break;
      }
      case SearchSource.TOP_CATEGORIES: {
        const { keyword: category, link } = otherParams;

        // tracking.clickTopCategory();
        setIsPanelVisible(false);
        localStorage.setItem(storageKey.SEARCH_ORIGIN, SearchSource.TOP_CATEGORIES);
        setLastSearchSourceAction({ source: SearchSource.TOP_CATEGORIES });
        gatewayTrackSearch({ keyword: searchKeyWord, source: SearchSource.TOP_CATEGORIES, sourceId: category?.slug });

        link && pushUrlOrPath(link, history);
        break;
      }
      default:
        break;
    }
  };

  // Define search form submit handler
  const onSubmit = (source: SearchSourceType) => {
    const _searchKeyWord = searchKeyWord.trim();

    setIsPanelVisible(false);
    if (!_searchKeyWord.length) return;

    localStorage.setItem(storageKey.SEARCH_ORIGIN, `enter`);
    getIsOnProductSearchRoute(location.pathname) && toggleSubmitSearchAction();
    setLastSearchSourceAction({ source });
    gatewayTrackSearch({ keyword: _searchKeyWord, source });

    const searchUrl = getSearchLink({
      keyword: _searchKeyWord,
      isMagazineSearch: getIsOnMagazineOrMagazineSearchRoute(location.pathname)
    });
    location.pathname !== searchUrl && history.push(searchUrl);
  };

  // Define search form on change handler
  const onChange = (keyword: string) => {
    let _keyword = keyword;
    if (_keyword === ' ') {
      return;
    }
    // FIXME: Enable support for '%' character when react-router resolves the following issue
    // https://github.com/remix-run/history/issues/874
    if (typeof _keyword === 'string') {
      _keyword = _keyword.replace(/%/g, '');
    }

    setIsPanelVisible(true);
    setSearchKeyWord(_keyword);
    fetchSearchSuggestions(_keyword);
  };

  const searchSuggestionQueryHash = objectToHash(getSearchSuggestionQuery(searchKeyWord));
  const magazineSearchSuggestionsQueryHash = objectToHash(getMagazineSearchSuggestionQuery(searchKeyWord));

  const searchedKeywords = searchHistory.keywords.slice(0, 10); // Max 10 items will be displayed
  const trendingKeywords = trendingSearch.keywords.slice(0, 10); // Max 10 items will be displayed
  const searchSuggestionKeywords =
    searchSuggestion.byQuery[searchSuggestionQueryHash]?.suggestions?.map((suggestion) => suggestion.keyword) || [];
  const categorizedSuggestions = searchSuggestion.byQuery[searchSuggestionQueryHash]?.suggestions || [];
  const suggestedProducts = searchSuggestion.byQuery[searchSuggestionQueryHash]?.boxes || [];
  const magazineSearchSuggestionKeywords =
    magazineSearchSuggestion.byQuery[magazineSearchSuggestionsQueryHash]?.suggestions?.map(
      (suggestion) => suggestion.keyword
    ) || [];
  // filter the promotion messages where current time is between (start_at?: time_string) and (end_at?: time_string), if any of them is missing, it will be ignored
  const promotionMessages = (searchBarSections.promotionMessages || []).filter(({ start_at, end_at }) => {
    const now = Date.now();
    return (!start_at || now >= Date.parse(start_at)) && (!end_at || now <= Date.parse(end_at));
  });

  const placeholder = getIsOnMagazineOrMagazineSearchRoute(location.pathname)
    ? 'Tìm kiếm magazine...'
    : constants.search_input_placeholder || 'Tìm kiếm...';

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        keyword: searchKeyWord,

        // Sections
        personalizedMessages: searchBarSections.personalizedMessages || [],
        promotionMessages,
        topBrands: searchBarSections.topBrands || [],
        topCategories: searchBarSections.topCategories || [],

        categorizedSuggestions,
        suggestedProducts,
        searchedKeywords,
        trendingKeywords,
        searchSuggestionKeywords,
        magazineSearchSuggestionKeywords,

        onAutoCompleteClick,
        onKeywordClick,
        isPanelVisible,
        isOnMagazineRoute: getIsOnMagazineOrMagazineSearchRoute(location.pathname),

        placeholder,
        onClick: (keyword) => {
          setIsPanelVisible(true);
          fetchSearchSuggestions(keyword);
        },
        onChange,
        onSubmit,
        onReset: () => setSearchKeyWord(''),
        onRequestClose,
        onPromotionMessageClick: ({ e, message, id, link }) => {
          e.preventDefault();
          gatewayTrackSearch({ keyword: searchKeyWord, source: id, sourceId: message });
          onRequestClose();
          link && pushUrlOrPath(link, history);
        }
      }}
    />
  );
};

export type { ViewProps };
export default SearchSuggestion;
