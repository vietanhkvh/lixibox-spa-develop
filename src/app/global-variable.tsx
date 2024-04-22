import 'babel-polyfill';
import 'ts-helpers';

declare global {
  interface Window {
    webWorker: any;
    callBackGetXhr: any;

    WORKER_INIT: boolean;
    DEVICE_VERSION: string;
    BREAK_POINT: number;
    isInsightsBot: boolean;

    hj?: (p0?: any, p1?: any, p2?: any) => any; // Hotjar
    AppleID: any;
    gapi: any;
    Moengage: { [key: string]: any };

    gtag: any;
    google_optimize: any;

    airbridge: any;
    branch?: { [key: string]: any };
    _paq: { [key: string]: any };

    identificationXHR: any;

    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}
