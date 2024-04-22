import { StarRatingValue } from 'presentation-component/ui/star-rating/component';
import { Picture } from '../../generic';

export interface Banner {
  height?: number;
  url?: string;
  width?: number;
}

export interface GiftBox {
  id: number;
  brand_name: string;
  is_bundle: boolean;
  is_individual: boolean;
  is_saleable: boolean;
  lixibox_id: string;
  name: string;
  original_price: number;
  price: number;
  primary_picture: Picture;
  short_description: string;
  slug: string;
  status: string;
  stock: number;
}

export interface DiscountCode {
  id: number;
  amount: number;
  auto_add_gifts?: boolean;
  available: boolean;
  available_message?: string;
  code: string;
  description: string;
  errors: Array<string>;
  is_applicable_to_limited_product_set?: boolean;
  gift_boxes: Array<GiftBox>;
  order_price_max: number | null;
  order_price_min: number | null;
  remaining_amount: number;
  unit: string;
  end_date: number;
  is_expired: boolean;
  maximum_value: number | null;
  minimum_value: number | null;
  start_date: number;
  usage_limit: number;
  usage_limit_per_user: number;
  user_levels: Array<any>;
}

export interface LinkedItem {
  link_url: string;
  linked_object_id: number;
  linked_object_type: 'Box' | 'Brand' | 'Theme' | 'BrowseNode';
  name: string;
}

export interface Scheme {
  banner: Banner;
  benefit_message: string | null;
  condition_message: string | null;
  description: string;
  discount_code: DiscountCode;
  is_pre_order?: boolean;
  link_url: string;
  linked_items: Array<LinkedItem>;
  linked_object_id: number;
  linked_object_type: 'Box' | 'Brand' | 'Theme' | 'BrowseNode';
  name: string;
  slug: string;
  style: 'large' | 'small';
  terms?: string;
}

interface TestimonialAuthor {
  name: string;
}
export interface Testimonial {
  author?: TestimonialAuthor;
  picture?: Picture;
  rating?: StarRatingValue;
  review?: string;
}

export interface Faq {
  [key: string]: any; // TODO: Add type
}

export interface VideoBannerResponse {
  created_at?: number;
  id?: number;
  thumb?: string;
  url?: string;
}
