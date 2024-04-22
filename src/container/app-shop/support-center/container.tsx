import { Component } from 'react';
import { connect } from 'react-redux';

import { getUrlParameter } from '../../../utils/format';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

declare global {
  interface Window {
    webkitAudioContext: any;
    AudioContext: any;
  }
}

class HalioLandingPageContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    const autoRedirect = getUrlParameter(window.location.search, 'auto-redirect');
    this.state = INITIAL_STATE({ autoRedirect });

    const {
      cartStore: { constants }
    } = props;

    if (!!constants) {
      if (!!autoRedirect) {
        const formUrl = this.generateFormUrl();
        window.location.href = formUrl;
      }
    }
  }

  componentDidMount(): void {
    this.setState({ isIframeLoading: true });
  }

  handleSetIframeLoaded(): void {
    this.setState({ isIframeLoading: false });
  }

  generateFormUrl() {
    const {
      cartStore: { constants },
      authStore: { userInfo },
      location
    } = this.props;

    let paramsObj: any = [];
    const orderNumber = getUrlParameter(location.search, 'order-number');

    if (!!userInfo && userInfo.referral_code)
      paramsObj = [...paramsObj, { key: 'referral_code', value: userInfo.referral_code }];
    if (!!orderNumber) paramsObj = [...paramsObj, { key: 'order_number', value: orderNumber }];

    const params = !paramsObj.length ? '' : `?${paramsObj.map((item) => `${item.key}=${item.value}`).join('&')}`;
    return `${constants.problem_report_url}${params}`;
  }

  render() {
    return renderView.bind(this)();
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HalioLandingPageContainer);
