import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  column: 3
} as IProps;

export const INITIAL_STATE = (data: any) =>
  ({
    imageList: data || [],
    imageSlide: [],
    imageSlideSelected: {},
    countChangeSlide: 0,
    firstInit: false
  } as IState);
