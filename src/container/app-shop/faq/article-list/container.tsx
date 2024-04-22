import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTING_PRODUCT_MANUAL } from '../../../../routings/path';

import renderView from './view';
import { IProps, IState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ShopIndexContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;

    /* Fallback if unvalid */
    const { match, history } = this.props;
    const topicSlug = !!match && !!match.params ? match.params.topicSlug : '';
    if (!topicSlug || !topicSlug.length) history.push(ROUTING_PRODUCT_MANUAL);
  }

  componentDidMount() {
    const { match } = this.props;
    const topicSlug = !!match && !!match.params ? match.params.topicSlug : '';

    this.props.fetchFaqArticlesList({ topicSlug });
    this.props.fetchFaqTopicListAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const topicSlug = nextProps.match.params.topicSlug;
    if (this.props.match.params.topicSlug !== topicSlug) {
      this.props.fetchFaqArticlesList({ topicSlug });
    }
  }

  handleOpenTopicModal(state) {
    this.setState({ isOpenTopicModal: state });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ShopIndexContainer));
