export interface MembershipLevelBenefits {
  lixicoin_earn_rate?: number;
  free_gift_wrap?: number;
  freeship?: boolean;
  cashback_percentage?: number;
}

export interface MembershipLevel {
  name?: string;
  presentation?: string;
  level?: number;
  required_coins?: number;
  benefits?: MembershipLevelBenefits;
}

export interface LixicoinState {
  membershipInfo: Array<MembershipLevel> | null;
  isFetchMembershipInfo: boolean;
}
