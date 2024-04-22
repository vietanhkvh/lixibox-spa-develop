import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  phone?: string;
  classes?: { container?: string };
  style?: CSSProperties;
  isOnModal?: boolean;
  referrer?: string;
  onSignupSuccess?: (event: { referrer: string }) => void;
  onSignupFailure?: () => void;
  onLogin?: (event: { referrer: string }) => void;
  onInvalidState?: () => void;
}
