import Modal from 'react-modal';

import { initSentry } from './utils/sentry';
import { defineYupValidtors } from './utils/validate';
import { WARNING_BLACKLIST } from 'config/warning-blacklist';
import { checkWebPSupport } from 'utils/image';
import { ignoreSpecificWarnings } from './utils/console';
import scrollToPolyfill from './utils/polyfills/scroll-to';
import AppEntryPoint from './app/entry-point';
import './style';

ignoreSpecificWarnings(WARNING_BLACKLIST);
checkWebPSupport();
initSentry();
scrollToPolyfill();
defineYupValidtors();

const preventOtherSubDomains = () => {
  if (process.env.REACT_APP_HOST_NAME !== window.location.hostname) {
    window.location.href = process.env.REACT_APP_FQDN;
    return false;
  }

  return true;
};

Modal.setAppElement('#lixiapp');

preventOtherSubDomains() && AppEntryPoint();
