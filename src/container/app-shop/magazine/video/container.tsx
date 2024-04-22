import { PureComponent } from 'react';

import { isEmptyObject } from '../../../../utils/validate';
import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class MagazineVideoContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);

    this.state = INITIAL_STATE;
  }

  handleViewMore() {
    const { page = 1 } = this.state;
    this.setState({ page: page + 1, isLoading: true }, this.fetchVideo);
  }

  handleFetchVideo() {
    const { isFetchVideo } = this.state as IState;

    !isFetchVideo && this.setState({ isFetchVideo: true }, this.fetchVideo);
  }

  fetchVideo() {
    const { perPage, fetchMagazineList } = this.props as IProps;

    const { page } = this.state;

    const paramMagazineVideo = {
      page,
      perPage,
      type: MAGAZINE_LIST_TYPE.VIDEO
    };
    this.setState({ isLoading: true }, () => fetchMagazineList(paramMagazineVideo));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      magazineStore: { videoPaging, isFetchMagazineListSuccess }
    } = nextProps;

    if (!this.props.magazineStore.isFetchMagazineListSuccess && isFetchMagazineListSuccess) {
      this.setState({ isLoading: false });

      !isEmptyObject(videoPaging) &&
        videoPaging.current_page === videoPaging.total_pages &&
        this.setState({ isFullyLoading: true });
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleViewMore: this.handleViewMore.bind(this),
      handleFetchVideo: this.handleFetchVideo.bind(this)
    };

    return renderView(args);
  }
}

export default MagazineVideoContainer;
