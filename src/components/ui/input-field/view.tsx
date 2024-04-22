import classNames from 'classnames';

import { generateTestId } from 'utils/test-utils';
import Icon from '../icon';
import { IProps, IState } from './model';
import STYLE from './style';

export function renderComponent() {
  const {
    title,
    type = 'text',
    name = '',
    id = '',
    readonly,
    placeholder,
    style,
    inputStyle,
    isUpperCase,
    isRoundedStyle,
    isBigRoundedStyle,
    textAlign,
    icon = '',
    autoFocus,
    autoComplete: _autoComplete,
    preventTitleOnInput,
    handleRef,
    roundedStyle,
    className,
    testId,
    minValue,
    maxValue
  } = this.props as IProps;
  const { value, isFocus, isValid, errorMessage } = this.state as IState;

  const containerStyle = Object.assign({}, STYLE.container, readonly && { pointerEvents: 'none' }, style);

  const titleStyle = Object.assign(
    {},
    STYLE.title,
    false === isFocus && '' === value && !preventTitleOnInput && STYLE.title.onInput,
    false === isValid && STYLE.title.error
  );

  const combinedName = !!name && !!name.length ? name : id;
  const autoComplete = typeof _autoComplete === 'string' ? _autoComplete : _autoComplete ? 'on' : 'off';

  let inputProps = Object.assign(
    {},
    {
      autoFocus,
      placeholder,
      readOnly: readonly,
      style: Object.assign(
        {},
        STYLE.main.input,
        isRoundedStyle && Object.assign({}, STYLE.main.inputRounded, roundedStyle),
        isBigRoundedStyle && Object.assign({}, STYLE.main.inputBigRounded, roundedStyle),

        '' !== icon && STYLE.main.inputWithIcon,
        { textAlign },
        inputStyle
      ),
      type: type.toLowerCase(),
      name: combinedName.toLowerCase(),
      autoComplete,
      value: true === isUpperCase && value ? value.toUpperCase() : value,
      onKeyUp: this.handleKeyUp.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this)
    },
    minValue !== null && { min: minValue },
    maxValue !== null && { max: maxValue },
    testId && generateTestId(testId)
  );

  if (!!handleRef) {
    inputProps = Object.assign({}, inputProps, { ref: (ref) => handleRef(ref) });
  }

  const lineStyle = Object.assign(
    {},
    STYLE.main.line,
    STYLE.main.line[true === isValid ? 'valid' : 'invalid'],
    (true === isFocus || false === isValid) && STYLE.main.line.focused
  );

  const errorStyle = Object.assign({}, STYLE.error, false === isValid && STYLE.error.show);
  const iconProps = {
    name: icon,
    style: STYLE.main.icon,
    innerStyle: Object.assign({}, STYLE.main.icon.inner, STYLE.main.icon[icon] || {})
  };

  return (
    <div className={classNames('input-field', className)} style={containerStyle as any}>
      {!isRoundedStyle && <div style={titleStyle as any}>{title}</div>}

      <div style={STYLE.main}>
        <input {...inputProps} />
        {'' !== icon && <Icon {...iconProps} />}
        {!isRoundedStyle && <div style={lineStyle as any} />}
      </div>

      <div style={errorStyle as any}>{errorMessage}</div>
    </div>
  );
}
