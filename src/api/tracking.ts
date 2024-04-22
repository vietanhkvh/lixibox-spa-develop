import { get, post } from '../config/restful-method';
import { getCsrfToken } from '../utils/auth';

export interface ITrackingViewBoxParams {
  boxId: string;
  expertTrackingItemCode?: string;
  campaignCode?: string;
  referrerObjectType?: string;
  referrerObjectId?: string;
}

const generateParams = (key, value) => (value ? { [key]: value } : {});

export const trackingViewBox = ({
  boxId,
  expertTrackingItemCode,
  campaignCode,
  referrerObjectType,
  referrerObjectId
}: ITrackingViewBoxParams) => {
  const csrfToken = getCsrfToken();

  const data = Object.assign(
    {},
    {
      csrf_token: csrfToken,
      box_id: boxId
    },
    generateParams('expert_tracking_item_code', expertTrackingItemCode),
    generateParams('campaign_code', campaignCode),
    generateParams('referrer_object_type', referrerObjectType),
    generateParams('referrer_object_id', referrerObjectId)
  );

  return post({
    path: '/trackings/view_box',
    data,
    description: '[Tracking] Tracking view box /trackings/view_box',
    errorMesssage: `Can't tracking data. Please try again`
  });
};

/**
 * Fetch experts tracking groupst by code
 *
 * @param {string} code
 */
export const fetchExpertsTrackingGroup = (code: string) => {
  return get({
    path: `/experts/tracking_groups/${code}`,
    description: '[Tracking] Fetch experts tracking groupst /experts/tracking_groups/:code',
    errorMesssage: `Can't getch experts tracking groupst by code. Please try again`
  });
};

export const trackingViewGroup = ({
  groupObjectType,
  groupObjectId,
  referrerObjectType,
  referrerObjectId,
  campaignCode
}) => {
  const csrfToken = getCsrfToken();

  const data = Object.assign(
    {},
    {
      csrf_token: csrfToken,
      group_object_type: groupObjectType,
      group_object_id: groupObjectId
    },
    generateParams('referrer_object_type', referrerObjectType),
    generateParams('referrer_object_id', referrerObjectId),
    generateParams('campaign_code', campaignCode)
  );

  return post({
    path: '/trackings/view_group',
    data,
    description: '[Tracking] Tracking view group /trackings/view_group',
    errorMesssage: `Can't tracking group. Please try again`
  });
};

/**
 * Get utm id from affiliate tracking
 *
 * @param {string} sskey
 *
 */
export const getUtmIdFromAffiliateTrackingApi = (trackingKey: string, utm_source: string) => {
  let data = {} as { metadata: { utm_source: string; traffic_id?: string; sskey?: string } };
  if (utm_source === 'optimise') {
    data = { metadata: { utm_source: 'optimise', sskey: trackingKey } };
  }
  if (utm_source === 'ecomobi') {
    data = { metadata: { utm_source: 'ecomobi', traffic_id: trackingKey } };
  }
  return post({
    path: `/affiliates/track`,
    data,
    description: '[Tracking] Get utm id from affiliate tracking /affiliates/track',
    errorMesssage: `Can't get utm id from affiliate tracking. Please try again`
  });
};

export interface TrackingFacebookPixelParams {
  externalID: string | number;
  eventID: string;
  name: string;
  value?: { [key: string]: any };
}
export const sendFacebookPixelTrackingEvent = ({ externalID, eventID, name, value }: TrackingFacebookPixelParams) => {
  const _value = (value && value.value) || 0;
  const data = Object.assign(
    {},
    {
      external_id: externalID,
      event_id: eventID,
      name,
      value: _value
    },
    generateParams('parameters', value)
  );

  return post({
    path: '/trackings/events',
    data,
    description: '[Tracking] Tracking for Facebook Pixel events /trackings/events',
    errorMesssage: `Can't track data. Please try again`
  });
};

export interface TrackingUtmsParams {
  utmId: string | number;
}

export const trackingUtms = ({ utmId }: TrackingUtmsParams) =>
  post({
    path: `/utms/${utmId}/track`,
    description: '[Tracking] Tracking utms params /utms/:id/track',
    errorMesssage: `Can't track data. Please try again`
  });
