import { CSSProperties } from 'react';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  phone?: string;
  status?: 'verified' | 'unverified';
  classes?: { container?: string };
  style?: CSSProperties;
  referrer?: string;
  isOnModal?: boolean;
  onSubmit?: (event: { phone: string; referrer: string }) => void;
  onAlternateLinkClick?: (event: { phone: string; referrer: string }) => void;
}
