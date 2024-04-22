export interface IProductColorProps {
  closeModal?: any;
  history?: any;
  selected?: number;
  list?: Array<any>;
  boxFeedbackPicture?: Array<any>;
  video?: Array<any>;
  version?: string;
  onSelect?: Function;
}

export interface IProductColorState {
  originalStart?: number;
  feedbackStart?: number;
  selectedIndex?: number;
  combinedList?: Array<any>;
  currIndex?: number;
  mobileSelectedIndex?: number;
}
