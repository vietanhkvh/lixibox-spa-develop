import { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';

import AuthBlock from 'container/layout/auth-block';
import { isEmptyObject } from 'utils/validate';
import { isMobileVersion } from 'utils';
import MainContainer from './main';

interface IRenderViewProps {
  phone: string;
  classes?: { container?: string };
  style: any;
  userReferrerProfile: any;
  referrer: string;
  isAlternateLinkVisible?: boolean;
  handleAlternateSubmit: (e: MouseEvent<HTMLElement>) => void;
  onSubmit?: (params: { phone: string; referrer: string }) => void;
}

const View = ({
  phone,
  classes,
  style,
  userReferrerProfile,
  referrer,
  isAlternateLinkVisible,
  handleAlternateSubmit,
  onSubmit
}: IRenderViewProps) => {
  const params = useParams();

  return (
    <AuthBlock
      {...{
        title: isMobileVersion() ? 'Số điện thoại đã đăng ký' : 'Đã đăng ký',
        description: 'Số điện thoại này đã được đăng ký',
        descriptionVisibility: { mobile: false, desktop: true },
        mainContainer: (
          <MainContainer
            {...{
              phone,
              referrer,
              isAlternateLinkVisible,
              handleAlternateSubmit,
              onSubmit
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
        referrer,
        style,
        classes
      }}
    />
  );
};

export default View;
