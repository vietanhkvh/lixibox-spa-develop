export interface IWishListProps {
  title?: string;
  list: Array<any>;
  style?: any;
  showHeader?: boolean;
  current?: any;
  per?: any;
  total?: any;
  urlList?: any;

  isAddCartFail?: boolean;
  isAddCartSuccess?: boolean;
  openAlertAction?: any;
  isFetchLikedListSuccess?: boolean;
  isNotShowLoading?: boolean;
  isCartSummaryVisible?: boolean;
}

export interface IWishListState {
  isLoadingList?: boolean;
  isLoadingAddToCard: boolean;
}
