import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  type: 'full',
  title: '',
  column: 3,
  showViewMore: false,
  showHeader: true,
  isCustomTitle: false,
  style: {},
  titleStyle: {}
} as IProps;

export const INITIAL_STATE = (data: any) =>
  ({
    magazineList: data || [],
    magazineSlide: [],
    magazineSlideSelected: {},
    countChangeSlide: 0,
    firstInit: false
  } as IState);
