import { Component } from 'react';

import { IFilterBrandProps, IFilterBrandState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import renderView from './view';

class FilterBrand extends Component<IFilterBrandProps, IFilterBrandState> {
  static defaultProps: IFilterBrandProps = DEFAULT_PROPS;

  constructor(props: IFilterBrandProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.initData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  initData(props = this.props) {
    this.setState({ showRefreshIcon: !!props.brandList.find((brand) => brand.selected) });
  }

  /**
   * Handle when select / un-select brand item
   */
  selectBrand(_brand) {
    this.props.handleSearch('select', _brand);
  }

  resetFilter() {
    this.props.handleSearch('reset');
  }

  handleShowViewMore() {
    this.setState({ showViewMore: !this.state.showViewMore });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      resetFilter: this.resetFilter.bind(this),
      selectBrand: this.selectBrand.bind(this),
      handleShowViewMore: this.handleShowViewMore.bind(this)
    };

    return renderView(args);
  }
}

export default FilterBrand;
