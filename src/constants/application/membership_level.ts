import * as VARIABLE from '../../style/variable';

import { ROUTING_AUTH_SIGN_IN, ROUTING_USER_PROFILE_EDIT } from '../../routings/path';

import { CDN_ASSETS_PREFIX } from '../../utils/uri';

export const MEMBERSHIP_LEVEL_TYPE = {
  0: {
    id: 'member',
    color: VARIABLE.color75,
    loyalyColor: VARIABLE.loyalyColor0,
    image: CDN_ASSETS_PREFIX('/lixicoin/level-member.png')
  },
  1: {
    id: 'silver',
    color: VARIABLE.color75,
    loyalyColor: VARIABLE.loyalyColor1,
    image: CDN_ASSETS_PREFIX('/lixicoin/level-silver.png')
  },
  2: {
    id: 'gold',
    color: VARIABLE.colorGold,
    loyalyColor: VARIABLE.loyalyColor2,
    image: CDN_ASSETS_PREFIX('/lixicoin/level-gold.png')
  },
  3: {
    id: 'diamond',
    color: VARIABLE.colorDiamond,
    loyalyColor: VARIABLE.loyalyColor3,
    image: CDN_ASSETS_PREFIX('/lixicoin/level-diamond.png')
  }
};

export const REDEEM_WARNING_MESSAGE = {
  NEED_TO_LOGIN: {
    message:
      'Lưu ý: Chương trình Lixicoin chỉ áp dụng cho thành viên Lixibox. Vui lòng đăng nhập để tham gia và nhận ưu đãi từ chương trình Lixicoin',
    actionTitle: 'Đăng nhập ngay',
    actionLink: ROUTING_AUTH_SIGN_IN
  },
  NEED_TO_UPDATE_INFO: {
    message:
      'Lưu ý: Vui lòng cập nhật thông tin tài khoản (số điện thoại, giới tính và ngày sinh) để tham gia và nhận ưu đãi từ chương trình Lixicoin',
    actionTitle: 'Cập nhật ngay',
    actionLink: ROUTING_USER_PROFILE_EDIT
  }
};
