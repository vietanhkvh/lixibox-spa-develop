import { useEffect, useState } from 'react';

import { objectToHash } from 'utils/encode';
import { usePrevious } from 'utils/hook';
import View from './view';
import { PropsFromRedux } from './store';

const getApplyButtonTitleState = ({ discountCode, isApplied }) => {
  let applyButtonTitle = 'Áp dụng vào giỏ hàng';
  let applyButtonEnabled = true;
  const startDate = discountCode.start_date;
  const isUpcoming = startDate && new Date(startDate * 1000) > new Date();
  const applicablePlatforms = discountCode.apply_for_platform || [];
  const isApplicableForWebPlatform = applicablePlatforms.includes('web');

  if (!discountCode.available) {
    applyButtonTitle = 'Đã hết hạn sử dụng';
    applyButtonEnabled = false;

    if (discountCode.available_message) {
      applyButtonTitle = discountCode.available_message;
    } else if (isUpcoming) {
      const date = new Date(startDate * 1000);
      applyButtonTitle = `Chỉ áp dụng từ ${date.getHours()}:${date.getMinutes()} ngày ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    }
  } else if (isApplied) {
    applyButtonTitle = 'Đã áp dụng vào giỏ hàng';
    applyButtonEnabled = false;
  } else if (!isApplicableForWebPlatform) {
    applyButtonTitle = `Chỉ được áp dụng trên ${applicablePlatforms.join(', ')}`;
    applyButtonEnabled = false;
  }

  return { applyButtonTitle, applyButtonEnabled };
};

interface DiscountCodeSummaryProps extends PropsFromRedux {
  code: string;
  standalone?: boolean;
  classes?: { container?: string; title?: string; description?: string };
  withActionButton: boolean;
  withHint: boolean;
  withSeparator: boolean;
}
const DiscountCodeSummary = ({
  code,
  standalone,
  classes,
  withActionButton,
  withHint,
  withSeparator,
  cartStore: {
    cartDetail: { discount_code },
    addDiscountCode,
    constants: { discount_code_program_icon }
  },
  discountCodeStore: { discountCodes },
  fetchDiscountCodesByCodeAction,
  addDiscountCodeAction,
  copyTextToClipboard
}: DiscountCodeSummaryProps) => {
  const query = { code };
  const discountCodeQueryHash = objectToHash(query);
  const wasApplying = usePrevious(addDiscountCode.loading);
  const [isApplying, setIsApplying] = useState(false);
  useEffect(() => {
    standalone && fetchDiscountCodesByCodeAction(query);
  }, []);
  useEffect(() => {
    if (wasApplying && !addDiscountCode.loading) {
      setIsApplying(false);
    }
  }, [addDiscountCode.loading]);

  const discountCode = discountCodes[discountCodeQueryHash] || {};
  const isApplied = discount_code === code;
  const title = discountCode.title || `Mã giảm giá: ${code}`;
  const discountCodeSpecificIcon = (discountCode.icon?.square_url || '').includes('missing')
    ? ''
    : discountCode.icon?.square_url;
  const icon = discountCodeSpecificIcon || discount_code_program_icon || '';
  const description = discountCode.description || '';
  const remainingAmount = discountCode.remaining_amount || 0;
  const terms = discountCode.terms || '';
  const { applyButtonTitle, applyButtonEnabled } = getApplyButtonTitleState({ discountCode, isApplied });

  const onApply = (code) => {
    addDiscountCodeAction({ discountCode: code, isOpenCartSummary: false, whereAdded: `Discount detail` }, true);
    setIsApplying(true);
  };
  const onCopy = (code) => copyTextToClipboard(code);

  return (
    <View
      {...{
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
      }}
    />
  );
};
DiscountCodeSummary.defaultProps = {
  withActionButton: true,
  withHint: true,
  withSeparator: true
};

export default DiscountCodeSummary;
