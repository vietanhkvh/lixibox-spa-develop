import { Magazine } from 'types/api/magazine';

export interface IProps {
  type?: any;
  list?: any;
  title?: any;
  url?: any;
  titleStyle?: any;
  onItemClick?: (magazine: Magazine, index: number) => void;
}
export interface IState {}
