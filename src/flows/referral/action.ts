import * as REFERRAL_API_PATH from '../../api/referral';
import { REDUCER_GROUP } from '../reducer.group';
import * as REFERRAL_ACTION_TYPE from './type';

export type GetReferralSchemesActionParams = REFERRAL_API_PATH.GetReferralSchemesApiParams;
export const getReferralSchemesAction = (params: GetReferralSchemesActionParams) => (dispatch, getState) =>
  dispatch({
    type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES,
    payload: { promise: REFERRAL_API_PATH.getReferralSchemesApi(params).then((res) => res) },
    meta: params,
    group: REDUCER_GROUP.REFERRAL
  });

export type GetReferralSchemeDetailActionParams = REFERRAL_API_PATH.GetReferralSchemeDetailApiParams;
export const getReferralSchemeDetailAction = (params: GetReferralSchemeDetailActionParams) => (dispatch, getState) =>
  dispatch({
    type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_DETAIL,
    payload: { promise: REFERRAL_API_PATH.getReferralSchemeDetailApi(params).then((res) => res) },
    meta: params,
    group: REDUCER_GROUP.REFERRAL
  });

export type GetReferralSchemeValidatedDetailActionParams = REFERRAL_API_PATH.GetReferralSchemeValidatedDetailApiParams;
export const getReferralSchemeValidatedDetailAction =
  (params: GetReferralSchemeValidatedDetailActionParams) => (dispatch, getState) =>
    dispatch({
      type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_VALIDATED_DETAIL,
      payload: { promise: REFERRAL_API_PATH.getReferralSchemeValidatedDetailApi(params).then((res) => res) },
      meta: params,
      group: REDUCER_GROUP.REFERRAL
    });

export const getReferralSchemesShareLinkAction = () => (dispatch, getState) =>
  dispatch({
    type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES_SHARE_LINK,
    payload: { promise: REFERRAL_API_PATH.shareReferralSchemesApi().then((res) => res) },
    group: REDUCER_GROUP.REFERRAL
  });

export type GetReferralSchemeShareLinkActionParams = REFERRAL_API_PATH.ShareReferralSchemeApiParams;
export const getReferralSchemeShareLinkAction =
  (params: GetReferralSchemeShareLinkActionParams) => (dispatch, getState) =>
    dispatch({
      type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_SHARE_LINK,
      payload: { promise: REFERRAL_API_PATH.shareReferralSchemeApi(params).then((res) => res) },
      meta: params,
      group: REDUCER_GROUP.REFERRAL
    });

export type GetReferralStatisticsAndHistoryActionParams = REFERRAL_API_PATH.GetReferralStatisticsAndHistoryApiParams;
export const getReferralStatisticsAndHistoryAction =
  (params: GetReferralStatisticsAndHistoryActionParams) => (dispatch, getState) =>
    dispatch({
      type: REFERRAL_ACTION_TYPE.FETCH_REFERRAL_STATISTICS_AND_HISTORY,
      payload: { promise: REFERRAL_API_PATH.getReferralStatisticsAndHistoryApi(params).then((res) => res) },
      meta: params,
      group: REDUCER_GROUP.REFERRAL
    });

export type GetRefereeSchemesByCodeActionParams = REFERRAL_API_PATH.GetRefereeSchemesByCodeApiParams;
export const getRefereeSchemesByCodeAction = (params: GetRefereeSchemesByCodeActionParams) => (dispatch, getState) =>
  dispatch({
    type: REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEMES_BY_CODE,
    payload: { promise: REFERRAL_API_PATH.getRefereeSchemesByCodeApi(params).then((res) => res) },
    meta: params,
    group: REDUCER_GROUP.REFERRAL
  });

export type GetRefereeSchemeByCodeActionParams = REFERRAL_API_PATH.GetRefereeSchemeByCodeApiParams;
export const getRefereeSchemeByCodeAction = (params: GetRefereeSchemeByCodeActionParams) => (dispatch, getState) =>
  dispatch({
    type: REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEME_BY_CODE,
    payload: { promise: REFERRAL_API_PATH.getRefereeSchemeByCodeApi(params).then((res) => res) },
    meta: params,
    group: REDUCER_GROUP.REFERRAL
  });

export type ApplyReferralCodeActionParams = REFERRAL_API_PATH.ApplyReferralCodeApiParams & {
  preventDefaultErrorMessage?: boolean;
};
export const applyReferralCodeAction = (params: ApplyReferralCodeActionParams) => (dispatch, getState) => {
  const { code } = params;

  return dispatch({
    type: REFERRAL_ACTION_TYPE.APPLY_REFERRAL_CODE,
    payload: { promise: REFERRAL_API_PATH.applyReferralCodeApi({ code }).then((res) => res) },
    meta: params,
    group: REDUCER_GROUP.REFERRAL
  });
};
