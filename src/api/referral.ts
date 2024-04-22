import { get, post, patch } from '../config/restful-method';
import { Paging } from '../types/paging';

export type ReferralSchemeStatus = 'available' | 'expired';
export interface GetReferralSchemesApiParams {
  status: ReferralSchemeStatus;
  paging?: Paging;
}
export const getReferralSchemesApi = ({ status, paging }: GetReferralSchemesApiParams) => {
  const query = new URLSearchParams();
  query.set('status', status);
  if (paging) {
    query.set('page', String(paging.page));
    query.set('per_page', String(paging.perPage));
  }
  const queryString = query.toString();

  return get({
    path: `/referrals/schemes${queryString ? `?${queryString}` : ''}`,
    description: '[Referral] Get referral schemes /referrals/schemes',
    errorMesssage: `Can't get referral schemes. Please try again`
  });
};

export interface GetReferralSchemeDetailApiParams {
  id: string | number;
}
export const getReferralSchemeDetailApi = ({ id }: GetReferralSchemeDetailApiParams) => {
  return get({
    path: `/referrals/schemes/${id}`,
    description: '[Referral] Get referral scheme detail /referrals/schemes/:id',
    errorMesssage: `Can't get referral scheme detail. Please try again`
  });
};

export interface GetReferralSchemeValidatedDetailApiParams {
  id: string | number;
}
export const getReferralSchemeValidatedDetailApi = ({ id }: GetReferralSchemeValidatedDetailApiParams) => {
  return get({
    path: `/referrals/schemes/${id}/validate`,
    description: '[Referral] Get referral scheme validated detail /referrals/schemes/:id/validate',
    errorMesssage: `Can't get referral scheme validated detail. Please try again`
  });
};

export const shareReferralSchemesApi = () => {
  return post({
    path: `/referrals/share`,
    description: '[Referral] Share referral schemes /referrals/share',
    errorMesssage: `Can't share referral schemes. Please try again`
  });
};

export interface ShareReferralSchemeApiParams {
  id: string | number;
}
export const shareReferralSchemeApi = ({ id }: ShareReferralSchemeApiParams) => {
  return post({
    path: `/referrals/schemes/${id}/share`,
    description: '[Referral] Share referral scheme /referrals/schemes/:id/share',
    errorMesssage: `Can't share referral scheme. Please try again`
  });
};

export type ReferralHistoryStatus = 'pending' | 'completed';
export interface GetReferralStatisticsAndHistoryApiParams {
  status: ReferralHistoryStatus;
  paging?: Paging;
}
export const getReferralStatisticsAndHistoryApi = ({ status, paging }: GetReferralStatisticsAndHistoryApiParams) => {
  const query = new URLSearchParams();
  query.set('status', status);
  if (paging) {
    query.set('page', String(paging.page));
    query.set('per_page', String(paging.perPage));
  }
  const queryString = query.toString();

  return get({
    path: `/referrals/reward_histories${queryString ? `?${queryString}` : ''}`,
    description: '[Referral] Get referral statistics and history /referrals/reward_histories',
    errorMesssage: `Can't get referral statistics and history. Please try again`
  });
};

export interface GetRefereeSchemesByCodeApiParams {
  code: string;
  paging?: Paging;
}
export const getRefereeSchemesByCodeApi = ({ code, paging }: GetRefereeSchemesByCodeApiParams) => {
  const query = new URLSearchParams();
  if (paging) {
    query.set('page', String(paging.page));
    query.set('per_page', String(paging.perPage));
  }
  const queryString = query.toString();

  return get({
    path: `/referrals/referee/${code}${queryString ? `?${queryString}` : ''}`,
    description: '[Referral] Get referee schemes by code /referrals/referee/{code}',
    errorMesssage: `Can't get referee schemes by code. Please try again`
  });
};

export interface GetRefereeSchemeByCodeApiParams {
  code: string;
  schemeId: string;
}
export const getRefereeSchemeByCodeApi = ({ code, schemeId }: GetRefereeSchemeByCodeApiParams) => {
  return get({
    path: `/referrals/referee/${code}/schemes/${schemeId}`,
    description: '[Referral] Get referee scheme by code /referrals/referee/{code}/schemes/{schemeId}',
    errorMesssage: `Can't get referee scheme by code. Please try again`
  });
};

export interface ApplyReferralCodeApiParams {
  code: string;
}
export const applyReferralCodeApi = ({ code }: ApplyReferralCodeApiParams) => {
  return patch({
    path: `/user/apply_referral_code`,
    data: { code },
    description: '[Referral] Apply referral code to account /user/apply_referral_code',
    errorMesssage: `Can't apply referral code to account. Please try again`
  });
};
