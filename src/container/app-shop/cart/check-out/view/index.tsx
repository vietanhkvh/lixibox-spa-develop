import { getDeviceVersion } from '../../../../../utils/responsive';
import renderMobile from './mobile';
import renderDesktop from './desktop';

const renderView = (props) => {
  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
