import { isMobileVersion } from '../../../utils/responsive';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

interface StorePreviewProps {
  store: any;
  onClickAddress?: (store: any) => any;
  classes?: { container?: string };
}
export type ViewProps = StorePreviewProps;

const StorePreview = (props: StorePreviewProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};

export default StorePreview;
