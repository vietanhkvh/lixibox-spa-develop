import { Component } from 'react';

import { INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class CollectionDetailContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    this.init(this.props);
  }

  init(props = this.props) {
    const {
      match: {
        params: { collectionId }
      },
      getCollectionDetailAction
    } = props;

    getCollectionDetailAction({ id: collectionId });
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  openFeedDetail(feedId) {
    this.setState({ feedActiveId: feedId });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      openFeedDetail: this.openFeedDetail.bind(this)
    };

    return renderView(args);
  }
}

export default CollectionDetailContainer;
