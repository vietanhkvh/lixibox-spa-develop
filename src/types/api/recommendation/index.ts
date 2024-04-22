import { UnixSeconds, Picture } from '../../generic';
import { ProductBoxBadge, ProductBoxRating, ProductBoxVariantOption } from '../shop';

export interface CartRecommendation {
  id: number;
  added_to_waitlist: boolean;
  badges: ProductBoxBadge;
  brand_name: string | null;
  coins_price: number | null;
  discount_percent: number;
  for_redeem: boolean;
  is_bundle: boolean;
  is_individual: boolean;
  is_saleable: boolean;
  like_count: number;
  lixibox_id: string;
  name: string;
  original_price: number;
  pictures_webp: Array<Picture>;
  pre_order_release_date: UnixSeconds | null;
  pre_order_status?: 'pending' | 'released' | null;
  preview_picture: Picture;
  preview_picture_webp: Picture;
  price: number;
  price_sale_off: number;
  primary_picture: Picture;
  primary_picture_webp: Picture;
  rating: ProductBoxRating;
  short_description: string;
  slug: string;
  stock: number;
  store_stock: number;
  variant_options: Array<ProductBoxVariantOption>;
}
