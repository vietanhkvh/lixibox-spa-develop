import { storageKey } from '../constants/application/client-storage';
import { store } from '../app/init-react-app';

export const workerPostMessageCreator = ({ worker, data }) => {
  if (!!window.WORKER_INIT) {
    callWorker({ worker, data });
    return;
  }

  let intervalCheckWorker = setInterval(() => {
    if (!!window.WORKER_INIT) {
      callWorker({ worker, data });
      clearInterval(intervalCheckWorker);
      return;
    }
  }, 1000);
};

const callWorker = ({ worker, data }) => {
  const addOnHeader = generateAddOnHeader();
  const dataWithAddOnHeader = {
    ...data,
    addOnHeader
  };

  !!worker &&
    !!window.webWorker.postMessage &&
    window.webWorker.postMessage({
      worker,
      data: dataWithAddOnHeader
    });
};

const generateAddOnHeader = () => {
  const utmData = getUtmData();

  return Object.assign(
    {},
    {
      referrerUrl: document.referrer || '',
      uuid: localStorage.getItem(storageKey.UUID) || ''
    },
    !!utmData && { utmData }
  );
};

const getUtmData = () => {
  try {
    const state = store.getState();
    const trackingState = state && (state as any).tracking;
    const { utmId, utmSource, utmMedium, utmCampaign, utmExpiredTime } = trackingState;

    /** Not Exist */
    if (!utmExpiredTime || !utmId) return null;

    const now = new Date().getTime();
    const isExpired = utmExpiredTime - now <= 0;

    /** Have Exprired */
    if (!!isExpired) return null;

    return Object.assign(
      {},
      !!utmId && { utmId },
      !!utmSource && { utmSource },
      !!utmMedium && { utmMedium },
      !!utmCampaign && { utmCampaign }
    );
  } catch (e) {
    return null;
  }
};
