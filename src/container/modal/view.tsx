import { isMobileVersion } from '../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';
import renderMobileAlert from './view-mobile-alert';

const renderView = ({ props, state, handleCloseMobileAlert, handleCloseModal }) => {
  const { data } = props;
  const type = !!data && data[data.length - 1] && data[data.length - 1].type;
  const MODAL_TYPE = !isMobileVersion()
    ? 'DESKTOP'
    : 'MOBILE_ALERT' === type || (data && data[0] && data[0].childComponent === '')
    ? 'MOBILE_ALERT'
    : 'MOBILE';

  const switchView = {
    MOBILE: () => renderMobile(props),
    DESKTOP: () => renderDesktop(props, state, handleCloseModal),
    MOBILE_ALERT: () => renderMobileAlert({ props, state, handleCloseMobileAlert })
  };

  return switchView[MODAL_TYPE]();
};

export default renderView;
