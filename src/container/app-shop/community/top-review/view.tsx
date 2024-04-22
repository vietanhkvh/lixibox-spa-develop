import { getDeviceVersion } from '../../../../utils/responsive';

import viewDesktop from './view-desktop';
import viewMobile from './view-mobile';

function renderView() {
  const switchView = {
    MOBILE: () => viewMobile.bind(this)(),
    DESKTOP: () => viewDesktop.bind(this)()
  };

  return switchView[getDeviceVersion()]();
}

export default renderView;
