// TODO: Refactor
import { Component } from 'react';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';
import { isMobileVersion } from '../../../utils/responsive';
import { scrollElement } from '../../../utils/scroll';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProductColorProps, IProductColorState } from './model';
import { renderComponent } from './view';

class ProductColor extends Component<IProductColorProps, IProductColorState> {
  static defaultProps: IProductColorProps = DEFAULT_PROPS;

  constructor(props: IProductColorProps) {
    super(props);
    const { list, selected, video } = props;
    this.state = INITIAL_STATE({ list, selected, video });

    document.addEventListener('keydown', this.handleKeydown.bind(this), false);
  }

  handleKeydown(event) {
    if (event.keyCode === 37) {
      this.handleNavigateRight();
    } else if (event.keyCode === 39) {
      this.handleNavigateLeft();
    } else if (event.keyCode === 27) {
      this.props.closeModal();
    }
  }

  handleNavigateLeft() {
    const { combinedList, selectedIndex } = this.state as IProductColorState;

    let currIndex = -1;
    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (item.index === selectedIndex) {
          currIndex = index;
        }
      });

    if (currIndex < 0 || (!!combinedList && currIndex >= combinedList.length - 1)) {
      return;
    }

    const newIndex = currIndex + 1;
    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (index === newIndex) {
          this.onSelect(item.index);
          this.scrollTo(item.index);
        }
      });
  }

  handleNavigateRight() {
    const { combinedList, selectedIndex } = this.state as IProductColorState;

    let currIndex = -1;
    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (item.index === selectedIndex) {
          currIndex = index;
        }
      });

    if ((!!combinedList && currIndex >= combinedList.length) || currIndex <= 0) {
      return;
    }

    const newIndex = currIndex - 1;
    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (index === newIndex) {
          this.onSelect(item.index);
          this.scrollTo(item.index);
        }
      });
  }

  handleNavigateTo(newIndex: number) {
    const { combinedList, selectedIndex } = this.state as IProductColorState;
    let currIndex = -1;
    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (item.index === selectedIndex) {
          currIndex = index;
        }
      });

    if ((!!combinedList && currIndex >= combinedList.length) || currIndex <= 0) {
      return;
    }

    Array.isArray(combinedList) &&
      combinedList.forEach((item, index) => {
        if (index === newIndex) {
          this.onSelect(item.index);
          this.scrollTo(item.index);
        }
      });
  }

  onSelect(id) {
    let currIndex = -1;
    const { combinedList } = this.state;

    Array.isArray(combinedList) &&
      combinedList.forEach((item, _index) => {
        if (item.index === id) {
          currIndex = _index;
        }
      });

    this.setState({ selectedIndex: id, currIndex });

    const gaTracking = {
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.MODAL.VIEW_IMAGE,
      value: 1
    };

    !!gaEventTracking && gaEventTracking(gaTracking);
  }

  scrollTo(id) {
    const selectedItem = document.getElementById(`product-picture-item-${id}`);
    if (!selectedItem) return;

    const { offsetLeft } = selectedItem;
    const productPicturePanel = document.getElementById(`product-picture-panel`);
    if (!productPicturePanel) return;

    setTimeout(() => scrollElement({ x: offsetLeft - 20, y: 0, element: productPicturePanel, isAnimation: true }), 350);
  }

  componentDidMount() {
    const body = document.body;
    !!body && body.classList.add('full-body');

    if (isMobileVersion()) {
      const { video } = this.props;
      let videoElement = (video && video[0] ? document.getElementById(`${video[0]?.id}`) : null) as HTMLVideoElement;
      const productPicturePanel = document.getElementById('product-picture-panel');
      !!productPicturePanel &&
        productPicturePanel.addEventListener(
          'scroll',
          () => {
            const left = productPicturePanel.scrollLeft;
            const windowWidth = window.innerWidth;
            if (0 === left % windowWidth) {
              let newSelectedIndex = Math.floor(left / windowWidth);
              const { mobileSelectedIndex } = this.state;
              if (video[0] && video.length && videoElement) {
                if (newSelectedIndex === 0) {
                  videoElement?.paused && videoElement?.play();
                  if (videoElement?.muted) videoElement.muted = true;
                } else !videoElement?.paused && videoElement?.pause();
              }
              newSelectedIndex !== mobileSelectedIndex && this.setState({ mobileSelectedIndex: newSelectedIndex });
            }
          },
          { passive: true }
        );
      // NOTE: Implemented as a temporary fix.
      try {
        const indexAsNumber = parseInt(String(this.props.selected).slice(-1)) + Number(!!video.length);
        if (indexAsNumber !== 0 && video.length) videoElement.muted = true;
        this.handleNavigateTo(indexAsNumber);
      } catch (e) {}
    }
  }

  componentWillUnmount() {
    const body = document.body;
    !!body && body.classList.remove('full-body');
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default ProductColor;
