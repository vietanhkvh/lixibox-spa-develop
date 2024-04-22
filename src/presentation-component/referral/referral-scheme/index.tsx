import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { isMobileVersion } from '../../../utils/responsive';
import { SchemeTimelineNote } from '../../../utils/referral';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

// const referralBackground1 = CDN_ASSETS_PREFIX('/checkout/referral_background_1.png');
const referralBackground2 = CDN_ASSETS_PREFIX('/checkout/referral_background_2.png');

export interface Scheme {
  id: number;
  title: string;
  bannerUrl: string;
  note: SchemeTimelineNote;
  isExpired?: boolean;
}
interface ReferralSchemeProps {
  scheme: Scheme;
  classes?: { container?: string; code?: string; button?: any };
  onClick?: (scheme: Scheme) => any;
}
const ReferralScheme = ({
  scheme: { title, note, bannerUrl, isExpired },
  scheme,
  classes,
  onClick
}: ReferralSchemeProps) => {
  return (
    <div
      className={classNames(
        style.referralScheme,
        isMobileVersion() || style.referralSchemeDesktop,
        isExpired && style.expired,
        classes && classes.container
      )}
      onClick={() => onClick && onClick(scheme)}
      {...generateTestId({ name: 'referral-scheme', id: scheme?.title })}
    >
      <div className={style.header}>
        <Image src={bannerUrl} alt="" />
      </div>
      <div className={style.body} style={{ backgroundImage: isMobileVersion() ? '' : `url(${referralBackground2})` }}>
        <div className={style.promoInfo}>
          <div className={style.title}>{title}</div>
          {!!note.value && (
            <div
              className={classNames(
                style.note,
                note.isExpired ? style.noteExpired : !note.isAvailable ? style.noteUnavailable : null
              )}
            >
              {note.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralScheme;
