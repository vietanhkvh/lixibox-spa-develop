import { IProps } from './model';
import STYLE from './style';

import FeedItem from '../../../components/container/feed-item';
import ImageSliderCommunity from '../../../components/container/image-slider-community';

export function renderComponent({ props, handleOmitImgHeight }) {
  const {
    data: { data, posImg },
    authStore: { userInfo }
  } = props as IProps;

  const imgSliderProps = {
    posImg,
    handleOmitImgHeight,
    data: data.pictures
  };

  const feedItemProps = {
    item: data,
    userProfile: userInfo,
    isShowImage: false,
    showComment: true
  };

  return (
    <div style={STYLE.container} id={`feed-community-wrap`}>
      <div style={STYLE.wrap.container}>
        <div style={STYLE.wrap.leftCol} id={`img-left-col`}>
          <ImageSliderCommunity {...imgSliderProps} />
        </div>
        <div style={STYLE.wrap.rightCol} id={'feed-right-col'}>
          <FeedItem {...feedItemProps} />
        </div>
      </div>
    </div>
  );
}
