import { IUserBirthdayProps, IUserBirthdayState } from './model';

export const DEFAULT_PROPS = {
  data: {},
  isSetUserBirthdaySuccess: false,
  isBirthdaySet: false
} as IUserBirthdayProps;

export const INITIAL_STATE = {
  isMinimal: true,
  isSubmitLoading: false,
  inputValue: {
    value: '',
    valid: false
  },
  content: {
    heading: 'BIRTHDAY GIFT',
    desc: 'Cập nhật ngày sinh ngay để nhận quà sinh nhật miễn phí hằng năm.',
    textLink: 'Xem chi tiết tại đây',
    message:
      'Cảm ơn bạn! Quà tặng đặc biệt sẽ được gửi cùng đơn hàng phát sinh trong tháng sinh nhật! Chúc bạn có trải nghiệm mua sắm thú vị tại Lixibox.',
    settedBirthDayMessage: 'Bạn sẽ nhận quà tặng kèm theo đơn hàng đầu tiên trong'
  },
  type: 1
} as IUserBirthdayState;
