export interface IProps {
  data?: Array<any>;
  column?: number;
  posImg?: number;
  handleOmitImgHeight?: any;
}

export interface IState {
  imageList: Array<any>;
  imageSlide: Array<any>;
  imageSlideSelected: any;
  countChangeSlide: number;
  firstInit: boolean;
}
