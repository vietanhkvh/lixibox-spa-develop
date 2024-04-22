import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import AuthBlock from 'container/layout/auth-block';
import { InlineMessage, SubmitButtonState } from '../model';
import SubContainer from './sub';
import MainContainer from './main';
import { MutableRefObject } from 'react';

interface ViewProps {
  phone?: string;
  style: any;
  classes?: { container?: string };
  inlineMessage: InlineMessage;
  submitButtonState: SubmitButtonState;
  onSignup?: any;
  referrer: string;
  handleInputOnFocus: any;
  handleSubmit: any;
  isSetToRetry?: MutableRefObject<boolean>;
  onRetry?: (event: { referrer: string }) => void;
}
const View = ({
  phone,
  classes,
  style,
  inlineMessage,
  submitButtonState,
  onSignup,
  referrer,
  handleInputOnFocus,
  handleSubmit,
  isSetToRetry,
  onRetry
}: ViewProps) => {
  const authBlockProps = {
    title: 'Xác thực số điện thoại',
    description: 'Mã xác thực đã được gửi đến số điện thoại của bạn',
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
          phone,
          submitButtonState,
          handleInputOnFocus,
          handleSubmit,
          inLineMessage: inlineMessage.content,
          inLineMessageType: inlineMessage.type,
          referrer,
          isSetToRetry,
          onRetry
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
    withoutSocialButtons: true,
    referrer,
    style,
    classes
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
