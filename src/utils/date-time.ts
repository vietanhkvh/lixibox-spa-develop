import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import 'moment/locale/vi';

export const initMomentLocale = () => {
  moment.updateLocale('vi', {
    weekdays: 'Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM [năm] YYYY',
      LLL: 'D MMMM [năm] YYYY HH:mm',
      LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
      l: 'DD/M/YYYY',
      ll: 'D MMM YYYY',
      lll: 'DD/MM/YYYY [lúc] HH:mm',
      llll: 'dddd, DD/MM/YYYY [lúc] HH:mm'
    },
    calendar: {
      nextDay: '[Ngày mai lúc] LT',
      nextWeek: 'dddd [tuần tới lúc] LT',
      lastDay: '[Hôm qua lúc] LT',
      lastWeek: 'dddd [lúc] LT',
      sameElse: 'dddd [lúc] LT'
    },
    relativeTime: {
      s: 'Vài giây',
      m: 'Một phút',
      h: 'Một giờ',
      d: 'Một ngày',
      w: 'Một tuần',
      M: 'Một tháng',
      y: 'Một năm'
    }
  });

  moment.locale('vi');
};

/**
 * Format date time
 * @param {number} unixTime
 * @param {string} type
 * @returns {string}
 */
export const formatDateTime = (unixTime: number, type: string = ''): string => {
  const now = moment();
  const day = moment.unix(unixTime);
  const dayDiff = now.diff(day, 'day');

  if (!type || !type.length) {
    /* Format with meaningful content */
    /* Same day */
    if (dayDiff < 1) return day.fromNow();

    /* Same week */
    if (dayDiff < 8) return day.calendar();

    /* Format with DD/MM/YY HH:MM */
    return day.format('lll');
  }

  /* Format with string type */
  return day.format(type);
};

export const formatRemainingDuration = (timestamp: number): string => {
  momentDurationFormatSetup(moment); // FIXME: Optimize
  const unixSecondsNow = Math.floor(new Date().getTime() / 1000);
  let remainingSeconds = timestamp - unixSecondsNow;

  return remainingSeconds >= 0 ? (moment as any).duration(remainingSeconds, 'seconds').format('h:mm:ss') : '';
};
