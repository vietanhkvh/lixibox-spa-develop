import { fetchCountdownListAction } from 'flows/countdown/action';

export const mapDispatchToProps = () => (dispatch) => ({
  fetchCountdownListAction: () => dispatch(fetchCountdownListAction())
});
