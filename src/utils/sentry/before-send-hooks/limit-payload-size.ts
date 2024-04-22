/**
 * Prevents payload report failure due to exceeding size limit threshold
 * Payload sanitization strategy: Best effort
 */

const limitPayloadSize = ({ event }) => {
  const MAX_EVENT_SIZE = 200; // KB

  try {
    if (eventSize(event) > MAX_EVENT_SIZE) {
      while (eventSize(event) >= MAX_EVENT_SIZE) {
        if (event.breadcrumbs && event.breadcrumbs.length) {
          // remove the oldest breadcrumb
          event.breadcrumbs = event.breadcrumbs.slice(1);
        } else if (event.contexts && Object.keys(event.contexts).length) {
          // remove an arbitrary reference
          delete event.contexts[Object.keys(event.contexts)[0]];
        } else {
          // TODO: Fallback error report
        }
      }
    }
  } catch (e) {
    // FIXME: Report caught exception
    console.error(e);
  }

  return event;
};

const eventSize = (event) => JSON.stringify(event).length / 1024;

export default limitPayloadSize;
