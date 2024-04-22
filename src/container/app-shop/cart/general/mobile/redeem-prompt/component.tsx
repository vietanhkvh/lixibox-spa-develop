import classNames from 'classnames';

import { generateTestId } from 'utils/test-utils';
import Icon from '../../../../../../components/ui/icon';
import STYLE from './style';
import style from './style.module.scss';

interface RedeemPromptProps {
  icon: string;
  title: string;
  body: React.ReactNode;
  showRightArrow: boolean;
  classes?: { container?: string };
  onClick: (param0?: any) => any;
}
const RedeemPrompt = ({ icon, title, body, showRightArrow, classes, onClick }: RedeemPromptProps) => {
  return (
    <div
      className={classNames(style.redeemPromptBlock, classes?.container)}
      onClick={onClick}
      {...generateTestId({ name: 'redeem-prompt' })}
    >
      <div className={style.leftSection}>
        <div className={style.firstRow}>
          <Icon {...{ name: icon, style: STYLE.redeemIcon }} />
          <div className={style.title}>{title}</div>
        </div>
        <div className={style.secondRow}>{body}</div>
      </div>
      <div className={style.rightSection}>
        {showRightArrow && <Icon {...{ name: 'angle-right', style: STYLE.goToIcon }} />}
      </div>
    </div>
  );
};
RedeemPrompt.defaultProps = {
  showRightArrow: true
};

export default RedeemPrompt;
