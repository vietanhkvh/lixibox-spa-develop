import React, { useEffect } from 'react'; //useState
import { isMobileVersion } from 'utils';
import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';
import { IHeaderProps } from './model';
import { destroy } from './module';
import * as VARIABLE from 'style/variable';

const Header: React.FC<IHeaderProps> = (props) => {
  const {
    themeHeader = {
      wrapper: {
        backgroundColor: VARIABLE.color20,
        color: VARIABLE.colorWhite
      },
      inner: {
        backgroundColor: VARIABLE.colorWhite,
        color: VARIABLE.color20
      }
    },
    referralStore: { availableSchemes },
    getReferralSchemesAction
  } = props;
  const propsCommon = Object.assign({}, { themeHeader, availableSchemes });
  const schemeIndexQuery = { status: 'available' as const };

  //Life cycle
  useEffect(() => {
    getReferralSchemesAction(schemeIndexQuery);
    return destroy();
  }, []);

  return <>{isMobileVersion() ? <HeaderMobile {...propsCommon} /> : <HeaderDesktop {...propsCommon} />}</>;
};

export default Header;
