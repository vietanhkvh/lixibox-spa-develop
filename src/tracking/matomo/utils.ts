import { BoxCategory, ProductBox } from 'types/api/shop';
import { MatomoLoggerContentType, MatomoLoggerDimension } from './constant';
import { ContentType, Currency } from 'tracking/constants';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { generatePath } from 'react-router-dom';
import { getTrackableBoxCategoryName } from 'tracking/utils';
import { ViewedSourceType } from 'tracking/constants/index';
import { Cart, CartItem } from 'types/api/cart';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { storageKey } from 'constants/application/client-storage';

export interface MatomoTrackEventParams {
  category: string;
  action: string;
  name?: string;
  value?: number;
}
export const matomoTrackEvent = ({ category, action, name = '', value = 0 }: MatomoTrackEventParams) => {
  try {
    if (window._paq) {
      window._paq.push(['trackEvent', category, action, name, value]);
    }
  } catch (e) {}
};

export interface MatomoTrackEventWithDimensionParams {
  action: string;
  name?: string;
  value?: number;
  dimension?: { [id: number | string]: string | number };
}
export const matomoTrackEventWithDimension = ({
  action,
  name = '',
  value = 0,
  dimension = {}
}: MatomoTrackEventWithDimensionParams) => {
  try {
    if (window._paq) {
      // Update dimension by adding 'dimension' as a suffix to each key (as required by Matomo)
      const processedDimension = Object.keys(dimension).reduce((acc, key) => {
        acc[`dimension${key}`] = dimension[key];
        return acc;
      }, {});

      const uuid = localStorage.getItem(storageKey.TRACKING_GATEWAY_UUID);
      if (uuid) {
        window._paq.push(['setUserId', uuid]);
      }
      window._paq.push(['trackEvent', window?.location?.href || 'metrics', action, name, value, processedDimension]);
    }
  } catch (e) {}
};

export interface MatomoGetSourceDimensionParams {
  source: ViewedSourceType;
}
export const matomoGetSourceDimension = ({ source }: MatomoGetSourceDimensionParams) => {
  return {
    [MatomoLoggerDimension.SOURCE]: source || ''
  };
};

export interface MatomoGetBoxDimensionsParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
}
export const matomoGetBoxDimensions = ({ box, categories }: MatomoGetBoxDimensionsParams) => {
  const categoryName = getTrackableBoxCategoryName({ box, categories });
  const name = box?.name || '';
  const productUrl = name
    ? `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: name })}`
    : '';

  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: ContentType.PRODUCT,
    [MatomoLoggerDimension.CONTENT_ID]: box?.lixibox_id || '',
    [MatomoLoggerDimension.CONTENT_NAME]: name,
    [MatomoLoggerDimension.PRODUCT_URL]: productUrl,
    [MatomoLoggerDimension.PRODUCT_IMAGE_URL]: box?.primary_picture?.original_url || '',
    [MatomoLoggerDimension.PRICE]: box?.price || 0,
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT,
    [MatomoLoggerDimension.CATEGORY]: categoryName
  };
};

export interface MatomoGetMagazineDimensionsParams {
  magazine: any;
}
export const matomoGetMagazineDimensions = ({ magazine }: MatomoGetMagazineDimensionsParams) => {
  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.MAGAZINE,
    [MatomoLoggerDimension.CONTENT_ID]: magazine?.slug || '',
    [MatomoLoggerDimension.CONTENT_NAME]: magazine?.title || '',
    [MatomoLoggerDimension.CATEGORY]: magazine?.category?.slug || ''
  };
};

export interface MatomoGetAddOnDimensionsParams {
  box: any; // AddOnBox
}
export const matomoGetAddOnDimensions = ({ box }: MatomoGetAddOnDimensionsParams) => {
  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.ADD_ON,
    [MatomoLoggerDimension.CONTENT_ID]: box?.lixibox_id || '',
    [MatomoLoggerDimension.CONTENT_NAME]: box?.name || '',
    [MatomoLoggerDimension.PRODUCT_IMAGE_URL]: box?.primary_picture?.square_url || '',
    [MatomoLoggerDimension.PRICE]: String(box?.add_on_price || box?.price || 0),
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};

export interface MatomoGetRedeemDimensionsParams {
  box: any; // RedeemBox
}
export const matomoGetRedeemDimensions = ({ box }: MatomoGetRedeemDimensionsParams) => {
  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.REDEEM,
    [MatomoLoggerDimension.CONTENT_ID]: box?.lixibox_id || '',
    [MatomoLoggerDimension.CONTENT_NAME]: box?.name || '',
    [MatomoLoggerDimension.PRODUCT_IMAGE_URL]: box?.primary_picture?.square_url || '',
    [MatomoLoggerDimension.PRICE]: String(box?.coins_price || 0),
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};

export interface MatomoGetGiftDimensionsParams {
  box: any; // GiftBox
}
export const matomoGetGiftDimensions = ({ box }: MatomoGetGiftDimensionsParams) => {
  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.GIFT,
    [MatomoLoggerDimension.CONTENT_ID]: box?.lixibox_id || '',
    [MatomoLoggerDimension.CONTENT_NAME]: box?.name || '',
    [MatomoLoggerDimension.PRODUCT_IMAGE_URL]: box?.primary_picture?.square_url || '',
    [MatomoLoggerDimension.PRICE]: String(0),
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};

export interface MatomoGetSampleDimensionsParams {
  box: any; // SampleBox
}
export const matomoGetSampleDimensions = ({ box }: MatomoGetSampleDimensionsParams) => {
  return {
    [MatomoLoggerDimension.CONTENT_TYPE]: MatomoLoggerContentType.SAMPLE,
    [MatomoLoggerDimension.CONTENT_ID]: box?.lixibox_id || '',
    [MatomoLoggerDimension.CONTENT_NAME]: box?.name || '',
    [MatomoLoggerDimension.PRODUCT_IMAGE_URL]: box?.primary_picture?.square_url || '',
    [MatomoLoggerDimension.PRICE]: String(0),
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};

export interface MatomoGetCartDimensionsParams {
  cart: Cart;
}
export const matomoGetCartDimensions = ({ cart }: MatomoGetCartDimensionsParams) => {
  if (!cart) return {};

  return {
    [MatomoLoggerDimension.QUANTITY]: String(cart?.cart_items?.reduce((acc, item) => acc + item.quantity, 0) || 0),
    [MatomoLoggerDimension.TOTAL_PRICE]: String(cart?.total_price || 0),
    [MatomoLoggerDimension.COUPON]: cart?.discount_code || cart?.referral_code || '',
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};

export interface MatomoGetCartItemDimensionsParams {
  cartItem: CartItem;
  quantity: number;
}
export const matomoGetCartItemDimensions = ({ cartItem, quantity }: MatomoGetCartItemDimensionsParams) => {
  if (!cartItem) return {};

  const isRedeemItem = cartItem?.purchase_type === PURCHASE_TYPE.REDEEM;
  const currency = isRedeemItem ? Currency.LIXICOIN : Currency.DEFAULT;
  const price = isRedeemItem ? cartItem?.coins : cartItem?.price;

  return {
    [MatomoLoggerDimension.CONTENT_ID]: cartItem?.lixibox_id || '', // FIXME: API does not return lixibox_id
    [MatomoLoggerDimension.CONTENT_NAME]: cartItem?.box?.name || '',
    [MatomoLoggerDimension.QUANTITY]: String(quantity || 0),
    [MatomoLoggerDimension.PRICE]: String(price || 0),
    [MatomoLoggerDimension.CURRENCY]: currency
  };
};

export interface MatomoGetOrderDimensionsParams {
  order: any;
}
export const matomoGetOrderDimensions = ({ order }: MatomoGetOrderDimensionsParams) => {
  if (!order) return {};

  return {
    [MatomoLoggerDimension.ORDER_NUMBER]: order?.number || '',
    [MatomoLoggerDimension.QUANTITY]: String(order?.order_boxes?.reduce((acc, item) => acc + item.quantity, 0) || 0),
    [MatomoLoggerDimension.TOTAL_PRICE]: String(order?.total_price || 0),
    [MatomoLoggerDimension.COUPON]: order?.discount_code || order?.referral_code || '',
    [MatomoLoggerDimension.CURRENCY]: Currency.DEFAULT
  };
};
