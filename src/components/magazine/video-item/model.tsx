import { MouseEvent } from 'react';
import { Magazine } from 'types/api/magazine';

export interface IProps {
  item?: any;
  style?: any;
  column?: any;
  lastChild?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>, magazine: Magazine) => void;
}

export interface IState {}
