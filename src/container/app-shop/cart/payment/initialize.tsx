import { IState } from './model';

export const INITIAL_STATE = {
  isAuthModalOpen: false,
  deliveryMethodInfo: {},
  wasPaymentPhaseTracked: false,
  hasInit: false
} as IState;
