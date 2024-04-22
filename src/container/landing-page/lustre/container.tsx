import { Component } from 'react';
import { connect } from 'react-redux';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class LustreLandingPageContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChooseProductType(isIncremental = true) {
    const { productTypeList } = this.props;
    const { positionProductType = 0 } = this.state;
    const length = (productTypeList && productTypeList.length) || 0;

    isIncremental &&
      positionProductType < length - 1 &&
      this.setState({ positionProductType: positionProductType + 1 });

    !isIncremental && !!positionProductType && this.setState({ positionProductType: positionProductType - 1 });
  }

  componentDidMount() {
    const { fetchDataHomePageAction, fetchWatchedListAction } = this.props;
    fetchDataHomePageAction();

    /** Fetch watched List */
    const fetchWatchedListParam = { page: 1, perPage: 25 };
    fetchWatchedListAction(fetchWatchedListParam);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleChooseProductType: this.handleChooseProductType.bind(this)
    };

    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LustreLandingPageContainer);
