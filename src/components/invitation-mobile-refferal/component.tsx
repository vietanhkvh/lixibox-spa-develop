import classNames from 'classnames';

import SvgIcon from '../../presentation-component/ui/icon';
import SubmitButton from '../../components/ui/submit-button';
import { CDN_ASSETS_PREFIX } from '../../utils/uri';
import STYLE from './style';
import style from './style.module.scss';
import { formatCurrency } from '../../utils/currency';
import { isMobileVersion } from '../../utils';

const referralBackground1 = CDN_ASSETS_PREFIX('/info/cover-new.jpg');
const referralBackground2 = CDN_ASSETS_PREFIX('/checkout/referral_background_2.png');

interface InvitationProps {
  authStore: any;
  cartStore: any;
  className: string;
  scoopClass: string;
  copyTextToClipboard: (text: string) => any;
  invitationURL: (referralCode: string) => string;
  shareOrCopyLink: (lint: string) => any;
}
const Invitation = ({
  authStore: { userInfo },
  cartStore: {
    constants: {
      mobile_referral,
      mobile_referral: { minimum_order_price, reward, gift_message, notes: _notes, applicable_message },
      mobile_referrer
    }
  },
  className,
  scoopClass,
  copyTextToClipboard,
  invitationURL,
  shareOrCopyLink
}: InvitationProps) => {
  if (!userInfo || !mobile_referral || !mobile_referrer) return null;

  const mobileReferralCode = (!!userInfo && userInfo.mobile_referral_code) || '';
  const rewardValue = formatCurrency(reward, { suffix: true });
  const referrerBonusSegments = {
    balance_before_decimal: formatCurrency(Math.floor(mobile_referrer.balance / 1000)),
    balance_after_decimal: String(mobile_referrer.balance % 1000).padStart(3, '0')
  };
  const notes = Array.isArray(_notes) ? _notes : [];

  return (
    <div className={classNames(style.invitation, !isMobileVersion() && style.invitationDesktop, className)}>
      <div className={style.header} style={{ backgroundImage: `url(${referralBackground1})` }}>
        <div className={style.title1}>Giới thiệu bạn bè</div>
        <div className={style.title1}>Nhận quà liền tay</div>
        <div className={style.highlight}>
          {referrerBonusSegments.balance_before_decimal}
          <span>.{referrerBonusSegments.balance_after_decimal}₫</span>&nbsp;+ 200&nbsp;<span>Lixicoin</span>
        </div>
      </div>
      <div className={style.body} style={{ backgroundImage: `url(${referralBackground2})` }}>
        <div className={classNames(style.scoop, scoopClass, style.scoopLeft)} />
        <div className={classNames(style.scoop, scoopClass, style.scoopRight)} />
        <div className={style.referralAction}>
          <div className={style.title}>Mã giới thiệu của bạn</div>
          <div className={style.referralCode} onClick={() => copyTextToClipboard(mobileReferralCode)}>
            <div className={style.content}>{mobileReferralCode}</div>
            {!!navigator && !!navigator.clipboard && <SvgIcon name="copy" className={style.copyButton} />}
          </div>
          {!!navigator && !!navigator.clipboard && (
            <SubmitButton
              style={STYLE.button}
              titleStyle={STYLE.button.titleStyle}
              title="Chia sẻ ngay"
              className={style.shareButton}
              onSubmit={() => shareOrCopyLink(mobileReferralCode)}
            />
          )}
        </div>
        <div className={style.promoInfo}>
          <div className={style.title}>
            {`Mời bạn bè áp dụng mã khuyến mãi này trên Lixibox, khi mua đơn hàng đầu tiên ${
              applicable_message ? `${applicable_message} ` : ''
            }`}
            {!!minimum_order_price && (
              <>
                với giá trị từ <span>{formatCurrency(minimum_order_price, { suffix: true })}</span>
              </>
            )}
            :
          </div>
          <ul className={style.indications}>
            <li className={style.indication}>
              Tài khoản của bạn (người giới thiệu) sẽ được{' '}
              <span>{formatCurrency(mobile_referrer.balance, { suffix: true })}</span> và{' '}
              <span>{formatCurrency(mobile_referrer.coins)} Lixicoin </span> để thoả sức mua sắm và đổi quà.{' '}
            </li>
            <li className={style.indication}>
              Bạn của bạn (người được giới thiệu) sẽ được <span>{rewardValue}</span>{' '}
              {!!gift_message && (
                <>
                  và <span>{gift_message}</span>
                </>
              )}{' '}
              cho đơn hàng đầu tiên.
            </li>
          </ul>
        </div>
        <div className={style.notes}>
          {!!notes.length && (
            <>
              <div className={style.title}>Lưu ý:</div>
              <div className={style.statements}>
                {notes.map((note, index) => (
                  <div key={index} className={style.statement}>
                    - {note}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
Invitation.defaultProps = {
  scoopClass: ''
};

export default Invitation;
