import { storageKey } from '../../../constants/application/client-storage';
import { store } from '../../../app/init-react-app';

function getUserId() {
  var userId = 0;
  try {
    const state = store.getState();
    const authState = state && (state as any).auth;

    if (!!authState) {
      userId = (authState.userInfo && authState.userInfo.id) || 0;
    }
  } catch (e) {
    return userId;
  }
  return userId;
}

function getUuid() {
  return localStorage.getItem(storageKey.UUID) || '';
}

const addContextSessionInfo = ({ event }) => {
  try {
    event.contexts = event.contexts || {};
    event.contexts.references = event.contexts.references || {};
    event.contexts.references.sessionInfo = {
      uuid: getUuid(),
      userId: getUserId(),
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  } catch (e) {
    // FIXME: Report caught exception
    console.error(e);
  }

  return event;
};

export default addContextSessionInfo;
