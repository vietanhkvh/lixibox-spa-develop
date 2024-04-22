import { Component } from 'react';
import { connect } from 'react-redux';

import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

import { IProps, IState } from './model';
import { mapDispatchToProps, mapStateToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

declare global {
  interface Window {
    DeviceMotionEvent: any;
    isShaking: any;
  }
}

class HalioLandingPageContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  private timer: any = null;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;

    window.isShaking = false;

    setTimeout(() => {
      if (typeof window.DeviceMotionEvent != 'undefined') {
        // Shake sensitivity (a lower number is more)
        var sensitivity = 20;

        // Position variables
        let x1 = 0,
          y1 = 0,
          z1 = 0,
          x2 = 0,
          y2 = 0,
          z2 = 0;

        // Listen to motion events and update the position
        window.addEventListener(
          'devicemotion',
          function (e) {
            if (!e || !e.accelerationIncludingGravity) {
              x1 = 0;
              y1 = 0;
              z1 = 0;
              return;
            }

            x1 = e.accelerationIncludingGravity.x || 0;
            y1 = e.accelerationIncludingGravity.y || 0;
            z1 = e.accelerationIncludingGravity.z || 0;
          },
          false
        );

        // Periodically check the position and fire
        // if the change is greater than the sensitivity
        setInterval(function () {
          var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2);

          if (change > sensitivity) {
            window.isShaking = true;
            // try {
            //   window.navigator.vibrate(200);
            // } catch (e) {}
          } else {
            window.isShaking = false;
          }

          // Update new position
          x2 = x1;
          y2 = y1;
          z2 = z1;
        }, 150);
      }
    }, 3000);
  }

  initGame() {
    const { history, playGameAction, gameStore } = this.props;

    this.timer = setInterval(() => {
      const { countShaking, countDown = 0 } = this.state;

      if (countDown === 0) {
        window.removeEventListener('devicemotion', () => {});

        !!gameStore && !!gameStore.loadGame && gameStore.loadGame.id && playGameAction({ id: gameStore.loadGame.id });
      }

      if (countDown === -3) {
        clearInterval(this.timer);
        history.push('/games/beauty-hunter/result');
      } else {
        const isShaking = window.isShaking;
        if (countDown > 10) {
        }
        if (countDown === 10) {
        }
        if (countDown === -1) {
        }

        this.setState({
          countDown: countDown - 1,
          isShaking,
          countShaking: countShaking + isShaking
        } as IState);
      }

      try {
        const aud: any = document.getElementById('audio');
        !!aud && aud.play();
      } catch (e) {}
    }, 1000);
  }

  componentDidMount() {
    // Migrated from componentWillMount
    const { history } = this.props;

    !isMobileVersion() && history.push(`${ROUTING_SHOP_INDEX}`);
    this.initGame();

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
  }

  reShake() {
    this.initGame();
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      reShake: this.reShake.bind(this)
    };

    return renderView(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HalioLandingPageContainer);
