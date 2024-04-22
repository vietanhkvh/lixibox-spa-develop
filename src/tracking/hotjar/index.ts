/**
 * NOTE:
 * - Hotjar script is hosted on GTM
 */
import { store } from '../../app/init-react-app';

function getUserId() {
  var userId = null;
  try {
    const state = store.getState();
    const authState = state && (state as any).auth;

    if (!!authState) {
      userId = (authState.userInfo && authState.userInfo.id) || null;
    }
  } catch (e) {
    return userId;
  }
  return userId;
}

const attemptSettingHotjarUser = () => {
  if (typeof window.hj === 'function') {
    window.hj('identify', getUserId(), {});
    return true;
  }
};

export const initHotjar = () => {
  if (!attemptSettingHotjarUser()) {
    const MAX_RETRY = 10;
    const RETRY_INTERVAL = 500; // MS
    let intervalID = null;
    let attempt = 0;

    intervalID = setInterval(() => {
      attempt += 1;

      if (attempt >= MAX_RETRY) {
        clearInterval(intervalID);
        return;
      }

      if (!attemptSettingHotjarUser()) {
        return;
      }

      clearInterval(intervalID);
    }, RETRY_INTERVAL);
  }
};
