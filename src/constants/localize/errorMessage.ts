/** VALIDATION */
export const ERROR_VALIDATION = {
  REQUIRED: 'Vui lòng nhập thông tin',
  REQUIRED_EMAIL: 'Vui lòng nhập email',
  REQUIRED_PASSWORD: 'Vui lòng nhập mật khẩu',
  FORMAT_EMAIL: 'Định dạng email chưa chính xác',
  FORMAT_PHONE: 'Định dạng điện thoại chưa chính xác',
  MIN_LEN: (len) => {
    return `Yêu cầu nhập tối thiểu ${len} ký tự`;
  },
  MAX_LEN: (len) => {
    return `Yêu cầu nhập tối đa ${len} ký tự`;
  },
  MIN_VALUE: (len) => {
    return `Yêu cầu nhập giá trị tối thiểu ${len}`;
  },
  MAX_VALUE: (len) => {
    return `Yêu cầu nhập giá trị tối đa ${len}`;
  },
  MIN_MAX_VALUE: () => {
    return `Nhập tối thiểu nhỏ hơn tối đa`;
  },
  DEFAULT_ERROR_MESSAGE: 'Giá trị nhập vào không đúng'
};
