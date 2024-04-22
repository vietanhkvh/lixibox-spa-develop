import classNames from 'classnames';

import SvgIcon from '../../../presentation-component/ui/icon';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import Loading from '../../../components/ui/loading';
import style from './style.module.scss';

interface DiscountCodeCouponType {
  code: string;
  description: string;
  end_date?: number;
  available_message?: string;
}
interface DiscountCouponProps {
  enabled: boolean;
  coupon: DiscountCodeCouponType;
  isApplied?: boolean;
  isApplying?: boolean;
  classes?: { container?: string };
  onClickApply?: (coupon: any) => any;
  onClickCoupon?: (coupon: any) => any;
}
const DiscountCoupon = ({
  enabled,
  coupon,
  isApplied,
  isApplying,
  classes,
  onClickApply,
  onClickCoupon
}: DiscountCouponProps) => {
  if (!coupon) return null;

  return (
    <div
      className={classNames(
        style.discountCoupon,
        enabled ? style.clickable : style.discountCouponDisabled,
        classes && classes.container
      )}
      onClick={() => {
        onClickCoupon && onClickCoupon(coupon);
      }}
    >
      <div className={style.imageSection}>
        <div className={style.iconContainer}>
          <SvgIcon name="color-gift-code-pink" className={style.icon} />
        </div>
      </div>
      <div className={style.descriptionSection}>
        <div className={style.info}>
          {coupon.description}
          {!!coupon.end_date && (
            <>
              &nbsp;
              <span
                className={style.expiryInfo}
                title={formatDateTime(coupon.end_date, DATETIME_FORMAT_TYPE.FULL_INFO)}
              >
                (HSD: {formatDateTime(coupon.end_date, DATETIME_FORMAT_TYPE.DD_MM_YYYY)})
              </span>
            </>
          )}
        </div>
        <div className={style.coupon}>
          <div className={style.content}>{coupon.code}</div>
          <div className={style.action}>
            <div
              className={style.actionContent}
              onClick={(e) => {
                e.stopPropagation();
                onClickApply && onClickApply(coupon);
              }}
            >
              {isApplied ? (
                'Đã áp dụng'
              ) : isApplying ? (
                <div className={style.loader}>
                  <Loading classes={{ container: style.loaderContainer }} />
                </div>
              ) : (
                'Áp dụng'
              )}
            </div>
          </div>
        </div>
        {!!coupon.available_message && <div className={style.message}>{coupon.available_message}</div>}
      </div>
    </div>
  );
};
DiscountCoupon.defaultProps = {
  enabled: true,
  isApplied: false,
  isApplying: false
};

export type { DiscountCouponProps, DiscountCodeCouponType };
export default DiscountCoupon;
