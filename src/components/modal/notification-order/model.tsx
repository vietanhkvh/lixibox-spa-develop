export interface IProps {
  history?: any;
  subcribeStore?: any;
  closeModal?: any;
  sendSubcribeInfoAction?: any;
  data?: any;
}

export interface IState {
  isMinimal: boolean;
  inputValue?: {
    value?: string;
    valid?: boolean;
  };
}
