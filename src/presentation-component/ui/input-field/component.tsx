import { useEffect, forwardRef, useState, useRef } from 'react';
import classNames from 'classnames';

import SvgIcon from '../icon';
import { useCombinedRefs } from '../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import styles from './style.module.scss';

interface InputFieldProps {
  title?: string;
  icon?: string;
  testId?: { name: string; id?: string };
  isRoundedStyle?: boolean;
  isBigRoundedStyle?: boolean;
  isUpperCase?: boolean;
  textAlign?: any;
  error?: any;
  focus?: boolean;
  select?: boolean;
  visibilityDelay?: number;
  classes?: { container?: string; input?: string; error?: string };

  // Input props
  name?: string;
  id?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  onFocus?: (param0: any) => any;
  onBlur?: (param0: any) => any;
  onChange?: (param0: any) => any;
}
const InputField = forwardRef<HTMLInputElement, any>(
  (
    {
      title,
      name,
      id,
      isUpperCase,
      isRoundedStyle,
      isBigRoundedStyle,
      textAlign,
      icon,
      autoFocus,
      testId,
      readOnly,
      error,
      focus,
      select,
      visibilityDelay,
      classes,
      onFocus,
      onBlur,
      onChange,
      ...rest
    }: InputFieldProps,
    ref
  ) => {
    const combinedRef = useCombinedRefs(ref);
    const asyncEventId = useRef<NodeJS.Timeout>(null);
    const [hasFocus, setFocus] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
      asyncEventId.current = setTimeout(() => {
        focus && combinedRef && combinedRef.current && combinedRef.current.focus();
        select && combinedRef && combinedRef.current && combinedRef.current.select();
      }, visibilityDelay);

      return () => clearInterval(asyncEventId.current);
    }, []);

    const combinedName = !!name && !!name.length ? name : id;

    let inputProps = Object.assign(
      {
        ref: combinedRef,
        id: id || name,
        name: combinedName, //TODO .toLowerCase() makes error -> remove?
        className: classNames(
          styles.inputField,
          isRoundedStyle && styles.inputRounded,
          isBigRoundedStyle && styles.inputBigRounded,
          isUpperCase && styles.textTrasnformUppercase,
          icon && styles.inputWithIcon,
          classes && classes.input
        ),
        style: { textAlign },
        readOnly,
        autoFocus,
        onFocus: (event) => {
          setFocus(true);
          onFocus && onFocus(event);
        },
        onBlur: (event) => {
          setFocus(false);
          onBlur && onBlur(event);
        },
        onChange: (event) => {
          setValue(event.target.value);
          onChange && onChange(event);
        },
        ...rest
      },
      testId && generateTestId(testId)
    );

    return (
      <div
        className={classNames(
          styles.inputFieldContainer,
          readOnly && styles.inputFieldContainerReadOnly,
          classes && classes.container
        )}
      >
        {!isRoundedStyle && (
          <div
            className={classNames(
              styles.title,
              !hasFocus && '' === value && styles.titleOnInput,
              error && styles.titleError
            )}
          >
            {title}
          </div>
        )}
        <div className={classNames(styles.main)}>
          <input {...inputProps} />
          {!!icon && <SvgIcon name={icon} className={classNames(styles.icon, styles[`icon-${icon}`])} />}
          {!isRoundedStyle && (
            <div
              className={classNames(
                styles.line,
                error ? styles.lineInvalid : styles.lineValid,
                (hasFocus || error) && styles.lineFocused
              )}
            />
          )}
        </div>
        <div className={classNames(styles.error, error && styles.errorVisible, classes && classes.error)}>
          {error ? error.message : ''}
        </div>
      </div>
    );
  }
);
InputField.defaultProps = {
  autoFocus: false,
  visibilityDelay: 0,
  textAlign: 'left' as const
};

export default InputField;
