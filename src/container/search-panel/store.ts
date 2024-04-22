import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import SearchPanel from './component';

const mapStateToProps = (state: RootState) => ({
  appStore: state.app
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchPanel);
