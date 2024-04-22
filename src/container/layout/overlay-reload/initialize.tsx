import { getDeviceVersion } from '../../../utils/responsive';
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;
export const INITIAL_STATE = { currentVersion: getDeviceVersion() } as IState;
