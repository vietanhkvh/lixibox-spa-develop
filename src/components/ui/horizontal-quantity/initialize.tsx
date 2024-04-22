import { INITIAL_STATE_CART } from '../../../flows/cart/reducer';
import { IQuantityProps, IQuantityState } from './model';

export const DEFAULT_PROPS = {
  value: 1,
  type: 'normal',
  style: {},
  action: () => {},
  disabled: false,
  color: {},
  cartStore: INITIAL_STATE_CART,
  onDecreaseBelowMinimum: () => {}
} as IQuantityProps;

export const INITIAL_STATE = (props) => {
  return {
    valueDisplay: props.value,
    valueAnimating: false,
    resetAnimating: false,
    enableQuantityEditMode: false
  } as IQuantityState;
};
