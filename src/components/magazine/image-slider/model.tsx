import { Magazine } from 'types/api/magazine';

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
  onItemClick?: (magazine: Magazine, index: number) => void;
}

export interface IState {
  magazineList: Array<any>;
  magazineSlide: Array<any>;
  magazineSlideSelected: any;
  countChangeSlide: number;
  firstInit: boolean;
}
