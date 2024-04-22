import { generateImageList } from './module';
import { IProductImageProps, IProductImageState } from './model';

export const DEFAULT_PROPS = {
  list: [],
  video: []
} as IProductImageProps;

export const INITIAL_STATE = ({ list, boxFeedbackPicture }) => {
  return {
    videoSelected: -1,
    translateListImage: 0,
    imageList: generateImageList({ list, boxFeedbackPicture, isHaveVideo: false }),
    selectedIndex: 0
  } as IProductImageState;
};

export const ID_VIDEO_ITEM = 'video-item';
