import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ReferralHistoryProps {
  referee: string;
  time: Date;
  title: string;
  benefits: Array<string>;
  classes?: { container?: string };
}
const ReferralHistory = (props: ReferralHistoryProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...props} />;
};

export type { ReferralHistoryProps };
export default ReferralHistory;
