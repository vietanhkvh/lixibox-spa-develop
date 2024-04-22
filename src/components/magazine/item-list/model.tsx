import { Magazine } from 'types/api/magazine';

export interface IProps {
  list?: any;
  showViewGroup?: boolean;
  showDescription?: boolean;
  style?: any;
  isSearchList?: boolean;
  size?: any;
  isShowCategory?: boolean;
  onItemClick?: (magazine: Magazine, index: number) => void;
}

export interface IState {}
