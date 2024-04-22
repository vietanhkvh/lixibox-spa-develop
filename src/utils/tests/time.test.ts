import {
  canUserRedeemBirthdayGiftInNextNDays,
  daysRemainingInAYearSince,
  getDaysInRangeNextYear,
  getDaysInRangeThisYear,
  getFormattedTime,
  isCurrentTimeInTimeRange,
  isDateInNextNDays
} from '../time';

describe('getFormattedTime', () => {
  test(`generates expected time string`, () => {
    expect(getFormattedTime(new Date('2021/01/01 21:00:01'))).toEqual('21:00');
    expect(getFormattedTime(new Date('2021/01/01 06:00:01'))).toEqual('06:00');
    expect(getFormattedTime(new Date('2021/01/01 00:00:01'))).toEqual('00:00');
  });
});

describe('isCurrentTimeInTimeRange', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.setSystemTime(jest.getRealSystemTime());
    jest.useRealTimers();
  });

  describe(`when time range is within the same day`, () => {
    it('returns true when within range', () => {
      const startTime = new Date();
      startTime.setHours(9, 0, 0);
      const endTime = new Date();
      endTime.setHours(17, 0, 0);

      // check start time
      jest.setSystemTime(startTime);
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);

      // check end time
      jest.setSystemTime(endTime);
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);

      // check time in between the range
      jest.setSystemTime(new Date(new Date(startTime).setHours(startTime.getHours() + 1)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);
    });

    it('returns false when outside of the range', () => {
      const startTime = new Date();
      startTime.setHours(9, 0, 0);
      const endTime = new Date();
      endTime.setHours(17, 0, 0);

      // check start time - 1 minute
      jest.setSystemTime(new Date(new Date(startTime).setHours(startTime.getHours() - 1, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check end time + 1 minute
      jest.setSystemTime(new Date(new Date(endTime).setHours(endTime.getHours(), 1, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time at the beginning of the day
      jest.setSystemTime(new Date(new Date(startTime).setHours(0, 0, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time at the end of the day
      jest.setSystemTime(new Date(new Date(startTime).setHours(23, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);
    });
  });

  describe(`when time range spans to the next day`, () => {
    it('returns true when within range', () => {
      const startTime = new Date();
      startTime.setHours(20, 0, 0);
      const endTime = new Date();
      endTime.setHours(4, 0, 0);

      // check start time
      jest.setSystemTime(startTime);
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);

      // check end time
      jest.setSystemTime(endTime);
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);

      // check time in between the range - end of the day
      jest.setSystemTime(new Date(new Date(startTime).setHours(23, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);

      // check time in between the range - beginning of next day
      jest.setSystemTime(new Date(new Date(startTime).setHours(0, 0, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(true);
    });

    it('returns false when outside of the range', () => {
      const startTime = new Date();
      startTime.setHours(20, 0, 0);
      const endTime = new Date();
      endTime.setHours(4, 0, 0);

      // check start time - 1 minute
      jest.setSystemTime(new Date(new Date(startTime).setHours(startTime.getHours() - 1, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check end time + 1 minute
      jest.setSystemTime(new Date(new Date(endTime).setHours(endTime.getHours(), 1, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time on the previous day - outside of the range - 1
      jest.setSystemTime(new Date(new Date(startTime).setHours(startTime.getHours() - 1, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time on the previous day - outside of the range - 2
      jest.setSystemTime(new Date(new Date(startTime).setHours(endTime.getHours(), 1, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time on the next day - outside of the range - 1
      jest.setSystemTime(new Date(new Date(endTime).setHours(endTime.getHours(), 1, 0)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);

      // check time on the next day - outside of the range - 2
      jest.setSystemTime(new Date(new Date(endTime).setHours(startTime.getHours() - 1, 59, 59)));
      expect(isCurrentTimeInTimeRange({ startTime, endTime })).toBe(false);
    });
  });
});

describe('daysRemainingInAYearSince', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 11, 10)); // December 10, 2021
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the correct number of days remaining in the year (1)', () => {
    const date = new Date(2022, 0, 1); // January 1, 2022
    const result = daysRemainingInAYearSince(date);
    expect(result).toBe(364);
  });

  it('should return the correct number of days remaining in the year (2)', () => {
    const date = new Date(2020, 11, 10); // December 10, 2020
    const result = daysRemainingInAYearSince(date);
    expect(result).toBe(21);
  });

  it('should return 0 if the date is the last day of the year', () => {
    const date = new Date(2015, 11, 31); // December 31, 2015
    const result = daysRemainingInAYearSince(date);
    expect(result).toBe(0);
  });
});

describe('getDaysInRangeThisYear', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 11, 10)); // December 10, 2021
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the correct number of days for a range within the same year', () => {
    const startDate = new Date(2022, 0, 1); // January 1, 2022
    const range = 10;
    const result = getDaysInRangeThisYear(startDate, range);
    expect(result).toBe(10);
  });

  it('should return the correct number of days for a range spanning into the next year', () => {
    const startDate = new Date(2022, 11, 20); // December 20, 2022
    const range = 20;
    const result = getDaysInRangeThisYear(startDate, range);
    expect(result).toBe(11);
  });

  it('should return 0 if the range starts from the last day of the year', () => {
    const startDate = new Date(2022, 11, 31); // December 31, 2022
    const range = 10;
    const result = getDaysInRangeThisYear(startDate, range);
    expect(result).toBe(0);
  });
});

describe('getDaysInRangeNextYear', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 11, 10)); // December 10, 2021
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the correct number of days for a range within the same year', () => {
    const startDate = new Date(2022, 0, 1); // January 1, 2022
    const range = 10;
    const result = getDaysInRangeNextYear(startDate, range);
    expect(result).toBe(0);
  });

  it('should return the correct number of days for a range spanning into the next year', () => {
    const startDate = new Date(2022, 11, 20); // December 20, 2022
    const range = 20;
    const result = getDaysInRangeNextYear(startDate, range);
    expect(result).toBe(9);
  });

  it('should return all days in range if the range starts from the last day of the year', () => {
    const startDate = new Date(2022, 11, 31); // December 31, 2022
    const range = 10;
    const result = getDaysInRangeNextYear(startDate, range);
    expect(result).toBe(10);
  });
});

describe('isDateInNextNDays', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 11, 10)); // December 10, 2021
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return true if the date is within the next N days', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    const range = 10;
    const result = isDateInNextNDays(date, range);
    expect(result).toBe(true);
  });

  it('should return false if the date is not within the next N days', () => {
    const date = new Date();
    date.setDate(date.getDate() + 15); // 15 days from now
    const range = 10;
    const result = isDateInNextNDays(date, range);
    expect(result).toBe(false);
  });

  it('should return false if the date is in the past', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5); // 5 days ago
    const range = 10;
    const result = isDateInNextNDays(date, range);
    expect(result).toBe(false);
  });
});

describe('canUserRedeemBirthdayGiftInNextNDays', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 10, 2)); // November 2, 2023
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return true if the user has not redeemed the gift this year and it is their birthday month', () => {
    const params = {
      birthday: new Date(1990, 11, 1),
      hasRedeemedThisYear: false,
      redeemableInNextNDays: 30
    };
    const result = canUserRedeemBirthdayGiftInNextNDays(params);
    expect(result).toBe(true);
  });

  it('should return true if the user has not redeemed the gift this year and their birthday is next month', () => {
    const params = {
      birthday: new Date(1990, 11, 1),
      hasRedeemedThisYear: false,
      redeemableInNextNDays: 30
    };
    const result = canUserRedeemBirthdayGiftInNextNDays(params);
    expect(result).toBe(true);
  });

  it('should return false if the user has redeemed the gift this year and their birthday is this month', () => {
    const params = {
      birthday: new Date(1990, 10, 1),
      hasRedeemedThisYear: true,
      redeemableInNextNDays: 30
    };
    const result = canUserRedeemBirthdayGiftInNextNDays(params);
    expect(result).toBe(false);
  });

  it('should return true if the user has redeemed the gift this year and their birthday is in 90 days (next year)', () => {
    const params = {
      birthday: new Date(1990, 0, 1), // January 1, 1990
      hasRedeemedThisYear: true,
      redeemableInNextNDays: 90
    };
    const result = canUserRedeemBirthdayGiftInNextNDays(params);
    expect(result).toBe(true);
  });

  it('should return true if the user has redeemed the gift this year and their birthday is beyond 90 days (next year)', () => {
    const params = {
      birthday: new Date(1990, 2, 3), // March 3, 1990
      hasRedeemedThisYear: true,
      redeemableInNextNDays: 90
    };
    const result = canUserRedeemBirthdayGiftInNextNDays(params);
    expect(result).toBe(false);
  });

  it('should false if taken the null/undefined birthday param & hasRedeemedThisYear is false', () => {
    const params1 = { birthday: new Date(undefined), hasRedeemedThisYear: false, redeemableInNextNDays: 90 };
    const result1 = canUserRedeemBirthdayGiftInNextNDays(params1);
    expect(result1).toBe(false);

    const params2 = Object.assign({}, params1, { birthday: new Date(null) });
    const result2 = canUserRedeemBirthdayGiftInNextNDays(params2);
    expect(result2).toBe(false);
  });

  it('should true if taken the null/undefined birthday param & hasRedeemedThisYear is true', () => {
    const params1 = { birthday: new Date(undefined), hasRedeemedThisYear: true, redeemableInNextNDays: 90 };
    const result1 = canUserRedeemBirthdayGiftInNextNDays(params1);
    expect(result1).toBe(true);

    const params2 = Object.assign({}, params1, { birthday: new Date(null) });
    const result2 = canUserRedeemBirthdayGiftInNextNDays(params2);
    expect(result2).toBe(true);
  });

  it('should false if taken the null/undefined birthday param & hasRedeemedThisYear is false & redeemableInNextNDays is a negative number ', () => {
    const params1 = { birthday: new Date(undefined), hasRedeemedThisYear: false, redeemableInNextNDays: -1 };
    const result1 = canUserRedeemBirthdayGiftInNextNDays(params1);
    expect(result1).toBe(false);

    const params2 = Object.assign({}, params1, { birthday: new Date(null) });
    const result2 = canUserRedeemBirthdayGiftInNextNDays(params2);
    expect(result2).toBe(false);
  });

  it('should false if taken the null/undefined birthday param & hasRedeemedThisYear is true & redeemableInNextNDays is a negative number ', () => {
    const params1 = { birthday: new Date(undefined), hasRedeemedThisYear: true, redeemableInNextNDays: -1 };
    const result1 = canUserRedeemBirthdayGiftInNextNDays(params1);
    expect(result1).toBe(false);

    const params2 = Object.assign({}, params1, { birthday: new Date(null) });
    const result2 = canUserRedeemBirthdayGiftInNextNDays(params2);
    expect(result2).toBe(false);
  });
});
