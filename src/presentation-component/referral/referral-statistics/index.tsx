import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ReferralStatisticsProps {
  lixicoin: number;
  balance: number;
  classes?: { container?: string };
}
const ReferralStatistics = (props: ReferralStatisticsProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...props} />;
};

export type { ReferralStatisticsProps };
export default ReferralStatistics;
