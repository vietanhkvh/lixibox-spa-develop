import { Component } from 'react';
import { connect } from 'react-redux';

import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class HalioLandingPageContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    // Migrated from componentWillMount
    !isMobileVersion() && this.props.history.push(`${ROUTING_SHOP_INDEX}`);

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
    // End of migration

    const appContainer: any = document.getElementById('app-container');
    appContainer.style.position = 'fixed';

    const { loadGameAction, getUserGiftAction, getTodayGiftAction } = this.props;
    getUserGiftAction();
    loadGameAction();
    getTodayGiftAction();

    try {
      setInterval(() => {
        const aud: any = document.getElementById('audio');
        !!aud && aud.play();
      }, 1000);
    } catch (e) {}
  }

  handleBack() {
    window.location.href = '/games/beauty-hunter?tab=user-gift';
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleBack: this.handleBack.bind(this)
    };

    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HalioLandingPageContainer);
