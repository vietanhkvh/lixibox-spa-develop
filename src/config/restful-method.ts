import { IDetailApi } from '../constants/api/path.api';
import { reportException } from '../tracking/sentry';
import { workerPostMessageCreator } from '../utils/worker';
import { stringToHash } from '../utils/encode';
import { SERVER_API, VERSION_API } from './api';

export const fetchData = (path) =>
  new Promise((resolve, reject) => {
    fetch(path, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then(
        (result) => resolve(result),
        (error) => reject(error)
      );
  });

export const post = (DETAIL_API: IDetailApi, _VERSION_API: string = VERSION_API.VERSION_1, SKIP_RESPONSE = false) =>
  new Promise((resolve, reject) =>
    callApiByWorker({
      method: 'POST',
      detail: DETAIL_API,
      version: _VERSION_API,
      skipResponse: SKIP_RESPONSE
    }).then(
      (result) => resolve(result),
      (error) => reject(error)
    )
  );

export const del = (DETAIL_API: IDetailApi, _VERSION_API: string = VERSION_API.VERSION_1) =>
  new Promise((resolve, reject) =>
    callApiByWorker({
      method: 'DELETE',
      detail: DETAIL_API,
      version: _VERSION_API
    }).then(
      (result) => resolve(result),
      (error) => reject(error)
    )
  );

export const get = (DETAIL_API: IDetailApi, _VERSION_API: string = VERSION_API.VERSION_1) =>
  new Promise((resolve, reject) =>
    callApiByWorker({
      method: 'GET',
      detail: DETAIL_API,
      version: _VERSION_API
    }).then(
      (result) => resolve(result),
      (error) => reject(error)
    )
  );

export const patch = (DETAIL_API: IDetailApi, _VERSION_API: string = VERSION_API.VERSION_1) =>
  new Promise((resolve, reject) =>
    callApiByWorker({
      method: 'PATCH',
      detail: DETAIL_API,
      version: _VERSION_API
    }).then(
      (result) => resolve(result),
      (error) => reject(error)
    )
  );

export const put = (DETAIL_API: IDetailApi, _VERSION_API: string = VERSION_API.VERSION_1) =>
  new Promise((resolve, reject) =>
    callApiByWorker({
      method: 'PUT',
      detail: DETAIL_API,
      version: _VERSION_API
    }).then(
      (result) => resolve(result),
      (error) => reject(error)
    )
  );

export const trackingResponseApi = ({ startTime, endTime, url, description, status, data }) => {
  try {
    // const responseTime = endTime - startTime;
  } catch (e) {
    console.error('Api response tracking trror: ' + e.message);
  }

  // 'function' === typeof gaEventTracking &&
  //   gaEventTracking({
  //     category: GA_TRACKING_EVENT_CATEGORY.API_RESPONSE_TIME,
  //     action: description,
  //     label: url,
  //     value: endTime - startTime,
  //     nonInteraction: true
  //   });

  // 'function' === typeof gaEventTracking &&
  //   gaEventTracking({
  //     category: GA_TRACKING_EVENT_CATEGORY.API_RESPONSE_STATUS,
  //     action: status.toString(),
  //     label: url,
  //     value: 1,
  //     nonInteraction: true
  //   });

  if (process.env.REACT_APP_ENV !== 'development') {
    status * 1 >= 500 && reportException(new Error(`[API] ${status}: ${url}`), { startTime, endTime });
  }
};

const callApiByWorker = ({ method, detail, version, skipResponse = false }) =>
  new Promise((resolve, reject) => {
    /*
     * De-duplicate API calling
     * Identificate API with hash, and set it into the flag
     */
    const identificationData = JSON.stringify({ method, detail });
    const identificationHash = stringToHash(identificationData);

    if (!skipResponse) {
      window.identificationXHR = window.identificationXHR || {};
      if (window.identificationXHR[identificationHash]) return;
      window.identificationXHR[identificationHash] = true;
    }

    const { path } = detail;
    addApiToDetectQueue(path);

    const generatedId = new Date().getTime();
    const apiPathHash = stringToHash(path);
    const xhrCallbackHash = generatedId + apiPathHash;

    const generalData = { id: xhrCallbackHash, server: SERVER_API, version, detail };

    'function' === typeof workerPostMessageCreator &&
      workerPostMessageCreator({
        worker: 'AJAX',
        data: {
          ...generalData,
          method
        }
      });

    if (!skipResponse) {
      window['xhrCallback' + xhrCallbackHash] = (response) => {
        delete window.identificationXHR[identificationHash];

        const { data, status, responseURL } = response;

        status < 400 && status !== 0
          ? resolve({ result: data, status, responseURL })
          : reject({
              ...generalData,
              error: data,
              status,
              responseURL
            });

        trackingResponseApi({
          startTime: generatedId,
          endTime: new Date().getTime(),
          url: path,
          description: detail.description,
          status,
          data
        });

        /* remove call back */
        try {
          delete window['xhrCallback' + xhrCallbackHash];
        } catch (e) {
          window['xhrCallback' + xhrCallbackHash] = undefined;
        }
      };
    }
  });

const addApiToDetectQueue = (path) => {
  try {
    if (!window.apiDetect || !window.apiDetect.url) return;

    if (!window.apiDetect.url[path]) {
      window.apiDetect.url[path] = 1;
    } else {
      window.apiDetect.url[path] = window.apiDetect.url[path] * 1 + 1;
    }
  } catch (e) {}
};
