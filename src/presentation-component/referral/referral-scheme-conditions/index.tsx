import classNames from 'classnames';

import SvgIcon from '../../../presentation-component/ui/icon';
import ReferralProgress from '../referral-progress';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface ReferralSchemeConditionProps {
  description: string;
  matched: boolean;
}
interface ReferralSchemeConditionsProps {
  conditions: Array<ReferralSchemeConditionProps>;
  classes?: { container?: string };
}
const ReferralSchemeConditions = ({ conditions, classes }: ReferralSchemeConditionsProps) => {
  const satisfiedConditionCount = conditions.filter((condition) => condition.matched).length;
  const progress = (satisfiedConditionCount / conditions.length) * 100;

  return (
    <div
      className={classNames(style.referralSchemeConditions, classes && classes.container)}
      {...generateTestId({ name: 'referral-scheme-conditions' })}
    >
      <div className={style.status}>
        Đã thỏa mãn{' '}
        <span>
          {satisfiedConditionCount}/{conditions.length}
        </span>{' '}
        điều kiện
      </div>
      <ReferralProgress progress={progress} classes={{ container: style.progress }} />
      <div className={style.conditions}>
        {conditions.map((condition, index) => (
          <div key={index} className={classNames(style.condition, condition.matched && style.conditionSatisfied)}>
            <SvgIcon name={condition.matched ? 'checkbox-checked' : 'checkbox-empty'} className={style.checkbox} />
            <div className={style.name}>{condition.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralSchemeConditions;
