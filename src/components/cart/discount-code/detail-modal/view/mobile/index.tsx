import classNames from 'classnames';

import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import DiscountCodeDetail from '../../../../../../components/discount-code/detail';
import { isMobileVersion } from '../../../../../../utils';
import style from './style.module.scss';

interface DiscountCodeDetailModalProps {
  code: string;
  isOpen: boolean;
  isCompact?: boolean;
  toggleVisibility?: (isOpen: boolean) => any;
  onGoBack?: () => any;
}
const DiscountCodeDetailModal = ({
  code,
  isOpen,
  isCompact,
  toggleVisibility,
  onGoBack
}: DiscountCodeDetailModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title="Mã giảm giá"
      leftTitle=""
      leftIcon={'angle-left'}
      rightIcon={'close'}
      fullHeight
      classes={{ header: style.header, clientArea: style.clientArea }}
      className={classNames(
        isMobileVersion() || isCompact ? style.modalContainerMobile : style.modalContainerDesktop,
        isCompact && style.modalContainerCompact
      )}
      testId={{ name: 'discount-code-detail-modal' }}
      onLeftActionClick={() => onGoBack && onGoBack()}
      onRightActionClick={() => toggleVisibility && toggleVisibility(false)}
      onRequestClose={() => toggleVisibility && toggleVisibility(false)}
    >
      <div className={style.redeemDiscountCodeModal}>
        <DiscountCodeDetail code={code} isCompact={!!isCompact} />
      </div>
    </GeneralModal>
  );
};

export default DiscountCodeDetailModal;
