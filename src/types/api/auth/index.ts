import { UnixSeconds } from 'types/generic';
import { UserAvatar } from '../referral';

export interface OrderStatus {
  count?: number;
  statuses?: Array<string>;
  title?: string;
}

export interface UserAddressWard {
  id: number;
  district_id?: number;
  full_name?: string;
  name?: string;
  unit?: string;
}

export interface UserAddress {
  address?: string;
  created_at?: number;
  district_id?: number;
  district_name?: string;
  first_name?: string;
  full_address?: string;
  full_name?: string;
  id: number;
  is_primary_address?: boolean;
  is_usable?: boolean;
  last_name?: string;
  phone?: string;
  province_id?: number;
  province_name?: string;
  ward?: UserAddressWard;
  ward_id?: number;
  ward_name?: string;
}

export interface UserSocialAccount {
  email?: string;
  provider?: string;
}

export interface UserCashback {
  balance_confirmed?: number;
  balance_expiry?: UnixSeconds;
  balance_pending?: number;
}

export interface User {
  address?: string | null;
  addresses?: Array<UserAddress>;
  avatar?: UserAvatar;
  balance?: number;
  birthday?: number;
  cashback?: UserCashback;
  coins?: number;
  created_at?: number;
  discount_code_ids?: Array<number>;
  district_id?: number | null;
  earned_coins?: number;
  email?: string;
  email_update_required?: boolean;
  email_verified?: boolean;
  expert_slug?: string;
  first_name?: string;
  full_address?: string | null;
  gender?: number | null;
  id?: number;
  is_admin?: boolean;
  is_expert?: boolean;
  last_name?: string;
  membership_level?: number;
  membership_level_started_at?: number;
  mobile_referral_code?: string;
  name?: string;
  order_statuses?: Array<OrderStatus>;
  orders_count?: number;
  phone?: string;
  province_id?: number | null;
  referral_code?: string;
  social_accounts?: Array<UserSocialAccount>;
  store_orders_count?: number;
  uuid?: string;
  ward_id?: number | null;

  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
