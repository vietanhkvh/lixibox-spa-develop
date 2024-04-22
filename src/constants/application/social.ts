import { isMobileVersion, isIOS } from '../../utils/responsive';

export const FB_CHAT_URL =
  '//www.facebook.com/plugins/page.php?href=https://www.facebook.com/1450884048490991&tabs=messages&width=300&height=300&adapt_container_width=true&show_facepile=false&hide_cta=false&appId&small_header=true';

export const SOCIAL_URL = {
  facebook: !isMobileVersion() ? '//fb.me/lixiboxvn' : isIOS() ? '//fb.me/lixiboxvn' : 'fb://pages/lixiboxvn',
  messager: 'https://m.me/lixiboxvn',
  instagram: '//www.instagram.com/lixibox/',
  youtube: '//www.youtube.com/channel/UCW0CxHcD9jN1lhFeKLHwCvQ',
  pinterest: '//www.pinterest.com/lixibox/',
  zalo: '//zalo.me/1423847451268726170'
};

export const DOWNLOAD_APP_URL = {
  shopping: {
    ios: '//apps.apple.com/vn/app/lixibox/id1078181334?l=vi',
    android: '//play.google.com/store/apps/details?id=com.lixibox&hl=vi'
  }
};
