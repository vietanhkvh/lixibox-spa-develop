// TODO: Enable and verify tracking
import { useRef, useState } from 'react';
import classNames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import { generateTestId } from 'utils/test-utils';
import { PAYMENT_PHASES } from 'constants/application/payment';
import ServicesModal from '../../services-modal';
import { ServicesBlockProps } from '../../component';
import { generateServicesBrief } from '../../utils';
import style from './style.module.scss';

const ServicesBlock = ({
  cartStore: {
    cartDetail,
    deliveryConfig: { noteMessage },
    invoice: { info: invoice },
    phaseReadiness: {
      payment: { address: addressReady }
    }
  },
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction
}: ServicesBlockProps) => {
  const [isModalOpen, setModalVisibility] = useState(false);
  const blockRef = useRef<HTMLInputElement | null>(null);
  const isBlockValid = true;

  const servicesBrief = generateServicesBrief({
    cartDetail,
    note: noteMessage,
    invoice
  });

  return (
    <>
      <div
        ref={blockRef}
        className={classNames(
          style.paymentMethodBlock,
          !addressReady && style.paymentMethodBlockCollapsed,
          isBlockValid || style.blockError
        )}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            setPaymentHighlightErrorBlockAction({ blockId: PAYMENT_PHASES.address.id });
            setTimeout(() => {
              resetPaymentHighlightErrorBlockAction();
            }, 1500);
            return;
          }
        }}
        {...generateTestId({ name: 'services-block' })}
      >
        <div
          className={style.header}
          onClick={(event) => {
            if (addressReady) {
              event.stopPropagation();
              setModalVisibility(true);
            }
          }}
        >
          <div className={style.status}>
            <SvgIcon name="receiver" className={style.icon} />
          </div>
          <div className={classNames(style.title, 'lineClamp1')}>KHÁC (XUẤT HOÁ ĐƠN, GÓI QUÀ, GHI CHÚ...)</div>
          {addressReady && <div className={style.action}>Thay đổi</div>}
        </div>
        {addressReady && servicesBrief && <div className={style.brief}>{servicesBrief}</div>}
      </div>
      <ServicesModal
        {...{
          isOpen: isModalOpen,
          onRequestClose: () => setModalVisibility(false)
        }}
      />
    </>
  );
};

export default ServicesBlock;
