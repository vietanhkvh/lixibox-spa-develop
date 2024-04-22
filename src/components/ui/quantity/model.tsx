export interface IQuantityProps {
  value: number;
  type: 'normal' | 'small';
  style: any;
  action: (data: any) => void;
  color?: any;

  openAlertAction?: any;
  disabled?: boolean;
}

export interface IQuantityState {
  valueDisplay: number;
  valueAnimating: boolean;
  resetAnimating: boolean;
}
