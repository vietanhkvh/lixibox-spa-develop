import { useParams } from 'react-router-dom';
import { ROUTING_AUTH_SIGN_IN, ROUTING_AUTH_SIGN_UP } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import { isEmptyObject } from 'utils/validate';
import MainContainer from './main';
import SubContainer from './sub';

interface IViewProps {
  phone: string;
  classes?: { container?: string };
  style: any;
  userReferrerProfile: any;
  referrer: string;
  handleSubmit?: () => void;
  onAlternateLinkClick?: (params: { phone: string; referrer: string }) => void;
  onSignup?: (event: { referrer: string }) => void;
}

const View = ({
  phone,
  classes,
  style,
  userReferrerProfile,
  referrer,
  handleSubmit,
  onAlternateLinkClick,
  onSignup
}: IViewProps) => {
  const params = useParams();

  return (
    <AuthBlock
      {...{
        title: 'Xác thực số điện thoại',
        description: 'Số điện thoại chưa được xác thực',
        descriptionVisibility: { mobile: false, desktop: true },
        subContainer: <SubContainer {...{ referrer, onSignup }} />,
        mainContainer: (
          <MainContainer
            {...{
              phone,
              referrer,
              handleSubmit,
              onAlternateLinkClick
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
        withMobileDescription: true,
        withoutSocialButtons: true,
        mobileBottomLink: {
          text: 'Bạn chưa có tài khoản?',
          link: ROUTING_AUTH_SIGN_UP,
          linkTitle: 'Đăng ký'
        },
        referrer,
        style,
        classes
      }}
    />
  );
};

export default View;
