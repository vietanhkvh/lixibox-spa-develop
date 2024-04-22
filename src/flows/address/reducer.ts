import { REDUCER_GROUP } from '../reducer.group';
import * as ADDRESS_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { dispatchApiError } from 'utils/exception';

export const INITIAL_STATE_ADDRESS = {
  userAddressList: {
    list: [],
    isWaitingFetchData: false,
    isWaitingAdd: false,
    isSuccess: true
  },
  addressSelected: {}
};

const addressReducer = (
  state = INITIAL_STATE_ADDRESS,
  action = {
    type: '',
    payload: { address: [], addresses: [] },
    meta: { addressId: '' },
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.ADDRESS) {
    return state;
  }

  /** User delivery address list */
  const { userAddressList } = state;

  switch (action.type) {
    /** Fetch user delivery address list */
    case PENDING_TYPE(ADDRESS_ACTION_TYPE.FETCH_USER_ADDRESS_LIST):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingFetchData: true
        })
      });

    case FULFILLED_TYPE(ADDRESS_ACTION_TYPE.FETCH_USER_ADDRESS_LIST):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          list: action.payload.addresses || [],
          isWaitingFetchData: false
        })
      });

    case REJECTED_TYPE(ADDRESS_ACTION_TYPE.FETCH_USER_ADDRESS_LIST):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingFetchData: false
        })
      });

    /** Add user delivery address */
    case PENDING_TYPE(ADDRESS_ACTION_TYPE.ADD_USER_ADDRESS):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingAdd: true,
          isSuccess: false
        })
      });

    case FULFILLED_TYPE(ADDRESS_ACTION_TYPE.ADD_USER_ADDRESS):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          list: [...(userAddressList.list || []), action.payload.address],
          isWaitingAdd: false,
          isSuccess: true
        })
      });

    case REJECTED_TYPE(ADDRESS_ACTION_TYPE.ADD_USER_ADDRESS):
      dispatchApiError({ action });
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingAdd: false,
          isSuccess: false
        })
      });

    /** Edit user delivery address */
    case PENDING_TYPE(ADDRESS_ACTION_TYPE.EDIT_USER_ADDRESS):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingAdd: true,
          isSuccess: false
        })
      });

    case FULFILLED_TYPE(ADDRESS_ACTION_TYPE.EDIT_USER_ADDRESS):
      const tmpListNew =
        userAddressList && Array.isArray(userAddressList.list)
          ? userAddressList.list.map((item: any) => {
              item = item.id === action.meta.addressId ? action.payload.address : item;

              return item;
            })
          : [];

      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          list: tmpListNew,
          isWaitingAdd: false,
          isSuccess: true
        })
      });

    case REJECTED_TYPE(ADDRESS_ACTION_TYPE.EDIT_USER_ADDRESS):
      dispatchApiError({ action });
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isWaitingAdd: false,
          isSuccess: false
        })
      });

    /** Delete user delivery address */
    case PENDING_TYPE(ADDRESS_ACTION_TYPE.DELETE_USER_ADDRESS):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isSuccess: false
        })
      });

    case FULFILLED_TYPE(ADDRESS_ACTION_TYPE.DELETE_USER_ADDRESS):
      const tmpList = userAddressList.list?.filter((item: any) => item.id !== action.meta.addressId) || [];
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          list: tmpList,
          isSuccess: true
        })
      });

    case REJECTED_TYPE(ADDRESS_ACTION_TYPE.DELETE_USER_ADDRESS):
      return Object.assign({}, state, {
        userAddressList: Object.assign({}, userAddressList, {
          isSuccess: false
        })
      });

    case ADDRESS_ACTION_TYPE.SAVE_ADDRESS_SELECTED:
      return Object.assign({}, state, {
        addressSelected: action.payload
      });

    default:
      return state;
  }
};

export default addressReducer;
