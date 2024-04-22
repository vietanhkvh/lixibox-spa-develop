import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: []
} as IProps;

export const INITIAL_STATE = {
  rate: 0,
  errorMessage: '',
  submitLoading: false,
  textareaValue: ''
} as IState;
