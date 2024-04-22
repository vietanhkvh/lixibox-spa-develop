import { IRatingStarState, IRatingStarProps } from './model';
export const DEFAULT_PROPS = {
  view: true,
  value: 0,
  style: {},
  starStyle: {},
  starStyleInner: {},
  onClick: () => {},
  isLargerItem: false
} as IRatingStarProps;

export const INITIAL_STATE = {
  tmpValue: 1,
  disable: false
} as IRatingStarState;
