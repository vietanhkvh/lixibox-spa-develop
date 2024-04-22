import { UnixSeconds } from '../../generic';

export interface ReferralSchemeDetailResponseBanner {
  url: string;
}

export interface ReferralSchemeDetailResponseReferee {
  minimum_order_value: number;
  rewards: Array<any>;
  require_purchases: Array<any>;
  conditional_message: string;
  reward_message: string;
}

export interface ReferralSchemeDetailResponseReferrer {
  rewards: Array<any>;
  reward_message: string;
}

export interface ReferralSchemeValidatedDetailResponseConditions {
  matched_count: number;
  count: number;
  items: Array<{ description: string; matched: boolean }>;
}

export interface ReferralSchemeDetailResponse {
  id: number;
  banner: ReferralSchemeDetailResponseBanner;
  start_at?: UnixSeconds;
  end_at?: UnixSeconds;
  name: string;
  referee_scheme_name: string;
  notes: Array<{ content: string }>;
  platform: string;
  status: 'available' | 'expired';
  referee: ReferralSchemeDetailResponseReferee;
  referrer: ReferralSchemeDetailResponseReferrer;
}

export type ReferralSchemeValidatedDetailResponse = ReferralSchemeDetailResponse & {
  conditions: ReferralSchemeValidatedDetailResponseConditions;
  is_selected?: boolean;
};

export interface UserAvatar {
  large_url: string;
  medium_url: string;
  original_url?: string;
  thumb_url: string;
}
export interface ReferralUser {
  id: number;
  first_name: string;
  last_name: string;
  avatar: UserAvatar;
  avatar_medium_url: string;
  avatar_thumb_url: string;
  email: string;
  name: string;
  referral_code: string;
  uuid: string;
}

export type CartReferralSchemesResponse = Array<ReferralSchemeValidatedDetailResponse>;
