import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';
import Heading from '../heading';
import Content from '../content';

const DEVICE_PREFIX = isMobileVersion() ? '' : 'desktop-';

const OriginalVideoType = ({ url, autoPlayVideo }) => {
  if (!url) return null;

  const videoProps = {
    autoPlay: autoPlayVideo,
    id: 'main-video-halio',
    // crossOrigin: 'anonymous',
    src: url
  };

  return <video controls muted loop {...videoProps} />;
};

const YouTubeVideoType = ({ youtubeVideoId }) => {
  if (!youtubeVideoId) return null;

  const videoProps = {
    src: '//www.youtube.com/embed/' + youtubeVideoId,
    frameBorder: '0',
    allowFullScreen: true
  };

  return <iframe title="YouTube video player" {...videoProps} />;
};

const RATIO_PADDING = {
  '1:1': '100%',
  '16:9': '56.25%'
};

const RATIO_MAX_WIDTH = {
  '1:1': 560,
  '16:9': '100%'
};

interface IProps {
  url?: string;
  youtubeVideoId?: string;
  type?: 'youtube' | 'original';
  title?: string;
  ratio?: '1:1' | '16:9';
  autoPlayVideo?: boolean;
  withShadow?: boolean;
  heading?: any;
  content?: any;
  textWrapAlign?: 'center' | 'left' | 'right';
}
const ContenAside = (props) => {
  const { heading = '', content = '' } = props;
  return (
    <div className={styles.videoContent}>
      {!!heading && <Heading {...heading} />}
      {!!content && <Content {...content} />}
    </div>
  );
};
// const ContentTop = (props) => {
//   const { heading = '' } = props;
//   return <div className={styles.videoContent}>{!!heading && <Heading {...heading} />}</div>;
// };
const LandingPageVideo = ({
  url = 'https://upload.lixibox.com/videos/halio-1.mp4?t=1',
  youtubeVideoId = '',
  type = 'original',
  ratio = '16:9',
  title = 'Video title at here',
  autoPlayVideo = true,
  withShadow = true,
  heading = null,
  content = null
}: IProps) => {
  if (!url || '' === url) return null;

  let video: any = null;
  switch (type) {
    case 'youtube':
      video = <YouTubeVideoType {...{ youtubeVideoId }} />;
      break;

    case 'original':
      video = <OriginalVideoType {...{ url, autoPlayVideo }} />;
      break;
  }
  const haveContent = !!heading || !!content;
  const videoWrapProps = {
    className: classnames(
      styles.videoWrap,
      { [styles[`${DEVICE_PREFIX}withShadow`]]: !!withShadow },
      DEVICE_PREFIX === 'desktop-' && !!heading && !!content && styles.haveContent
    ),
    style: Object.assign(
      {},
      {
        paddingTop: haveContent ? 'none' : RATIO_PADDING[ratio]
      }
    )
  };
  const titleProps = {
    className: classnames(styles.title, { [styles[`${DEVICE_PREFIX}title`]]: true })
  };
  const displayVideoHaveText = haveContent ? <div className={styles.videoInner}>{video}</div> : video;
  return (
    <div className={styles.container} style={{ maxWidth: RATIO_MAX_WIDTH[ratio] }}>
      {DEVICE_PREFIX !== 'desktop-' ? (
        <>
          {haveContent && <ContenAside {...{ heading }} />}
          <div {...videoWrapProps}>{displayVideoHaveText}</div>
        </>
      ) : (
        <div className={styles.videoContainer}>
          <div {...videoWrapProps}>{displayVideoHaveText}</div>
          {haveContent && <ContenAside {...{ heading, content }} />}
        </div>
      )}

      {!!title && !!title.length && <div {...titleProps}>{title}</div>}
    </div>
  );
};

export default LandingPageVideo;
