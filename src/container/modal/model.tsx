export interface IModalProps {
  history?: any;
  isShow: boolean;
  data: [
    {
      type?: string;
      title?: string;
      isShowDesktopTitle?: boolean;
      canShowHeaderMobile?: boolean;
      childComponent: string;
      childProps?: any;
      modalStyle: {
        container?: any;
        ovelay?: any;
        content?: any;
        contentOuter?: any;
      };
    }
  ];
  closeModal: any;
  openMobileSigninAlert?: any;
  pushStateWhenOpeningModalAction?: any;
  backStateWhenClosingModalAction?: any;
}
export interface IModalState {
  isMobileAlertGoingOut?: Boolean;
}
