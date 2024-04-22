import { Picture } from 'types/generic';
import { User } from '../auth';
import { ProductBox } from '../shop';

export interface MagazineCategory {
  id: number;
  name?: string;
  slug?: string;
}

export interface Magazine {
  author?: User;
  category?: MagazineCategory;
  content?: string;
  cover_image?: Picture;
  created_at?: number;
  description?: string;
  id?: number;
  post_type?: string;
  published_at?: number;
  related_boxes?: Array<ProductBox>;
  slug?: string;
  tags?: Array<string>;
  title?: string;
  updated_at?: number;
  video_url?: string;
  views?: number;
}
