import { connect } from 'react-redux';
import { fetchNotificationListAction } from '../../../../flows/notification/action';

import NotificationContainer from './container';

const mapStateToProps = (state) => ({
  notificationStore: state.notification
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationListAction: (data: any) => dispatch(fetchNotificationListAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NotificationContainer);
