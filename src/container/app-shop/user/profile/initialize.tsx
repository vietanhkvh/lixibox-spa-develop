import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;

export const INITIAL_STATE = {
  isOpenChangeEmailModal: false,
  isOpenChangePhoneModal: false,
  isOpenOtpModal: false,
  isOpenPhoneOtpModal: false,
  emailInput: {
    value: '',
    valid: false
  },
  phoneInput: {
    value: '',
    valid: false
  },
  otpInput: {
    value: '',
    valid: false
  }
} as IState;
