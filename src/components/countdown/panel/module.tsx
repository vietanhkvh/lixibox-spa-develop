export const parseCountdownTime = (remainingTime) => {
  const ONE_MINUTE = 60;
  const ONE_HOUR = 60 * 60;
  const ONE_DAY = 60 * 60 * 24;
  const convertedRemainingTime = remainingTime * 1;

  /** get day */
  const day = Math.floor(convertedRemainingTime / ONE_DAY);

  /** get hour */
  const remainingHour = convertedRemainingTime - day * ONE_DAY;
  const hour = Math.floor(remainingHour / ONE_HOUR);

  /** get minute */
  const remainingMinute = convertedRemainingTime - day * ONE_DAY - hour * ONE_HOUR;
  const minute = Math.floor(remainingMinute / ONE_MINUTE);

  /** get second */
  const remainingSecond = convertedRemainingTime - day * ONE_DAY - hour * ONE_HOUR - minute * ONE_MINUTE;
  const second = Math.floor(remainingSecond);

  return { day, hour, minute, second };
};

export const calculateTime = (data) => {
  const { start_at, end_at } = data;
  const currentTime = Math.floor(new Date().getTime() / 1000);

  if (currentTime < start_at || currentTime > end_at) {
    return { isValidateTime: false, time: null };
  }

  const remainingTime = end_at - currentTime;
  const { day, hour, minute, second } = parseCountdownTime(remainingTime);
  return { isValidateTime: true, time: { day, hour, minute, second } };
};
