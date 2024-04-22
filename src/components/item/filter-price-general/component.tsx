import { Component } from 'react';

import { currenyFormat } from '../../../utils/currency';

import { IFilterPriceProps, IFilterPriceState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import renderView from './view';

class FilterPrice extends Component<IFilterPriceProps, IFilterPriceState> {
  static defaultProps: IFilterPriceProps = DEFAULT_PROPS;

  constructor(props) {
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
    const { pl, ph, maxPrice = 0 } = props;
    const priceDefaultList = [100, 200, 500, 1000, 2000, 5000];

    const priceLength = priceDefaultList.length;
    const priceList: Array<any> = [];
    let selectedPrice = false;

    const price = {
      name: `Nhỏ hơn 100K`,
      pl: 0,
      ph: 100,
      selected: 0 === pl && 100 === ph
    };

    selectedPrice = price.selected;

    priceList.push(price);

    for (let i = 1; i < priceLength; i++) {
      const _pl = i !== 0 ? priceDefaultList[i - 1] : 0;

      if (maxPrice <= priceDefaultList[i]) {
        const price = {
          name: `Lớn hơn ${currenyFormat(priceDefaultList[i - 1])}K`,
          pl: _pl,
          ph: maxPrice,
          selected: _pl === pl && maxPrice === ph
        };

        if (!selectedPrice) {
          selectedPrice = price.selected;
        }

        priceList.push(price);
        break;
      }

      const price = {
        name: `${currenyFormat(priceDefaultList[i - 1])}K - ${currenyFormat(priceDefaultList[i])}K`,
        pl: i !== 0 ? priceDefaultList[i - 1] : 0,
        ph: priceDefaultList[i],
        selected: _pl === pl && priceDefaultList[i] === ph
      };

      if (!selectedPrice) {
        selectedPrice = price.selected;
      }

      priceList.push(price);
    }

    this.setState({ priceList, showRefreshIcon: selectedPrice });
  }

  /**
   * Handle when select / un-select price item
   */
  selectPrice(_price) {
    let selectedPrice = false;
    this.setState((prevState, props) => ({
      priceList: Array.isArray(prevState.priceList)
        ? prevState.priceList.map((price) => {
            price.selected = price.pl === _price.pl && price.ph === _price.ph;
            if (!selectedPrice) {
              selectedPrice = price.selected;
            }
            return price;
          })
        : [],
      showRefreshIcon: selectedPrice
    }));

    _price.selected = true; // Active price selected for omit
    this.props.handleSearch(_price);
  }

  resetFilter() {
    this.setState((prevState, props) => ({
      priceList: Array.isArray(prevState.priceList)
        ? prevState.priceList.map((price) => {
            price.selected = false;
            return price;
          })
        : [],
      showRefreshIcon: false
    }));

    this.props.handleSearch({});
  }

  handleShowViewMore() {
    this.setState({ showViewMore: !this.state.showViewMore });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      resetFilter: this.resetFilter.bind(this),
      selectPrice: this.selectPrice.bind(this),
      handleShowViewMore: this.handleShowViewMore.bind(this)
    };

    return renderView(args);
  }
}

export default FilterPrice;
