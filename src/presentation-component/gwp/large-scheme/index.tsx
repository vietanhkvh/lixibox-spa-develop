import { useState, useEffect, useRef } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Scheme } from 'types/api/gwp';
import { usePrevious } from 'utils/hook';
import { ROUTING_GWP_DETAIL } from 'routings/path';
import {
  areTimestampsInRange,
  isTimestampInFuture,
  isTimestampInPast,
  timestampDeltaToFormattedDuration,
  unixSecondsNow
} from 'utils/time';
import { isMobileVersion } from 'utils';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';
import { getIsSchemeExpired } from 'utils/gwp';

const COUNTDOWN_UPDATE_INTERVAL_MS = 1000;

interface CountdownState {
  day: number;
  hour: number;
  minute: number;
  second: number;
}
interface ViewProps {
  scheme: Scheme;
  link: string;
  descriptionText: string;
  countdown: CountdownState;
  shouldShowCountdown: boolean;
  countdownText: string;
  classes?: { container?: string };
  themeColor?: string;
  isExpired: boolean;
  onClick: (scheme: Scheme) => void;
  onCopy?: (code: string) => void;
}
interface LargeSchemeProps {
  scheme: Scheme;
  classes?: { container?: string };
  themeColor?: string;
  onClick?: (scheme: Scheme) => void;
  onCopy?: (code: string) => void;
  onCountdownExpire?: () => void;
}
const LargeScheme = ({ scheme, classes, themeColor, onClick, onCopy, onCountdownExpire }: LargeSchemeProps) => {
  const history = useHistory();
  const intervalId = useRef<NodeJS.Timeout>();
  const [countdown, setCountdown] = useState<CountdownState>({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  });
  const descriptionText = scheme.description || '';
  const discountCodeStartDate = scheme.discount_code?.start_date;
  const discountCodeEndDate = scheme.discount_code?.end_date;
  const aDayInSeconds = 24 * 60 * 60;

  const shouldShowUpcomingCountdown =
    discountCodeStartDate &&
    isTimestampInFuture(discountCodeStartDate) &&
    areTimestampsInRange({
      timestamp1: discountCodeStartDate,
      timestamp2: unixSecondsNow(),
      rangeSeconds: aDayInSeconds * 3
    });
  const shouldShowExpiringCountdown =
    (!discountCodeStartDate || isTimestampInPast(discountCodeStartDate)) &&
    isTimestampInFuture(discountCodeEndDate) &&
    areTimestampsInRange({
      timestamp1: discountCodeEndDate,
      timestamp2: unixSecondsNow(),
      rangeSeconds: aDayInSeconds
    });

  const shouldShowCountdown = shouldShowUpcomingCountdown || shouldShowExpiringCountdown;
  const countdownText = shouldShowCountdown ? (shouldShowUpcomingCountdown ? 'Bắt đầu sau' : 'Kết thúc trong') : '';
  const didShowCountdown = usePrevious(shouldShowCountdown);
  const didShowUpcomingCountdown = usePrevious(shouldShowUpcomingCountdown);
  const didShowExpiringCountdown = usePrevious(shouldShowExpiringCountdown);
  useEffect(() => {
    if (!didShowCountdown && shouldShowCountdown) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        shouldShowUpcomingCountdown &&
          setCountdown(
            timestampDeltaToFormattedDuration({ timestamp1: unixSecondsNow(), timestamp2: discountCodeStartDate })
          );
        shouldShowExpiringCountdown &&
          setCountdown(
            timestampDeltaToFormattedDuration({ timestamp1: unixSecondsNow(), timestamp2: discountCodeEndDate })
          );
      }, COUNTDOWN_UPDATE_INTERVAL_MS);
    }

    if (
      (didShowUpcomingCountdown && !shouldShowUpcomingCountdown) ||
      (didShowExpiringCountdown && !shouldShowExpiringCountdown)
    ) {
      clearInterval(intervalId.current);
      onCountdownExpire?.();
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [shouldShowCountdown, shouldShowUpcomingCountdown, shouldShowExpiringCountdown]);

  const isExpired = getIsSchemeExpired(scheme);
  const link = isExpired ? '#' : generatePath(ROUTING_GWP_DETAIL, { gwpSlug: scheme?.slug || '' });
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        scheme,
        link,
        descriptionText,
        countdown,
        shouldShowCountdown,
        countdownText,
        classes,
        themeColor,
        isExpired,
        onClick: () => {
          if (isExpired) return;
          history.push(generatePath(ROUTING_GWP_DETAIL, { gwpSlug: scheme?.slug || '' }));
          onClick?.(scheme);
        },
        onCopy
      }}
    />
  );
};

export type { ViewProps };
export default LargeScheme;
