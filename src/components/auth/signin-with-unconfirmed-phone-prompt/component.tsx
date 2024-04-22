import { useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import { ROUTING_AUTH_ATTACH_PHONE_STEP_1, ROUTING_SHOP_INDEX } from 'routings/path';
import { auth } from 'utils/auth';
import { isEmptyKeyObject } from 'utils/validate';
import { IProps } from './model';
import View from './view';

const SigninWithUnconfirmedPhonePrompt = ({
  userStore: { userReferrerProfile },
  fetchConstantsAction,
  fetchUserReferrerProfileAction,

  // Own props
  phone,
  classes,
  style,
  referrer: _referrer,
  isOnModal,
  onSubmit,
  onAlternateLinkClick,
  onSignup
}: IProps) => {
  const history = useHistory();
  // referrer: query string
  const location = useLocation<{ referrer: string }>();
  const params = useParams<{ phone: string; referalCode: string }>();
  const referrer = _referrer || location.state?.referrer || '';
  const derivedPhone = phone || params.phone || '';
  useEffect(() => {
    auth.loggedIn() && !isOnModal && history.push(ROUTING_SHOP_INDEX);
    !isEmptyKeyObject(params, 'referalCode') && fetchUserReferrerProfileAction({ referrerProfile: params.referalCode });
    fetchConstantsAction();
  }, []);

  const handleSubmit = () => {
    !isOnModal && history.push(ROUTING_AUTH_ATTACH_PHONE_STEP_1);
    onSubmit?.({ referrer });
  };

  return (
    <View
      {...{
        phone: derivedPhone,
        classes,
        style,
        userReferrerProfile,
        referrer,
        handleSubmit,
        onAlternateLinkClick,
        onSignup
      }}
    />
  );
};
SigninWithUnconfirmedPhonePrompt.defaultProps = {
  isOnModal: false
};

export default SigninWithUnconfirmedPhonePrompt;
