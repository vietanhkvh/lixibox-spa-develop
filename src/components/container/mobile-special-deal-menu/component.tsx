import { Component } from 'react';
import { connect } from 'react-redux';

import { renderComponent } from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { ISpecialDealMenuProps, ISpecialDealMenuState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';

class MobileSpecailDealMenu extends Component<ISpecialDealMenuProps, ISpecialDealMenuState> {
  static defaultProps = DEFAULT_PROPS as ISpecialDealMenuProps;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleHideSpecialDealMenu() {
    this.props.showHideSpecialDealMenu(false);
  }

  render() {
    const args = {
      props: this.props,
      handleHideSpecialDealMenu: this.handleHideSpecialDealMenu.bind(this)
    };
    return renderComponent(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileSpecailDealMenu);
