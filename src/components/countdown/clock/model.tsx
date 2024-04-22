export interface IProps {
  day: number;
  hour: number;
  minute: number;
  second: number;
  size?: string;
  classes?: {
    container?: string;
    icon?: string;
    divide?: string;
    segment?: string;
    segmentValue?: string;
    segmentName?: string;
  };
  icon?: {
    position?: 'left' | 'right' | '';
    name: {
      main?: string;
      divide?: string;
    };
  };
  enable?: {
    day: IEnableBlock;
    hour: IEnableBlock;
    minute: IEnableBlock;
    second: IEnableBlock;
  };
  onClick?: () => void;
}
export interface IEnableBlock {
  block?: boolean;
  text?: boolean;
}
export interface IState {
  isValidateTime: boolean;
  time: any;
}
