import classNames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import SubmitButton from 'presentation-component/ui/submit-button';
import Image from 'presentation-component/ui/image';
import DiscountBlock from '../../ui/discount-block';
import styles from './style.module.scss';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import { formatCurrency } from 'utils/currency';

interface ViewProps {
  code: string;
  title: string;
  icon: string;
  terms: string;
  description: string;
  remainingAmount?: number;
  applyButtonTitle: string;
  applyButtonEnabled: boolean;
  isApplying: boolean;
  onApply: (code: string) => any;
  onCopy: (code: string) => any;
  classes?: { container?: string; title?: string; description?: string };
  withActionButton: boolean;
  withHint: boolean;
  withSeparator: boolean;
}
const View = ({
  code,
  title,
  icon,
  terms,
  description,
  remainingAmount,
  applyButtonTitle,
  applyButtonEnabled,
  isApplying,
  onApply,
  onCopy,
  classes,
  withActionButton,
  withHint,
  withSeparator
}: ViewProps) => {
  return (
    <div className={classNames(styles.info, classes && classes.container)}>
      {icon ? (
        <Image src={icon} alt={title} className={styles.iconImage} />
      ) : (
        <SvgIcon name="discount-code" className={styles.iconSvg} />
      )}
      <div className={classNames(styles.title, classes?.title)}>{title}</div>
      <div className={classNames(styles.description, classes?.description)}>{description}</div>
      <DiscountBlock className={styles.discountCodeContainer} onClick={() => onCopy(code)}>
        <div className={styles.discountCode}>
          <div className={styles.content}>{code}</div>
          <SvgIcon name="copy" className={styles.copyButton} />
        </div>
      </DiscountBlock>
      {withActionButton && (
        <SubmitButton
          title={applyButtonTitle}
          color={'black'}
          loading={isApplying}
          disabled={!applyButtonEnabled}
          classes={{ container: styles.button }}
          onSubmit={() => onApply(code)}
        />
      )}
      {withHint && (
        <>
          {!!remainingAmount && remainingAmount > 0 && (
            <div className={styles.applicability}>
              Mua thêm <span>{formatCurrency(remainingAmount, { suffix: true })}</span> để được hưởng ưu đãi này
            </div>
          )}
          {terms ? (
            <>
              <div className={styles.termsHeader}>Lưu ý:</div>
              <div className={styles.terms}>
                <SanitizedAndPreprocessedHTMLContent content={terms} formatRNAsLineBreak />
              </div>
            </>
          ) : (
            <div className={styles.hint}>{'Mã giảm giá sẽ được áp dụng vào giỏ hàng của bạn.'}</div>
          )}
        </>
      )}
      {withSeparator && <div className={styles.separator} />}
    </div>
  );
};

export default View;
