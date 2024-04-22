import { ROUTING_AUTH_SIGN_UP } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import SubContainer from './sub';
import MainContainer from './main';
import { InlineMessage } from '../model';

interface ViewProps {
  phone?: string;
  style: any;
  classes?: { container?: string };
  inlineMessage: InlineMessage;
  loginSubmitLoading: boolean;
  onForgotPassword?: any;
  onSignup?: any;
  referrer: string;
  handleInputOnFocus: any;
  handleSubmit: any;
}
const View = ({
  phone,
  classes,
  style,
  inlineMessage,
  loginSubmitLoading,
  onForgotPassword,
  onSignup,
  referrer,
  handleInputOnFocus,
  handleSubmit
}: ViewProps) => {
  const authBlockProps = {
    title: 'Đăng nhập',
    description: 'Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ www.lixibox.com',
    subContainer: (
      <SubContainer
        {...{
          referrer,
          onSignup
        }}
      />
    ),
    mainContainer: (
      <MainContainer
        {...{
          phone,
          onForgotPassword,
          loginSubmitLoading,
          handleInputOnFocus,
          handleSubmit,
          inLineMessage: inlineMessage.content,
          inLineMessageType: inlineMessage.type,
          referrer
        }}
      />
    ),
    rightIcon: {
      name: 'user-plus',
      title: 'Đăng ký',
      link: ROUTING_AUTH_SIGN_UP,
      referrer
    },
    mobileBottomLink: {
      text: 'Bạn chưa có tài khoản?',
      link: ROUTING_AUTH_SIGN_UP,
      linkTitle: 'Đăng ký'
    },
    referrer,
    style,
    classes
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
