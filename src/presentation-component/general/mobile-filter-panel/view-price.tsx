import InputField from '../../../components/ui/input-field';
import styles from './style.module.css';
import { Panel, SelectList } from './view-general';
import { isMobileVersion } from '../../../utils/responsive';
import { generatePriceRange } from '../../../utils/price-filter';
import STYLE from './style';

export const PriceRange = ({ inputMinPrice, inputMaxPrice, handleInputOnChange }) => {
  const generalInputProps = {
    title: '',
    type: isMobileVersion() ? InputField.INPUT_TYPE.TEL : InputField.INPUT_TYPE.NUMBER,
    name: InputField.INPUT_NAME.PRICE,
    isRoundedStyle: true,
    minValue: 0,
    maxValue: 100
  };

  const minPropsProps = {
    ...generalInputProps,
    placeholder: 'Từ',
    style: STYLE.input,
    inputStyle: STYLE.innerInput,
    value: 0 === inputMinPrice ? '' : inputMinPrice * 1000,
    onChange: ({ value, valid }) => handleInputOnChange(value / 1000, valid, 'inputMin')
  };

  const maxPropsProps = {
    ...generalInputProps,
    placeholder: 'Đến',
    style: STYLE.input,
    inputStyle: STYLE.innerInput,
    value: 0 === inputMaxPrice ? '' : inputMaxPrice * 1000,
    onChange: ({ value, valid }) => handleInputOnChange(value / 1000, valid, 'inputMax')
  };

  return (
    <div className={styles.priceRange}>
      <InputField {...minPropsProps} />
      <div className={styles.priceRangeSeparate}></div>
      <InputField {...maxPropsProps} />
    </div>
  );
};

export const Price = ({
  minPrice,
  maxPrice,
  inputMinPrice,
  inputMaxPrice,
  handleInputOnChange,
  handleSelectPriceRange
}) => {
  const priceRangeProps = { inputMinPrice, inputMaxPrice, handleInputOnChange };

  const combinedPriceRangeList = generatePriceRange({ minPrice, maxPrice }).map((item) =>
    Object.assign({}, item, { selected: item.pl === inputMinPrice * 1 && item.ph === inputMaxPrice * 1 })
  );

  return (
    <Panel title={'Mức giá'}>
      <PriceRange {...priceRangeProps} />
      <SelectList list={combinedPriceRangeList} onClick={handleSelectPriceRange} />
    </Panel>
  );
};
