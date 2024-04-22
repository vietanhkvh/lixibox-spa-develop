import { Component } from 'react';
import { connect } from 'react-redux';

import { preLoadImage } from '../../../../utils/image';
import { getUrlParameter } from '../../../../utils/format';

import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

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
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    // Migrated from componentWillMount
    !isMobileVersion() && this.props.history.push(`${ROUTING_SHOP_INDEX}`);
    preLoadImage([
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/bgr.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/diamond.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/nav.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-flora.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-info.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-phone.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-play.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-tab-1.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-tab-2.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-text.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-flora.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-info.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-text.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-time.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-info.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-1.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-2.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-3.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-1.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-2.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-3.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-4.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-5.png'),
      CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-text.png')
    ]);

    const accessToken = getUrlParameter(window.location.search, 'access_token');
    const giftTab = getUrlParameter(window.location.search, 'tab');
    if ('user-gift' === giftTab) {
      const { loadGameAction, getUserGiftAction, getTodayGiftAction } = this.props;

      this.setState({ tab: 2 });
      getUserGiftAction();
      loadGameAction();
      getTodayGiftAction();
    }

    !!accessToken && !!accessToken.length && this.props.signInWithTokenAction({ accessToken });
    this.props.fetchConstantsAction();
    // End of migration

    const appContainer: any = document.getElementById('app-container');
    appContainer.style.position = 'fixed';

    this.props.updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com`,
        type: 'article',
        title: 'Beauty Hunter - Lixibox Game',
        description: 'Lixibox shop box mỹ phẩm cao cấp, trị mụn, dưỡng da và các sản phẩm máy rửa mặt cho các loại da.',
        keyword: 'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre',
        image: CDN_ASSETS_PREFIX('/meta/cover.png')
      },
      structuredData: {
        breadcrumbList: []
      }
    });
  }

  handleChangeTab(index) {
    this.setState({
      tab: index
    });
  }

  handlePlay() {
    this.props.history.push('/games/beauty-hunter/play');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      gameStore: { isLoadingRedeemPlayTimes },
      loadGameAction,
      getUserGiftAction,
      getTodayGiftAction,
      authStore: { isSignInWithTokenSuccess }
    } = this.props;

    if (!isSignInWithTokenSuccess && nextProps.authStore.isSignInWithTokenSuccess) {
      getUserGiftAction();
      loadGameAction();
      getTodayGiftAction();
    }

    if (!!isLoadingRedeemPlayTimes && !nextProps.gameStore.isLoadingRedeemPlayTimes) {
      if (!!nextProps.gameStore.redeemResult) {
        this.setState({ redeemResultMessage: 'Bạn  đã có thêm lượt chơi mới' });
      } else {
        this.setState({ redeemResultMessage: 'Đã có lỗi xảy ra' });
      }
    }
  }

  handleShowHideInfo(state) {
    this.setState({ isShowInfo: state });
  }

  handleShowHideRedeem(state) {
    this.setState({ isShowRedeem: state, redeemResultMessage: '' });
  }

  handleRedeemPlayTimes() {
    this.setState({ redeemResultMessage: '' });
    this.props.redeemPlayTimesAction();
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleChangeTab: this.handleChangeTab.bind(this),
      handlePlay: this.handlePlay.bind(this),
      handleShowHideInfo: this.handleShowHideInfo.bind(this),
      handleShowHideRedeem: this.handleShowHideRedeem.bind(this),
      handleRedeemPlayTimes: this.handleRedeemPlayTimes.bind(this)
    };

    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HalioLandingPageContainer);
