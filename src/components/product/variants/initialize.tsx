import { findSelectedColor } from './module';
import { IProductColorProps, IProductColorState } from './model';

export const DEFAULT_PROPS = {
  version: 'DESKTOP',
  boxSlug: '',
  optionTypes: [],
  boxVariants: []
} as IProductColorProps;

export const INITIAL_STATE = (list, selected) => {
  return {
    idNumberProduct: findSelectedColor(list, selected)
  } as IProductColorState;
};
