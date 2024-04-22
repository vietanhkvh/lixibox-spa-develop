import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { IMobileToolbarProps, IMobileToolbarState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { scrollElement } from '../../../utils/scroll';
import { renderComponent } from './view';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

class MobileToolbar extends Component<IMobileToolbarProps, IMobileToolbarState> {
  static defaultProps: IMobileToolbarProps = DEFAULT_PROPS;

  constructor(props: IMobileToolbarProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleTracking(code) {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.MOBILE_NAVIGATION_TOOLBAR,
      label: `${GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.MOBILE_NAVIGATION_TOOLBAR.CLICK_ITEM} ${code}`,
      value: 1
    });
  }

  handleOnClick(item) {
    const {
      location: { pathname },
      history
    } = this.props as IMobileToolbarProps;
    this.handleTracking(item.code);

    if (pathname === item.link) {
      scrollElement({ x: 0, y: 0, isAnimation: true });

      if (0 === window.pageYOffset) {
        window.location.reload();
      }
    } else {
      history.push(item.link);
    }
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default withRouter(MobileToolbar as any);
