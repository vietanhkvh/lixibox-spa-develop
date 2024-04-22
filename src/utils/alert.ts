import { store } from '../app/init-react-app';
import { storageKey } from '../constants/application/client-storage';
import { openAlertAction } from '../flows/alert/action';

// Dispatches due alert
export const dispatchDueAlert = () => {
  const dueAlertRaw = sessionStorage.getItem(storageKey.DUE_ALERT);
  if (!dueAlertRaw) return;
  sessionStorage.removeItem(storageKey.DUE_ALERT);

  const dueAlert = JSON.parse(dueAlertRaw);

  store.dispatch<any>(openAlertAction(dueAlert));
};
