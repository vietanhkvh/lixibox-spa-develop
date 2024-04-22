import { useState, useRef } from 'react';
import classNames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import { PAYMENT_PHASES } from 'constants/application/payment';
import { generateTestId } from 'utils/test-utils';
import { ServicesBlockProps } from '../../component';
import ServicesModal from '../../services-modal';
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
  const blockRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setModalVisibility] = useState(false);
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
        className={classNames(style.servicesBlock, isBlockValid || style.blockError)}
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
            <SvgIcon name="wallet" className={style.icon} />
          </div>
          <div className={classNames(style.title, 'lineClamp1')}>Khác (gói quà, xuất hoá đơn, ghi chú...)</div>
          {addressReady && (
            <div className={style.action}>
              <SvgIcon name="angle-right" className={style.icon} />
            </div>
          )}
        </div>
        {addressReady && servicesBrief && (
          <div className={style.brief}>
            <div className={classNames(style.preview, 'lineClamp1')}>{servicesBrief}</div>
          </div>
        )}
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
