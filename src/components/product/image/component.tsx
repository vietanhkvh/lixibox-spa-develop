import { Component, createRef } from 'react';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { scrollElement } from '../../../utils/scroll';
import { areDifferentPrimitiveArrays } from 'utils/primitive';
import { isMobileVersion } from 'utils/responsive';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { IProductImageProps, IProductImageState, IImageItem } from './model';
import { DEFAULT_PROPS, INITIAL_STATE, ID_VIDEO_ITEM } from './initialize';
import { generateImageList, selectImageModule } from './module';
import View from './view';

class ProductImage extends Component<IProductImageProps, IProductImageState> {
  static defaultProps: IProductImageProps = DEFAULT_PROPS;
  videoRef: React.RefObject<any>;

  constructor(props: IProductImageProps) {
    super(props);
    const { boxFeedbackPicture, list } = props;
    this.state = INITIAL_STATE({
      boxFeedbackPicture,
      list
    });
    this.videoRef = createRef();
  }

  handleFullScreenChange() {
    let videoDom = document.getElementById(`${ID_VIDEO_ITEM}-${0}`) as HTMLVideoElement;
    if (videoDom && document.fullscreenElement === videoDom) {
      videoDom.muted = false;
    } else if (videoDom) {
      videoDom.muted = true;
    }
  }

  componentDidMount() {
    const productPicturePanel = document.getElementById('product-picture-slider-panel');
    if (isMobileVersion()) {
      const videoElement = this.videoRef?.current;

      videoElement && videoElement.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
    }

    if (!!productPicturePanel) {
      const { video } = this.props;
      /* Init scroll */
      typeof productPicturePanel.scrollTo === 'function' && productPicturePanel.scrollTo(0, 0);

      /* Listen scroll */
      productPicturePanel.addEventListener(
        'scroll',
        () => {
          const left = productPicturePanel.scrollLeft;
          const offsetWidth = productPicturePanel.offsetWidth;
          if (0 === left % offsetWidth) {
            const newSelectedIndex = Math.floor(left / offsetWidth);
            const { selectedIndex } = this.state;
            if (video && video.length) {
              if (newSelectedIndex === 0) this.startVideo(`${ID_VIDEO_ITEM}-${0}`);
              else this.stopVideos();
            }
            newSelectedIndex !== selectedIndex && this.setState({ selectedIndex: newSelectedIndex });
          }
        },
        { passive: true }
      );
    }
  }

  /**
   * 1. Receive next props
   * 2. Genarate image list
   * 3. Update state
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    //check have
    const { boxFeedbackPicture, list } = nextProps;
    if (this.state.selectedIndex < 0) {
      if (nextProps.isPauseVideo) {
        this.stopVideos();
      } else {
        this.startVideo(`${ID_VIDEO_ITEM}-${this.state.selectedIndex}`);
      }
    }

    const currentListIds = this.props.list?.map((item) => item.id) || [];
    const nextListIds = nextProps.list?.map((item) => item.id) || [];
    const hasListChanged = areDifferentPrimitiveArrays(currentListIds, nextListIds);

    if (hasListChanged) {
      let imageList = generateImageList({ list, boxFeedbackPicture, isHaveVideo: false });
      this.setState({
        imageList
      });
    }

    if (hasListChanged) {
      let videoSelected = 0;
      let imageList = generateImageList({ list, boxFeedbackPicture, isHaveVideo: true });

      this.setState({
        imageList,
        videoSelected
      });
    }
  }

  stopVideos() {
    this.props.video.forEach((_, index) => {
      let domItem = document.getElementById(`${ID_VIDEO_ITEM}-${index}`) as HTMLVideoElement;
      if (domItem && !domItem.paused) {
        domItem.pause();
      }
    });
  }

  startVideo(id) {
    let domItem = document.getElementById(id) as HTMLVideoElement;
    if (domItem && domItem.paused) {
      domItem.play();
    }
  }

  selectVideo() {
    const { boxFeedbackPicture, list } = this.props;
    this.setState({
      imageList: generateImageList({ boxFeedbackPicture, list, isHaveVideo: this.props.video.length }),
      selectedIndex: 0,
      translateListImage: 0,
      videoSelected: 0
    });
  }

  /**
   * Select Image
   * 1. User click image in list
   * 2. Call selectImageModule, receive new state
   * 3. Update state
   */
  selectImage(image: IImageItem, index: number) {
    this.setState({
      videoSelected: !image ? 0 : -1
    } as IProductImageState);

    const { video } = this.props;
    const isExistVideo = video && video.length;
    const offsetIndex = isExistVideo ? 1 : 0;

    const productPicturePanel = document.getElementById('product-picture-slider-panel');
    const offsetWidth = productPicturePanel.offsetWidth;

    scrollElement({
      x: (index + offsetIndex) * offsetWidth,
      y: 0,
      element: productPicturePanel,
      isAnimation: true
    });

    let newSelectImageModule = selectImageModule(this.state.imageList, image, index);

    this.setState({
      ...newSelectImageModule,
      selectedIndex: index + offsetIndex
    });
  }

  viewImage(selectedImage) {
    if (!selectedImage || !selectedImage.index) return;

    this.props.onSelect({ selected: selectedImage.index });

    const openModalGaTracking = {
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.MODAL.OPEN_MODAl,
      value: 1
    };

    !!gaEventTracking && gaEventTracking(openModalGaTracking);
  }

  viewVideo() {
    this.props.onSelect({ selected: 2010 });
  }

  componentWillUnmount() {
    const videoElement = this.videoRef.current;
    videoElement && videoElement.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
  }

  render() {
    return (
      <View
        {...{
          props: this.props,
          state: this.state,
          videoRef: this.videoRef,
          viewImage: this.viewImage.bind(this),
          startVideo: this.startVideo.bind(this),
          selectImage: this.selectImage.bind(this),
          stopVideos: this.stopVideos.bind(this),
          selectVideo: this.selectVideo.bind(this),
          viewVideo: this.viewVideo.bind(this)
        }}
      />
    );
  }
}

export default ProductImage;
