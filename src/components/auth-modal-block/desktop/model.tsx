import { AUTH_VIEW, ModalCloseRequestReason } from './constant';

export type AuthView = (typeof AUTH_VIEW)[keyof typeof AUTH_VIEW];
export type NotificationType = 'SUCCESS' | 'ERROR';
export interface InlineNotification {
  content: string;
  type: NotificationType;
}

export type ModalCloseRequestReasonType = (typeof ModalCloseRequestReason)[keyof typeof ModalCloseRequestReason];
export interface IProps {
  initialView?: AuthView;
  isOpen: boolean;
  /**
   * Invoked when the modal is requested to close
   */
  onRequestClose?: (event: { reason: ModalCloseRequestReasonType; origin: AuthView }) => void;
  /**
   * Invoked when the modal is closed
   */
  onClose?: () => void;
  referrer?: string;
}

export interface ViewProps {
  currentAuthView: { view: AuthView; state?: { [key: string]: any } };
  setCurrentAuthView: (view: { view: AuthView; state?: { [key: string]: any } }) => void;
  referrer?: string;
  inLineNotification: InlineNotification;
  setInLineNotification: (notification: InlineNotification) => void;
  onRequestClose?: (params?: { reason: ModalCloseRequestReasonType; origin: AuthView }) => void;
}
