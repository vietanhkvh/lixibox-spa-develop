export interface IMobileAutoDisplayHeaderProps {
  children: any;
  isDisableScroll?: boolean;
  row?: number;
  fixHeight?: number;
  onSetDisplay?: (params: boolean) => void;
  id?: string;
  isRemoveTop?: false;
  appStore?: any;
}
