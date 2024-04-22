import { getDeviceVersion } from '../../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = ({ props, state }) => {
  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop({ props, state })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
