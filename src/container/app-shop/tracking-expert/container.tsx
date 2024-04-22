import { Component } from 'react';
import { connect } from 'react-redux';

import { stringToHash } from '../../../utils/encode';
import { isUndefined } from '../../../utils/validate';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TrackingExpertContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init() {
    const {
      trackingStore,
      fetchExpertsTrackingGroup,
      match: {
        params: { trackingCode }
      }
    } = this.props;

    const keyHashTracking = stringToHash(trackingCode);
    true === isUndefined(trackingStore.expertTrackingList[keyHashTracking]) && fetchExpertsTrackingGroup(trackingCode);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.props.clearDataExpertsTrackingGroupAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.trackingCode !== nextProps.match.params.trackingCode) {
      const keyHashTracking = stringToHash(nextProps.params.trackingCode);
      true === isUndefined(this.props.trackingStore.expertTrackingList[keyHashTracking]) &&
        this.props.fetchExpertsTrackingGroup(nextProps.params.trackingCode);
    }
  }

  render() {
    return renderView(this.props);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TrackingExpertContainer);
