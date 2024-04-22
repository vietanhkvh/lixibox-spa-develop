import classNames from 'classnames';

import { generateTestId } from 'utils/test-utils';
import SvgIcon from '../../../ui/icon';
import style from './style.module.scss';

interface DiscountCodeProductSelectionPromptProps {
  message: string | JSX.Element;
  actionTitle: string;
  onClick?: () => any;
  className?: string; // NOTE: use `classes` instead
  classes?: { container?: string; message?: string; actionTitle?: string; actionIcon?: string };
}
const DiscountCodeProductSelectionPrompt = ({
  message,
  actionTitle,
  onClick,
  className,
  classes
}: DiscountCodeProductSelectionPromptProps) => {
  return (
    <div
      className={classNames(style.discountCodeProductSelectionPromptBlock, className, classes?.container)}
      onClick={() => onClick?.()}
      {...generateTestId({ name: 'discount-code-product-selection-prompt' })}
    >
      <div className={classNames(style.textSection, classes?.message)}>{message}</div>
      <div className={style.linkSection}>
        <div className={classNames(style.text, classes?.actionTitle)}>{actionTitle}</div>
        <SvgIcon name="angle-right" className={classNames(style.actionIcon, classes?.actionIcon)} />
      </div>
    </div>
  );
};
DiscountCodeProductSelectionPrompt.defaultProps = { actionTitle: 'Chọn', className: '' };

export default DiscountCodeProductSelectionPrompt;
