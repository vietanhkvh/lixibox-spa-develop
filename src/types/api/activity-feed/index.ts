import { Picture } from 'types/generic';
import { ProductBox } from '../shop';
import { User } from '../auth';

export interface ActivityFeedBox {
  id?: string;
  name?: string;
  slug?: string;
}

export interface ActivityFeedFeedback {
  box?: {
    box?: ProductBox;
  };
  created_at?: number;
  id?: number;
  rating?: number;
  review?: string;
  title?: string;
}

export interface ActivityFeedFeedable {
  feedback?: ActivityFeedFeedback;
}

export interface ActivityFeed {
  box?: ActivityFeedBox;
  boxes?: Array<ActivityFeedBox>;
  created_at?: number;
  feedable?: ActivityFeedFeedable;
  feedable_type?: string;
  id?: number;
  liked?: boolean;
  message?: string;
  picture?: Picture;
  pictures?: Array<Picture>;
  pinned?: boolean;
  rating?: number;
  share_link?: string;
  total_comments?: number;
  total_likes?: number;
  user?: User;
}
