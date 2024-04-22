import { ConnectedProps, connect } from 'react-redux';
import { clolseMobileSigninAlertAction } from 'flows/alert/action';
import { RootState } from 'types/redux';
import MobileSigninAlertContainer from './component';

export const mapStateToProps = (state: RootState) => ({
  alertStore: state.alert
});

export const mapDispatchToProps = {
  closeMobileSigninAlertAction: clolseMobileSigninAlertAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MobileSigninAlertContainer);
