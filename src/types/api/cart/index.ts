import { PlatformType } from 'constants/api/generic';
import { IPv4, Picture, UnixSeconds } from '../../generic';
import { BoxTracking } from '../generic';
import { ReferralSchemeValidatedDetailResponse, ReferralUser } from '../referral';
import { CurrencyType, MembershipLevelTypeType } from 'constants/api/generic';

export interface CartAccompanyExteral {
  id?: number;
  name?: string;
  type?: string;
}

export interface CartAccompanyLinkedObject {
  id: number;
  name: string;
  type: string;
}

export interface CartAccompany {
  external: CartAccompanyExteral;
  fee: number;
  id: number;
  linked_object: CartAccompanyLinkedObject;
  note: string;
}

export interface CartAvailablePaymentMethod {
  code: number;
  description: string;
  disable_reason: string | null;
  enabled: boolean;
  id: number;
  image_url: string;
  name: string;
}

export interface CartAvailableShippingPackageTime {
  max: UnixSeconds;
  min: UnixSeconds;
}

export interface CartAvailableShippingPackage {
  code?: string;
  description?: string;
  disable_reason?: string;
  enabled?: boolean;
  id?: number;
  name?: string;
  original_price?: number;
  price?: number;
  time?: CartAvailableShippingPackageTime;
}

export interface CartItemBoxPrimaryPicture {
  facebook_url?: string;
  large_url?: string;
  medium_url?: string;
  original_url?: string;
  square_url?: string;
  thumb_url?: string;
  vertical_url?: string;
}

export interface CartItemBox {
  brand_name?: string;
  id: number;
  is_bundle?: boolean;
  is_individual?: boolean;
  is_saleable?: boolean;
  lixibox_id?: string;
  name?: string;
  original_price?: number;
  price?: number;
  primary_picture?: CartItemBoxPrimaryPicture;
  short_description?: string;
  slug?: string;
  status?: string;
  stock?: number;
  tracking?: BoxTracking;
}

export interface CartItemBoxType {
  type: 'membership_gift' | 'birthday_gift';
  name: string;
  description: string;
  for_memebership_level?: number;
  color?: string;
  price?: number;
  expired_at?: UnixSeconds;
}

export interface CartItem {
  box?: CartItemBox;
  box_type?: CartItemBoxType;
  cart_id?: number;
  coins?: number;
  created_at?: UnixSeconds;
  discount_message?: string | null;
  discount_price?: number;
  editable?: boolean;
  gift_price?: number;
  id?: number;
  is_pre_order?: boolean;
  linked_gift_type?: string | null;
  lixibox_id?: string;
  note?: string;
  original_price?: number;
  pre_order_release_date?: UnixSeconds | null;
  price?: number;
  purchase_type?: number;
  quantity?: number;
  referrer_id?: number | null;
  removable?: boolean;
  updated_at?: UnixSeconds;
}

export interface CartReferral {
  applied_scheme: ReferralSchemeValidatedDetailResponse;
  referrer: ReferralUser;
}

export interface CartWard {
  district_id: number;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  position: number;
  unit: string;
}

export interface CartCashback {
  balance_used?: number;
  bonus?: number;
}

export interface CartService {
  id: number;
  name: string;
  type?: string;
  description?: string;
  required_note?: boolean;
}

export interface CartServicePrice {
  price: number;
  service: CartService;
}

export interface Cart {
  accompanies?: Array<CartAccompany>;
  address?: string | null;
  address_id?: number | null;
  applicable_balance?: number;
  applied_applicable_balances?: boolean;
  auto_add_gifts?: boolean;
  available_payment_methods?: Array<CartAvailablePaymentMethod>;
  available_shipping_packages?: Array<CartAvailableShippingPackage>;
  balance_used?: number;
  can_cod?: boolean;
  can_select_add_on?: boolean | null;
  can_select_gift?: boolean | null;
  card_processor?: IPv4 | null;
  cart_items?: Array<CartItem>;
  cashback?: CartCashback;
  cod_min_price?: number;
  contact_phone?: string | null;
  created_at?: UnixSeconds;
  description?: string;
  discount_code?: string;
  discount_price?: number;
  district_id?: number | null;
  first_name?: string | null;
  full_address?: string | null;
  gift_message?: string | null;
  gift_price?: number;
  id?: number;
  invoice_requested?: boolean;
  ip?: IPv4 | null;
  is_freeship?: boolean;
  is_gift?: boolean | null;
  last_name?: string | null;
  lixicoin_bonus?: number;
  mobile_referral_code?: string;
  note?: string | null;
  number?: string | null;
  original_shipping_price?: number;
  payment_method?: number;
  phone?: string | null;
  promotions_price?: number;
  province_id?: number | null;
  referral?: CartReferral | null;
  referral_code?: string | null;
  services_price?: number;
  service_prices?: Array<CartServicePrice>;
  shipping_package?: string;
  shipping_package_name?: string;
  shipping_price?: number;
  subtotal_coins?: number;
  subtotal_price?: number;
  total_coins?: number;
  total_price?: number;
  updated_at?: UnixSeconds;
  user_id?: number | null;
  ward?: CartWard | null;
  ward_id?: number | null;
  warehouse_id?: number | null;
}

export interface DiscountCode {
  amount?: number;
  applicable_box_count?: number;
  apply_for_platform?: Array<PlatformType>;
  auto_add_gifts?: boolean;
  available?: boolean;
  available_message?: string | null;
  code?: string;
  description?: string | null;
  end_date?: number | null;
  gift_box_count?: number;
  id?: number;
  icon?: Picture;
  /**
   * Only available via GET /cart/discount-codes[/{code}]
   */
  is_applicable?: boolean;
  is_expired?: boolean;
  maximum_value?: number | null;
  minimum_value?: number | null;
  order_price_max?: number | null;
  order_price_min?: number | null;
  remaining_amount?: number;
  special_add_on_count?: number;
  start_date?: number | null;
  terms?: string;
  title?: string;
  /**
   * Only available via GET /cart/discount-codes[/{code}]
   */
  type?: string;
  unit?: CurrencyType;
  usage_limit?: number;
  usage_limit_per_user?: number;
  user_levels?: Array<MembershipLevelTypeType>;
}
