import { post } from '../config/restful-method';

export const fetchOrderTrackingByCode = ({ code }) => {
  return post({
    path: `/order_trackings/${code}`,
    description: '[Order Tracking] Get order trackings by code /order_trackings/:order',
    errorMesssage: `Can't get order trackings by code. Please try again`
  });
};
