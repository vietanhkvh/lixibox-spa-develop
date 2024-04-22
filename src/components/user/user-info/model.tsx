import { User } from 'types/api/auth';
import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  style?: any;
  userInfo: User;
  membershipInfo?: Array<any>;
  isDisplayStatSection?: boolean;
}
