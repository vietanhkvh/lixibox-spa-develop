import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './store';
import { ITopGoodSaleProps, ITopGoodSaleState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TopGoodSaleContainer extends Component<ITopGoodSaleProps, ITopGoodSaleState> {
  static defaultProps: ITopGoodSaleProps = DEFAULT_PROPS;

  constructor(props: ITopGoodSaleProps) {
    super(props);
    this.state = INITIAL_STATE as ITopGoodSaleState;
  }

  handleDisplayScreenHeaderDropdown(state) {
    this.setState({ isOpenScreenHeaderDropdown: state });
  }

  componentDidMount() {
    this.props.fetchCommunityGoodSale({ limit: 10 });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopGoodSaleContainer));
