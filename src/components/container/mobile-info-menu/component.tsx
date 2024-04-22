import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { renderComponent } from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IInfoMobileMenuProps, IInfoMobileMenuState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';

class MobileInfoMenu extends PureComponent<IInfoMobileMenuProps, IInfoMobileMenuState> {
  static defaultProps = DEFAULT_PROPS as IInfoMobileMenuProps;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleHideInfoMobileMenu() {
    this.props.showHideInfoMobileMenu(false);
  }

  render() {
    const args = {
      props: this.props,
      handleHideInfoMobileMenu: this.handleHideInfoMobileMenu.bind(this)
    };
    return renderComponent(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileInfoMenu);
