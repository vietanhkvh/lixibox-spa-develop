import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;
export const INITIAL_STATE = ({ autoRedirect }) =>
  ({
    isAutoRedirect: autoRedirect,
    isIframeLoading: false
  } as IState);
