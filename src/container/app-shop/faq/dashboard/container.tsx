import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import renderView from './view';
import { IProps, IState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ShopIndexContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    this.props.fetchFaqTopicListAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!!this.props.faqStore.isFetchTopicList && !nextProps.faqStore.isFetchTopicList) {
      const { topicList } = nextProps.faqStore;
      if (!!topicList && !!topicList.length && topicList[0].slug) {
        this.props.fetchFaqArticlesList({ topicSlug: topicList[0].slug });
      }
    }
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ShopIndexContainer));
