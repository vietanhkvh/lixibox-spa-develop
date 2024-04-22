import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  phone?: string;
  classes?: { container?: string };
  style?: CSSProperties;
  isOnModal?: boolean;
  onSignupSuccess?: (event: { referrer: string }) => void;
  onSignupFailure?: (params?: { reason?: string; phone?: string; status?: string }) => void;
  onLogin?: (event: { referrer: string }) => void;
  referrer?: string;
}
