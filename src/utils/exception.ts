import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../tracking/google-analytic/type';
import { gaEventTracking } from '../tracking/google-analytic/ga-event-tracking';
import { reportException } from '../tracking/sentry';
import { storageKey } from '../constants/application/client-storage';
import { ALERT_GENERAL_ERROR } from '../constants/application/alert';
import { openAlertAction } from '../flows/alert/action';

export const handleWhenException = ({ error, info }) => {
  reportException(error, Object.assign({ type: 'DidCatch' }, !!info && { componentStack: info }));
  /** Double check for force reloaad */
  const forceReloadStorage: any = localStorage.getItem(storageKey.FORCE_RELOAD);
  if (!forceReloadStorage) {
    trackException({ id: 4, label: 'Reload at current page' });
  } else {
    switch (forceReloadStorage * 1) {
      case 1:
        trackException({ id: 2, label: 'Reload at current page, 2 times' });
        break;

      case 2:
        trackException({ id: 3, label: 'Reload to home page' });
        break;

      case 3:
        trackException({ id: 4, label: 'Reload to home page, 2 times' });
        break;

      case 4:
        localStorage.clear();
        localStorage.setItem(storageKey.FORCE_RELOAD, '5');
        gaExceptionTracking(5);
        window.location.href = '/';
        break;
    }
  }
};

const trackException = ({ id, label }) => {
  gaExceptionTracking(id);
  localStorage.setItem(storageKey.FORCE_RELOAD, id);
  setTimeout(() => window.location.reload(), 2000);
};

export const isExistError = (error, errors) => {
  const isCheckError = 'string' === typeof error && '' !== error;
  const isCheckErrors = Array.isArray(errors) && !!errors.length;

  return isCheckError || isCheckErrors;
};

export const formatErrorMessage = (errorMessage: string | Array<string> | any) => {
  if ('string' === typeof errorMessage && '' !== errorMessage) return errorMessage;
  if (Array.isArray(errorMessage) && !!errorMessage.length) return errorMessage[0] + '';

  return 'Đã có lỗi xảy ra. Vui lòng thử lại';
};

const gaExceptionTracking = (reloadTimes) =>
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.EXCEPTION,
    action: GA_TRACKING_EVENT_ACTION.EXCEPTION.FORCE_RELOAD,
    label: GA_TRACKING_EVENT_LABEL.EXCEPTION.FORCE_RELOAD + reloadTimes,
    value: 1
  });

/**
 * Retrieves error message of specific type from the global error store
 *
 * @param errorIndex store.error.index
 * @param errorType flows/<NAME>/type/EXAMPLE_ACTION_TYPE
 */
export const getGlobalErrorMessage = (errorIndex, errorType) =>
  errorIndex.length && errorIndex[0].type === errorType ? errorIndex[0].message : '';

export interface DispatchApiErrorParams {
  action: any; // TODO: Provide type info
}
export const dispatchApiError = ({ action }: DispatchApiErrorParams) => {
  if (!(action?.payload && action?.asyncDispatch)) return;

  if (isExistError(action.payload.error, action.payload.errors)) {
    action.asyncDispatch(
      openAlertAction(
        ALERT_GENERAL_ERROR({
          content: formatErrorMessage(action.payload.error || action.payload.errors)
        })
      )
    );
  }
};
