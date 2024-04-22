export interface IProps {
  list?: any;
  onItemClick?: (item: string, index: number) => void;
}

export interface IState {
  panelWidth: 0;
}
