import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { formatCurrency } from '../../../utils/currency';
import { isMobileVersion } from '../../../utils/responsive';
import { generateSchemeTimelineNote } from '../../../utils/referral';
import { ReferralSchemeDetailResponse } from '../../../types/api/referral';
import { generateTestId } from 'utils/test-utils';
import ReferralCode from '../referral-code';
import style from './style.module.scss';

// const referralBackground1 = CDN_ASSETS_PREFIX('/info/cover-new.jpg');
const referralBackground2 = CDN_ASSETS_PREFIX('/checkout/referral_background_2.png');

const DEFAULT_SCHEME_NOTES = [
  { content: 'Chỉ áp dụng cho đơn hàng có số điện thoại chưa từng mua hàng ở Lixibox.' },
  {
    content:
      'Tiền thưởng và Lixicoin của người được giới thiệu sẽ được cộng ngay khi đơn hàng của người được giới thiệu được giao và thanh toán thành công.'
  }
];

interface ReferralDetailButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  onClick?: (scheme: ReferralSchemeDetailResponse) => any;
}
interface ReferralDetailProps {
  scheme: ReferralSchemeDetailResponse;
  button?: ReferralDetailButtonProps;
  copyButton?: { title: string; withIcon: boolean; onClick?: (scheme: ReferralSchemeDetailResponse) => any };
  classes?: { container?: string; scoop?: string; button?: string };
}
const ReferralDetail = ({ scheme, button, copyButton, classes }: ReferralDetailProps) => {
  const timelineNote = generateSchemeTimelineNote(scheme);
  const schemeNotes = scheme.notes.length ? scheme.notes : DEFAULT_SCHEME_NOTES;

  return (
    <div
      className={classNames(
        style.invitation,
        !isMobileVersion() && style.invitationDesktop,
        classes && classes.container
      )}
      {...generateTestId({ name: 'referral-detail', id: scheme?.id })}
    >
      <div className={style.header}>
        <Image src={scheme.banner.url} alt="" />
      </div>
      <div className={style.body} style={{ backgroundImage: `url(${referralBackground2})` }}>
        <div className={classNames(style.scoop, classes && classes.scoop, style.scoopLeft)} />
        <div className={classNames(style.scoop, classes && classes.scoop, style.scoopRight)} />
        {!!copyButton && (
          <ReferralCode
            code={copyButton.title}
            title="Mã giới thiệu của bạn"
            button={{
              title: button.title,
              color: 'pink',
              disabled: button.disabled,
              loading: button.loading,
              onClick: () => button.onClick?.(scheme)
            }}
            showCopyIcon={copyButton.withIcon}
            classes={{
              container: style.referralAction,
              code: style.referralCode,
              button: { container: classNames(style.shareButton, classes && classes.button) }
            }}
            onCopy={() => copyButton.onClick?.(scheme)}
          />
        )}
        <div className={style.promoInfo}>
          <div className={style.title}>
            Mời bạn bè áp dụng mã khuyến mãi này trên Lixibox, khi mua đơn hàng đầu tiên{' '}
            {!!scheme.referee.conditional_message && <span>{`${scheme.referee.conditional_message} `}</span>}
            với giá trị từ <span>{formatCurrency(scheme.referee.minimum_order_value, { suffix: true })}</span>:
          </div>
          <ul className={style.indications}>
            <li className={style.indication}>
              Tài khoản của bạn (người giới thiệu) sẽ được{' '}
              <span>{scheme.referrer.reward_message ? `${scheme.referrer.reward_message} ` : ''}</span>để thoả sức mua
              sắm và đổi quà.{' '}
            </li>
            <li className={style.indication}>
              Bạn của bạn (người được giới thiệu) sẽ được{' '}
              <span>{scheme.referee.reward_message ? `${scheme.referee.reward_message} ` : ''}</span>cho đơn hàng đầu
              tiên.
            </li>
          </ul>
          {!timelineNote.shouldHideOnSchemeDetail && !!timelineNote.value && (
            <div className={classNames(style.hint, timelineNote.isExpired && style.hintExpired)}>
              {timelineNote.value}
            </div>
          )}
        </div>
        <div className={style.notes}>
          <div className={style.title}>Lưu ý:</div>
          <div className={style.statements}>
            {schemeNotes.map((note, index) => (
              <div key={index} className={style.statement}>
                - {note.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export type { ReferralDetailProps, ReferralDetailButtonProps };
export default ReferralDetail;
