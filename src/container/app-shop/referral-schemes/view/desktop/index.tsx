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
      <div className={style.referralCodeContainer}>
        <ReferralCode
          code={code}
          title="Mã giới thiệu của bạn"
          button={isLoggedIn && primaryButton}
          showCopyIcon={isLoggedIn}
          classes={{ container: style.referralCode, button: { container: style.button } }}
          onCopy={onCopy}
        />
      </div>
      <div className={style.schemesSection}>
        <MobileTabHeader tabs={tabs} className={style.tab} onSelect={onTabSelect} />
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
    </div>
  );
};

export default View;
