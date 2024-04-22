import WrapLayout from '../../../layout/wrap';
import STYLE from './style';

function handleRenderVideo(item, index) {
  const containerProps = {
    key: `video-item-${index}`,
    style: STYLE.video.videoWrap
  };

  const panelProps = {
    style: Object.assign({}, STYLE.video.list.item, { backgroundImage: `url(${item.img})` }),
    onClick: () => this.handleClickVideo(index + 1)
  };

  return (
    <div {...containerProps}>
      <div {...panelProps}>
        <div style={STYLE.video.overlay}>
          <div style={STYLE.video.iconPlay} />
        </div>
      </div>
      <div style={STYLE.video.smallTitle}>{item.title}</div>
    </div>
  );
}

const renderView = ({ state, handleClickVideo }) => {
  const { videoList, autoPlayVideo } = state;

  const videoLength = (videoList && videoList.length) || 0;
  const subVideoList = (Array.isArray(videoList) && videoLength > 0 && videoList.slice(1, videoLength)) || [];

  const videoProps = {
    autoPlay: autoPlayVideo,
    id: 'main-video-halio',
    style: STYLE.video.main,
    src: videoList[0].video,
    crossOrigin: 'anonymous' as const
  };

  return (
    <div style={STYLE.video.container}>
      <div style={STYLE.video.bg} />

      <WrapLayout style={{ position: 'relative' }}>
        <div style={STYLE.video.wrap}>
          <video muted {...videoProps} />
        </div>
        <div style={STYLE.video.mainTitle}>{videoList[0].title}</div>
        <div style={STYLE.video.list.container}>{subVideoList.map(handleRenderVideo, { handleClickVideo })}</div>
      </WrapLayout>
    </div>
  );
};

export default renderView;
