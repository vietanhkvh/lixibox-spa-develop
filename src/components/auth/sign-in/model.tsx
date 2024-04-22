import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export type NotificationType = 'SUCCESS' | 'ERROR';

export interface IProps extends PropsFromRedux {
  isOnModal?: boolean;
  phone?: string;
  style?: CSSProperties;
  classes?: { container?: string };
  onLoginSuccess?: (event: { referrer: string }) => void;
  onLoginFailure?: (event?: { reason?: string; phone?: string; referrer?: string }) => void;
  onForgotPassword?: (event: { referrer: string }) => void;
  onSignup?: (event: { referrer: string }) => void;
  referrer?: string;
  inLineNotification?: { content: string; type: NotificationType };
}

export interface InlineMessage {
  content: string;
  type: NotificationType;
}

export interface CredentialsToVerify {
  phone: string;
  password: string;
  modalOrigin: string;
}
