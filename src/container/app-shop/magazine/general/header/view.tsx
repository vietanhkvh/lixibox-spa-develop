import { getDeviceVersion } from '../../../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = (props) => {
  const switchView = {
    MOBILE: () => renderMobile(),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
