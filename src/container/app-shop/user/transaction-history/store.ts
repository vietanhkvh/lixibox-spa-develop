import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { fetchUserTransactionsAction } from 'flows/user/action';
import TransactionHistory from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  userStore: state.user
});

const mapDispatchToProps = {
  fetchUserTransactionsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TransactionHistory);
