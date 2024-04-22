import { Component } from 'react';

import { preLoadImage } from '../../../utils/image';
import { isMobileVersion } from '../../../utils/responsive';

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
  initDataSlide(_newMagazineList: Array<any> = this.state.magazineList) {
    if (!isMobileVersion()) {
      if (false === this.state.firstInit) {
        this.setState({ firstInit: true } as IState);
      }
      /**
       * On DESKTOP
       * Init data for magazine slide & magazine slide selected
       */
      let _magazineSlide: Array<any> = [];
      let groupMagazine: { id: number; list: Array<any> } = {
        id: 0,
        list: []
      };

      /** Assign data into each slider */
      if (_newMagazineList.length > (this.props.column || 3)) {
        Array.isArray(_newMagazineList) &&
          _newMagazineList.forEach((magazine) => {
            groupMagazine.id = _magazineSlide.length;
            groupMagazine.list.push(magazine);

            if (groupMagazine.list.length === this.props.column) {
              _magazineSlide.push(Object.assign({}, groupMagazine));
              groupMagazine.list = [];
            }
          });
      } else {
        _magazineSlide = [{ id: 0, list: _newMagazineList }];
      }

      this.setState({
        magazineList: _newMagazineList,
        magazineSlide: _magazineSlide,
        magazineSlideSelected: _magazineSlide[0] || {}
      } as IState);
    } else {
      /**
       * On Mobile
       * Only init data for list magazine, not apply slide animation
       */
      this.setState({ magazineList: _newMagazineList } as IState);
    }
  }

  /**
   * Navigate slide by button left or right
   * @param _direction `LEFT` or `RIGHT`
   * Will set new index value by @param _direction
   */
  navSlide(_direction) {
    const { magazineSlide, countChangeSlide } = this.state;

    /**
     * If navigate to right: increase index value -> set +1 by countChangeSlide
     * If vavigate to left: decrease index value -> set -1 by countChangeSlide
     */
    let newIndexValue = 'left' === _direction ? -1 : 1;
    newIndexValue += countChangeSlide;

    /**
     * Validate new value in range [0, magazineSlide.length - 1]
     */
    newIndexValue =
      newIndexValue === magazineSlide.length
        ? 0 /** If over max value -> set 0 */
        : newIndexValue === -1
        ? /** If under min value -> set magazineSlide.length - 1 */
          magazineSlide.length - 1
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
              magazineSlideSelected: prevState.magazineSlide[_index]
            } as IState)
        ),
      10
    );
  }

  handleMouseHover() {
    const { data = [], column = 3 } = this.props;

    const preLoadImageList = Array.isArray(data)
      ? data.filter((item, $index) => $index >= column).map((item) => item.cover_image.original_url)
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
