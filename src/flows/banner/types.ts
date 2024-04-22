import { Picture } from 'types/generic';

export interface BannerTransientState {
  lastId: string | null;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface Banner {
  cover_image?: Picture;
  id: number;
  links?: string[];
  name?: string;
  order?: any;
}

export interface BannerState {
  bannerList: {
    [key: string]: Banner[];
  };
  banner: BannerTransientState;
  theme: {
    list: Array<any>; // TODO: Define specific types
  };
}
