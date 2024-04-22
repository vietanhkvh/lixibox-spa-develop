import { ProductBox } from 'types/api/shop';

export interface IProps {
  data?: Array<any>;
  type?: string;
  title?: any;
  column?: number;
  showViewMore?: boolean;
  showHeader?: boolean;
  style?: any;
  isCustomTitle?: any;
  titleStyle?: any;
  openModal?: any;
  onItemClick?: (box: ProductBox, index: number) => void;
}

export interface IState {
  testimonialList: Array<any>;
  testimonialSlide: Array<any>;
  testimonialSlideSelected: any;
  countChangeSlide: number;
  firstInit: boolean;
}
