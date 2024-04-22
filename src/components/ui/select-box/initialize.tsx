import { ISelectBoxProps, ISelectBoxState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  onChange: () => {},
  title: 'Chọn giá trị...',
  search: 'Tìm kiếm...',
  style: {},
  disable: false
} as ISelectBoxProps;

export const INITIAL_STATE = (_list) => {
  /** Assign from: props -> state and init set hover is false */
  const list = Array.isArray(_list)
    ? _list.map((item) => {
        return item;
      })
    : [];

  return {
    open: false,
    list,
    filteredList: list
  } as ISelectBoxState;
};
