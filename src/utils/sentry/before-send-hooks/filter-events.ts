/**
 * Prevents blacklisted events from being sent to Sentry
 */

const filterEvents = ({ event, hint }) => {
  return event;
};

export default filterEvents;
