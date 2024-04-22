import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  children: any;
  routes: any;
  history?: any;
  location?: any;
}

export interface IState {
  isOpenChangeEmailModal?: boolean;
  isOpenChangePhoneModal?: boolean;
  isOpenOtpModal?: boolean;
  isOpenPhoneOtpModal: boolean;
  emailInput: any;
  phoneInput: any;
  otpInput: any;
}
