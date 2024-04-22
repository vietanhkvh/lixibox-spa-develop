import { getDeviceVersion } from '../../../../utils/responsive';

import renderMobile from './view-mobile';
import renderDesktop from './view-desktop';

export function renderComponent(data) {
  const switchView = {
    MOBILE: () => renderMobile.bind(this)(data),
    DESKTOP: () => renderDesktop.bind(this)(data)
  };

  return switchView[getDeviceVersion()]();
}
