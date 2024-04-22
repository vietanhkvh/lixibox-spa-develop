import classNames from 'classnames';

import SubmitButton from '../submit-button';
import style from './style.module.scss';
import STYLE from './style';

const renderInfo = ({ title, content }) => (
  <div className={style.infoSection}>
    <div className={style.title}>{title}</div>
    <div className={style.content}>{content}</div>
  </div>
);

const renderComponent = ({ props }) => {
  const { info, action, className, buttonClass, nonsticky, disabled, loading, onClick, dataTestId, dataTestErrorId } =
    props;

  const buttonProps = {
    title: action.text,
    icon: action.icon,
    loading,
    disabled,
    onSubmit: () => onClick && onClick(),
    style: Object.assign({}, STYLE.button, disabled && STYLE.disabledButton),
    titleStyle: STYLE.button.titleStyle,
    styleIcon: STYLE.button.styleIcon,
    className: buttonClass,
    dataTestId,
    dataTestErrorId
  };

  return (
    <div className={classNames(style.container, className, !nonsticky && style.sticky, 'bottom-fixed-element')}>
      {info && renderInfo(info)}
      <div className={style.actionSection}>
        <SubmitButton {...buttonProps} />
      </div>
    </div>
  );
};

export default renderComponent;
