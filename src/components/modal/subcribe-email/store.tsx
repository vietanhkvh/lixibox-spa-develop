import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { sendSubcribeInfoAction } from 'flows/subcribe/action';
import SubscribeEmail from './component';

const mapStateToProps = (state: RootState) => ({
  subcribeStore: state.subcribe
});

const mapDispatchToProps = {
  sendSubcribeInfoAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SubscribeEmail);
