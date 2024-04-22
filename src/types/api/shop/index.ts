import { Picture } from '../../generic';
import { User } from '../auth';

export interface PaperclipAttachment {
  blur_url?: string;
  facebook_url?: string;
  large_url?: string;
  medium_url?: string;
  original_url?: string;
  thumb_url?: string;
  square_url?: string;
}

export interface ProductBoxRating {
  avg_rate?: number;
  count?: number;
}

export interface ProductBoxVariant {
  colors?: Array<ProductBoxVariantOption>;
  sizes?: Array<ProductBoxVariantOption>;
}

export interface ProductBoxVariantOption {
  box_id?: number;
  box_picture?: string;
  box_slug?: string;
  color_code?: string;
  name?: string;
  presentation?: string;
}

export interface ProductBoxBadgeItemResponse {
  type: 'image' | 'text';
  kind?: 'marketing' | 'system';
  slug?: string;
  content: string;
  background_color?: string;
  text_color?: string;
}

/**
 * TODO: `ProductBoxBadgeItemResponse | ProductBoxBadgeItemResponse[]` is a temporary fix to migrate to stackable badges support. Remove `ProductBoxBadgeItemResponse` after migration is done.
 */
export interface ProductBoxBadgeResponse {
  top_left?: ProductBoxBadgeItemResponse | ProductBoxBadgeItemResponse[] | null;
  top_right?: ProductBoxBadgeItemResponse | ProductBoxBadgeItemResponse[] | null;
  bottom_left?: ProductBoxBadgeItemResponse | ProductBoxBadgeItemResponse[] | null;
  bottom_right?: ProductBoxBadgeItemResponse | ProductBoxBadgeItemResponse[] | null;
}

/**
 * @deprecated Duplicate of ProductBoxBadgeResponse (available through: `.badge` attribute). Use ProductBoxBadgeResponse instead. `.badges` will be removed.
 */
export interface ProductBoxBadge {
  bottom_left?: string;
  bottom_right?: string;
  message?: string;
  top_left?: string;
  top_right?: string;
}

export interface ProductBoxPreviewPicture {
  medium_url?: string;
  square_url?: string;
}

export interface ProductBoxSizeGuide {
  image_url?: string;
  title?: string;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}

export interface ProductBoxVideo {
  url?: string;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}

export interface ProductBoxVariantOption {
  color_code?: string;
  image_url?: string;
  title?: string;
}

export interface ProductBoxTracking {
  category_key?: string;
}

export interface ProductBox {
  added_to_waitlist?: boolean;
  avg_rate?: number;
  badge?: ProductBoxBadgeResponse;
  /**
   * @deprecated Duplicate of ProductBoxBadgeResponse (available through: `.badge` attribute). Use ProductBoxBadgeResponse instead. `.badges` will be removed.
   */
  badges?: ProductBoxBadge;
  box_products?: Array<any>; // TODO?: specify
  brand_name?: string;
  cashback_rebate?: number;
  coins_price?: number;
  count?: number;
  created_at?: number;
  delivery_time?: {}; // TODO?: specify
  discount_percent?: number;
  for_redeem?: boolean;
  id?: number;
  is_individual?: boolean;
  is_saleable?: boolean;
  like_count?: number;
  lixibox_id?: string;
  lixicoin_bonus?: number;
  long_description?: string;
  name?: string;
  note?: string | null;
  number_of_products?: number;
  original_price?: number;
  pictures?: Array<Picture>;
  pre_order_release_date?: number;
  pre_order_status?: 'pending' | 'released';
  preview_picture?: ProductBoxPreviewPicture;
  price_sale_off?: number;
  price?: number;
  primary_picture?: PaperclipAttachment;
  rating?: ProductBoxRating;
  rating_count?: number;
  reason_to_sell?: null; // TODO?: specify
  saving_bundle_value?: number;
  short_description?: string;
  size_guides?: Array<ProductBoxSizeGuide>;
  slug?: string;
  status?: string; // TODO?: specify;
  stock?: number;
  store_stock?: number;
  tracking?: ProductBoxTracking;
  updated_at?: number;
  variants?: ProductBoxVariant;
  videos?: Array<ProductBoxVideo>;
  variant_options?: Array<ProductBoxVariantOption>; // FIXME: Attribute already removed from backend API. Frontend needs to remove too.
}

export interface ProductBoxVariantOptionValue {
  type?: string;
  value_id?: number;
}

export interface ProductBoxVariant {
  slug?: string;
  option_values?: Array<ProductBoxVariantOptionValue>;
}

export interface Product {
  box: ProductBox;
  box_variants: Array<ProductBoxVariant>;
  can_review?: boolean;
  liked?: boolean;
  option_types: Array<any>; // TODO: Specify
  reviewed?: boolean;
  success?: boolean;

  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}

export interface BoxCategory {
  id?: number;
  cover_image?: Picture;
  depth?: number;
  icon?: Picture;
  menu_column?: number;
  name?: string;
  parent_id?: number;
  slug?: string;
  vn_name?: string;
  hover?: boolean;
}

export type BrowseNode = BoxCategory;

/**
 * @deprecated Duplicate of ProductBox. Use ProductBox instead. IBox will be removed.
 */
export interface IBox {
  added_to_waitlist?: boolean;
  avg_rate?: number;
  badges?: {
    top_left?: string | null;
    top_right?: string | null;
    bottom_right?: string | null;
    bottom_left?: string | null;
  };
  box_products?: any[];
  brand_name?: string;
  categories?: any[];
  coins_price?: number | null;
  delivery_time?: {};
  for_redeem?: boolean;
  id?: number;
  is_bundle?: boolean;
  is_individual?: boolean;
  is_saleable?: boolean;
  like_count?: number;
  lixibox_id?: string;
  lixicoin_bonus?: number;
  long_description?: string;
  name?: string;
  note?: string | null;
  number_of_products?: number;
  original_price?: number;
  pictures?: any[];
  pictures_webp?: any[];
  pre_order_release_date?: number | null;
  pre_order_status?: string | null;
  preview_picture?: {
    facebook_url?: string;
    large_url?: string;
    medium_url?: string;
    original_url?: string;
    square_url?: string;
  };
  preview_picture_webp?: {
    facebook_url?: string;
    large_url?: string;
    medium_url?: string;
    original_url?: string;
    square_url?: string;
  };
  price?: number;
  price_sale_off?: number;
  primary_picture?: {
    facebook_url?: string;
    large_url?: string;
    medium_url?: string;
    original_url?: string;
    square_url?: string;
  };
  primary_picture_webp?: {
    facebook_url?: string;
    large_url?: string;
    medium_url?: string;
    original_url?: string;
    square_url?: string;
  };
  rating?: {
    avg_rate?: number;
    count?: number;
  };
  reason_to_sell?: string | null;
  saving_bundle_value?: number;
  short_description?: string;
  size_guides?: any[];
  slug?: string;
  status?: string;
  stock?: number;
  store_stock?: number;
  tracking?: {
    category_key?: string;
  };
  videos?: any[];
}

export interface BoxFeedbackComment {
  id: number;
  created_at: number;
  content: string;
  user_name: string;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}

// TODO: Refactor and provide specific interface and enums when the shitty backend API will provide a consistent OpenAPI schema
export interface BoxFeedback {
  comments?: Array<BoxFeedbackComment>;
  created_at?: number;
  feedbackable_id?: number;
  feedbackable_image?: {
    facebook_url?: string;
    large_url?: string;
    medium_url?: string;
    original_url?: string;
    square_url?: string;
    thumb_url?: string;
    vertical_url?: string;
  };
  feedbackable_lixibox_id?: string;
  feedbackable_name?: string;
  feedbackable_slug?: string;
  feedbackable_type?: string;
  id?: number;
  liked?: boolean;
  parent_id?: number;
  pictures?: Array<Picture>;
  rate?: number;
  review?: string;
  status?: string;
  total_likes?: number;
  user?: User;
}

export interface FeedbackSummaryRatingResponse {
  title: string;
  slug: string;
  score: number;
}

export interface FeedbackSummaryKeywordResponse {
  keyword: string;
  attitude: string;
  slug: string;
}

export interface FeedbackSummaryFeedbackResponse {
  title: string;
  slug: string;
  attitude: string;
  review: string;
}

export interface FeedbackSummaryResponse {
  success: boolean;
  _id: string;
  box_id: number;
  box_name: string;
  lixibox_id: string;
  slug: string;
  rates: Array<FeedbackSummaryRatingResponse>;
  keyword_list: Array<FeedbackSummaryKeywordResponse>;
  data: Array<FeedbackSummaryFeedbackResponse>;
}
