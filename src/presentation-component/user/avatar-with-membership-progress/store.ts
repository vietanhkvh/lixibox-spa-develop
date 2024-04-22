import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { openAlertAction } from 'flows/alert/action';
import { changeAvatarUserAction } from 'flows/auth/action';
import UserWithMembershipProgress from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  userStore: state.user
});
const mapDispatchToProps = {
  changeAvatarUserAction,
  openAlertAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserWithMembershipProgress);
