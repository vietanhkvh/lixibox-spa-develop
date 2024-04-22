declare global {
  interface Window {
    Pusher: any;
  }
}

export const getPusherInstance = () => {
  /** Not install pusher */
  if (!window.Pusher) return null;

  /** Exist instance */
  if (!!window.Pusher.instances && window.Pusher.instances.length >= 1) {
    return window.Pusher.instances[0];
  }

  /** Create new instance */
  return new window.Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER
  });
};
