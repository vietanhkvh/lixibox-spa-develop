import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  limit: 10
} as IProps;

export const INITIAL_STATE = {
  showInfoQuestion: false,
  showFocus: false
} as IState;

export const categoryList = [
  {
    id: 1,
    title: 'Skin care',
    selected: false
  },
  {
    id: 2,
    title: 'Beauty Box',
    selected: false
  },
  {
    id: 3,
    title: 'Makeup',
    selected: false
  },
  {
    id: 4,
    title: 'Hair',
    selected: false
  }
];
