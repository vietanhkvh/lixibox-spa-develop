import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export type NotificationType = 'SUCCESS' | 'ERROR';

export interface IProps extends PropsFromRedux {
  isOnModal?: boolean;
  style?: CSSProperties;
  classes?: { container?: string };
  referrer?: string;
  inLineNotification?: { content: string; type: NotificationType };
  onLoginSuccess?: (event: { referrer: string }) => void;
  onLoginFailure?: () => void;
  onSignup?: (event: { referrer: string }) => void;
  onInvalidState?: () => void;
  onRetry?: (event: { referrer: string }) => void;
}

export interface InlineMessage {
  content: string;
  type: NotificationType;
}

export interface SubmitButtonState {
  loading: boolean;
  disabled: boolean;
}
