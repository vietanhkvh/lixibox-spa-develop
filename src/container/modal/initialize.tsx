import { IModalProps, IModalState } from './model';

export const DEFAULT_PROPS = {
  isShow: false,
  data: [
    {
      title: '',
      isShowDesktopTitle: false,
      canShowHeaderMobile: true,
      childComponent: '',
      childProps: {},
      modalStyle: {
        container: {},
        ovelay: {},
        content: {}
      }
    }
  ],
  closeModal: () => {}
} as IModalProps;

export const INITIAL_STATE = {
  isMobileAlertGoingOut: false
} as IModalState;

export const IGNORE_LIST = ['SignIn'];
