import { Component } from 'react';
import { connect } from 'react-redux';

import { changeAlias } from '../../../../utils/format';
import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';

import { mapStateToProps, mapDispatchToProps } from './store';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class BrandMobileContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    const {
      brandStore: { list },
      fetchBrandListAction
    } = this.props as IProps;

    !isMobileVersion() && this.props.history.push(`${ROUTING_SHOP_INDEX}`);

    if (!list || (list && 0 === list.length)) {
      fetchBrandListAction();
    }
  }

  handleGoBack() {
    const { history } = this.props;
    history && history.goBack();
  }

  /**
   * Search filter in list
   * @param {*} event : event from search input
   * get value from seacrh input to fitler list select
   */
  searchBrandFilter(event) {
    const valueSearch = event.target.value;
    const {
      brandStore: { list }
    } = this.props;

    if (valueSearch.length === 0) {
      this.setState({ filteredBrandList: [] });
      return;
    }

    const filteredBrandList =
      Array.isArray(list) &&
      list.map((alphaGroup) => {
        const groupIndex = Object.keys(alphaGroup)[0];
        return {
          [groupIndex]: alphaGroup[groupIndex].filter(
            (item) => changeAlias(item.name).indexOf(changeAlias(valueSearch)) >= 0
          )
        };
      });

    this.setState({ filteredBrandList } as IState);
  }

  render() {
    const args = {
      state: this.state,
      props: this.props,
      handleGoBack: this.handleGoBack.bind(this),
      searchBrandFilter: this.searchBrandFilter.bind(this)
    };

    return renderComponent(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BrandMobileContainer);
