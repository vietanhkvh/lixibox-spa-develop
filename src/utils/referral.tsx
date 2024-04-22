import { formatDateTime } from '../utils/date-time';
import { unixSecondsNow } from '../utils/time';
import { DATETIME_FORMAT_TYPE } from '../constants/application/global';
import { ReferralSchemeDetailResponse } from '../types/api/referral';
import { CartReferral } from '../types/api/cart';

export interface SchemeTimelineNote {
  value: string;
  shouldHideOnSchemeDetail: boolean;
  isAvailable: boolean;
  hasExpiry: boolean;
  isExpired: boolean;
}
export const generateSchemeTimelineNote = (scheme: ReferralSchemeDetailResponse): SchemeTimelineNote => {
  let value = '';
  const now = unixSecondsNow();
  let shouldHideOnSchemeDetail = false;

  if (!scheme) {
    return {
      value,
      shouldHideOnSchemeDetail,
      isAvailable: false,
      hasExpiry: false,
      isExpired: false
    };
  }

  if (now < scheme.start_at) {
    value = `Bắt đầu từ ngày ${formatDateTime(scheme.start_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}`;
  } else if (scheme.end_at && scheme.end_at > 0) {
    if (now > scheme.end_at) {
      value = `Đã kết thúc ngày ${formatDateTime(scheme.end_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}`;
    } else {
      value = `Ngày kết thúc: ${formatDateTime(scheme.end_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}`;
    }
  } else {
    value = 'Đang diễn ra';
    shouldHideOnSchemeDetail = true;
  }

  return {
    value,
    shouldHideOnSchemeDetail,
    isAvailable: now >= scheme.start_at && (!scheme.end_at || now < scheme.end_at),
    hasExpiry: !!scheme.end_at,
    isExpired: scheme.status === 'expired'
  };
};

export const generateReferralSchemeSelectionHint = (referral: CartReferral) => {
  return referral?.applied_scheme ? (
    <>
      <span>{referral.referrer.first_name}</span>
      {` tặng bạn `}
      <span>{referral.applied_scheme.referee?.reward_message || ''}</span>
    </>
  ) : (
    <>
      Chọn ưu đãi từ người giới thiệu <span>{referral.referrer.first_name || ''}</span>
    </>
  );
};
