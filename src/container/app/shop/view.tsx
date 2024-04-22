import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IProps } from './model';
import DesktopView from './view-desktop';
import renderMobile from './view-mobile';
import Page503 from '../../exception/503';
import { getDeviceVersion } from '../../../utils/responsive';
import { reportException } from '../../../tracking/sentry';
import { gatewayTrackPageView } from 'tracking/gateway';

interface ViewProps {
  props: IProps;
  state: any;
  handleBackToHome: any;
  handleReload: any;
  handleSetIsShowBirthdayModal: (val: boolean) => void;
}
const View = ({ props, state, handleBackToHome, handleReload, handleSetIsShowBirthdayModal }: ViewProps) => {
  const location = useLocation();

  useEffect(() => {
    gatewayTrackPageView();
  }, [location]);

  if (props?.maintenanceStore?.isMaintenance) {
    return <Page503 />;
  }

  const switchView = {
    MOBILE: () => renderMobile(props, state, handleBackToHome, handleReload, handleSetIsShowBirthdayModal),
    DESKTOP: () => <DesktopView {...{ props, state, handleBackToHome, handleReload }} />
  };

  if (typeof switchView[getDeviceVersion()] !== 'function') {
    reportException(new Error('Exception: render view is not function'));
    setTimeout(() => window.location.reload(), 1000);
    return null;
  }

  return switchView[getDeviceVersion()]();
};

export default View;
