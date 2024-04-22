import { IFeedState, IFeedProps } from './model';

export const DEFAULT_PROPS = {
  limitTextLength: 150,
  isLastChild: false,
  showComment: false,
  isShowImage: true,
  isShowFullImage: false,
  isShowContent: true,
  isFeedDetail: false,
  isFixSizeCover: false
} as IFeedProps;

export const INITIAL_STATE = {
  isLike: false,
  isViewMore: false,
  isShowVideo: false,
  isResetInput: false,
  isShowComments: false,
  isShowInputComment: false,

  likeNum: 0,

  commentList: [],

  errorMessage: '',
  answerComment: '',

  inputComment: {
    value: ''
  }
} as IFeedState;
