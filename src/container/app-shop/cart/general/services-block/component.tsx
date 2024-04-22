import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

interface ServicesBlockProps extends PropsFromRedux {
  classes?: { container?: string };
}
const ServicesBlock = (props: ServicesBlockProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};

export type { ServicesBlockProps };
export default ServicesBlock;
