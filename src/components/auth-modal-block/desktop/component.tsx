import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { usePrevious } from 'utils/hook';
import { storageKey } from 'constants/application/client-storage';
import { AuthView, IProps, InlineNotification } from './model';
import { AUTH_VIEW, InLineNotificationType, ModalCloseRequestReason, ModalCloseTimeoutMs } from './constant';
import View from './view';

/**
 * Operating principle:
 * - Visibility can be controlled by `isOpen` prop
 * - `onClose` callback will be invoked when the modal is closed
 * - `onRequestClose` callback will be invoked when the modal is requested to close
 *   - Trigger scenarios
 *     - Click on overlay
 *     - Escape key press
 *     - Login success
 *     - Signup success
 *     - Password reset success
 *     - Verify success and signed in
 *     - Verify success and signed up
 */
const AuthModalBlock = ({ referrer, isOpen, initialView, onClose, onRequestClose }: IProps) => {
  const visibilityChangeTriggerTimeout = useRef<NodeJS.Timeout>();
  const [currentAuthView, setCurrentAuthView] = useState<{ view: AuthView; state?: { [key: string]: any } }>({
    view: initialView
  });
  const [inLineNotification, setInLineNotification] = useState<InlineNotification>({
    content: '',
    type: InLineNotificationType.SUCCESS
  });

  const wasOpen = usePrevious(isOpen);
  useEffect(() => {
    if (wasOpen && !isOpen) {
      onClose?.();
    }

    // Reset view and state on visibility change
    if (wasOpen !== undefined && wasOpen !== isOpen) {
      if (isOpen) {
        setCurrentAuthView({ view: initialView });
      } else {
        // Wait for modal closing transition effect to finish before resetting view
        visibilityChangeTriggerTimeout.current = setTimeout(() => {
          setCurrentAuthView({ view: initialView });
        }, ModalCloseTimeoutMs);

        // Reset phone number verification state
        localStorage.removeItem(storageKey.SIGNIN_CREDENTIALS_TO_VERIFY);
      }
    }

    return () => {
      if (visibilityChangeTriggerTimeout.current) {
        clearTimeout(visibilityChangeTriggerTimeout.current);
      }
    };
  }, [wasOpen, isOpen, visibilityChangeTriggerTimeout]);

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={ModalCloseTimeoutMs}
      className="modal-desktop"
      overlayClassName={{
        base: 'modal-overlay-desktop',
        afterOpen: 'modal-overlay-desktop--after-open',
        beforeClose: 'modal-overlay-desktop--before-close'
      }}
      contentLabel={'Auth Modal'}
      onRequestClose={() => {
        onRequestClose?.({ reason: ModalCloseRequestReason.OVERLAY_CLICK_OR_ESC_PRESS, origin: currentAuthView.view });
      }}
    >
      <View
        {...{
          currentAuthView,
          setCurrentAuthView,
          referrer,
          inLineNotification,
          setInLineNotification,
          onRequestClose
        }}
      />
    </Modal>
  );
};
AuthModalBlock.defaultProps = {
  initialView: AUTH_VIEW.LOGIN
};

export default AuthModalBlock;
