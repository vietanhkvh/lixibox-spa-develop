export interface IRatingStarProps {
  view?: boolean;
  isLargerItem?: boolean;
  value: number;
  style?: any;
  className?: any;
  classes?: { container?: string };
  starStyle?: any;
  starStyleInner?: any;
  onClick?: any;
  onChange?: any;
  dataTestId?: string;
}
export interface IRatingStarState {
  showNaviTop?: boolean;
  disable?: boolean;
  tmpValue?: any;
}
