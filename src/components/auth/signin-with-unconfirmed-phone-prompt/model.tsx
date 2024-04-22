import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  phone?: string;
  classes?: { container?: string };
  style?: CSSProperties;
  referrer?: string;
  isOnModal?: boolean;
  onSubmit?: (event: { referrer: string }) => void;
  onAlternateLinkClick?: (params: { phone: string; referrer: string }) => void;
  onSignup?: (event: { referrer: string }) => void;
}
