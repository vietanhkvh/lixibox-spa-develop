import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import AuthBlock from 'container/layout/auth-block';
import SubContainer from './sub';
import MainContainer from './main';
import { InlineMessage } from '../model';

interface ViewProps {
  style: any;
  classes?: { container?: string };
  inlineMessage: InlineMessage;
  isSubmitButtonLoading: boolean;
  onSignup?: any;
  referrer: string;
  handleInputOnFocus: any;
  handleSubmit: any;
}
const View = ({
  classes,
  style,
  isSubmitButtonLoading,
  inlineMessage,
  onSignup,
  referrer,
  handleInputOnFocus,
  handleSubmit
}: ViewProps) => {
  const authBlockProps = {
    title: 'Xác thực số điện thoại',
    description:
      'Nhập email hiện tại của bạn hoặc tiếp tục đăng nhập mạng xã hội để xác minh rằng tài khoản thuộc về bạn',
    withMobileDescription: true,
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
          isSubmitButtonLoading,
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
    socialButtonHint: 'Hoặc tiếp tục bằng',
    referrer,
    style,
    classes
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
