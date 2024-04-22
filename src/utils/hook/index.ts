import { useEffect, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../../utils/auth';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as any;
}

// Supports scenarios where multiple refs of a single element is required
// Ref.: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
// TODO: Investigate performance
export function useCombinedRefs(...refs) {
  const targetRef = useRef(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;
type IntervalIdGetter = (id: any) => void;
/**
 * Provides a declarative useInterval
 * Concept: https://overreacted.io/making-setinterval-declarative-with-react-hooks
 *
 * Behavior:
 * - `useInterval` acts as a functional component compatible counterpart of `setInterval`
 * - Get internal interval timer ID using `getIntervalId` callback
 *
 * @param callback - Function that will be called every `delay` ms.
 * @param delay - Number representing the delay in ms. Set to `null` to "pause" the interval.
 */
export const useInterval = (callback: TimerHandler, delay: Delay, getIntervalId?: IntervalIdGetter) => {
  const savedCallbackRef = useRef<TimerHandler>();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      getIntervalId && getIntervalId(intervalId);
      return () => {
        getIntervalId || clearInterval(intervalId);
      };
    }
  }, [delay]);
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export const useSigninEvent = (callback) => {
  const loggedIn = auth.loggedIn();
  const prevLoggedIn = usePrevious(loggedIn);

  !prevLoggedIn && loggedIn && callback();
};

/**
 * Authenticates user using app access token when query param `access_token` is present on arbitrary path
 */
export const useAppAccessTokenAuthentication = (callback: ({ accessToken }) => void) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    const accessToken = query.get('access_token');

    if (accessToken) {
      callback?.({ accessToken });
      query.delete('access_token');
      const pathToReplace = location.pathname + query.toString() ? `?${query.toString()}` : '';
      history.replace(pathToReplace);
    }
  }, []);
};

export const useSearchParamsChangeEffect = (callback) => {
  const { search } = useLocation();
  const prevSearch = usePrevious(search);

  useEffect(() => {
    prevSearch !== undefined && prevSearch !== search && callback(search, prevSearch);
  }, [search, prevSearch, search]);
};

const SCROLL_TRACKING_INTERVAL = 2000;
export const useScrollTracker = (callback: (percentage: number) => void, trackingIntervalMs?: number) => {
  useEffect(() => {
    let scrollTimeout = null;

    const onScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const docHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const windowBottom = windowHeight + scrollPosition;
        if (windowBottom >= docHeight) {
          callback(100);
        } else {
          callback(parseFloat(((scrollPosition / (docHeight - windowHeight)) * 100).toFixed(2)));
        }
      }, trackingIntervalMs || SCROLL_TRACKING_INTERVAL);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [callback]);
};

export const useKeyListener = (key: string, callback: () => void) => {
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, []);
};
