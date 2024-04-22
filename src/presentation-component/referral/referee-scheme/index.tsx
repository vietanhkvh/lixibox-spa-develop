import classNames from 'classnames';

import SvgIcon from '../../../presentation-component/ui/icon';
import DiscountBlock from '../../../components/ui/discount-block';
import Loading from '../../../components/ui/loading';
import { generateTestId } from 'utils/test-utils';
import * as VARIABLE from '../../../style/variable';
import ReferralProgress from '../referral-progress';
import style from './style.module.scss';

interface SchemeProps {
  code: string;
  description: string;
  guideline: string;
  progress?: number;
  expiry: number;
  timelineNote: string;
  isApplied?: boolean;
}
interface SchemeActionProps {
  text: string;
  withIcon: boolean;
}
interface RefereeSchemeProps {
  scheme: SchemeProps;
  isApplied: boolean;
  isApplying: boolean;
  isGreyedOut?: boolean;
  action: SchemeActionProps;
  classes?: { container?: string };
  onBodyClick?: (scheme: SchemeProps) => any;
  onApplyClick?: (scheme: SchemeProps) => any;
}
const RefereeScheme = ({
  scheme,
  isApplied,
  isApplying,
  isGreyedOut,
  action,
  classes,
  onBodyClick,
  onApplyClick
}: RefereeSchemeProps) => {
  const hasProgress = typeof scheme.progress !== 'undefined';

  return (
    <DiscountBlock
      border={['left', 'right']}
      className={classNames(
        style.refereeScheme,
        isApplied && style.refereeSchemeApplied,
        isGreyedOut && style.refereeSchemeDisabled,
        classes && classes.container
      )}
      backgroundColor={isGreyedOut ? VARIABLE.colorE4 : isApplied ? VARIABLE.colorBlue : VARIABLE.colorPrimary}
      innerStyle={{ padding: '6px 8px' }}
      onClick={() => {
        onBodyClick && onBodyClick(scheme);
      }}
    >
      <div className={style.body} {...generateTestId({ name: 'referee-scheme', id: scheme?.code })}>
        <div className={style.imageSection}>
          <div className={style.iconContainer}>
            <SvgIcon name={isApplied ? 'tick-bold' : 'color-discount-code'} className={style.icon} />
          </div>
        </div>
        <div className={style.descriptionSection}>
          <div className={style.info}>{scheme.description}</div>
          <div className={style.coupon}>
            <div className={style.content}>{scheme.code}</div>
          </div>
          <div className={style.guideline}>{scheme.guideline}</div>
          {hasProgress && <ReferralProgress progress={scheme.progress * 100} classes={{ container: style.progress }} />}
          <div className={style.bottomRow}>
            <div className={classNames(style.action, hasProgress && scheme.progress < 1 && style.actionDisabled)}>
              <div
                className={style.content}
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyClick && onApplyClick(scheme);
                }}
              >
                {isApplying ? (
                  <div className={style.loader}>
                    <Loading classes={{ container: style.loaderContainer }} />
                  </div>
                ) : (
                  <>
                    {action.text}
                    {action.withIcon && <SvgIcon name="angle-right" className={style.icon} />}
                  </>
                )}
              </div>
            </div>
            {!!scheme.timelineNote && <div className={style.message}>{scheme.timelineNote}</div>}
          </div>
        </div>
      </div>
    </DiscountBlock>
  );
};
RefereeScheme.defaultProps = {
  isApplied: false,
  isApplying: false
};

export type { SchemeProps, RefereeSchemeProps };
export default RefereeScheme;
