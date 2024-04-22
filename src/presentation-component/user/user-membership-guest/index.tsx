import { ReactNode } from 'react';
import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface UserMembershipGuestProps {
  info?: string | ReactNode;
  classes?: { container?: string };
}
type ViewProps = UserMembershipGuestProps;
const UserMembershipGuest = (props: UserMembershipGuestProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...props} />;
};

export type { ViewProps };
export default UserMembershipGuest;
