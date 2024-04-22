import type { Paging } from '../../api/types';
import type { ReferralSchemeStatus, ReferralHistoryStatus } from '../../api/referral';
import {
  ReferralSchemeDetailResponse,
  ReferralSchemeValidatedDetailResponse,
  ReferralUser
} from '../../types/api/referral';

export interface ReferralSchemes {
  byQuery: { [key: string]: Array<ReferralSchemeDetailResponse> };
  pages: Array<number>;
  lastPaging: Paging;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ReferralSchemeDetail {
  byQuery: { [key: string]: ReferralSchemeDetailResponse };
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ReferralSchemeValidatedDetail {
  byQuery: { [key: string]: ReferralSchemeValidatedDetailResponse };
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ReferralSchemesShareLinkResponse {
  id: number;
  message?: string;
  mobile_url?: string;
  referral_code: string;
  scheme_id?: any;
  web_url: string;
}
export type ReferralSchemeShareLinkResponse = ReferralSchemesShareLinkResponse;
export interface ReferralSchemesShareLink {
  link?: ReferralSchemesShareLinkResponse;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ReferralSchemeShareLink {
  byQuery: { [key: string]: ReferralSchemeShareLinkResponse };
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ReferralStatisticsAndHistoryResponseSummary {
  total_rewarded_coins: number;
  total_rewarded_balance: number;
}

export interface ReferralStatisticsAndHistoryResponseRewardHistoryRewardItemRewardableVoucher {
  id: number;
  description: string;
}
export interface ReferralStatisticsAndHistoryResponseRewardHistoryRewardItemRewardableBox {
  id: number;
  brand_name: string;
  name: string;
}
export interface ReferralStatisticsAndHistoryResponseRewardHistoryRewardItem {
  reward_amount?: number;
  reward_type: string;
  reward_voucher?: ReferralStatisticsAndHistoryResponseRewardHistoryRewardItemRewardableVoucher;
  reward_box?: ReferralStatisticsAndHistoryResponseRewardHistoryRewardItemRewardableBox;
  user: ReferralUser;
}
export interface ReferralStatisticsAndHistoryResponseRewardHistory {
  created_at: number;
  referee: ReferralUser;
  reward_items: Array<ReferralStatisticsAndHistoryResponseRewardHistoryRewardItem>;
  scheme: ReferralSchemeDetailResponse;
  status: ReferralHistoryStatus;
}
export interface ReferralStatisticsAndHistory {
  summary?: ReferralStatisticsAndHistoryResponseSummary;
  byQuery: { [key: string]: Array<ReferralStatisticsAndHistoryResponseRewardHistory> };
  pages: Array<number>;
  lastPaging: Paging;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface RefereeSchemesResponse {
  schemes: Array<ReferralSchemeDetailResponse>;
  referrer: ReferralUser;
}
export interface RefereeSchemes {
  byQuery: { [key: string]: RefereeSchemesResponse };
  pages: Array<number>;
  lastPaging: Paging;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface RefereeSchemeResponse {
  scheme: ReferralSchemeDetailResponse;
  referrer: ReferralUser;
}
export interface RefereeScheme {
  byQuery: { [key: string]: RefereeSchemeResponse };
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ApplyReferralCode {
  referrer: ReferralUser;
  applying: boolean;
  applied: boolean;
  errored: boolean;
}

export interface ReferralState {
  availableSchemes: ReferralSchemes;
  expiredSchemes: ReferralSchemes;
  schemeDetail: ReferralSchemeDetail;
  validatedSchemeDetail: ReferralSchemeValidatedDetail;
  schemesShareLink: ReferralSchemesShareLink;
  schemeShareLink: ReferralSchemeShareLink;
  statisticsAndHistory: ReferralStatisticsAndHistory;
  refereeSchemes: RefereeSchemes;
  refereeScheme: RefereeScheme;
  applyReferralCode: ApplyReferralCode;
}

export type { ReferralSchemeStatus, ReferralHistoryStatus };
