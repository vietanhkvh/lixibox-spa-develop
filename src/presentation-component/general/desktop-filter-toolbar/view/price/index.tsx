import { useEffect, useState } from 'react';
import classnames from 'classnames';

import InputField from '../../../../../components/ui/input-field';
import { generatePriceRange } from '../../../../../utils/price-filter';
import SubmitButton from '../../../../../components/ui/submit-button';
import { isMobileVersion } from '../../../../../utils/responsive';
import SvgIcon from '../../../../ui/icon';
import styles from './style.module.scss';
import STYLE from './style';
import { ERROR_VALIDATION } from 'constants/localize/errorMessage';

export const PriceRange = ({
  inputMinPrice,
  inputMaxPrice,
  handleInputOnChange,
  validationValue,
  setValidationValue
}) => {
  const [minVal, setMinVal] = useState(inputMinPrice);
  const [maxVal, setMaxVal] = useState(inputMaxPrice);
  const [isShowError, setIsShowError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const generalInputProps = {
    title: '',
    type: isMobileVersion() ? InputField.INPUT_TYPE.TEL : InputField.INPUT_TYPE.NUMBER,
    name: InputField.INPUT_NAME.PRICE,
    isRoundedStyle: true,
    minValue: 0,
    maxValue: 999999999
  };

  useEffect(() => {
    if (minVal >= maxVal) {
      setIsShowError(true);
      setValidationValue(false);
      setValidationErrorMessage(ERROR_VALIDATION.MIN_MAX_VALUE);
    }

    return () => {
      setIsShowError(false);
      setValidationValue(true);
      setValidationErrorMessage('');
    };
  }, [maxVal, minVal, setValidationValue]);

  const minPropsProps = {
    ...generalInputProps,
    placeholder: 'Từ',
    style: STYLE.input,
    inputStyle: STYLE.innerInput,
    value: 0 === inputMinPrice ? '' : inputMinPrice,
    validationValue,
    validationErrorMessage,
    isShowError,
    onChange: ({ value, valid }) => {
      handleInputOnChange(value / 1000, valid, 'inputMin');
      setMinVal(value);
    }
  };

  const maxPropsProps = {
    ...generalInputProps,
    placeholder: 'Đến',
    style: STYLE.input,
    inputStyle: STYLE.innerInput,
    value: 0 === inputMaxPrice ? '' : inputMaxPrice,
    validationValue,
    validationErrorMessage,
    isShowError,
    onChange: ({ value, valid }) => {
      handleInputOnChange(value / 1000, valid, 'inputMax');
      setMaxVal(value);
    }
  };

  return (
    <div className={styles.priceRange}>
      <InputField {...minPropsProps} />
      <div className={styles.suffix}>k</div>
      <div className={styles.priceRangeSeparate}></div>
      <InputField {...maxPropsProps} />
      <div className={styles.suffix}>k</div>
    </div>
  );
};

export const SelectList = ({ list, type = 'row', onClick = () => {} }) => {
  if (!list || !list.length) return null;

  return <div className={styles.selectList}>{list.map(SelectListItem, { type, onClick })}</div>;
};

export function SelectListItem(item, index) {
  const checkIconProps = {
    name: !!item.selected ? 'radio-checked' : 'radio-empty',
    className: styles.icon
  };

  return (
    <div
      onClick={() => {
        'function' === typeof this.onClick && this.onClick(item);
      }}
      className={styles.selectListItem}
      key={item.id || index}
    >
      <SvgIcon {...checkIconProps} />
      <span className={styles.title}>{item.title}</span>
    </div>
  );
}

export const PricePanel = ({
  isOpenPrice,
  onClickOverlay,
  minPrice,
  maxPrice,
  inputMinPrice,
  inputMaxPrice,
  handleInputOnChange,
  handleSelectPriceRange,
  onReset,
  onSubmit,
  isShowBrandsFilter
}) => {
  const [validationValue, setValidationValue] = useState(true);

  const priceRangeProps = { inputMinPrice, inputMaxPrice, handleInputOnChange, validationValue, setValidationValue };

  const combinedPriceRangeList = generatePriceRange({ minPrice, maxPrice }).map((item) =>
    Object.assign({}, item, { selected: item.pl === inputMinPrice * 1 && item.ph === inputMaxPrice * 1 })
  );

  const submitButtonProps = {
    title: 'Áp dụng',
    color: 'black',
    style: { margin: '0 16px 0 0' },
    disabled: !validationValue,
    onSubmit: () => {
      const filterData = Object.assign(
        {},
        {
          pl: 0 === inputMinPrice ? '0' : inputMinPrice + '',
          ph: 0 === inputMaxPrice ? '0' : inputMaxPrice + ''
        }
      );

      onSubmit(filterData);
    }
  };

  const resetButtonProps = {
    title: 'Bỏ chọn',
    color: 'white',
    style: { margin: 0 },
    onSubmit: onReset
  };
  return (
    <div
      className={classnames(
        styles.pricePanel,
        // { [styles.withBrandsPanel]: !!isShowBrandsFilter },//FIX: show filter panel in the same left positon
        { [styles.isOpen]: !!isOpenPrice }
      )}
    >
      <div className={styles.overlay} onClick={onClickOverlay} />
      <div className={styles.priceList}>
        <PriceRange {...priceRangeProps} />
        <SelectList list={combinedPriceRangeList} onClick={handleSelectPriceRange} />
        <div className={styles.action}>
          <SubmitButton {...submitButtonProps} />
          <SubmitButton {...resetButtonProps} />
        </div>
      </div>
    </div>
  );
};
