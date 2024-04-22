import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = ({ props, state, handleShowSubCategory }) => {
  const switchView = {
    MOBILE: () => renderMobile({ props, state, handleShowSubCategory }),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
