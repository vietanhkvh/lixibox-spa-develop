import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;
export const INITIAL_STATE = {
  submitLoading: false,
  inputPassword: {
    value: '',
    valid: false
  }
} as IState;
