import { useEffect, forwardRef } from 'react';
import classNames from 'classnames';

import { useCombinedRefs } from '../../../utils/hook';
import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface FormEntryProps {
  name: string;
  id?: string;
  title?: string;
  error?: any;
  select?: boolean;
  focus?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  visibilityDelay?: number;
  theme?: 'rounded' | 'underline';
  classes?: { container?: string; input?: string; error?: string };
  dataTestId?: string;
  dataTestErrorId?: string;
}
const FormEntry = forwardRef<HTMLInputElement, any>(
  (
    {
      id,
      name,
      title,
      error,
      select,
      focus,
      required,
      autoFocus,
      theme,
      classes,
      visibilityDelay,
      dataTestId,
      dataTestErrorId,
      ...rest
    }: FormEntryProps,
    ref
  ) => {
    const combinedRef = useCombinedRefs(ref);
    let asyncEventId: any = null;

    useEffect(() => {
      asyncEventId = setTimeout(() => {
        focus && combinedRef && combinedRef.current && combinedRef.current.focus();
        select && combinedRef && combinedRef.current && combinedRef.current.select();
      }, visibilityDelay);

      return () => clearInterval(asyncEventId);
    }, []);
    const isThemeRounded = theme === 'rounded';

    return (
      <div
        className={classNames(style.formEntry, isThemeRounded && style.formEntryRounded, classes && classes.container)}
      >
        {!isThemeRounded && !!title && <div className={style.title}>{`${title}${required ? ` *` : ''}`}</div>}
        <div className={classNames(style.field, error && style.fieldInvalid)}>
          <input
            id={id || name}
            name={name}
            autoFocus={autoFocus}
            ref={combinedRef as any}
            className={classNames(error && style.inputError, classes && classes.input)}
            {...generateTestId({ name: dataTestId })}
            {...rest}
          />
          {isThemeRounded || <div className={classNames(style.divider, error && style.dividerError)} />}
          {error && (
            <div
              {...generateTestId({ name: dataTestErrorId })}
              className={classNames(style.errorMessage, classes && classes.error)}
            >
              {error.message}
            </div>
          )}
        </div>
      </div>
    );
  }
);
FormEntry.defaultProps = {
  autoFocus: false,
  visibilityDelay: 0,
  theme: 'underline'
};

export default FormEntry;
