export interface IProps {
  name?: string;
  style?: any;
  innerStyle?: any;
  onClick?: any;
  onEnter?: any;
  onLeave?: any;
  className?: string;
  testId?: { name: string; id?: string };
  innerClassName?: string;
}

export interface IState {
  defaultIcon: string;
  listIcon: Array<string>;
  hovering: boolean;
}
