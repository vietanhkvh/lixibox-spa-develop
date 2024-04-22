import { IFeedbackRightPanelProps, IFeedbackRightPanelState } from './model';

export const DEFAULT_PROPS = {
  limit: 10
} as IFeedbackRightPanelProps;

export const INITIAL_STATE = {
  isLoading: false,
  isFeedbackFull: false,
  isPriorityBlock: true,
  isFetchFeedList: false,
  showCommunityHashTag: false
} as IFeedbackRightPanelState;
