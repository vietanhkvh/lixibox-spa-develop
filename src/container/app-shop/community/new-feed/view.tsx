import { getDeviceVersion } from '../../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = (data) => {
  const switchView = {
    MOBILE: () => renderMobile(data),
    DESKTOP: () => renderDesktop(data)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
