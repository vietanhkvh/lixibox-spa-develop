import { matchPath } from 'react-router-dom';
import { MESSENGER_PLUGIN_BLACKLIST } from '../constants/application/path';

export const shouldDisplayOnPath = (pathname: string) => {
  let isOnValidPath = true;

  MESSENGER_PLUGIN_BLACKLIST.forEach((path) => {
    const match = matchPath(pathname, { path });
    if (match) {
      isOnValidPath = false;
    }
  });

  return isOnValidPath;
};

export const validateAndEnforceMessengerPluginVisibility = ({ pathname }) => {
  if (shouldDisplayOnPath(pathname)) {
    document.getElementById('fb-root').style.display = 'block';
  } else {
    document.getElementById('fb-root').style.display = 'none';
  }
};

export const initFbCustomerChat = async () => {
  (function () {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v13.0'
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  })();
};
