import { Magazine } from 'types/api/magazine';

export interface IProps {
  list?: any;
  onItemClick?: (magazine: Magazine, index: number) => void;
}

export interface IState {}
