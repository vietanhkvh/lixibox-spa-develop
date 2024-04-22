import { getDeviceVersion } from '../../../utils/responsive';

import { IProps } from './model';
import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

const renderView = (props: IProps) => {
  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop(props)
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
