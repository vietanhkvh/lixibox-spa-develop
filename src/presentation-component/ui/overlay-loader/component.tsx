import Modal from 'react-modal';
import classNames from 'classnames';

import Loading from '../../../components/ui/loading';
import style from './style.module.scss';

interface OverlayLoaderProps {
  isVisible: boolean;
  classes?: { container?: string; content?: string; loader?: string };
}
const OverlayLoader = ({ isVisible, classes }: OverlayLoaderProps) => {
  return (
    <Modal
      {...{
        isOpen: isVisible,
        className: classNames(style.overlayLoaderModalContent, classes && classes.content),
        overlayClassName: classNames(style.overlayLoaderModalContainer, classes && classes.container)
      }}
    >
      <Loading classes={{ container: classNames(style.overlayLoader, classes && classes.loader) }} />
    </Modal>
  );
};

export default OverlayLoader;
