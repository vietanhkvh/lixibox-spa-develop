import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

export function renderView(props) {
  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
}

export default renderView;
