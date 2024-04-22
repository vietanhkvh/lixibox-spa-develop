import { getDeviceVersion } from '../../../utils/responsive';

const SWITCH_DEFAULT_PROPS = {
  MOBILE: { showViewGroup: false, showDescription: false },
  DESKTOP: { showViewGroup: true, showDescription: true }
};

export const DEFAULT_PROPS = Object.assign({}, SWITCH_DEFAULT_PROPS[getDeviceVersion()], {
  list: [],
  style: {},
  isSearchList: false,
  isShowCategory: true,
  size: ''
});
