import { PropsFromRedux } from './store';

export interface IUserBirthdayProps extends PropsFromRedux {
  closeModal?: () => void;
  data?: any;
  isBirthdaySet?: boolean;
  userBirthMonth?: string;
}

export interface IUserBirthdayState {
  isMinimal: boolean;
  inputValue?: {
    value?: string;
    valid?: boolean;
  };
  content: any;
  type: number;
}
