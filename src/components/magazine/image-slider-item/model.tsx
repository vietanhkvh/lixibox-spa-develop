import { MouseEvent } from 'react';
import { Magazine } from 'types/api/magazine';

/** Library */
export interface IProps {
  item: any;
  type: string;
  column: number;
  onClick?: (e: MouseEvent<HTMLElement>, magazine: Magazine) => void;
}

export interface IState {
  isLoadedImage?: boolean;
}
