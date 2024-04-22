import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  isOpenCheckoutModal: false
} as IProps;

export const INITIAL_STATE = {
  isCloseCheckoutModal: false,
  isRemoveConfirmation: false
} as IState;
