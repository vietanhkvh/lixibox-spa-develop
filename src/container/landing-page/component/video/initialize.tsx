import { IState } from './model';

export const INITIAL_STATE = (videoListSource: any) => {
  return {
    videoList: videoListSource,
    autoPlayVideo: true
  } as IState;
};
