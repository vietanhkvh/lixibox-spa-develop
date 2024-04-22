import { PureComponent } from 'react';

import { renderComponent } from './view';
import { BoxFeedback, FeedbackSummaryResponse } from 'types/api/shop';

/**  PROPS & STATE INTERFACE */
interface IListFeedbackProps {
  list: any;
  current: any;
  per: any;
  total: any;
  urlList: any;
  isSticky?: boolean;
  handleClick?: any;
  canScrollToTop?: boolean;
  isLoading?: boolean;
  elementId?: any;
  scrollToElementNum?: number;
  rating?: any;
  openModal?: any;
  isOnModal?: boolean;
  onOpenImage?: any;
  productId: number | string;
  handleSetOpenFeedbackModal: (val: boolean) => void;
  boxFeedbackable: {
    canReview?: boolean;
    reviewed?: boolean;
  };
  boxFeedbackSummary?: { detail: FeedbackSummaryResponse | null };
  lixicoinPerFeedback: number;
  onFeedbackReact?: (params: { feedback: BoxFeedback; isLiked: boolean }) => void;
}

class ListFeedback extends PureComponent<IListFeedbackProps, any> {
  static defaultProps = {
    isSticky: false,
    isLoading: true,
    canScrollToTop: true,
    list: [],
    elementId: '',
    scrollToElementNum: 0,
    isOnModal: false
  } as IListFeedbackProps;

  constructor(props) {
    super(props);
    this.state = {
      isOpenPictureModal: false,
      imgToDisplayFullScreen: []
    };
  }

  handleDisplayDesktopFullScreenImage(list, selected) {
    this.props?.onOpenImage?.(list, selected);
  }

  setImageToDisplayFullScreen(list) {
    this.setState({ imgToDisplayFullScreen: [...list], isOpenPictureModal: true });
  }

  setDisplayPictureModal(value) {
    this.setState({ isOpenPictureModal: value });
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default ListFeedback;
