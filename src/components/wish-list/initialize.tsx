import { IWishListProps, IWishListState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  title: '',
  showHeader: true,
  listLikedId: [],
  urlList: [],
  isNotShowLoading: false
} as IWishListProps;

export const INITIAL_STATE = {
  isLoadingList: false,
  isLoadingAddToCard: false
} as IWishListState;
