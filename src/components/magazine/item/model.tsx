import { MouseEvent } from 'react';
import { Magazine } from 'types/api/magazine';

export interface IProps {
  item?: any;
  showViewGroup?: boolean;
  showDescription?: boolean;
  isShowCategory?: boolean;
  style?: any;
  size?: string;
  mobileSize?: string;
  onClick?: (e: MouseEvent<HTMLElement>, magazine: Magazine) => void;
}

export interface IState {}
