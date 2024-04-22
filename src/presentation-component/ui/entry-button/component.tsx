import { useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames';

import Loading from '../../../components/ui/loading';
import style from './style.module.scss';

interface IProps {
  title?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  entryDisabled?: boolean;
  loading?: boolean;
  upperCaseOnly?: boolean;
  onChange?: (val: string) => any;
  onSubmit?: (val: string) => any;
  classes?: { container?: string; input?: string; button?: string };
  [key: string]: any;
}

const EntryButton = forwardRef<HTMLInputElement, IProps>(
  (
    {
      title,
      value,
      placeholder,
      disabled,
      entryDisabled,
      loading,
      upperCaseOnly,
      onChange,
      onSubmit,
      classes,
      ...rest
    },
    ref
  ) => {
    const [stateValue, setStateValue] = useState(value);
    const buttonDisabled = disabled || loading;

    useEffect(() => {
      setStateValue(value);
    }, [value]);

    // TODO: Fix `ref` type and add `form` element
    return (
      <div className={classNames(style.entryAction, classes?.container)}>
        <input
          className={classNames(style.entry, upperCaseOnly && style.entryUppercase, classes?.input)}
          placeholder={placeholder}
          ref={ref as any}
          value={stateValue}
          disabled={buttonDisabled || entryDisabled}
          onKeyPress={(e) => {
            const key = e.keyCode || e.which;
            if (key === 13) {
              e.preventDefault();
              onSubmit(stateValue);
            }
          }}
          onChange={(e) => {
            const val = e.target.value;
            setStateValue(val);
            onChange(val);
          }}
          {...rest}
        />
        <button
          className={classNames(style.button, buttonDisabled || style.pointerCursor, classes?.button)}
          disabled={buttonDisabled}
          onClick={() => onSubmit(stateValue)}
        >
          {loading ? (
            <Loading style={{ transform: 'scale(.55)', height: '100%', width: '100%', minWidth: 50, opacity: 0.5 }} />
          ) : (
            title
          )}
        </button>
      </div>
    );
  }
);

EntryButton.defaultProps = {
  title: 'Submit',
  value: '',
  placeholder: '',
  disabled: false,
  loading: false,
  upperCaseOnly: false,
  onChange: () => {},
  onSubmit: () => {}
};

export default EntryButton;
