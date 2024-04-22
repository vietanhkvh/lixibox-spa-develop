import { MouseEvent, useEffect } from 'react';
import { useLocation, useHistory, useParams, generatePath } from 'react-router-dom';

import { ROUTING_AUTH_VERIFY_PHONE, ROUTING_SHOP_INDEX } from 'routings/path';
import { auth } from 'utils/auth';
import { isEmptyKeyObject } from 'utils/validate';
import { IProps } from './model';
import View from './view';

const SignupWithRegisteredPhonePrompt = ({
  userStore: { userReferrerProfile },
  requestOtpAction,
  fetchConstantsAction,
  fetchUserReferrerProfileAction,

  // Own props
  phone,
  status,
  classes,
  style,
  referrer: _referrer,
  isOnModal,
  onSubmit,
  onAlternateLinkClick
}: IProps) => {
  const history = useHistory();
  // referrer: query string, status: location state
  const location = useLocation<{ referrer: string; status: string }>();
  const params = useParams<{ phone: string; referalCode: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const derivedPhone = phone || params.phone || '';
  const derivedStatus = status || location.state?.status || 'unverified';
  useEffect(() => {
    auth.loggedIn() && !isOnModal && history.push(ROUTING_SHOP_INDEX);
    !isEmptyKeyObject(params, 'referalCode') && fetchUserReferrerProfileAction({ referrerProfile: params.referalCode });
    fetchConstantsAction();
  }, []);

  const handleAlternateSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    requestOtpAction({ phone: derivedPhone, requestType: 'phone_signup_verify' });
    !isOnModal && history.push(generatePath(ROUTING_AUTH_VERIFY_PHONE, { phone: derivedPhone }));
    onAlternateLinkClick?.({ phone: derivedPhone, referrer });
  };

  return (
    <View
      {...{
        phone: derivedPhone,
        classes,
        style,
        userReferrerProfile,
        referrer,
        isAlternateLinkVisible: derivedStatus !== 'verified',
        handleAlternateSubmit,
        onSubmit
      }}
    />
  );
};
SignupWithRegisteredPhonePrompt.defaultProps = {
  isOnModal: false
};

export default SignupWithRegisteredPhonePrompt;
