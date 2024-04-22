import UserInvitationMobile from './mobile';
import UserInvitationDesktop from './desktop';
import { isMobileVersion } from '../../utils';

export default isMobileVersion() ? UserInvitationMobile : UserInvitationDesktop;
