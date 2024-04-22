import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  isSticky: false,
  perPage: 10,
  scrollId: '',
  scrollToElementNum: 0,
  isOnModal: false
} as IProps;

export const INITIAL_STATE = {
  txtComment: '',
  submitLoading: false,
  page: 1,
  urlList: [],
  isFetchApi: false,
  isLoading: true,
  isFirstLoading: true,
  replyComment: null
} as IState;
