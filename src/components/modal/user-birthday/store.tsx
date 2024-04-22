import { setBirthdayAction } from 'flows/user/action';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'types/redux';
import UserBirthday from './component';

const mapStateToProps = (state: RootState) => ({
  userBirthday: state.user.userBirthday,
  isSetUserBirthdaySuccess: state.user.isSetUserBirthdaySuccess,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = {
  setBirthdayAction
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserBirthday);
