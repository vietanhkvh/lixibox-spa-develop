import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = ({ props, handleSignOut }) => {
  const switchView = {
    MOBILE: () => renderMobile({ props, handleSignOut }),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
