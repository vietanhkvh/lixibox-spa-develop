export interface IProps {
  data?: Array<any>;
  column?: number;
  openModal?: any;
}

export interface IState {
  imageList: Array<any>;
  imageSlide: Array<any>;
  imageSlideSelected: any;
  countChangeSlide: number;
  firstInit: boolean;
}
