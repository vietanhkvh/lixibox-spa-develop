import { Component } from 'react';

import { BANNER_ID, BANNER_LIMIT_DEFAULT } from '../../../../constants/application/default';
import { objectToHash } from '../../../../utils/encode';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class Footer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * Check data exist or not to fetch
   *
   * Init data from
   * - current props
   * - next props
   */
  initData() {
    setTimeout(() => {
      this.setState({ delayDisplay: true } as IState);
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const footerBannerHash = objectToHash({
      idBanner: BANNER_ID.FOOTER,
      limit: BANNER_LIMIT_DEFAULT
    });
    const bannerListLen =
      (this.props.bannerStore.bannerList &&
        Array.isArray(this.props.bannerStore.bannerList[footerBannerHash]) &&
        this.props.bannerStore.bannerList[footerBannerHash].length) ||
      0;
    const nextBannerListLen =
      (nextProps.bannerStore.bannerList &&
        Array.isArray(nextProps.bannerStore.bannerList[footerBannerHash]) &&
        nextProps.bannerStore.bannerList[footerBannerHash].length) ||
      0;

    if (bannerListLen !== nextBannerListLen) {
      return true;
    }

    if (this.state.delayDisplay !== nextState.delayDisplay) {
      return true;
    }

    return false;
  }

  render() {
    return renderView(this.props, this.state);
  }
}

export default Footer;
