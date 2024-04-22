import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  title: '',
  placeholder: '',
  type: 'text',
  name: '',
  id: '',
  value: '',
  valueCompare: '',
  errorMessage: '',
  isRoundedStyle: false,
  icon: '',
  minLen: -1,
  maxLen: -1,
  minValue: null,
  maxValue: null,
  validate: [],
  preventTitleOnInput: false,
  roundedStyle: {},
  isUpperCase: false,
  autoFocus: false,
  autoComplete: false,
  isShowError: false,
  textAlign: 'left' as const,
  style: {},
  inputStyle: {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onSubmit: () => {}
} as IProps;

export const INITIAL_STATE = (valueFromProps) => {
  return {
    value: valueFromProps,
    isFocus: false,
    isValid: true,
    isDirty: false,
    errorMessage: ''
  } as IState;
};

export const INPUT_TYPE = {
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEXT: 'text',
  DATE: 'date',
  TIME: 'time',
  TEL: 'tel',
  SEARCH: 'search',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  BUTTON: 'button',
  SUBMIT: 'submit',
  HIDDEN: 'hidden',
  FILE: 'file'
};

export const INPUT_NAME = {
  DISCOUNT_CODE: 'discount-code',
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE: 'phone',
  ADDRESS: 'address',
  COMMENT: 'comment',
  SEARCH: 'search',
  TITLE: 'title',
  CONTENT: 'content',
  URL: 'url',
  PRICE: 'price'
};
