import { get } from '../config/restful-method';

export const fetchDiscountCodesByCode = ({ code }) => {
  return get({
    path: `/discount_codes/${code}`,
    description: '[Discount Codes] Get product list by discount code /discount_codes/:id',
    errorMesssage: `Can't get product list discount code by code. Please try again`
  });
};

export interface FetchDiscountCodeSpecialAddonsParams {
  code: string;
  page?: number;
  perPage?: number;
}
export const fetchDiscountCodeSpecialAddons = ({ code, page, perPage }: FetchDiscountCodeSpecialAddonsParams) => {
  const params = new URLSearchParams();
  page && params.set('page', String(page));
  perPage && params.set('per_page', String(perPage));

  return get({
    path: `/discount_codes/${code}/special_add_ons${params.toString() ? `?${params.toString()}` : ''}`,
    description: '[Discount Codes] Get discount code special addons',
    errorMesssage: `Can't get discount code special addons. Please try again`
  });
};

export interface FetchDiscountCodeApplicableBoxesParams {
  code: string;
  page?: number;
  perPage?: number;
}
export const fetchDiscountCodeApplicableBoxes = ({ code, page, perPage }: FetchDiscountCodeApplicableBoxesParams) => {
  const params = new URLSearchParams();
  page && params.set('page', String(page));
  perPage && params.set('per_page', String(perPage));

  return get({
    path: `/discount_codes/${code}/applicable_boxes${params.toString() ? `?${params.toString()}` : ''}`,
    description: '[Discount Codes] Get discount code applicable boxes',
    errorMesssage: `Can't get discount code applicable boxes. Please try again`
  });
};

export interface FetchDiscountCodeGiftBoxesParams {
  code: string;
  page?: number;
  perPage?: number;
}
export const fetchDiscountCodeGiftBoxes = ({ code, page, perPage }: FetchDiscountCodeGiftBoxesParams) => {
  const params = new URLSearchParams();
  page && params.set('page', String(page));
  perPage && params.set('per_page', String(perPage));

  return get({
    path: `/discount_codes/${code}/gift_boxes${params.toString() ? `?${params.toString()}` : ''}`,
    description: '[Discount Codes] Get discount code gift boxes',
    errorMesssage: `Can't get discount code gift boxes. Please try again`
  });
};

export const fetchDiscountCodesBoxes = ({ productId, limit = 2 }) => {
  return get({
    path: `/discount_codes/boxes/${productId}?limit=${limit}`,
    description: '[Discount Codes] Get discount code boxes by product id /discount_codes/boxes/:id',
    errorMesssage: `Can't get discount code boxes by product id. Please try again`
  });
};
