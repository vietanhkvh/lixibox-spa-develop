import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';
import { getDeviceVersion } from '../../../utils/responsive';

export function renderComponent() {
  const switchView = {
    MOBILE: () => renderMobile.bind(this)(),
    DESKTOP: () => renderDesktop.bind(this)()
  };

  return switchView[getDeviceVersion()]();
}
