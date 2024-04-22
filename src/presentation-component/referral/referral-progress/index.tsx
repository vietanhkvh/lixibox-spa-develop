import classNames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import SvgIcon from '../../../presentation-component/ui/icon';
import style from './style.module.scss';

interface ReferralProgressProps {
  progress: number; // Progress in percentage (range: 0 - 100)
  classes?: { container?: string };
}
const ReferralProgress = ({ progress, classes }: ReferralProgressProps) => {
  return (
    <div
      className={classNames(style.referralProgress, classes && classes.container)}
      {...generateTestId({ name: 'referral-progress' })}
    >
      <div className={style.bar}>
        <div style={{ width: `${progress}%` }} className={style.segmentDone} />
      </div>
      <div className={style.iconWrapper}>
        <SvgIcon name={'gift'} className={style.icon} />
      </div>
    </div>
  );
};

export type { ReferralProgressProps };
export default ReferralProgress;
