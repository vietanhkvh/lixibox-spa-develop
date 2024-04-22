export interface IProps {
  title?: string;
  placeholder?: string;
  readonly?: boolean;
  type?: string;
  name?: string;
  id?: string;
  value?: any;
  valueCompare?: any;
  errorMessage?: any;
  icon?: string;
  minLen?: number;
  maxLen?: number;
  minValue?: number | null;
  maxValue?: number | null;
  validate?: Array<string>;
  testId?: { name: string; id?: string };
  isRoundedStyle?: boolean;
  isBigRoundedStyle?: boolean;
  roundedStyle?: any;
  style?: any;
  className?: string;
  inputStyle?: any;
  preventTitleOnInput?: boolean;

  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  onSubmit?: any;
  isUpperCase?: boolean;
  textAlign?: string;
  autoFocus?: boolean;
  autoComplete: boolean | string;
  handleRef?: any;
  isShowError?: boolean;
  validationValue?: boolean;
  validationErrorMessage?: string;
}

export interface IState {
  value: any;
  isFocus: boolean;
  isValid: boolean;
  isDirty: boolean;
  errorMessage: string;
}
