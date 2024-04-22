import * as Sentry from '@sentry/react';
import addContextSessionInfo from './before-send-hooks/add-context-session-info';
import limitPayloadSize from './before-send-hooks/limit-payload-size';
import filterEvents from './before-send-hooks/filter-events';

// Ref.: https://gist.github.com/impressiver/5092952
const IGNORE_ERRORS = [
  // Random plugins/extensions
  'top.GLOBALS',
  // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
  'originalCreateNotification',
  'canvas.contentDocument',
  'MyApp_RemoveAllHighlights',
  'http://tt.epicplay.com',
  "Can't find variable: ZiteReader",
  'jigsaw is not defined',
  'ComboSearch is not defined',
  'http://loading.retry.widdit.com/',
  'atomicFindClose',
  // Facebook borked
  'fb_xd_fragment',
  // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
  // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
  'bmi_SafeAddOnload',
  'EBCallBackMessageReceived',
  // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
  'conduitPage',
  // Generic error code from errors outside the security sandbox
  // You can delete this if using raven.js > 1.0, which ignores these automatically.
  'Script error.',
  `Can't find variable: zaloJSV2`,
  `zaloJSV2 is not defined`,
  // MoEngage specific error (apparently, majority of the errors are related to IndexedDB)
  `UnknownError: Database deleted by request of the user`,
  `UnknownError: An internal error was encountered in the Indexed Database server`,
  `UnknownError: Attempt to delete range from database without an in-progress transaction`,
  `UnknownError: Connection to Indexed Database server lost. Refresh the page to try again`,
  `UnknownError: Internal error opening backing store for indexedDB.open.`,
  `TimeoutError: Transaction timed out due to inactivity.`,
  `UnknownError: Unable to open cursor`,
  `UnknownError: Unable to open database file on disk`,
  `UnknownError: Error creating or migrating Records table in database`,
  `UnknownError: Attempt to clear an object store without an in-progress transaction`,
  `AbortError: The transaction was aborted, so the request cannot be fulfilled.`,
  `UnknownError: Attempt to get a record from database without an in-progress transaction`,
  `UnknownError: Attempt to iterate a cursor that doesn't exist`,
  `AbortError: Version change transaction was aborted in upgradeneeded event handler.`,
  `UnknownError: Connection is closing.`,
  `Block-scoped declarations (let, const, function, class) not yet supported outside strict mode`,
  `Non-Error promise rejection captured with value: false`,
  `Non-Error promise rejection captured with value: null`,
  `Non-Error promise rejection captured with value: JSBRIDGE TIMEOUT`,
  `Non-Error exception captured with keys: error`,
  // FB SDK specific error. Couldn't trace back
  `Cannot read properties of undefined (reading 'retry')`,
  `b.postMessage is not a function.`,
  `e.postMessage is not a function.`,
  `undefined is not an object (evaluating 'd.ex.retry')`,
  `undefined is not an object (evaluating 'r.searchParams.set')`,
  `Cannot find function set in object .`,
  `Illegal invocation`,
  `Cannot find function set in object .`,
  // Others: Couldn't be traced back
  `Unexpected token '='`,
  `function Error() { [native code] }`,
  `ResizeObserver loop limit exceeded`, // https://stackoverflow.com/a/50387233
  `undefined is not an object (evaluating 'window.mraidbridge.setCurrentPosition')`,
  `undefined is not an object (evaluating 'window.mraidbridge.setCurrentAppOrientation')`,
  `undefined is not an object (evaluating 'window.mraidbridge.fireExposureChangeEvent')`,
  `undefined is not an object (evaluating 'window.mraidbridge.setMaxSize')`,
  `undefined is not an object (evaluating 'window.mraidbridge.setExpandProperties')`,
  `init not called with valid version`,
  `Can't find variable: al_onAdViewRendered`,
  `ToutiaoJSBridge._handleMessageFromToutiao is not a function`,
  `AbortError: The operation was aborted.`, // https://stackoverflow.com/a/54082486 (workaround not found)
  `Cannot read property 'then' of undefined`,
  `missing ) after argument list`
];
const DENY_URLS = [
  // Facebook flakiness
  /graph\.facebook\.com/i,
  // Facebook blocked
  /connect\.facebook\.net\/en_US\/all\.js/i,
  // Woopra flakiness
  /eatdifferent\.com\.woopra-ns\.com/i,
  /static\.woopra\.com\/js\/woopra\.js/i,
  // Chrome extensions
  /extensions\//i,
  /^chrome:\/\//i,
  // Other plugins
  /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
  /webappstoolbarba\.texthelp\.com\//i,
  /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  // Moengage
  /sdk-01\.moengage\.com/i,
  /cdn\.moengage\.com/i,
  /image\.moengage\.com/i,
  // Criteo
  /dynamic\.criteo\.com/i,
  /sslwidget\.criteo\.com/i,
  /gum\.criteo\.com/i,
  /dis\.criteo\.com/i
];

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_ENV === 'development' ? undefined : process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENV,
    release: process.env.REACT_APP_REVISION,
    maxBreadcrumbs: 50,
    debug: process.env.REACT_APP_ENV !== 'production',
    sampleRate: 1.0,
    normalizeDepth: 3,
    ignoreErrors: IGNORE_ERRORS,
    denyUrls: DENY_URLS,
    beforeSend: (event, hint) =>
      eventProcessor({ event, hint }, [addContextSessionInfo, limitPayloadSize, filterEvents])
  });
};

const eventProcessor = ({ event, hint }, hooks: Array<any>) => {
  hooks.forEach((hook) => {
    event = hook({ event, hint });
  });

  return event;
};
