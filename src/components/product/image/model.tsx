import { ProductBoxBadge } from 'types/api/shop';
import { Picture } from 'types/generic';

export interface IProductImageProps {
  list: Array<Picture>;
  box?: any;
  boxFeedbackPicture?: any;
  onSelect?: any;
  video?: Array<any>;
  badges?: ProductBoxBadge;
  isPauseVideo?: Boolean;
}

export interface IProductImageState {
  videoSelected?: number;
  translateListImage: number;
  imageList: Array<IImageItem>;
  selectedIndex: number;
  autoPlayVideo?: true;
}

export interface IImageItem {
  index: number;
  thumbnail: string;
  image: string;
  original: string;
  selected: boolean;
}
