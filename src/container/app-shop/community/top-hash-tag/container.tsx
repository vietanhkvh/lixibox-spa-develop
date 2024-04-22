import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { objectToHash } from '../../../../utils/encode';

import { mapStateToProps, mapDispatchToProps } from './store';
import { ITopHashTagProps, ITopHashTagState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TopHashTagContainer extends Component<ITopHashTagProps, ITopHashTagState> {
  static defaultProps: ITopHashTagProps = DEFAULT_PROPS;

  constructor(props: ITopHashTagProps) {
    super(props);
    this.state = INITIAL_STATE as ITopHashTagState;
  }

  handleDisplayScreenHeaderDropdown(state) {
    this.setState({ isOpenScreenHeaderDropdown: state });
  }

  handleSelectHashTabs(tab) {
    this.setState({ selectedHashIndex: tab.id });
    this.fetchHashTagFeedByName(tab.name);
  }

  fetchHashTagFeedByName(tagName) {
    this.props.fetchCommunityHashtagFeedsAction({ hashtag: tagName });
  }

  firstFetchHashTagFeed(props = this.props) {
    const {
      activityFeedStore: { hashtags }
    } = props;

    const hashString = objectToHash({ days: 7 });
    const tabs = (!!hashtags && hashtags[hashString]) || [];

    if (!!tabs && !!tabs.length) {
      const hashTag = tabs[0].name;
      this.fetchHashTagFeedByName(hashTag);
    }
  }

  componentDidMount() {
    this.firstFetchHashTagFeed();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      activityFeedStore: { isFetchHashtags }
    } = this.props;

    if (!!isFetchHashtags && !nextProps.activityFeedStore.isFetchHashtags) {
      this.firstFetchHashTagFeed(nextProps);
    }
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopHashTagContainer));
