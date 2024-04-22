import { connect } from 'react-redux';

import {
  getReferralStatisticsAndHistoryAction,
  GetReferralStatisticsAndHistoryActionParams
} from '../../../flows/referral/action';
import ReferralStatisticsAndHistory from './component';

const mapStateToProps = (state) => ({
  referralStore: state.referral
});
const mapDispatchToProps = (dispatch) => ({
  getReferralStatisticsAndHistoryAction: (data: GetReferralStatisticsAndHistoryActionParams) =>
    dispatch(getReferralStatisticsAndHistoryAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ReferralStatisticsAndHistory);
