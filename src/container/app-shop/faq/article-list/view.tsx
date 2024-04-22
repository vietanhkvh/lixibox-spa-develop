import { getDeviceVersion } from '../../../../utils/responsive';

import renderMobile from './view-mobile';
import renderDesktop from './view-desktop';

function renderView() {
  const switchView = {
    MOBILE: renderMobile,
    DESKTOP: renderDesktop
  };

  return switchView[getDeviceVersion()].bind(this)();
}

export default renderView;
