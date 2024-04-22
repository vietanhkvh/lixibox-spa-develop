import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { mergeStyle } from '../../../utils/responsive';
import { generateTestId } from 'utils/test-utils';

import SvgIcon from '../../../presentation-component/ui/icon';
import Icon from '../icon';
import Loading from '../loading';

import STYLE from './style';
import styles from './style.module.scss';
import { IProps } from './model';

const buttonContent = ({
  loading,
  icon,
  svgIcon,
  svgIconClass,
  iconPosition,
  styleIcon,
  size,
  titleStyle,
  titleClass,
  title,
  color
}) => {
  const iconProps = {
    name: icon,
    style: Object.assign({}, STYLE.icon, 'small' === size && STYLE.smallIcon, styleIcon)
  };

  return (
    <>
      {false === loading && (
        <div className={classNames(styles.content, 'right' === iconPosition && styles.reverseContent)}>
          {svgIcon ? (
            <SvgIcon name={svgIcon} className={classNames(styles.submitIconSVG, svgIconClass)} />
          ) : (
            '' !== icon && <Icon {...iconProps} />
          )}
          <div
            className={titleClass}
            style={mergeStyle(
              STYLE.title,
              STYLE.title[size],
              ('red' === color || 'pink' === color || 'black' === color) && STYLE.title.bold,
              titleStyle
            )}
          >
            {title}
          </div>
        </div>
      )}

      {true === loading && <Loading style={STYLE.iconLoading} />}
      {false === loading && <div className={styles.overlay}></div>}
    </>
  );
};

const renderView = ({ props }) => {
  const {
    disabled,
    title,
    loading,
    style,
    className,
    titleStyle,
    titleClass,
    styleIcon,
    svgIconClass,
    color,
    iconPosition,
    icon,
    svgIcon,
    size,
    testId,
    type,
    link,
    linkTarget,
    onSubmit,
    dataTestId
  } = props as IProps;

  const containerProps = Object.assign(
    {
      style: mergeStyle(STYLE.sizeList[size], STYLE.colorList[color], style),
      onClick: (e) => !disabled && !loading && onSubmit && onSubmit(e),
      className: classNames(
        styles.submitButton,
        styles[`color-${color}`],
        loading && styles.isLoading,
        disabled && styles.isDisabled,
        className
      )
    },
    testId && generateTestId(testId)
  );

  const linkProps = {
    ...containerProps,
    onClick: (event) => disabled && event.preventDefault(),
    to: link || '',
    target: linkTarget
  };

  switch (type) {
    case 'force-link':
      return (
        <a {...generateTestId({ name: dataTestId })} {...linkProps} href={link}>
          {buttonContent({
            loading,
            icon,
            svgIcon,
            svgIconClass,
            iconPosition,
            styleIcon,
            size,
            titleStyle,
            titleClass,
            title,
            color
          })}
        </a>
      );

    case 'link':
      return (
        <NavLink {...generateTestId({ name: dataTestId })} {...linkProps}>
          {buttonContent({
            loading,
            icon,
            svgIcon,
            svgIconClass,
            iconPosition,
            styleIcon,
            size,
            titleStyle,
            titleClass,
            title,
            color
          })}
        </NavLink>
      );

    case 'submit':
      return (
        <div {...generateTestId({ name: dataTestId })} {...containerProps}>
          {' '}
          {buttonContent({
            loading,
            icon,
            svgIcon,
            svgIconClass,
            iconPosition,
            styleIcon,
            size,
            titleStyle,
            titleClass,
            title,
            color
          })}{' '}
        </div>
      );

    default:
      return null;
  }
};

export default renderView;
