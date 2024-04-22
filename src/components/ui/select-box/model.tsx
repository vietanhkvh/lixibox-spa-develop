export interface ISelectBoxProps {
  list: Array<any>;
  onChange: any;
  title: string;
  search: string;
  style: Object;
  disable?: any;
  testId?: { name: string; id?: string };
}

export interface ISelectBoxState {
  open: boolean;
  list: Array<any>;
  filteredList: Array<any>;
}
