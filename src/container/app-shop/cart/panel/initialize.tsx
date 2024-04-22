import { IProps, IState } from './model';
export const DEFAULT_PROPS = {} as IProps;

export const INITIAL_STATE = {
  submitLoading: false,
  isBtnPaymentClick: false,
  errorBlockHighlightTimeoutId: null,
  isExitingToPayment: false,
  didViewReferralPrompt: false
} as IState;
