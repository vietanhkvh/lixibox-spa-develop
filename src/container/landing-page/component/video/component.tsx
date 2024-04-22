import { Component } from 'react';

import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import renderView from './view';

class VideoComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE(props.videoListSource);
  }

  handleClickVideo(index) {
    const { videoList } = this.state;
    let tmpVideoList = JSON.parse(JSON.stringify(videoList));
    const selectedVideo = tmpVideoList[index];
    const firstVideo = tmpVideoList[0];
    tmpVideoList.splice(index, 1);
    tmpVideoList.splice(0, 1);
    tmpVideoList.unshift(selectedVideo);
    tmpVideoList.splice(index, 0, firstVideo);

    this.setState({ videoList: tmpVideoList, autoPlayVideo: true });
  }

  componentDidUpdate() {
    const videoMainElement = document.getElementById('main-video-halio');
    if (!!videoMainElement) {
      var att = document.createAttribute('controls');
      att.value = 'true';
      videoMainElement.setAttributeNode(att);
    }
  }

  render() {
    const args = {
      state: this.state,
      handleClickVideo: this.handleClickVideo.bind(this)
    };

    return renderView(args);
  }
}

export default VideoComponent;
