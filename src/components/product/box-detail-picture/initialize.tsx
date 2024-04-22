import { IProductColorProps } from './model';

export const DEFAULT_PROPS = {
  selected: 0,
  list: [],
  version: 'DESKTOP'
} as IProductColorProps;

export const INITIAL_STATE = ({ list, selected, video }) => {
  const originalStart = !!list && !!list.length ? 1010 : 0;
  const formatedList =
    !!list && !!list.length
      ? list.map((item, index) =>
          Object.assign(
            {},
            {
              thumbnail: item.medium_url,
              image: item.large_url,
              original: item.original_url,
              index: parseInt('101' + index),
              type: 'IMAGE'
            }
          )
        )
      : [];

  const feedbackStart = !!video && !!video.length ? 2010 : 0;
  const combinedFeedbackPicture =
    !!video && !!video.length
      ? video.map((item, index) =>
          Object.assign(
            {},
            {
              thumbnail: item.thumb,
              video: item.url,
              index: parseInt('201' + index),
              type: 'VIDEO'
            }
          )
        )
      : [];

  let currIndex = -1;
  const combinedList = [...combinedFeedbackPicture, ...formatedList];
  const filteredSelectedItem = combinedList.filter((item, index) => {
    if (item.index * 1 === selected * 1) {
      currIndex = index;
      return true;
    }
    return false;
  });
  const selectedIndex = !!filteredSelectedItem.length ? filteredSelectedItem[0].index : formatedList[0].index;

  return {
    originalStart,
    feedbackStart,
    selectedIndex,
    currIndex,
    combinedList,
    mobileSelectedIndex: 0
  };
};
export const ID_VIDEO_ITEM = 'video-item';
