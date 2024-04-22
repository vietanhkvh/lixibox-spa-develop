import * as MODAL_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Open modal
 *
 * @param {Object} data
 *
 * @param {string} childComponent child component name
 * @param {object} childProps style for child props. Difference for each  component
 * @param {object} modalStyle style for modal
 * {
 *    @param {object} container style for modal container
 *    @param {object} ovelay style for modal overlay
 *    @param {object} content style for modal content
 * }
 *
 */
export const openModalAction =
  (data, gaTracking = null) =>
  (dispatch, getState) => {
    const { mobileappWebviewStatus } = getState().app;
    if (!!mobileappWebviewStatus) return;

    return dispatch(
      Object.assign(
        {},
        {
          type: MODAL_ACTION_TYPE.OPEN_MODAL,
          payload: data,
          group: REDUCER_GROUP.MODAL
        },
        !!gaTracking && { gaTracking }
      )
    );
  };

/**  Close Modal */
export const closeModalAction = () => ({
  type: MODAL_ACTION_TYPE.CLOSE_MODAL,
  payload: '',
  group: REDUCER_GROUP.MODAL
});

/**  Push state when opening modal */
export const pushStateWhenOpeningModalAction = (data) => ({
  type: MODAL_ACTION_TYPE.PUSH_STATE_WHEN_OPENING_MODAL,
  payload: data,
  group: REDUCER_GROUP.MODAL
});

/**  Back state when closing modal */
export const backStateWhenClosingModalAction = () => ({
  type: MODAL_ACTION_TYPE.BACK_STATE_WHEN_CLOSING_MODAL,
  group: REDUCER_GROUP.MODAL
});
