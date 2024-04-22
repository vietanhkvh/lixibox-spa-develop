import { useParams } from 'react-router-dom';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import { isEmptyObject } from 'utils/validate';
import MainContainer from './main';
import SubContainer from './sub';

interface IRenderViewProps {
  phone?: string;
  classes?: { container?: string };
  style: any;
  userReferrerProfile: any;
  onLogin?: any;
  submitLoading: boolean;
  errorMessage: string;
  referrer: string;
  handleInputOnFocus: any;
  handleSubmit: any;
}

const View = ({
  phone,
  classes,
  style,
  userReferrerProfile,
  onLogin,
  submitLoading,
  errorMessage,
  referrer,
  handleInputOnFocus,
  handleSubmit
}: IRenderViewProps) => {
  const params = useParams();

  const subContainerProps = {
    referrer,
    onLogin
  };

  const mainContainerProps = {
    phone,
    submitLoading,
    handleInputOnFocus,
    handleSubmit,
    errorMessage
  };

  const authBlockProps = {
    title: 'Đăng ký',
    description: 'Đăng ký để mua hàng và sử dụng những tiện ích mới nhất từ www.lixibox.com',
    subContainer: <SubContainer {...subContainerProps} />,
    mainContainer: <MainContainer {...mainContainerProps} />,
    rightIcon: {
      name: 'sign-in',
      title: 'Đăng nhập',
      link: ROUTING_AUTH_SIGN_IN,
      referrer
    },
    userReferrerProfile: !isEmptyObject(params) ? userReferrerProfile : {},
    mobileBottomLink: {
      text: 'Bạn đã có tài khoản?',
      link: ROUTING_AUTH_SIGN_IN,
      linkTitle: 'Đăng nhập'
    },
    referrer,
    style,
    classes
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
