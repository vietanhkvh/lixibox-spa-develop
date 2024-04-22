import { useLocation } from 'react-router-dom';
import AuthBlock from 'container/layout/auth-block';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';
import MainContainer from './main';
import SubContainer from './sub';
import { Phase } from '../model';
import './style.css';

interface ViewProps {
  referrer: string;
  classes?: { container?: string };
  style: any;
  phase: Phase;
  loading: boolean;
  errorMessage: string;
  onSignin?: (event: { referrer: string }) => void;
  handleSubmit: (params?: any) => void;
  handleInputOnFocus: () => void;
}
const View = ({
  referrer: _referrer,
  classes,
  style,
  phase,
  loading,
  errorMessage,
  onSignin,
  handleSubmit,
  handleInputOnFocus
}: ViewProps) => {
  const location = useLocation<{ referrer: string }>();
  const referrer = _referrer || location.state?.referrer || '';

  const mainContainerProps = {
    phase,
    handleInputOnFocus,
    loading,
    handleSubmit,
    errorMessage
  };

  const authBlockProps = {
    title: phase === Phase.Initial ? 'Quên mật khẩu' : 'Đổi mật khẩu',
    description:
      phase === Phase.Initial
        ? 'Lixibox sẽ gửi một email / tin nhắn có chứa mã xác thực để thay đổi mật khẩu đến địa chỉ email / số điện thoại của bạn.'
        : 'Sử dụng mã xác thực đã gửi để thay đổi mật khẩu của bạn',
    withMobileDescription: phase === Phase.Initial,
    mainContainer: <MainContainer {...mainContainerProps} />,
    subContainer: <SubContainer {...{ referrer, onSignin }} />,
    style,
    classes,
    mobileBottomLink: {
      text: '',
      link: ROUTING_AUTH_SIGN_IN,
      linkTitle: 'Đăng nhập'
    }
  };

  return <AuthBlock {...authBlockProps} />;
};

export default View;
