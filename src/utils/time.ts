import moment from 'moment';
import { ORDER_TYPE } from '../constants/application/order';

interface FormatEstimatedShippingTimeline {
  min: number;
  max: number;
  isSameDayShipping?: boolean;
}
export const formatEstimatedShippingTimeline = ({ min, max, isSameDayShipping }: FormatEstimatedShippingTimeline) => {
  if (!(min && max)) return '';
  const from = new Date(min * 1000);
  const to = new Date(max * 1000);

  const formattedDate = (time) =>
    `${time.getDate().toString().padStart(2, '0')}/${(time.getMonth() + 1).toString().padStart(2, '0')}`;

  const isSameDay = (from, to) =>
    from.getDate() === to.getDate() && from.getMonth() === to.getMonth() && from.getYear() === to.getYear();
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getYear() === (today as any).getYear()
    );
  };

  if (isSameDayShipping) {
    return `trước ${to.getHours()} giờ ${formattedDate(to)}`;
  }

  // One day delivery (note: not same as 'SHIPPING_TYPE.SAME_DAY')
  if (isSameDay(from, to)) {
    if (isToday(from)) {
      return `Hôm nay`;
    }

    return formattedDate(from);
  }

  return `${formattedDate(from)} - ${formattedDate(to)}`;
};

export const isTimestampInAPastDate = (timestamp: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day
  return new Date(timestamp * 1000) < today;
};

export const isTimestampInFuture = (timestamp: number) => {
  const today = new Date();
  return new Date(timestamp * 1000) > today;
};

export const isTimestampInPast = (timestamp: number) => {
  const today = new Date();
  return new Date(timestamp * 1000) < today;
};

/** Timestamp to `day`, `hour`, `minute`, `second` */
export const durationToDHMS = (timestampSeconds: number) => {
  try {
    const duration = moment.duration(timestampSeconds, 'seconds');

    if (!duration) return null;

    return {
      day: duration?.days(),
      hour: duration?.hours(),
      minute: duration?.minutes(),
      second: duration?.seconds()
    };
  } catch (e) {
    return null;
  }
};

interface TimestampDeltaToFormattedDurationParams {
  timestamp1: number;
  timestamp2: number;
}
export const timestampDeltaToFormattedDuration = ({
  timestamp1,
  timestamp2
}: TimestampDeltaToFormattedDurationParams) => {
  const duration = moment.duration(Math.abs(timestamp2 - timestamp1), 'seconds');

  return {
    day: duration.days(),
    hour: duration.hours(),
    minute: duration.minutes(),
    second: duration.seconds()
  };
};

interface IsTimestampsInRangeParams {
  timestamp1: number;
  timestamp2: number;
  rangeSeconds: number;
}
export const areTimestampsInRange = ({ timestamp1, timestamp2, rangeSeconds }: IsTimestampsInRangeParams) => {
  const timestampDelta = Math.abs(timestamp2 - timestamp1);
  return rangeSeconds >= timestampDelta;
};

interface GetShippingEstimation {
  min: number;
  max: number;
  isSameDayShipping?: boolean;
  shippingStatus?: string;
}
export const getShippingEstimation = ({ min, max, isSameDayShipping, shippingStatus }: GetShippingEstimation) => {
  const estimationTimeline = formatEstimatedShippingTimeline({ min, max, isSameDayShipping });
  const displayableOrderType = ![ORDER_TYPE.FULFILLED, ORDER_TYPE.CANCELLED].includes(shippingStatus);

  return {
    estimation: estimationTimeline,
    shouldShow: !!estimationTimeline && !isTimestampInAPastDate(max) && displayableOrderType
  };
};

export const getFormattedTime = (date: Date): string => {
  const filler = '0';
  return `${String(date.getHours()).padStart(2, filler)}:${String(date.getMinutes()).padStart(2, filler)}`;
};

export const unixSecondsNow = (): number => Math.floor(new Date().getTime() / 1000);

export const dateToUnixSeconds = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

export const getStartOfYear = (date = new Date()): Date => {
  return new Date(date.getFullYear(), 0, 1);
};
interface IsCurrentTimeInTimeRangeParams {
  startTime: Date;
  endTime: Date;
}
export const isCurrentTimeInTimeRange = ({ startTime, endTime }: IsCurrentTimeInTimeRangeParams) => {
  const currentTime = new Date();

  const currentUTCHours = currentTime.getUTCHours();
  const currentUTCMinutes = currentTime.getUTCMinutes();

  const beginningUTCHours = startTime.getUTCHours();
  const beginningUTCMinutes = startTime.getUTCMinutes();

  const endingUTCHours = endTime.getUTCHours();
  const endingUTCMinutes = endTime.getUTCMinutes();

  if (endingUTCHours < beginningUTCHours) {
    if (
      (currentUTCHours < beginningUTCHours && currentUTCHours > endingUTCHours) ||
      (currentUTCHours === beginningUTCHours && currentUTCMinutes < beginningUTCMinutes) ||
      (currentUTCHours === endingUTCHours && currentUTCMinutes > endingUTCMinutes)
    ) {
      return false;
    }
  } else {
    if (
      currentUTCHours < beginningUTCHours ||
      currentUTCHours > endingUTCHours ||
      (currentUTCHours === beginningUTCHours && currentUTCMinutes < beginningUTCMinutes) ||
      (currentUTCHours === endingUTCHours && currentUTCMinutes > endingUTCMinutes)
    ) {
      return false;
    }
  }

  return true;
};

export const daysRemainingInAYearSince = (date: Date) => {
  const endDate = new Date(date.getFullYear(), 11, 31);
  const daysRemainingInAYear = Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  return daysRemainingInAYear;
};

/**
 * Get day count from `startDate` in year till the `range` number of days.
 * if some days in the range falls in next year, subtract those days from the total.
 *
 */
export const getDaysInRangeThisYear = (startDate: Date, range: number) => {
  const _startDate = new Date(startDate);
  _startDate.setFullYear(new Date().getFullYear());
  const daysRemainingInAYear = daysRemainingInAYearSince(_startDate);
  if (daysRemainingInAYear >= range) {
    return range;
  }

  return daysRemainingInAYear;
};

export const getDaysInRangeNextYear = (startDate: Date, range: number) => {
  const daysInRangeThisYear = getDaysInRangeThisYear(startDate, range);
  return range - daysInRangeThisYear;
};

export const isDateInNextNDays = (date: Date, range: number) => {
  const _date = new Date(date);
  _date.setFullYear(new Date().getFullYear());
  const today = new Date();

  if (_date < today) {
    return false;
  }

  const todayPlusRange = new Date();
  todayPlusRange.setDate(today.getDate() + range);

  if (_date < todayPlusRange) {
    return true;
  }

  return false;
};

interface CanUserRedeemBirthdayGiftInNextNDaysParams {
  birthday: Date;
  hasRedeemedThisYear: boolean;
  redeemableInNextNDays: number;
}
/**
 * Considerations:
 * - User can redeem birthday gift only once per year and only on their birthday month.
 */
export const canUserRedeemBirthdayGiftInNextNDays = ({
  birthday,
  hasRedeemedThisYear,
  redeemableInNextNDays
}: CanUserRedeemBirthdayGiftInNextNDaysParams) => {
  const today = new Date();
  const daysInRangeNextYear = getDaysInRangeNextYear(today, redeemableInNextNDays);

  if (hasRedeemedThisYear) {
    if (daysInRangeNextYear > 0) {
      const lastDateInRangeOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
      lastDateInRangeOfNextYear.setDate(lastDateInRangeOfNextYear.getDate() + daysInRangeNextYear);
      const birthdayNextYear = new Date(birthday);
      birthdayNextYear.setFullYear(today.getFullYear() + 1);
      if (birthdayNextYear < lastDateInRangeOfNextYear) {
        return true;
      }

      return false;
    } else {
      return false;
    }
  } else {
    const birthdayMonth = birthday.getMonth();
    isDateInNextNDays(birthday, redeemableInNextNDays);
    if (today.getMonth() === birthdayMonth || isDateInNextNDays(birthday, redeemableInNextNDays)) {
      return true;
    }

    return false;
  }
};
