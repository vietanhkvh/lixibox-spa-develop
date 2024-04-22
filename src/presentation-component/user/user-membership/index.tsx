import { ReactNode } from 'react';
import { User } from 'types/api/auth';
import { isMobileVersion } from 'utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface UserMembershipProps {
  user: User;
  info?: string | ReactNode;
  onInfoClick?: () => void;
  classes?: { container?: string };
}
type ViewProps = UserMembershipProps;
/**
 * NOTE:
 * UserMembership presumes that the user object is available
 */
const UserMembership = (props: UserMembershipProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...props} />;
};

export type { ViewProps };
export default UserMembership;
