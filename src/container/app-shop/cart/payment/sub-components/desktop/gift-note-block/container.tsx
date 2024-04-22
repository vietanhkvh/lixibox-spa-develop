import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import MobileConfirmation from '../../../../../../../components/ui/mobile-confirmation';
import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { formatCurrency } from '../../../../../../../utils/currency';
import { usePrevious } from '../../../../../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import { navigationTracking } from '../../../tracking';
import AddonsModal from './addons-modal';
import style from './style.module.scss';

const CONFIRMATION_TYPE = Object.freeze({
  FETCH_ERROR: 'fetchError',
  DISCARD: 'discard'
});

interface IProps {
  cartStore: any;
}

const GiftNoteBlock = ({
  cartStore: {
    constants: { accompany_services_description },
    cartDetail: { accompanies: _accompanies },
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  }
}: IProps) => {
  const [isPrimaryModalOpen, setPrimaryModalVisibility] = useState(false);
  const [confirmationState, setConfirmationState] = useState({
    type: CONFIRMATION_TYPE.DISCARD,
    visibility: false,
    title: 'Thông báo',
    prompt: '',
    button: { text: '', icon: '' },
    data: {}
  });
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.giftMessage.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.giftMessage.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.giftMessage.id;
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));

  const accompanies = _accompanies || [];
  const hasAccompany = accompanies.length;

  return (
    <>
      <div
        id={PAYMENT_PHASES.giftMessage.id}
        className={classNames(style.giftNoteBlock, isBlockValid || style.blockError)}
        ref={blockRef}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
          }
          navigationTracking('block', 'Gift');
          setPrimaryModalVisibility(true);
        }}
        {...generateTestId({ name: 'gift-note-block' })}
      >
        <div className={style.header} {...generateTestId({ name: 'service-checkout' })}>
          <div className={style.status}>
            <SvgIcon name={'gift'} className={style.icon} />
          </div>
          <div className={style.title}>DỊCH VỤ KÈM THEO</div>
          {addressReady && (
            <div className={style.action}>
              {hasAccompany ? 'Thay đổi' : <SvgIcon name="angle-right" className={style.icon} />}
            </div>
          )}
        </div>
        {addressReady && (
          <div className={style.brief}>
            {hasAccompany ? (
              accompanies.map(({ id, external, fee, linked_object, note }) => (
                <div key={id} className={style.accompany}>
                  <div className={style.header}>
                    {linked_object.name}
                    {fee ? (
                      <span className={style.typePremium}>+{formatCurrency(fee, { suffix: true })}</span>
                    ) : (
                      <span className={style.typeFree}>Miễn phí</span>
                    )}
                  </div>
                  {!!Object.keys(external).length && <div className={style.preview}>Lựa chọn: {external.name}</div>}
                  {note && <div className={style.preview}>{note}</div>}
                </div>
              ))
            ) : (
              <div className={style.hint}>{accompany_services_description || ''}</div>
            )}
          </div>
        )}
      </div>
      <AddonsModal
        isOpen={isPrimaryModalOpen}
        onRequestClose={(errored) => {
          setPrimaryModalVisibility(false);
          errored &&
            updateConfirmationState({
              visibility: true,
              prompt: 'Không có dịch vụ kèm theo nào ở thời điểm hiện tại.',
              button: { text: 'OK', icon: '' },
              data: { id: CONFIRMATION_TYPE.FETCH_ERROR }
            });
        }}
      />
      <MobileConfirmation
        isOpen={confirmationState.visibility}
        title={confirmationState.title}
        prompt={confirmationState.prompt}
        confirmationButton={confirmationState.button}
        classes={{ container: style.errorModal, prompt: style.prompt, button: style.button }}
        testId={{ name: 'gift-note-confirmation-modal' }}
        onCancel={({ id }) => {
          switch (id) {
            case CONFIRMATION_TYPE.DISCARD:
            case CONFIRMATION_TYPE.FETCH_ERROR:
            default:
              updateConfirmationState({ visibility: false });
          }
        }}
        onConfirm={({ id }) => {
          switch (id) {
            case CONFIRMATION_TYPE.DISCARD:
              break;
            case CONFIRMATION_TYPE.FETCH_ERROR:
              updateConfirmationState({ visibility: false });
              break;
            default:
              updateConfirmationState({ visibility: false });
          }
        }}
      />
    </>
  );
};

export default GiftNoteBlock;
