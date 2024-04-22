import { getCsrfToken } from '../utils/auth';
import { get, post, del, patch } from '../config/restful-method';

/** User delivery address list */
export const fetchUserAddressList = () =>
  get({
    path: `/addresses`,
    description: '[Address] Fetch user address list /addresses',
    errorMesssage: `Can't fetch user delivery address list. Please try again`
  });

export interface IAddUserAddressParam {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
}

export const addUserAddress = ({
  firstName,
  lastName,
  phone,
  address,
  provinceId,
  districtId,
  wardId
}: IAddUserAddressParam) => {
  const csrf_token = getCsrfToken();
  const first_name = firstName;
  const last_name = lastName;
  const province_id = provinceId;
  const district_id = districtId;
  const ward_id = wardId;
  return post({
    path: '/addresses',
    data: {
      csrf_token,
      first_name,
      last_name,
      phone,
      address,
      province_id,
      district_id,
      ward_id
    },
    description: '[Address] Add user address /addresses',
    errorMesssage: `Can't add delivery address. Please try again`
  });
};

export interface IEditUserAddressParam {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  provinceId?: number;
  districtId?: number;
  wardId?: string;
}

export const editUserAddress = ({
  id,
  firstName,
  lastName,
  phone,
  address,
  provinceId,
  districtId,
  wardId
}: IEditUserAddressParam) => {
  const query =
    `?csrf_token=${getCsrfToken()}` +
    `&first_name=${firstName}` +
    `&last_name=${lastName}` +
    `&phone=${phone}` +
    `&address=${address}` +
    `&province_id=${provinceId}` +
    `&district_id=${districtId}` +
    `&ward_id=${wardId}`;

  return patch({
    path: `/addresses/${id}${query}`,
    description: '[Address] Edit user address /addresses/:id',
    errorMesssage: `Can't edit delivery address. Please try again`
  });
};

/** Delete user delivery address */
export const deleteUserAddress = (id) => {
  const csrf_token = getCsrfToken();

  return del({
    path: `/addresses/${id}`,
    data: {
      csrf_token
    },
    description: '[Address] Delete user address /addresses/:id',
    errorMesssage: `Can't delete delivery address. Please try again`
  });
};
