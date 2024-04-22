import { PropsFromRedux } from './store';

export interface IProps extends PropsFromRedux {
  location?: any;

  match: {
    params: {
      idGroup: any;
    };
  };

  type?: any;
  column?: number;

  selectGiftAction?: any;
}

export interface IState {}
