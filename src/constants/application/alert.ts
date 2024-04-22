/**
 * Alert type
 *
 * SUCCESS -> Color Green
 * ERROR -> Color Red
 * WARNING -> Color Yellow
 */
export const ALERT_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WARNING: 'WARNING'
};

const ALERT_ICON = {
  SUCCESS: 'success',
  ERROR: 'error'
};

/** Time out need to auto close alert */
export const TIME_OUT_OPEN_ALERT = 100;
export const TIME_OUT_CLOSE_ALERT = 5000;

/** General error message */
export const ALERT_GENERAL_ERROR = ({ title = 'Thông báo', content = 'Đã có lỗi xảy ra, vui lòng thử lại' }) => ({
  icon: ALERT_ICON.ERROR,
  title,
  content,
  type: ALERT_TYPE.ERROR
});

/** General success message */
export const ALERT_GENERAL_SUCCESS = ({ title = 'Thông báo', content = 'Thành công' }) => ({
  icon: ALERT_ICON.SUCCESS,
  title,
  content,
  type: ALERT_TYPE.SUCCESS
});

/** General success message */
export const MESSAGE_ADD_CART_SUCCESS = (content = '') => `Bạn đã thêm thành công sản phẩm "${content.toLowerCase()}"`;

/** General warning message */
export const ALERT_GENERAL_WARNING = ({ title = 'Thông báo', content = 'Đã có lỗi xảy ra, vui lòng thử lại' }) => ({
  icon: ALERT_ICON.ERROR,
  title,
  content,
  type: ALERT_TYPE.WARNING
});

/** Alert when login successful */
export const ALERT_SIGN_IN_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Chào mừng bạn đã đăng nhập thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when sign out successful */
export const ALERT_SIGN_OUT_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã đăng xuất',
  type: ALERT_TYPE.ERROR
};

/** Alert when like product successful */
export const ALERT_LIKE_PRODUCT = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã yêu thích sản phẩm',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when unlinke product successful */
export const ALERT_UNLIKE_PRODUCT = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã bỏ yêu thích sản phẩm',
  type: ALERT_TYPE.SUCCESS
};

/** Alert add delivery address success */
export const ALERT_ADD_ADDRESS_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã thêm địa chỉ thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert add delivery address error */
export const ALERT_ADD_ADDRESS_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert edit delivery address success */
export const ALERT_EDIT_ADDRESS_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã sửa địa chỉ thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert edit delivery address error */
export const ALERT_EDIT_ADDRESS_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert delete delivery address success */
export const ALERT_DELETE_ADDRESS_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã xóa địa chỉ thành công',
  type: ALERT_TYPE.SUCCESS
};
/** Alert delete delivery address error */
export const ALERT_DELETE_ADDRESS_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Add feedback */
export const ALERT_ADD_FEEDBACK_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã thêm đánh giá thành công',
  type: ALERT_TYPE.SUCCESS
};

export const ALERT_ADD_FEEDBACK_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Edit feedback */
export const ALERT_EDIT_FEEDBACK_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã sửa đánh giá thành công',
  type: ALERT_TYPE.SUCCESS
};

export const ALERT_EDIT_FEEDBACK_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert password confirm not match */
export const ALERT_PASSWORD_NOT_MATCH = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Mật khẩu xác nhận không giống nhau, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert change password success */
export const ALERT_CHANGE_PASSWORD_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã đổi mật khẩu thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert change password error */
export const ALERT_CHANGE_PASSWORD_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert edit user profile success */
export const ALERT_EDIT_PROFILE_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã sửa thông tin thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert edit user profile success error */
export const ALERT_EDIT_PROFILE_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert change avatar of user success */
export const ALERT_CHANGE_AVATAR_USER_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã sửa ảnh đại diện thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert change avatar of user success error */
export const ALERT_CHANGE_AVATAR_USER_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Đã có lỗi xảy ra, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert avatar file not correct */
export const ALERT_IMAGE_FILE_NOT_CORRECT = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Hình không đúng định dạng, vui lòng thử lại',
  type: ALERT_TYPE.ERROR
};

/** Alert avatar file not correct */
export const ALERT_IMAGE_MAX_SUPPORTED_SIZE_EXCEEDED = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: '5MB là kích thước được hỗ trợ tối đa. Vui lòng thay đổi kích thước hoặc tải lên một hình ảnh khác.',
  type: ALERT_TYPE.ERROR
};

/** Add item into wait list */
export const ALERT_ADD_WAIT_LIST_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã thêm sản phẩm vào danh sách chờ thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Remove item into wait list */
export const ALERT_REMOVE_WAIT_LIST_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã bỏ sản phẩm khỏi danh sách chờ thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Add item into cart success */
export const ALERT_ADD_INTO_CART_SUCCESS = (quantity) => ({
  iconText: quantity,
  isShowIconText: true,
  title: 'Thông báo',
  content: 'Sản phẩm đã được thêm vào giỏ hàng',
  type: ALERT_TYPE.SUCCESS
});

export const ALERT_REMOVE_FROM_CART_SUCCESS = (quantity) => ({
  iconText: quantity,
  isShowIconText: true,
  title: 'Thông báo',
  content: 'Sản phẩm đã được lấy ra khỏi giỏ hàng',
  type: ALERT_TYPE.WARNING
});

/** Alert when sign up successful */
export const ALERT_SIGN_UP_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Chào mừng bạn đã đăng ký tài khoản thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when sign up error */
export const ALERT_SIGN_UP_ERROR = (message?: string) => ({
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: message || 'Đã có lỗi xảy ra, xin vui lòng thử lại',
  type: ALERT_TYPE.WARNING
});

/** Alert when Apple Signin encounters error */
export const ALERT_SIGN_IN_WITH_APPLE_ID_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Bạn hãy kiểm tra thông tin và thử lại.',
  type: ALERT_TYPE.WARNING
};

/** Alert when Google Signin encounters error */
export const ALERT_SIGNIN_WITH_GOOGLE_ID_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Bạn hãy kiểm tra thông tin và thử lại.',
  type: ALERT_TYPE.WARNING
};

/** Alert when add love successful */
export const ALERT_ADD_LOVE_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Chúc mừng bạn đã chia sẻ bài viết thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when add love error */
export const ALERT_ADD_LOVE_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Link không đúng, đã được chia sẻ hoặc cần mua thêm box',
  type: ALERT_TYPE.WARNING
};

/** Alert when forgot password successful */
export const ALERT_FORGOT_PASSWORD_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Vui lòng kiểm tra email để đổi mật khẩu mới',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when forgot password error */
export const ALERT_FORGOT_PASSWORD_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Email không tồn tại trong hệ thống',
  type: ALERT_TYPE.WARNING
};

/** Alert when reset password successful */
export const ALERT_RESET_PASSWORD_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Chúc mừng bạn đã đổi mật khẩu thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when reset password error */
export const ALERT_RESET_PASSWORD_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Token không hợp lệ. Đổi mật khẩu không thành công',
  type: ALERT_TYPE.WARNING
};

/** Alert when clipboard successful */
export const ALERT_CLIPBOARD_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Bạn đã sao chép thành công',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when reset password error */
export const ALERT_OTP_PASSWORD_RESET_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'OTP không hợp lệ, đổi mật khẩu không thành công',
  type: ALERT_TYPE.WARNING
};

/** Alert when user attempt to perform authenticated operation on a guest session */
export const ALERT_SESSION_ENDED_WARNING = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Phiên làm việc của bạn đã kết thúc. Vui lòng đăng nhập lại',
  type: ALERT_TYPE.WARNING
};

/** Alert when confirmation for order reception has succeeded */
export const ALERT_CONFIRM_ORDER_RECEIVED_SUCCESS = {
  icon: ALERT_ICON.SUCCESS,
  title: 'Thông báo',
  content: 'Đã xác nhận đơn hàng đã nhận',
  type: ALERT_TYPE.SUCCESS
};

/** Alert when confirmation for order reception has failed */
export const ALERT_CONFIRM_ORDER_RECEIVED_ERROR = ({ message }) => ({
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: message,
  type: ALERT_TYPE.WARNING
});

/** Alert on referral schemes share link fetch error */
export const ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR = {
  icon: ALERT_ICON.ERROR,
  title: 'Thông báo',
  content: 'Không thể tạo liên kết chia sẻ',
  type: ALERT_TYPE.WARNING
};
