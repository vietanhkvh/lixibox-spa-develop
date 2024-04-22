import { PureComponent } from 'react';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class MagazineCategory extends PureComponent<IProps, IState> {
  static defaultProps = DEFAULT_PROPS;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state as IState;

    let eleInfo = this.getPositionElementById('category-detail-menu');

    eleInfo &&
      eleInfo.top <= 0 &&
      !isSubCategoryOnTop &&
      this.setState({
        isSubCategoryOnTop: true,
        heightSubCategoryToTop: window.scrollY
      });

    heightSubCategoryToTop >= window.scrollY && isSubCategoryOnTop && this.setState({ isSubCategoryOnTop: false });
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    return el && el.getBoundingClientRect();
  }

  componentWillUnmount() {
    window.addEventListener('scroll', () => {});
  }

  handleShowSubCategory() {
    this.setState({ showSubCategory: !this.state.showSubCategory });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.props.slug !== nextProps.slug && this.state.showSubCategory && this.setState({ showSubCategory: false });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleShowSubCategory: this.handleShowSubCategory.bind(this)
    };

    return renderView(args);
  }
}

export default MagazineCategory;
