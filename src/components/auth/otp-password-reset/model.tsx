import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export enum Phase {
  Initial = 'initial',
  OTPRequested = 'otp_requested'
}

export interface IProps extends PropsFromRedux {
  referrer?: string;
  style?: CSSProperties;
  classes?: { container?: string };
  onSuccess?: (event: { referrer: string }) => void;
  onSignin?: (event: { referrer: string }) => void;
}
