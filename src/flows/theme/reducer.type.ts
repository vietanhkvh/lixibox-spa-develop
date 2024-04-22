import { PagingResponse } from 'api/types';
import { ProductBox } from 'types/api/shop';

export interface ThemeState {
  gwpSchemeExclusiveBoxes: {
    bySchemeSlug: {
      [schemeSlug: string]: {
        index?: ProductBox[];
        paging?: PagingResponse;
        fetching: boolean;
        loaded: boolean;
        errored: boolean;
      };
    };
  };
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
