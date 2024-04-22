import { PureComponent } from 'react';

import { IProps, IState } from './model';
import renderView from './view';

class SpecialDealsPanelContainer extends PureComponent<IProps, IState> {
  componentDidMount() {
    const {
      specialDealStore: { specialDealList },
      fetchSpecialDealList
    } = this.props as IProps;

    0 === specialDealList.length && fetchSpecialDealList({ page: 1, perPage: 10 });
  }

  componentWillUnmount() {
    this.props.clearDataSpecialDealAction();
    this.props.clearDataSpecialDealListAction();
  }

  render() {
    return renderView(this.props);
  }
}

export default SpecialDealsPanelContainer;
