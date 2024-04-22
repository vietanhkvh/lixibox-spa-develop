import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export enum Phase {
  Initial = 'initial',
  OTPRequested = 'otp_requested'
}

export interface IProps extends PropsFromRedux {
  isOnModal?: boolean;
  referrer?: string;
  style?: CSSProperties;
  classes?: { container?: string };
  onLogin?: (event: { referrer: string }) => void;
  onSignup?: (event: { referrer: string }) => void;
  onFastTrackSuccess?: (event: { referrer: string }) => void;
  onFastTrackFailure?: (event?: { phase: Phase }) => void;
}
