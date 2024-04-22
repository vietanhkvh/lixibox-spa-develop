import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  onSelectStore: () => {}
} as IProps;

export const INITIAL_STATE = {
  idSelected: -1
} as IState;
