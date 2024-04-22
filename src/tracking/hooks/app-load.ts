import { storageKey } from '../../constants/application/client-storage';
import { gatewayTrackSignout } from 'tracking/gateway';

const trackSignout = () => {
  const signoutTrackingInfo = localStorage.getItem(storageKey.MOE_SIGNOUT_TRACKING_INFO);

  if (signoutTrackingInfo) {
    try {
      const userInfo = JSON.parse(signoutTrackingInfo);
      gatewayTrackSignout({ user: userInfo });
      localStorage.removeItem(storageKey.MOE_SIGNOUT_TRACKING_INFO);
    } catch (e) {}
  }
};

// TODO: Move all onAppLoad tracking events in this module
export const trackOnAppLoad = () => {
  trackSignout();
};
