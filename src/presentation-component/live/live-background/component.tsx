/* eslint react-hooks/rules-of-hooks: 0 */
// TODO: Refactor component and enable eslint rule

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { ROUTING_COMMUNITY_LIVE, ROUTING_CHECK_OUT_PATH } from '../../../routings/path';

import { HORIZONTAL_RATIO, VERTICAL_RATIO, HORIZONTAL_TYPE, VERTICAL_TYPE } from '../../../constants/application/live';

import SvgIcon from '../../ui/icon';
import styles from './style.module.scss';

const generateSmallInfoStyle = ({ ratioType, isPreviewMode }) => {
  if (!isPreviewMode)
    return {
      width: '100%'
    }; // View live in detail pages

  const HEIGHT_INFO = 60;
  const OFFSET = 3;

  switch (ratioType) {
    case HORIZONTAL_TYPE:
      return {
        width: HEIGHT_INFO / HORIZONTAL_RATIO + OFFSET
      };

    case VERTICAL_TYPE:
      return {
        width: HEIGHT_INFO / VERTICAL_RATIO + OFFSET
      };

    default:
      return {
        width: 60 + OFFSET
      };
  }
};

const generateContainerStyle = () => {
  const liveVideoIframeOutside = document.getElementById('live-video-iframe-outside');
  if (!liveVideoIframeOutside) return { top: 0, left: 0, width: 0, height: 0 };

  const position = liveVideoIframeOutside.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = liveVideoIframeOutside;
  const { top, left } = position;

  return {
    width: offsetWidth,
    height: offsetHeight,
    top,
    left
  };
};

const LiveBackground = ({
  location,
  liveDetailStore: liveDetail,
  isShowLiveBackgroundStore: isShowLiveBackground,
  displayLiveBackgroundAction
}) => {
  const isLiveDetailRouting = location && 0 === location.pathname.indexOf(`${ROUTING_COMMUNITY_LIVE}/`);

  const isCheckoutRouting = location && 0 === location.pathname.indexOf(`${ROUTING_CHECK_OUT_PATH}`);

  if (!isShowLiveBackground || !liveDetail.title || !!isCheckoutRouting) return null;

  const [isMinimize, setMinimize] = useState(false);
  const [isClosing, setClose] = useState(false);
  const [containerStyle, setContainerStyle] = useState<{ top: number; left: number; width: number; height: number }>({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    setTimeout(() => {
      const newStyle = generateContainerStyle();
      const isChanged =
        newStyle.top !== containerStyle.top ||
        newStyle.left !== containerStyle.left ||
        newStyle.width !== containerStyle.width ||
        newStyle.height !== containerStyle.height;
      !!isChanged && setContainerStyle(newStyle);
    }, 1000);

    let timerDeboune;
    const liveVideoContainer = document.getElementById('live-video-container');
    const handleDisplayContainer = () => {
      !!liveVideoContainer && (liveVideoContainer.hidden = true);

      !!timerDeboune && clearTimeout(timerDeboune);
      timerDeboune = setTimeout(() => {
        !!liveVideoContainer && (liveVideoContainer.hidden = false);
        setContainerStyle(generateContainerStyle());
        clearTimeout(timerDeboune);
      }, 100);
    };

    window.addEventListener('scroll', handleDisplayContainer);
    window.addEventListener('resize', handleDisplayContainer);
  }, []);

  const {
    video_link: videoLink, // Sample Link 'https://www.facebook.com/lixiboxvn/videos/1474342052759087'
    ratio_type: ratioType
  } = liveDetail;

  const containerProps = {
    id: 'live-video-container',
    className: classnames(styles.container, {
      [styles.isMinimize]: !!isMinimize,
      [styles.isClosing]: !!isClosing,
      [styles.isPreviewMode]: !isLiveDetailRouting
    }),
    style: !!isLiveDetailRouting ? containerStyle : {}
  };

  const arrowLeftIconProps = {
    name: 'arrow-left',
    className: styles.arrowLeftIcon,
    onClick: () => setMinimize(!isMinimize)
  };

  const closeIconProps = {
    name: 'close',
    className: styles.closeIcon,
    onClick: () => {
      setClose(true);
      setTimeout(() => displayLiveBackgroundAction(false), 500);
    }
  };

  const linkProps = {
    to: !!isLiveDetailRouting ? '#' : `${ROUTING_COMMUNITY_LIVE}/${liveDetail.slug}`,
    className: styles.liveDetailLink
  };

  const infoProps = {
    className: styles.info,
    style: generateSmallInfoStyle({
      ratioType,
      isPreviewMode: !isLiveDetailRouting
    })
  };

  return (
    <div {...containerProps}>
      {!isLiveDetailRouting && <Image src={liveDetail.image_url} className={styles.overlay} />}

      <div className={styles.panel}>
        <NavLink {...linkProps}>
          <div {...infoProps}>
            <iframe
              title="Live background"
              src={`https://www.facebook.com/plugins/video.php?href=${videoLink}&allowfullscreen=false&autoplay=true`}
            ></iframe>
          </div>
          {!isLiveDetailRouting && <div className={styles.title}>Xem live stream</div>}
        </NavLink>
        {!isLiveDetailRouting && (
          <>
            <SvgIcon {...arrowLeftIconProps} />
            <SvgIcon {...closeIconProps} />
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(LiveBackground as any);
