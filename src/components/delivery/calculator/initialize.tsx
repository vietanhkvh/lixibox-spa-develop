import { IDeliverCalculatorProps, IDeliverCalculatorState } from './model';

export const DEFAULT_PROPS = {} as IDeliverCalculatorProps;

export const INITIAL_STATE = {
  valueCalculated: {
    price: 0,
    time: ''
  },
  isFetchTimeFeeShippingFinished: false
} as IDeliverCalculatorState;
