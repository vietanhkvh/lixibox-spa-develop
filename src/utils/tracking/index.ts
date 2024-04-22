import * as ROUTINGS from 'routings/path';
import { GO_TRACKING_POINT } from 'constants/application/tracking';

const ROUTING_BLACK_LIST = [
  ROUTINGS.ROUTING_AUTH_CONNECT_FACEBOOK,
  ROUTINGS.ROUTING_AUTH_CONNECT_GOOGLE,
  ROUTINGS.ROUTING_USER_ORDER_DETAIL,
  ROUTINGS.ROUTING_USER_ORDER_DETAIL_ONEPAY
];

export const validateInitTracking = () => {
  const { pathname } = window.location;

  if (ROUTING_BLACK_LIST.indexOf(pathname) >= 0) return false;

  return true;
};

export const goTrackingSetPoint = (type, value, extraValue = null) => {
  try {
    // points
    const typeStorage = localStorage.getItem(type);
    const points = typeStorage ? JSON.parse(typeStorage) : [];
    if (points.indexOf(value) >= 0) return;

    const newPoints = [...points, value];
    localStorage.setItem(type, JSON.stringify(newPoints));

    // extra data
    const extraValueStorage = localStorage.getItem(`${type}-extra-value`);
    const extraValueData = extraValueStorage ? JSON.parse(extraValueStorage) : {};
    extraValueData[value] = extraValue;
    localStorage.setItem(`${type}-extra-value`, JSON.stringify(extraValueData));
  } catch (e) {
    //fallback case for points
    localStorage.setItem(type, JSON.stringify([value]));

    //fallback case for extra data
    localStorage.setItem(
      `${type}-extra-value`,
      JSON.stringify({
        value: extraValue
      })
    );
    console.error('goTrackingSetPoint', e);
    return;
  }
};

export const goTrackingCheckPoint = (type, value) => {
  try {
    const data = localStorage.getItem(type);
    if (!data) return;

    const formatedData = JSON.parse(data);
    const existPoint = formatedData.indexOf(value) >= 0;

    return existPoint;
  } catch (e) {
    console.error('goTrackingSetPoint', e);
    return null;
  }
};

export const goTrackingCheckPointExtraValue = (type, value) => {
  try {
    const data = localStorage.getItem(`${type}-extra-value`);
    if (!data) return;

    const formatedData = JSON.parse(data);

    return formatedData[value];
  } catch (e) {
    console.error('goTrackingSetPoint', e);
    return null;
  }
};

export const clearCheckPoint = () => {
  if (!GO_TRACKING_POINT) return;

  const goKeys = Object.keys(GO_TRACKING_POINT);
  goKeys.map((key) => localStorage.removeItem(GO_TRACKING_POINT[key]));
};

export const handleGtagTrackingService = (key: string, payload?: Record<string, any>) => {
  'function' === typeof window.gtag && window.gtag('event', key, payload);
};
