import { useState, useEffect } from 'react';

import { KEY } from '../../../../constants/application/event';
import { generateTestId } from 'utils/test-utils';

interface InlineInputProps {
  value: number;
  onChange: (value: number) => any;
  minQuantity: number;
  maxQuantity: number;
  [key: string]: any;
  dataTestId: string;
}
const InlineInput = ({ dataTestId, value, onChange, minQuantity, maxQuantity, ...rest }: InlineInputProps) => {
  const [currentValue, setCurrentValue] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setCurrentValue(String(value));
  }, [value]);

  const handleChange = (changedValue) => {
    const isTooLarge = Number(changedValue) > maxQuantity;
    const isTooSmall = Number(changedValue) < minQuantity;
    const isEmpty = changedValue === '';
    clearInterval(timeoutId);
    setCurrentValue(changedValue);

    setTimeoutId(
      setTimeout(() => {
        if (isEmpty) {
          // NOP
        } else if (isTooSmall || isTooLarge) {
          const fallbackValue = isTooLarge ? maxQuantity : minQuantity;
          setCurrentValue(String(fallbackValue));
          onChange(fallbackValue);
        } else {
          onChange(Number(changedValue));
        }
      }, 1000)
    );
  };

  const handleBlurOrEnter = (e) => {
    const isEmpty = currentValue === '';
    if (isEmpty) {
      setCurrentValue(String(value));
    }
  };

  return (
    <input
      {...generateTestId({ name: dataTestId })}
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlurOrEnter}
      onKeyUp={(e) => e.key === KEY.enter && handleBlurOrEnter(e)}
      {...rest}
    />
  );
};

export default InlineInput;
