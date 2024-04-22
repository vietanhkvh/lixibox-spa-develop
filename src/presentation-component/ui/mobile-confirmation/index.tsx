import classNames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import GeneralModal from '../../modal/general-modal';
import SubmitButton from '../submit-button';
import style from './style.module.scss';

interface MobileConfirmationProps {
  title?: string;
  prompt?: string;
  children?: React.ReactNode;
  data?: any;
  closeTimeoutMS: number;
  confirmationButton?: {
    text: string;
    icon?: string;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
  };
  classes?: {
    container?: string;
    prompt?: string;
    children?: string;
    button?: { [key: string]: string };
  };
  isOpen?: boolean;
  onCancel?: (param0?: any) => any;
  onConfirm?: (param0?: any) => any;
}
const MobileConfirmation = ({
  isOpen,
  title,
  prompt,
  confirmationButton,
  data,
  children,
  classes,
  onCancel,
  onConfirm
}: MobileConfirmationProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={title}
      leftTitle=""
      rightIcon={'close'}
      onRightActionClick={() => onCancel && onCancel(data)}
      onRequestClose={() => onCancel && onCancel(data)}
    >
      <div
        className={classNames(
          style.mobileConfirmation,
          isMobileVersion() || style.mobileConfirmationDesktop,
          classes && classes.container
        )}
      >
        {children ? (
          <div className={classNames(style.content, classes && classes.children)}>{children}</div>
        ) : (
          <div className={classNames(style.prompt, classes && classes.prompt)}>{prompt}</div>
        )}
        <div className={style.confirmationButton}>
          <SubmitButton
            {...{
              title: confirmationButton.text,
              icon: { name: confirmationButton.icon },
              color: confirmationButton.color || 'pink',
              loading: !!confirmationButton.loading,
              disabled: !!confirmationButton.disabled,
              classes: classes && classes.button,
              onSubmit: () => {
                onConfirm && onConfirm(data);
              }
            }}
          />
        </div>
      </div>
    </GeneralModal>
  );
};
MobileConfirmation.defaultProps = {
  isOpen: false,
  title: 'Thông báo',
  prompt: '',
  confirmationButton: {
    text: 'Đồng ý',
    icon: '',
    color: 'pink',
    loading: false,
    disabled: false
  },
  closeTimeoutMS: 300,
  data: {}
};

export default MobileConfirmation;
