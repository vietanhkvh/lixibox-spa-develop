import { SearchSourceType } from 'constants/application/search.type';
import { ProductBox } from 'types/api/shop';

export interface SearchSuggestionResponse {
  keyword?: string;
  slug?: string;
  type?: 'brand' | 'category' | 'mixed';
}
export interface MagazineSearchSuggestionResponse {
  keyword?: string;
}

export interface SearchBarSectionPersonalizedMessageResponse {
  title?: string;
  url?: string;
  style?: string;
}

export interface SearchBarSectionPromotionMessageResponse {
  title?: string;
  url?: string;
  style?: string;
  start_at?: string;
  end_at?: string;
}

export interface SearchBarSectionTopBrandResponse {
  name?: string;
  slug?: string;
  image_url?: string;
  style?: string;
}

export interface SearchBarSectionTopCategoryResponse {
  name?: string;
  slug?: string;
  style?: string;
}

export interface SearchState {
  searchSuggestion: {
    byQuery: {
      [key: string]: {
        suggestions?: SearchSuggestionResponse[];
        boxes?: ProductBox[];
        version?: string;
      };
    };
    lastQuery: string | null;
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  magazineSearchSuggestion: {
    byQuery: {
      [key: string]: {
        success?: boolean;
        suggestions?: MagazineSearchSuggestionResponse[];
        version?: string;
      };
    };
    lastQuery: string | null;
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  trendingSearch: {
    keywords: string[];
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  searchHistory: {
    keywords: string[];
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  searchBarSections: {
    promotionMessages: SearchBarSectionPromotionMessageResponse[];
    personalizedMessages: SearchBarSectionPersonalizedMessageResponse[];
    topBrands: SearchBarSectionTopBrandResponse[];
    topCategories: SearchBarSectionTopCategoryResponse[];
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
  lastSearchSource: SearchSourceType;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
