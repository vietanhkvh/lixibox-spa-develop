import { IQuantityProps, IQuantityState } from './model';

export const DEFAULT_PROPS = {
  value: 1,
  type: 'normal',
  style: {},
  action: () => {},
  disabled: false,
  color: {}
} as IQuantityProps;

export const INITIAL_STATE = (props) => {
  return {
    valueDisplay: props.value,
    valueAnimating: false,
    resetAnimating: false
  } as IQuantityState;
};
