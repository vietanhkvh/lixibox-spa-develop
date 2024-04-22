import { getDeviceVersion } from '../../../../../utils/responsive';

import renderDesktop from './desktop';
import renderMobile from './mobile';

const renderView = (params) => {
  const switchView = {
    MOBILE: () => renderMobile(params),
    DESKTOP: () => renderDesktop(params)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
