import { connect } from 'react-redux';
import { feedbackReportsFeaturesAction } from '../../../../../flows/report/action';
import RecommendationSlider from './container';

export const mapStateToProps = (state) => ({
  recommendationStore: state.recommendation,
  reportStore: state.report
});

export const mapDispatchToProps = (dispatch) => ({
  feedbackReportsFeaturesAction: (data: any) => dispatch(feedbackReportsFeaturesAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RecommendationSlider);
