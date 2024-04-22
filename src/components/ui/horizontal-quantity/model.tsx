export interface IQuantityProps {
  value: number;
  type: 'normal' | 'small';
  style: any;
  action: (data: any) => void;
  color?: any;
  onDecreaseBelowMinimum: (param?: any) => any;
  disabled?: boolean;
  cartStore: any;
  updateVariantQuantityAction?: any;
}

export interface IQuantityState {
  valueDisplay: number;
  valueAnimating: boolean;
  resetAnimating: boolean;
  enableQuantityEditMode: boolean;
}
