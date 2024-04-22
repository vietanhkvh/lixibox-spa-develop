import { ROUTING_USER_PROFILE_EDIT, ROUTING_CHECK_OUT, ROUTING_SHOP_INDEX } from '../routings/path';

export const TYPE_MESSAGE = {
  UPDATE_BIRTHDAY: 'UPDATE_BIRTHDAY',
  HAPPY_BIRTHDAY: 'HAPPY_BIRTHDAY',
  HAPPY_BIRTHDAY_MEMBER: 'HAPPY_BIRTHDAY_MEMBER',
  UPDATE_INFO: 'UPDATE_INFO',
  EMPTY_MESSAGE: 'EMPTY_MESSAGE'
};

const updateBirthdaytMessage = {
  type: TYPE_MESSAGE.UPDATE_BIRTHDAY,
  icon: 'color-birthday-gift',
  title: ['Cập nhật ngày sinh'],
  description: 'Để Lixibox chuẩn bị quà sinh nhật cho bạn nhé!',
  buttonLink: ROUTING_USER_PROFILE_EDIT,
  buttonTitle: 'Cập nhật ngay',
  subDescription: ''
};

const updateInfoMessage = {
  type: TYPE_MESSAGE.UPDATE_INFO,
  icon: 'color-paper-info',
  title: ['Cập nhật thông tin'],
  description: 'Để nhận thêm nhiều ưu đãi bạn nhé!',
  buttonLink: ROUTING_USER_PROFILE_EDIT,
  buttonTitle: 'Cập nhật ngay',
  subDescription: ''
};

const happyBirthdayMessageForMemberLevel = (userName) => ({
  type: TYPE_MESSAGE.HAPPY_BIRTHDAY_MEMBER,
  icon: 'color-birthday-gift',
  title: ['Happy birthday,', `${userName}`],
  description: 'Chúc bạn tuổi mới thật rạng rỡ nhé!',
  buttonLink: ROUTING_SHOP_INDEX,
  buttonTitle: 'Mua ngay',
  subDescription:
    '*1 đơn nữa thôi là bạn có thể thăng hạng lên thành viên Bạc và nhận nhiều đặc quyền: quà sinh nhật, hỗ trợ phí ship,...'
});

const happyBirthdayMessage = (userName) => ({
  type: TYPE_MESSAGE.HAPPY_BIRTHDAY,
  icon: 'color-birthday-gift',
  title: ['Happy birthday,', `${userName}`],
  description: 'Lixibox có quà cho bạn nè!',
  buttonLink: ROUTING_CHECK_OUT,
  buttonTitle: 'Nhận quà ngay',
  subDescription: '*Quà sẽ được gửi cùng đơn hàng phát sinh trong tháng'
});

export const checkMessageReminder = (userInfo, isReceivedBirthdayGift) => {
  const currentMonth = new Date().getMonth() + 1;
  const userMonthBirthday = new Date(userInfo?.birthday * 1000).getMonth() + 1;

  switch (true) {
    case userInfo?.birthday &&
      userInfo?.membership_level > 0 &&
      currentMonth === userMonthBirthday &&
      !isReceivedBirthdayGift:
      return happyBirthdayMessage(userInfo.first_name);

    case userInfo?.birthday && userInfo?.membership_level === 0 && currentMonth === userMonthBirthday:
      return happyBirthdayMessageForMemberLevel(userInfo.first_name);

    case !userInfo?.birthday:
      return updateBirthdaytMessage;

    case userInfo?.birthday && (!userInfo?.email || !userInfo?.phone || !userInfo?.gender):
      return updateInfoMessage;

    default:
      return { type: TYPE_MESSAGE.EMPTY_MESSAGE };
  }
};

export const checkUserInfoFields = (userInfo) =>
  !!userInfo?.email && !!userInfo?.last_name && !!userInfo?.first_name && !!userInfo?.phone && !!userInfo?.gender;

export const checkCartEmptyMessage = (userInfo, isReceivedBirthdayGift) => {
  const typeMessage = checkMessageReminder(userInfo, isReceivedBirthdayGift)?.type;
  switch (typeMessage) {
    case TYPE_MESSAGE.HAPPY_BIRTHDAY:
      return {
        isShowBirthdayMessage: true,
        title: 'Happy birthday',
        info: 'Hãy mua thêm sản phẩm yêu thích để nhận ngay quà sinh nhật từ Lixibox bạn nhé!'
      };
    case TYPE_MESSAGE.HAPPY_BIRTHDAY_MEMBER:
      return {
        isShowBirthdayMessage: true,
        title: 'Happy birthday',
        info: '*1 đơn nữa thôi là bạn có thể thăng hạng lên thành viên Bạc và nhận nhiều đặc quyền: quà sinh nhật, hỗ trợ phí ship,...'
      };
    default:
      return {
        isShowBirthdayMessage: false,
        title: 'Giỏ hàng trống',
        info: 'Hãy quay lại và chọn cho mình sản phẩm yêu thích bạn nhé'
      };
  }
};
