import { useParams } from 'react-router-dom';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import { isEmptyObject } from 'utils/validate';
import { Phase } from '../model';
import MainContainer from './main';
import SubContainer from './sub';

interface IRenderViewProps {
  phase: Phase;
  loading: boolean;
  classes?: { container?: string };
  style: any;
  userReferrerProfile: any;
  onLogin?: any;
  errorMessage: string;
  referrer: string;
  handleInputOnFocus: any;
  handleSubmit: any;
}

const View = ({
  phase,
  loading,
  classes,
  style,
  userReferrerProfile,
  errorMessage,
  referrer,
  handleInputOnFocus,
  handleSubmit
}: IRenderViewProps) => {
  const params = useParams();

  const subContainerProps = {
    referrer
  };

  const mainContainerProps = {
    phase,
    loading,
    handleInputOnFocus,
    handleSubmit,
    errorMessage
  };

  const authBlockProps = {
    title: 'Nhập thông tin tài khoản để tiếp tục mua hàng',
    description:
      'Chỉ cần nhập email hoặc số điện thoại là bạn đã có thể mua hàng và sử dụng các tiện ích mới nhất từ Lixibox',
    subContainer: <SubContainer {...subContainerProps} />,
    mainContainer: <MainContainer {...mainContainerProps} />,
    rightIcon: {
      name: 'sign-in',
      title: 'Đăng nhập',
      link: ROUTING_AUTH_SIGN_IN,
      referrer
    },
    userReferrerProfile: !isEmptyObject(params) ? userReferrerProfile : {},
    referrer,
    style,
    classes
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
