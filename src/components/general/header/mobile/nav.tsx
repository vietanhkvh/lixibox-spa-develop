import { Component } from 'react';
import { connect } from 'react-redux';

import LeftNavigationMobile from './left';
import Icon from '../../../ui/icon';
import InputField from '../../../ui/input-field';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import * as LAYOUT from '../../../../style/layout';
import STYLE from './nav.style';

/**  PROPS & STATE INTERFACE */
interface INavigationMobileProps {
  history?: any;
  showHideCartSumaryLayoutAction?: any;
}

export function mapStateToProps(state) {
  return {} as INavigationMobileProps;
}

export function mapDispatchToProps(dispatch) {
  return {} as INavigationMobileProps;
}

export class NavigationMobile extends Component<INavigationMobileProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      openLeftMenu: false,
      openSearch: false
    };
  }

  /** Open / Close left menu : PROFILE & NAVIGATION */
  toggleLeftMenu(_state = true) {
    this.setState({ openLeftMenu: _state });
  }

  /** Open / Close right menu : SHOPPING CART */
  toggleSearch(_state = true) {
    this.setState({ openSearch: _state });
  }

  /** RENDER */
  render() {
    const { history, showHideCartSumaryLayoutAction } = this.props as INavigationMobileProps;

    return (
      <div style={STYLE}>
        {/** 1. Fix top bar */}
        <div style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, STYLE.fixTop)}>
          {/** 1.1. MENU ICON*/}
          <div style={Object.assign({}, LAYOUT.flexContainer, LAYOUT.flexContainer.center)}>
            {true !== this.state.openSearch && (
              <Icon
                name={'menu'}
                style={STYLE.menuIcon}
                innerStyle={STYLE.menuIcon.inner}
                onClick={() => this.toggleLeftMenu(true)}
              />
            )}
            {true !== this.state.openSearch && (
              // TODO: Change the following `a` tag to div, span or button.
              // eslint-disable-next-line
              <a
                style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, STYLE.logo)}
                onClick={() => history.push(`${ROUTING_SHOP_INDEX}`)}
              >
                <Icon name={'logo-line'} style={STYLE.logo.line} innerStyle={STYLE.logo.line.inner} />
                <Icon name={'logo-text'} style={STYLE.logo.text} innerStyle={STYLE.logo.text.inner} />
              </a>
            )}
          </div>

          {/** 1.2. Close search icon */}

          {/** 1.3. LOGO */}

          {/** 1.4. Input search */}
          <input
            type={InputField.INPUT_TYPE.SEARCH}
            name={InputField.INPUT_NAME.SEARCH}
            ref={(input) => input && input.focus()}
            placeholder="Nhập từ khoá tìm kiếm..."
            style={Object.assign({}, STYLE.inputSearch, !this.state.openSearch && STYLE.inputSearch.hide)}
          ></input>

          {/** 1.5. Toggle Search */}
          <div style={Object.assign({}, LAYOUT.flexContainer, LAYOUT.flexContainer.center)}>
            {true === this.state.openSearch ? (
              <Icon
                name={'close'}
                style={STYLE.menuIcon}
                innerStyle={STYLE.menuIcon.inner}
                onClick={() => this.toggleSearch(false)}
              />
            ) : (
              <Icon
                name={'search'}
                style={STYLE.menuIcon}
                innerStyle={STYLE.menuIcon.inner}
                onClick={() => this.toggleSearch(true)}
              />
            )}

            {true !== this.state.openSearch && (
              <Icon
                name={'cart'}
                style={STYLE.menuIcon}
                innerStyle={STYLE.menuIcon.inner}
                onClick={() => showHideCartSumaryLayoutAction?.(true)}
              />
            )}
          </div>
        </div>

        {/** 2. Menu Left Mobile */}
        <div
          style={Object.assign(
            {},
            STYLE.menuMobile,
            STYLE.menuMobile.left,
            this.state.openLeftMenu && STYLE.menuMobile.left.active
          )}
        >
          <LeftNavigationMobile closeLeftPanel={() => this.toggleLeftMenu(false)} />
        </div>
      </div>
    );
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NavigationMobile);
