import { isMobileVersion } from '../../../../../utils/responsive';
import MobileView from './mobile';
import DesktopView from './desktop';

const DiscountCodeModal = (props) => {
  const { isCompact } = props;
  const View = isMobileVersion() || isCompact ? MobileView : DesktopView;
  return <View {...props} />;
};

export default DiscountCodeModal;
