import classNames from 'classnames';
import { IProps } from './model';
import style from './style.module.scss';

const renderView = (props: IProps) => {
  const {
    subContainer,
    mainContainer,
    type,
    size = 'normal',
    style: customStyle,
    isWithBorderSplit = true,
    className,
    subContainerClassName,
    mainContainerClassName
  } = props;

  return (
    <div className={classNames(style.splitLayout, className)} style={customStyle}>
      {'left' === type && (
        <div
          className={classNames(
            style.leftStyle,
            isWithBorderSplit && style.leftWithoutBorderSplit,
            style[`leftStyle-${size}`],
            subContainerClassName
          )}
        >
          {subContainer}
        </div>
      )}
      <div className={classNames(style.mainStyle, mainContainerClassName, style[`mainStyle-${size}`])}>
        {mainContainer}
      </div>
      {'right' === type && (
        <div
          className={classNames(
            style.rightStyle,
            isWithBorderSplit && style.rightWithoutBorderSplit,
            style[`rightStyle-${size}`],
            subContainerClassName
          )}
        >
          {subContainer}
        </div>
      )}
    </div>
  );
};

export default renderView;
