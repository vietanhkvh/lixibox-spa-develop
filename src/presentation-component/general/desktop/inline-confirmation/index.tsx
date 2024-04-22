import classNames from 'classnames';

import SubmitButton from '../../../../components/ui/submit-button';
import style from './style.module.scss';

interface Action {
  title: string;
  icon: string;
  onClick: () => any;
}
interface IProps {
  visible: boolean;
  confirmationAction: Action;
  cancelAction: Action;
  promptMessage: string;
  className?: string;
}
/**
 * Usage note: Place the component in a relatively positioned parent
 */
const InlineConfirmation = ({ visible, confirmationAction, cancelAction, promptMessage, className }: IProps) => {
  return (
    <div
      className={classNames(style.inlineConfirmation, visible || style.inlineConfirmationHidden, className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={style.contentContainer}>
        <div className={style.cover} />
        <div className={style.content}>
          <div className={style.promptMessage}>{promptMessage}</div>
          <div className={style.actions}>
            <SubmitButton
              title={confirmationAction.title}
              svgIcon={confirmationAction.icon}
              className={style.action}
              titleClass={style.title}
              svgIconClass={style.icon}
              onSubmit={confirmationAction.onClick}
            />
            <SubmitButton
              title={cancelAction.title}
              svgIcon={cancelAction.icon}
              className={classNames(style.action, style.cancelAction)}
              titleClass={style.title}
              svgIconClass={style.icon}
              onSubmit={cancelAction.onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

InlineConfirmation.defaultProps = {
  visible: false,
  promptMessage: 'Xác nhận?',
  confirmationAction: { title: 'Xóa', icon: 'trash', onClick: () => {} },
  cancelAction: { title: 'Huỷ', icon: 'close', onClick: () => {} },
  className: ''
};

export default InlineConfirmation;
