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
    const { match } = this.props;
    const articleSlug = !!match && !!match.params ? match.params.articleSlug : '';

    this.props.getArticleDetail({ articleSlug });
    this.props.fetchFaqTopicListAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!!this.props.faqStore.isFetchArticlesDetail && !nextProps.faqStore.isFetchArticlesDetail) {
      const topicSlug =
        nextProps.faqStore.articlesDetail && nextProps.faqStore.articlesDetail.topic
          ? nextProps.faqStore.articlesDetail.topic.slug
          : '';
      if (!!topicSlug && !!topicSlug.length) {
        this.props.fetchFaqArticlesList({ topicSlug });
      }
    }

    if (this.props.match.params.articleSlug !== nextProps.match.params.articleSlug) {
      this.props.getArticleDetail({ articleSlug: nextProps.match.params.articleSlug });
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
