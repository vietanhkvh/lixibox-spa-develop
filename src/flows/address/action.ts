import * as ADDRESS_API_PATH from '../../api/address';
import * as ADDRESS_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch user delivery address list action
 */

export const fetchUserAddressListAction = () => (dispatch, getState) =>
  dispatch({
    type: ADDRESS_ACTION_TYPE.FETCH_USER_ADDRESS_LIST,
    payload: {
      promise: ADDRESS_API_PATH.fetchUserAddressList().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.ADDRESS
  });

/**
 * Add deliver address
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phone
 * @param {string} address
 * @param {string} provinceId
 * @param {string} districtId
 * @param {string} ward
 */
export const addUserAddressAction =
  ({ firstName, lastName, phone, address, provinceId, districtId, wardId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ADDRESS_ACTION_TYPE.ADD_USER_ADDRESS,
      payload: {
        promise: ADDRESS_API_PATH.addUserAddress({
          firstName,
          lastName,
          phone,
          address,
          provinceId,
          districtId,
          wardId
        }).then((res) => res)
      },
      group: REDUCER_GROUP.ADDRESS
    });

/**
 * Edit deliver address
 *
 * @param {number} id
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phone
 * @param {string} address
 * @param {string} provinceId
 * @param {string} districtId
 * @param {string} ward
 */
export const editUserAddressAction =
  ({ id, firstName, lastName, phone, address, provinceId, districtId, wardId }) =>
  (dispatch, getState) =>
    dispatch({
      type: ADDRESS_ACTION_TYPE.EDIT_USER_ADDRESS,
      payload: {
        promise: ADDRESS_API_PATH.editUserAddress({
          id,
          firstName,
          lastName,
          phone,
          address,
          provinceId,
          districtId,
          wardId
        }).then((res) => res)
      },
      meta: {
        addressId: id
      },
      group: REDUCER_GROUP.ADDRESS
    });

/**
 * Delete delivery address with address id
 *
 * @param {number} addressId
 */
export const deleteUserAddressAction = (addressId) => (dispatch, getState) =>
  dispatch({
    type: ADDRESS_ACTION_TYPE.DELETE_USER_ADDRESS,
    payload: {
      promise: ADDRESS_API_PATH.deleteUserAddress(addressId).then((res) => res)
    },
    meta: { addressId },
    group: REDUCER_GROUP.ADDRESS
  });

export const saveAddressSelected = (data) => ({
  type: ADDRESS_ACTION_TYPE.SAVE_ADDRESS_SELECTED,
  payload: data,
  group: REDUCER_GROUP.ADDRESS
});
