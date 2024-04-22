import { Component } from 'react';

import { preLoadImage } from '../../../utils/image';
import { isMobileVersion } from '../../../utils/responsive';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TestimonialSlider extends Component<IProps, IState> {
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
  initDataSlide(_newTestimonialList: Array<any> = this.state.testimonialList) {
    if (!isMobileVersion()) {
      if (!this.state.firstInit) {
        this.setState({ firstInit: true } as IState);
      }
      /**
       * On DESKTOP
       * Init data for testimonial slide & testimonial slide selected
       */
      let _testimonialSlide: Array<any> = [];
      let groupTestimonial: { id: number; list: Array<any> } = {
        id: 0,
        list: []
      };

      /** Assign data into each slider */
      const testimonialLength = _newTestimonialList.length;
      if (testimonialLength > (this.props.column || 4)) {
        Array.isArray(_newTestimonialList) &&
          _newTestimonialList.forEach((testimonial, index) => {
            groupTestimonial.id = _testimonialSlide.length;
            groupTestimonial.list.push(testimonial);

            if (groupTestimonial.list.length === this.props.column) {
              _testimonialSlide.push(Object.assign({}, groupTestimonial));
              groupTestimonial.list = [];
            }

            // End array and have item less than column then add new group
            index === testimonialLength - 1 &&
              !!this.props.column &&
              testimonialLength % this.props.column !== 0 &&
              _testimonialSlide.push({
                id: _testimonialSlide.length + 1,
                list: groupTestimonial.list
              });
          });
      } else {
        _testimonialSlide = [{ id: 0, list: _newTestimonialList }];
      }

      this.setState({
        testimonialList: _newTestimonialList,
        testimonialSlide: _testimonialSlide,
        testimonialSlideSelected: _testimonialSlide[0] || {}
      } as IState);
    } else {
      /**
       * On Mobile
       * Only init data for list testimonial, not apply slide animation
       */
      this.setState({ testimonialList: _newTestimonialList } as IState);
    }
  }

  /**
   * Navigate slide by button left or right
   * @param _direction `LEFT` or `RIGHT`
   * Will set new index value by @param _direction
   */
  navSlide(_direction) {
    const { testimonialSlide, countChangeSlide } = this.state;

    /**
     * If navigate to right: increase index value -> set +1 by countChangeSlide
     * If vavigate to left: decrease index value -> set -1 by countChangeSlide
     */
    let newIndexValue = 'left' === _direction ? -1 : 1;
    newIndexValue += countChangeSlide;

    /**
     * Validate new value in range [0, testimonialSlide.length - 1]
     */
    newIndexValue =
      newIndexValue === testimonialSlide.length
        ? 0 /** If over max value -> set 0 */
        : newIndexValue === -1
        ? /** If under min value -> set testimonialSlide.length - 1 */
          testimonialSlide.length - 1
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
              testimonialSlideSelected: prevState.testimonialSlide[_index]
            } as IState)
        ),
      10
    );
  }

  handleMouseHover() {
    const { data, column = 0 } = this.props;

    const preLoadImageList = Array.isArray(data)
      ? data.filter(($index) => $index >= column).map((item) => item.picture_url)
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

export default TestimonialSlider;
