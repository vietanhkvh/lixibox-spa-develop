import { Component } from 'react';

import { preLoadImage } from '../../../../utils/image';
import { isMobileVersion } from '../../../../utils/responsive';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class ImageSlide extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE(props.data);
  }

  componentDidMount() {
    this.initDataSlide();
  }

  /**
   * When component will receive new props -> init data for slide
   * @param nextProps prop from parent
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initDataSlide(nextProps.data);
  }

  /**
   * Init data for slide
   * When : Component will mount OR Component will receive new props
   */
  initDataSlide(_newImageList: Array<any> = this.state.imageList) {
    if (!isMobileVersion()) {
      if (false === this.state.firstInit) {
        this.setState({ firstInit: true } as IState);
      }
      /**
       * On DESKTOP
       * Init data for image slide & image slide selected
       */
      let _imageSlide: Array<any> = [];
      let groupImage: { id: number; list: Array<any> } = {
        id: 0,
        list: []
      };

      /** Assign data into each slider */
      if (_newImageList.length > (this.props.column || 3)) {
        Array.isArray(_newImageList) &&
          _newImageList.forEach((image) => {
            groupImage.id = _imageSlide.length;
            groupImage.list.push(image);

            if (groupImage.list.length === this.props.column) {
              _imageSlide.push(Object.assign({}, groupImage));
              groupImage.list = [];
            }
          });
      } else {
        _imageSlide = [{ id: 0, list: _newImageList }];
      }

      this.setState({
        imageList: _newImageList,
        imageSlide: _imageSlide,
        imageSlideSelected: _imageSlide[0] || {}
      } as IState);
    } else {
      /**
       * On Mobile
       * Only init data for list image, not apply slide animation
       */
      this.setState({ imageList: _newImageList } as IState);
    }
  }

  /**
   * Navigate slide by button left or right
   * @param _direction `LEFT` or `RIGHT`
   * Will set new index value by @param _direction
   */
  navSlide(_direction) {
    const { imageSlide, countChangeSlide } = this.state;

    /**
     * If navigate to right: increase index value -> set +1 by countChangeSlide
     * If vavigate to left: decrease index value -> set -1 by countChangeSlide
     */
    let newIndexValue = 'left' === _direction ? -1 : 1;
    newIndexValue += countChangeSlide;

    /**
     * Validate new value in range [0, imageSlide.length - 1]
     */
    newIndexValue =
      newIndexValue === imageSlide.length
        ? 0 /** If over max value -> set 0 */
        : newIndexValue === -1
        ? /** If under min value -> set imageSlide.length - 1 */
          imageSlide.length - 1
        : newIndexValue;

    /** Change to new index value */
    this.selectSlide(newIndexValue);
  }

  navLeftSlide() {
    this.navSlide('left');
  }

  navRightSlide() {
    this.navSlide('right');
  }

  /**
   * Change slide by set state and setTimeout for animation
   * @param _index new index value
   */
  selectSlide(_index) {
    /** Change background */
    setTimeout(
      () =>
        this.setState(
          (prevState, props) =>
            ({
              countChangeSlide: _index,
              imageSlideSelected: prevState.imageSlide[_index]
            } as IState)
        ),
      10
    );
  }

  handleMouseHover() {
    const { data = [], column = 3 } = this.props;

    const preLoadImageList = Array.isArray(data)
      ? data.filter((item, $index) => $index >= column).map((item) => item.image_url)
      : [];

    preLoadImage(preLoadImageList);
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      handleMouseHover: this.handleMouseHover.bind(this),
      selectSlide: (index) => this.selectSlide(index),
      navLeftSlide: this.navLeftSlide.bind(this),
      navRightSlide: this.navRightSlide.bind(this)
    };

    return renderView(renderViewProps);
  }
}

export default ImageSlide;
