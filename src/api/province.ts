import { get } from '../config/restful-method';

/** Fetch province list */
export const fetchProvinceList = () =>
  get({
    path: `/settings/provinces`,
    description: '[Provinces] Fetch province list /settings/provinces',
    errorMesssage: `Can't fetch province list. Please try again`
  });

/** Fetch ship fee by province id and district id */
export const fetchShipFeeByDistrictId = ({ provinceId, districtId, boxId = 0 }) => {
  /** Required */
  const provinceIdParams = `province_id=${provinceId}`;
  const districtIdParams = `&district_id=${districtId}`;

  /** Optional */
  const boxIdParams = !!boxId ? `&box_id=${boxId}` : '';

  const path = `/settings/shipping_fee?${provinceIdParams}${districtIdParams}${boxIdParams}`;

  return get({
    path,
    description: '[Provinces] Fetch ship fee /settings/shipping_fee',
    errorMesssage: `Can't fetch ship fee by province id and district id. Please try again`
  });
};

/** Fetch ward by province id */
export const fetchWardByProvinceId = ({ provinceId }) =>
  get({
    path: `/settings/provinces/${provinceId}/wards`,
    description: '[Provinces] Fetch ward by province id /settings/provinces/:id/wards',
    errorMesssage: `Can't fetch ward by province id. Please try again`
  });
