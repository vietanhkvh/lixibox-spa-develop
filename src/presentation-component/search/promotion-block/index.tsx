import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ClickEvent {
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  message: string;
  id?: string;
  link?: string;
}
interface PromotionBlockProps {
  message: string;
  /**
   * ID for tracing the origin of the click. Passed to the onClick callback.
   */
  id?: string;
  link?: string;
  classes?: { container?: string };
  onClick?: (params: ClickEvent) => void;
}
type ViewProps = PromotionBlockProps;
const PromotionBlock = (props: PromotionBlockProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};

export type { ViewProps, ClickEvent };
export default PromotionBlock;
