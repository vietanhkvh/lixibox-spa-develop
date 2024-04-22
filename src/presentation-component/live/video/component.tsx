import { useState, useEffect } from 'react';
import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import { isMobileVersion } from '../../../utils/responsive';
import styles from './style.module.scss';

import {
  HORIZONTAL_RATIO,
  VERTICAL_RATIO,
  SQUARE_RATIO,
  HORIZONTAL_TYPE,
  VERTICAL_TYPE
} from '../../../constants/application/live';

const BlurBackground = ({ coverImageUrl }) => <Image className={styles.blurImage} src={coverImageUrl} />;

const generateIframePanelStyle = (type) => {
  const liveVideoMainContainer = document.getElementById('live-video-main-container');
  if (!liveVideoMainContainer)
    return {
      width: '100%',
      height: 400
    };

  const offsetWidth = liveVideoMainContainer.offsetWidth;
  const offsetHeight = liveVideoMainContainer.offsetHeight;

  if (0 === offsetHeight) return {};
  const liveVideoMainContainerRatio = offsetHeight / offsetWidth;

  let VIDEO_RATIO = SQUARE_RATIO;

  switch (type) {
    case HORIZONTAL_TYPE:
      VIDEO_RATIO = HORIZONTAL_RATIO;
      break;
    case VERTICAL_TYPE:
      VIDEO_RATIO = VERTICAL_RATIO;
      break;
    default:
      VIDEO_RATIO = SQUARE_RATIO;
      break;
  }

  const panelWidth = liveVideoMainContainerRatio >= VIDEO_RATIO ? '100%' : offsetHeight / VIDEO_RATIO;

  return { width: panelWidth };
};

const generateIframeContainerStyle = (type) => {
  let containerPaddingTop = '100%';

  switch (type) {
    case HORIZONTAL_TYPE:
      containerPaddingTop = HORIZONTAL_RATIO * 100 + '%';
      break;
    case VERTICAL_TYPE:
      containerPaddingTop = VERTICAL_RATIO * 100 + '%';
      break;
    default:
      containerPaddingTop = SQUARE_RATIO * 100 + '%';
      break;
  }

  return { paddingTop: containerPaddingTop };
};

const IFrameVideo = ({ ratioType }) => {
  const [iframeContainerStyle, setIframeContainerStyle] = useState(null);
  const [iframePanelStyle, setIframePanelStyle] = useState(null);

  useEffect(() => {
    !iframeContainerStyle && setIframeContainerStyle(generateIframeContainerStyle(ratioType));
    !iframePanelStyle && setIframePanelStyle(generateIframePanelStyle(ratioType));
  });

  return (
    <div style={iframePanelStyle}>
      <div id={'live-video-iframe-outside'} className={styles.iframeContainer} style={iframeContainerStyle}></div>
    </div>
  );
};

interface IProps {
  videoUrl: string; // Sample URL 'https://www.facebook.com/lixiboxvn/videos/1474342052759087'
  coverImageUrl: string;
  ratioType?: 'horizontal' | 'vertical' | 'square';
}

const LiveVideo = ({ videoUrl, coverImageUrl, ratioType = VERTICAL_TYPE }: IProps) => {
  if (!videoUrl || !videoUrl.length) return null;

  const containerProps = {
    id: 'live-video-main-container',
    className: classnames(styles.container, {
      [styles.mobileAlignTop]: !!isMobileVersion() && ratioType !== VERTICAL_TYPE
    })
  };

  return (
    <div {...containerProps}>
      <BlurBackground {...{ coverImageUrl }} />
      <IFrameVideo {...{ ratioType }} />
    </div>
  );
};

export default LiveVideo;
