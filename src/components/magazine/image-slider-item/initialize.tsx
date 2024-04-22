/** Model */
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  item: [],
  type: '',
  column: 4
} as IProps;

export const INITIAL_STATE = {
  isLoadedImage: false
} as IState;
