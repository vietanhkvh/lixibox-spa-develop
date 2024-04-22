import classNames from 'classnames';

import SubmitButton from '../submit-button';
import GeneralModal from '../../../presentation-component/modal/general-modal';
import style from './style.module.scss';
import STYLE from './style';

const renderComponent = ({ props }) => {
  const { isOpen, title, prompt, confirmationButton, data, children, classes, testId, onCancel, onConfirm } = props;

  const confirmationButtonProps = {
    title: confirmationButton.text,
    icon: confirmationButton.icon,
    loading: false,
    disabled: false,
    onSubmit: () => {
      onConfirm && onConfirm(data);
    },
    className: classNames(classes.button),
    style: STYLE.confirmationButton,
    titleStyle: STYLE.confirmationButton.titleStyle,
    styleIcon: STYLE.confirmationButton.styleIcon
  };

  return (
    <GeneralModal
      isOpen={isOpen}
      title={title}
      leftTitle=""
      rightIcon={'close'}
      testId={testId}
      onRightActionClick={() => onCancel && onCancel(data)}
      onRequestClose={() => onCancel && onCancel(data)}
    >
      <div className={classNames(style.mobileConfirmation, classes.container)}>
        <div className={classNames(style.prompt, classes.prompt)}>{prompt}</div>
        {children && <div className={style.content}>{children}</div>}
        <div className={style.confirmationButton}>
          <SubmitButton {...confirmationButtonProps} />
        </div>
      </div>
    </GeneralModal>
  );
};

export default renderComponent;
