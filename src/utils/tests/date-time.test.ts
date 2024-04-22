import { DATETIME_FORMAT_TYPE } from '../../constants/application/global';
import { initMomentLocale, formatDateTime } from '../date-time';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

/* Utils: Convert to timestamp */
const convertStringToUnixTime = (time) => Math.round(new Date(time).getTime() / 1000);

describe(`Format Date Time`, () => {
  initMomentLocale();

  it(`when 'type' is auto with time in the past`, () => {
    jest.setSystemTime(new Date('2021-04-30 12:30:30'));

    expect(formatDateTime(convertStringToUnixTime('2021-04-30 12:29:10'))).toBe('Một phút trước');
    expect(formatDateTime(convertStringToUnixTime('2021-04-30 12:28:40'))).toBe('2 phút trước');
    expect(formatDateTime(convertStringToUnixTime('2021-04-30 11:29:00'))).toBe('Một giờ trước');
    expect(formatDateTime(convertStringToUnixTime('2021-04-29 11:29:00'))).toBe('Hôm qua lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-28 11:29:00'))).toBe('Thứ Tư lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-27 11:29:00'))).toBe('Thứ Ba lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-26 11:29:00'))).toBe('Thứ Hai lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-25 11:29:00'))).toBe('Chủ Nhật lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-24 11:29:00'))).toBe('Thứ Bảy lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-23 11:29:00'))).toBe('Thứ Sáu lúc 11:29');
    expect(formatDateTime(convertStringToUnixTime('2021-04-22 11:29:00'))).toBe('22/04/2021 lúc 11:29');
  });

  it(`when 'type' is auto with time in future`, () => {
    jest.setSystemTime(new Date('2021-04-30 12:30:30'));

    expect(formatDateTime(convertStringToUnixTime('2021-04-30 12:30:40'))).toBe('Vài giây tới');
    expect(formatDateTime(convertStringToUnixTime('2021-04-30 12:32:40'))).toBe('2 phút tới');
    expect(formatDateTime(convertStringToUnixTime('2021-04-30 13:33:40'))).toBe('Một giờ tới');
    expect(formatDateTime(convertStringToUnixTime('2021-05-01 11:29:00'))).toBe('Một ngày tới');
    expect(formatDateTime(convertStringToUnixTime('2021-05-03 11:29:00'))).toBe('3 ngày tới');
    expect(formatDateTime(convertStringToUnixTime('2021-05-10 11:29:00'))).toBe('10 ngày tới');
    expect(formatDateTime(convertStringToUnixTime('2021-08-10 11:29:00'))).toBe('3 tháng tới');
  });

  it(`when 'type' with format string`, () => {
    const time = Math.round(new Date('2019-12-13 13:29').getTime() / 1000);

    expect(formatDateTime(time, DATETIME_FORMAT_TYPE.DD_MM)).toBe('13/12');
    expect(formatDateTime(time, DATETIME_FORMAT_TYPE.DD_MM_YYYY)).toBe('13/12/2019');
    // expect(formatDateTime(time, DATETIME_FORMAT_TYPE.HH_MM_DD_MM_YYYY)).toBe('13/12/2019 lúc 13:29');
    expect(formatDateTime(time, DATETIME_FORMAT_TYPE.FULL_INFO)).toBe('Thứ Sáu, 13/12/2019 lúc 13:29');
  });
});
