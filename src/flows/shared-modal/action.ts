import { SHARED_MODAL_ID } from '../../constants/application/shared-modal';
import { SubmitButtonClassesProps } from '../../presentation-component/ui/submit-button/component';
import * as SHARED_MODAL_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export interface OpenSharedModalActionParams {
  id: string;
  isStacked?: boolean;
  surviveSingleRouteChange?: boolean;
  data?: { [key: string]: any };
}
export const openSharedModalAction =
  ({ id, isStacked, surviveSingleRouteChange, data }: OpenSharedModalActionParams) =>
  (dispatch, getState) => {
    return dispatch({
      type: SHARED_MODAL_ACTION_TYPE.OPEN_SHARED_MODAL,
      payload: {
        id,
        isStacked,
        data,
        surviveSingleRouteChange
      },
      group: REDUCER_GROUP.SHARED_MODAL
    });
  };

export interface UpdateSharedModalActionParams {
  id: string;
  isVisible?: boolean;
  data?: { [key: string]: any };
}
export const updateSharedModalAction =
  ({ id, isVisible, data }: UpdateSharedModalActionParams) =>
  (dispatch, getState) => {
    return dispatch({
      type: SHARED_MODAL_ACTION_TYPE.UPDATE_SHARED_MODAL,
      payload: {
        id,
        isVisible,
        data
      },
      group: REDUCER_GROUP.SHARED_MODAL
    });
  };

export interface CloseSharedModalActionParams {
  id: string;
  data?: { [key: string]: any };
}
export const closeSharedModalAction =
  ({ id, data }: CloseSharedModalActionParams) =>
  (dispatch, getState) => {
    return dispatch({
      type: SHARED_MODAL_ACTION_TYPE.CLOSE_SHARED_MODAL,
      payload: {
        id,
        data
      },
      group: REDUCER_GROUP.SHARED_MODAL
    });
  };

export interface CloseAllSharedModalActionParams {
  reason?: 'routeChanged';
}
export const closeAllSharedModalAction = (params: CloseAllSharedModalActionParams) => (dispatch, getState) => {
  return dispatch({
    type: SHARED_MODAL_ACTION_TYPE.CLOSE_ALL_SHARED_MODAL,
    group: REDUCER_GROUP.SHARED_MODAL,
    payload: params
  });
};

export interface OpenConfirmationModalActionParams {
  title: string;
  id?: string;
  message?: string;
  button: { title: string; color?: string; loading?: boolean; disabled?: boolean };
  classes?: { modal?: string; confirmation?: string; message?: string; button?: SubmitButtonClassesProps };
}
export const openConfirmationModalAction = ({
  title,
  id,
  message,
  button,
  classes
}: OpenConfirmationModalActionParams) => {
  return openSharedModalAction({
    id: SHARED_MODAL_ID.ConfirmationModal,
    data: {
      title,
      id,
      message,
      button,
      action: '',
      classes
    }
  });
};

export const closeConfirmationModalAction = () => {
  return closeSharedModalAction({ id: SHARED_MODAL_ID.ConfirmationModal });
};
