import { IQuickViewProps, IQuickViewState } from './model';

export const DEFAULT_PROPS = {
  data: null,
  listLikedId: [],
  displayCartSumaryOption: true
} as IQuickViewProps;

export const INITIAL_STATE = {
  isLoadingAddToCard: false,
  isLoadingLove: false,
  isAddToWaitListSuccess: false
} as IQuickViewState;
