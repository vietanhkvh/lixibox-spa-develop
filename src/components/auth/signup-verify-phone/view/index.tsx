import { useParams } from 'react-router-dom';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import { isEmptyObject } from 'utils/validate';
import MainContainer from './main';
import SubContainer from './sub';

interface IRenderViewProps {
  phone: string;
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

  return (
    <AuthBlock
      {...{
        title: 'Xác thực số điện thoại',
        description: 'Mã xác thực đã được gửi đến số điện thoại của bạn',
        subContainer: <SubContainer {...{ referrer, onLogin }} />,
        mainContainer: (
          <MainContainer
            {...{
              phone,
              submitLoading,
              handleInputOnFocus,
              handleSubmit,
              errorMessage
            }}
          />
        ),
        rightIcon: {
          name: 'sign-in',
          title: 'Đăng nhập',
          link: ROUTING_AUTH_SIGN_IN,
          referrer
        },
        userReferrerProfile: !isEmptyObject(params) ? userReferrerProfile : {},
        mobileBottomLink: {
          link: ROUTING_AUTH_SIGN_IN,
          linkTitle: 'Đăng nhập'
        },
        withMobileDescription: true,
        withoutSocialButtons: true,
        referrer,
        style,
        classes
      }}
    />
  );
};

export default View;
