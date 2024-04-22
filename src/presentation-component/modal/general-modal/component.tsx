/* eslint react-hooks/rules-of-hooks: 0 */
// TODO: Refactor component and enable eslint rule

/**
 * TODO: Refactor
 *
 * TODO_ID: 200723-MODAL_STATE_PERSISTENCE
 *
 * Refactor notes:
 * - Add selective persistence support for Redux
 * - Utilize Redux instead of sessionStorage
 */

import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

import SvgIcon from '../../ui/icon';
import { enableDocumentScroll, disableDocumentScroll } from '../../../utils/scroll';
import { isMobileVersion } from '../../../utils/responsive';
import { usePrevious } from '../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import styles from './style.module.css';
// TODO: Refactor - Remove global styles
import './modal.css';

const HeadingAction = ({ title, icon, style, onClick, titleStyle }) => {
  return (
    <div className={style} onClick={onClick}>
      {!!icon && !!icon.length && <HeadingIcon icon={icon} />}
      {!!title && !!title.length && !icon && (
        <div className={classnames(styles.headingActionText, titleStyle)}>{title} </div>
      )}
    </div>
  );
};

const HeadingIcon = ({ icon }) => {
  const iconProps = {
    name: icon,
    className: styles.headingActionIcon
  };

  return <SvgIcon {...iconProps} />;
};

export const Heading = ({
  title = '',
  leftIcon = '',
  rightIcon = '',
  leftTitle = '',
  rightTitle = '',
  className = '',
  headingTitleClassName = '',
  leftTitleClassName = '',
  rightTitleClassName = '',
  onLeftActionClick = () => {},
  onRightActionClick = () => {},
  withoutBorder = false
}) => {
  if (!title || !title.length) return null;

  const leftAction = {
    title: leftTitle,
    icon: leftIcon,
    style: styles.leftHeadingAction,
    titleStyle: leftTitleClassName,
    onClick: onLeftActionClick
  };

  const rightAction = {
    title: rightTitle,
    icon: rightIcon,
    style: styles.rightHeadingAction,
    titleStyle: rightTitleClassName,
    onClick: onRightActionClick
  };

  return (
    <div
      className={classnames(
        styles.heading,
        { [styles.withoutBorder]: !!withoutBorder || !isMobileVersion() },
        className
      )}
    >
      <HeadingAction {...leftAction} />
      <div className={classnames(styles.headingTitle, headingTitleClassName)}>{title}</div>
      <HeadingAction {...rightAction} />
    </div>
  );
};

const Content = ({ children, className = '', isShowHeading }) => {
  return (
    <div className={classnames(styles.content, !isShowHeading && styles.contentNoHeader, className)}>{children}</div>
  );
};

interface GeneralModalProps {
  testId?: { name: string; id?: string | number };
  classes?: { overlay?: string; header?: string; clientArea?: string };
  [key: string]: any; // TODO: Specify types explicitly
}
const GeneralModal = ({
  isShowHeading = true,
  title = '',
  leftIcon = '',
  rightIcon = 'close',
  leftTitle = '',
  rightTitle = '',
  onLeftActionClick = () => {},
  onRightActionClick = () => {},
  shouldCloseOnLeftActionClick = false,
  shouldCloseOnRightActionClick = false,
  headingTitleClassName = '',
  leftTitleClassName = '',
  rightTitleClassName = '',
  children,
  isOpen = true,
  shouldCloseOnOverlayClick = true,
  className = '',
  classes = {},
  fullHeight = false,
  closeTimeoutMS = 300,
  onRequestClose = () => {},
  appStore = { mobileappWebviewStatus: false },
  isDisableAnimation = false,
  forceResetScrollOnUnmount = false,
  testId = { name: '', id: '' }
}: GeneralModalProps) => {
  const { mobileappWebviewStatus } = appStore;
  if (!!mobileappWebviewStatus) return null;
  const _classes: { [key: string]: string } = classes || {};

  const wasOpen = usePrevious(isOpen);

  useEffect(() => {
    !wasOpen && isOpen && disableDocumentScroll();

    if (wasOpen && !isOpen) {
      const activeModalCount = document.getElementsByClassName('generalModalOverlay').length;
      activeModalCount < 2 && enableDocumentScroll();
    }
  }, [isOpen]);

  useEffect(
    () => () => {
      forceResetScrollOnUnmount && enableDocumentScroll();
    },
    []
  );

  // const [isOpenModal, setOpenModal] = useState(!!isOpen);
  const headingProps = {
    title,
    leftIcon,
    rightIcon,
    leftTitle,
    rightTitle,
    className: _classes.header,
    headingTitleClassName,
    leftTitleClassName,
    rightTitleClassName,
    onLeftActionClick: () => {
      onLeftActionClick();
      !!shouldCloseOnLeftActionClick && onRequestClose();
    },
    onRightActionClick: () => {
      onRightActionClick();
      !!shouldCloseOnRightActionClick && onRequestClose();
    }
  };

  // NOTE: 'generalModalOverlay' is used as an unique identifier for GeneralModal. Scroll lock feature might break if removed
  const desktopModalProps = {
    overlayClassName: {
      base: classnames('generalModalOverlay', 'modal-overlay-desktop', _classes.overlay),
      afterOpen: 'modal-overlay-desktop--after-open',
      beforeClose: 'modal-overlay-desktop--before-close'
    },
    className: classnames('modal-desktop', 'generalModalDesktopContent')
  };
  const mobileModalProps = {
    overlayClassName: {
      base: classnames('generalModalOverlay', 'modal-overlay-mobile', _classes.overlay),
      afterOpen: 'modal-overlay-mobile--after-open',
      beforeClose: 'modal-overlay-mobile--before-close'
    },
    className: classnames('modal-mobile', 'generalModalMobileContent')
  };

  const modalProps = Object.assign(
    {
      isOpen,
      closeTimeoutMS: closeTimeoutMS,
      shouldCloseOnOverlayClick: !!shouldCloseOnOverlayClick,
      shouldCloseOnEsc: true,
      onRequestClose: onRequestClose
    },
    isMobileVersion() ? mobileModalProps : desktopModalProps,
    !!isDisableAnimation && { style: { content: { transition: 'none' }, overlay: { transition: 'none' } } }
  );

  return (
    <ReactModal {...modalProps}>
      <div
        className={classnames(
          styles.container,
          { [styles.containerFullHeight]: isOpen && fullHeight && isMobileVersion() },
          className
        )}
        {...generateTestId(testId)}
      >
        {!!isShowHeading && <Heading {...headingProps} />}
        <Content className={classnames(_classes.clientArea)} isShowHeading={isShowHeading}>
          {children}
        </Content>
      </div>
    </ReactModal>
  );
};

export default GeneralModal;
