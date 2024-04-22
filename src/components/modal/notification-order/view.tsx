import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktopVersion from './view-desktop';
import renderMobileVersion from './view-mobile';

const renderView = ({ props }) => {
  const switchView = {
    MOBILE: () => renderMobileVersion({ props }),
    DESKTOP: () => renderDesktopVersion({ props })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
