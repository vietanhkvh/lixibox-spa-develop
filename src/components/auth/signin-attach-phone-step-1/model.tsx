import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export type NotificationType = 'SUCCESS' | 'ERROR';

export interface IProps extends PropsFromRedux {
  isOnModal?: boolean;
  style?: CSSProperties;
  classes?: { container?: string };
  referrer?: string;
  inLineNotification?: { content: string; type: NotificationType };
  onSignup?: (event: { referrer: string }) => void;
  onInvalidState?: () => void;
  onCloudTokenAvailable?: (event: { referrer: string }) => void;
  onSuccess?: (event: { referrer: string }) => void;
}

export interface InlineMessage {
  content: string;
  type: NotificationType;
}
