import { ICartInfoProps, ICartInfoState } from './model';

export const DEFAULT_PROPS = {
  data: {},
  isAllowCollapse: true,
  isShowActionButton: true
} as ICartInfoProps;

export const INITIAL_STATE = {
  collapse: true
} as ICartInfoState;
