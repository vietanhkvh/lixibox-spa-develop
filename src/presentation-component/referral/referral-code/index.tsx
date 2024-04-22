import classNames from 'classnames';

import SvgIcon from '../../../presentation-component/ui/icon';
import SubmitButton from '../../../presentation-component/ui/submit-button';
import { SubmitButtonClassesProps } from '../../../presentation-component/ui/submit-button/component';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface ReferralCodePrimaryButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  onClick?: (code: string) => any;
}
interface ReferralCodeProps {
  code: string;
  title?: string;
  button?: ReferralCodePrimaryButtonProps;
  showCopyIcon?: boolean;
  classes?: { container?: string; code?: string; button?: SubmitButtonClassesProps };
  onCopy?: (code: string) => any;
}
const ReferralCode = ({ code, title, button, showCopyIcon, classes, onCopy }: ReferralCodeProps) => {
  return (
    <div
      className={classNames(style.referralCode, classes && classes.container)}
      {...generateTestId({ name: 'referral-code', id: code })}
    >
      {!!title && <div className={style.title}>{title}</div>}
      <div className={classNames(style.code, classes && classes.code)} onClick={() => onCopy && onCopy(code)}>
        <div className={style.content}>{code}</div>
        {showCopyIcon && !!navigator && !!navigator.clipboard && <SvgIcon name="copy" className={style.copyButton} />}
      </div>
      {!!button?.title && !!navigator && !!navigator.clipboard && (
        <SubmitButton
          title={button.title}
          color={button.color || 'pink'}
          disabled={button.disabled}
          loading={button.loading}
          classes={Object.assign({}, classes && classes.button)}
          onSubmit={() => button.onClick && button.onClick(code)}
        />
      )}
    </div>
  );
};
ReferralCode.defaultProps = {
  showCopyIcon: true
};

export type { ReferralCodeProps, ReferralCodePrimaryButtonProps };
export default ReferralCode;
