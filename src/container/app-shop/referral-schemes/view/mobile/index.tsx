import classNames from 'classnames';

import MobileAutoDisplayHeader from '../../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../../presentation-component/general/mobile-screen-header';
import MobileTabHeader from '../../../../../presentation-component/general/mobile-tab-header';
import ReferralCode from '../../../../../presentation-component/referral/referral-code';
import ReferralScheme from '../../../../../presentation-component/referral/referral-scheme';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import { generateTestId } from 'utils/test-utils';
import type { ViewProps } from '../../component';
import style from './style.module.scss';

const View = ({ code, schemes, tabs, isLoggedIn, primaryButton, onTabSelect, onCopy, onSchemeClick }: ViewProps) => {
  return (
    <div className={style.referralSchemes} {...generateTestId({ name: 'referral-schemes-container', id: code })}>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Giới thiệu bạn bè'} />
      </MobileAutoDisplayHeader>
      <ReferralCode
        code={code}
        title="Mã giới thiệu của bạn"
        button={isLoggedIn && primaryButton}
        showCopyIcon={isLoggedIn}
        classes={{
          container: classNames(style.referralCode, style.referralCodeUnauthenticated),
          button: { container: style.button }
        }}
        onCopy={onCopy}
      />
      <MobileTabHeader tabs={tabs} onSelect={onTabSelect} className={style.tab} />
      {!!schemes.length ? (
        <div className={style.index}>
          {schemes.map((scheme, index) => (
            <ReferralScheme
              key={index}
              scheme={scheme}
              classes={{ container: style.referralScheme }}
              onClick={onSchemeClick}
            />
          ))}
        </div>
      ) : (
        <NoContentPlaceholder
          title="Không có chương trình giới thiệu bạn bè nào"
          logo={NO_CONTENT_LOGO.SHIPMENT}
          className={style.placeholder}
        />
      )}
    </div>
  );
};

export default View;
