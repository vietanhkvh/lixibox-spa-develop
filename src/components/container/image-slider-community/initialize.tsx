import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  column: 1,
  posImg: 0
} as IProps;

export const INITIAL_STATE = (data: any) =>
  ({
    imageList: data || [],
    imageSlide: [],
    imageSlideSelected: {},
    countChangeSlide: 0,
    firstInit: false
  } as IState);
