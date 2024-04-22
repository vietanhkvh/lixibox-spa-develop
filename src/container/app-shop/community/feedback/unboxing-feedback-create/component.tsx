import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const UnboxingFeedbackCreate = () => {
  return isMobileVersion() ? MobileView() : DesktopView();
};

export default UnboxingFeedbackCreate;
