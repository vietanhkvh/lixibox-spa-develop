declare global {
  interface Window {
    rateLimiterCooldownOngoing?: boolean;
    rateLimiterSchedulerId?: ReturnType<typeof setTimeout>;
    rateLimiterSchedulerDispatchedAt: number;
  }
}

const DEFAULT_DEBOUNCE_RATE = 1000;

/**
 * Dispatches latest event at a configured delay
 * Examples:
 *   - `<Example onClick={debounceEvent(1000)((data1, data2) => { ... })}>`
 *   - `<Example onClick={event => {
 *        nonDebouncableLogic();
 *        debounceEvent(3000)(e => { ... })(event)
 *      }} >`
 */
export const debounceEvent =
  (debounceRate?: number) =>
  (callback) =>
  (...event) => {
    const DEBOUNCE_RATE = debounceRate || DEFAULT_DEBOUNCE_RATE;

    // Detect and persist synthetic event
    typeof event[0] === 'object' && typeof event[0].persist === 'function' && event[0].persist();

    if (window.rateLimiterCooldownOngoing) {
      clearTimeout(window.rateLimiterSchedulerId);
      window.rateLimiterSchedulerId = setTimeout(() => {
        callback(...event); // TODO: Utilize promise
        window.rateLimiterCooldownOngoing = false;
      }, window.rateLimiterSchedulerDispatchedAt + DEBOUNCE_RATE - Date.now());
    } else {
      window.rateLimiterCooldownOngoing = true;
      window.rateLimiterSchedulerDispatchedAt = Date.now();
      window.rateLimiterSchedulerId = setTimeout(() => {
        callback(...event); // TODO: Utilize promise
        window.rateLimiterCooldownOngoing = false;
      }, DEBOUNCE_RATE);
    }
  };
