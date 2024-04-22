import { PureComponent } from 'react';

import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IWishListProps, IWishListState } from './model';
import { renderComponent } from './view';

class SummaryWishList extends PureComponent<IWishListProps, IWishListState> {
  static defaultProps: IWishListProps = DEFAULT_PROPS;

  constructor(props: IWishListProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    !this.props.isNotShowLoading && this.setState({ isLoadingList: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps: IWishListProps) {
    // Fetching notification list success
    this.props.isFetchLikedListSuccess && !nextProps.isFetchLikedListSuccess && this.setState({ isLoadingList: true });

    // Fetched notification list success
    !this.props.isFetchLikedListSuccess && nextProps.isFetchLikedListSuccess && this.setState({ isLoadingList: false });

    nextProps.isCartSummaryVisible && this.setState({ isLoadingAddToCard: false } as IWishListState);
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderComponent(args);
  }
}

export default SummaryWishList;
