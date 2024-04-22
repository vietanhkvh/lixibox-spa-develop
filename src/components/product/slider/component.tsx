import { Component } from 'react';

import { preLoadImage } from '../../../utils/image';
import { isMobileVersion } from '../../../utils/responsive';
import { isCompareObject } from '../../../utils/validate';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';

class ContainerProductSlide extends Component<IProps, IState> {
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
    // Rerender slider if GIFT CART MODAL, beaucase modal not render
    if (this.props.productIdSelected !== nextProps.productIdSelected && nextProps.purchaseType === PURCHASE_TYPE.GIFT) {
      let index = 0;
      const list = nextProps.data || [];
      const len = list.length || 0;
      for (let i = 0; i < len; i++) {
        if (list[i].slug === nextProps.productIdSelected) {
          index = i;
          break;
        }
      }

      let selectedIndex = 0;
      let sliderLen = this.getSliderLen(len, nextProps.column);
      for (let i = 1; i <= sliderLen; i++) {
        if (index < i * nextProps.column) {
          selectedIndex = i - 1;
          break;
        }
      }

      this.selectSlide(selectedIndex, true);
    } else {
      this.initDataSlide(nextProps.data);
    }
  }

  getSliderLen(length, column = 3) {
    if (!length || !column) return 0;

    const len = length / column;
    const mod = length % column;
    return mod !== 0 ? len + 1 : len;
  }

  /**
   * Init data for slide
   * When : Component will mount OR Component will receive new props
   */
  initDataSlide(_newProductList: Array<any> = this.state.productList) {
    if (!isMobileVersion()) {
      if (false === this.state.firstInit) {
        this.setState({ firstInit: true } as IState);
      }
      /**
       * On DESKTOP
       * Init data for product slide & product slide selected
       */
      let _productSlide: Array<any> = [];
      let groupProduct: { id: number; list: Array<any> } = {
        id: 0,
        list: []
      };

      /** Assign data into each slider */
      if (_newProductList.length > (this.props.column || 3)) {
        Array.isArray(_newProductList) &&
          _newProductList.forEach((product, $index) => {
            groupProduct.id = _productSlide.length;
            groupProduct.list.push(product);

            if (groupProduct.list.length === this.props.column || _newProductList.length - 1 === $index) {
              _productSlide.push(Object.assign({}, groupProduct));
              groupProduct.list = [];
            }
          });
      } else {
        _productSlide = [{ id: 0, list: _newProductList }];
      }

      this.setState({
        productList: _newProductList,
        productSlide: _productSlide,
        productSlideSelected: _productSlide[0] || {}
      } as IState);
    } else {
      /**
       * On Mobile
       * Only init data for list product, not apply slide animation
       */
      this.setState({ productList: _newProductList } as IState);
    }
  }

  /**
   * Navigate slide by button left or right
   * @param _direction `LEFT` or `RIGHT`
   * Will set new index value by @param _direction
   */
  navSlide(_direction) {
    const { productSlide, countChangeSlide } = this.state;

    /**
     * If navigate to right: increase index value -> set +1 by countChangeSlide
     * If vavigate to left: decrease index value -> set -1 by countChangeSlide
     */
    let newIndexValue = 'left' === _direction ? -1 : 1;
    newIndexValue += countChangeSlide;

    /**
     * Validate new value in range [0, productSlide.length - 1]
     */
    newIndexValue =
      newIndexValue === productSlide.length
        ? 0 /** If over max value -> set 0 */
        : newIndexValue === -1
        ? /** If under min value -> set productSlide.length - 1 */
          productSlide.length - 1
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
  selectSlide(_index, isShowAnimating = false) {
    /** Start animation */
    !isShowAnimating && this.setState({ animating: true } as IState);

    /** Change background */
    setTimeout(
      () =>
        this.setState(
          (prevState, props) =>
            ({
              countChangeSlide: _index,
              productSlideSelected: prevState.productSlide[_index],
              animating: false
            } as IState)
        ),
      10
    );
  }

  handleMouseHover() {
    const { data = [], column = 4 } = this.props;

    const preLoadImageList = Array.isArray(data)
      ? data.filter((item, $index) => $index >= column).map((item) => item.primary_picture.medium_url)
      : [];

    preLoadImage(preLoadImageList);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (!!this.props.data && !!nextProps.data && this.props.data.length !== nextProps.data.length) {
      return true;
    }
    if (!isCompareObject(this.props.cartStore, nextProps.cartStore)) {
      return true;
    }
    if (!isCompareObject(this.props.likedIdList, nextProps.likedIdList)) {
      return true;
    }
    if (this.props.isShowQuickView !== nextProps.isShowQuickView) {
      return true;
    }
    if (this.props.isShowQuickBuy !== nextProps.isShowQuickBuy) {
      return true;
    }
    if (this.props.isShowLike !== nextProps.isShowLike) {
      return true;
    }
    if (this.props.displayCartSumaryOption !== nextProps.displayCartSumaryOption) {
      return true;
    }
    if (this.props.isShowCurrentPrice !== nextProps.isShowCurrentPrice) {
      return true;
    }
    if (this.props.isShowRating !== nextProps.isShowRating) {
      return true;
    }
    if (this.props.isShowImage !== nextProps.isShowImage) {
      return true;
    }
    if (this.props.isShowHeader !== nextProps.isShowHeader) {
      return true;
    }
    if (this.props.isCustomTitle !== nextProps.isCustomTitle) {
      return true;
    }
    if (this.props.isShowViewMore !== nextProps.isShowViewMore) {
      return true;
    }
    if (this.props.productIdSelected !== nextProps.productIdSelected) {
      return true;
    }

    if (this.state.countChangeSlide !== nextState.countChangeSlide) {
      return true;
    }

    const dataLen = (this.props.data && this.props.data.length) || 0;
    if (dataLen > 0 && this.state.firstInit !== nextState.firstInit) {
      return true;
    }

    return false;
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

export default ContainerProductSlide;
