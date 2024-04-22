import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { usePrevious } from '../../../../../../../utils/hook';
import { scrollElement } from '../../../../../../../utils/scroll';
import { validationMessage } from '../../../../../../../utils/validate';
import { generateTestId } from 'utils/test-utils';
import { navigationTracking } from '../../../tracking';
import style from './style.module.scss';

const FieldTitle = {
  noteMessage: 'Thông tin ghi chú'
};
const getFormSchema = ({ maxWords }) =>
  yup.object().shape({
    noteMessage: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .maxWords(maxWords, ({ path, maxWords }) => validationMessage.maxWords(FieldTitle[path], maxWords))
  });
interface IProps {
  cartStore: any;
  deliverySetNoteMessage: (data: any) => any;
  setDeliveryNoteReadiness: (readiness: boolean) => any;
}
const DeliveryNoteBlock = ({
  cartStore: {
    deliveryConfig: { noteMessage },
    constants: { delivery_note_words_limit },
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  },
  deliverySetNoteMessage,
  setDeliveryNoteReadiness
}: IProps) => {
  const { register, watch, trigger, formState } = useForm({
    mode: 'onChange',
    defaultValues: { noteMessage: noteMessage },
    resolver: yupResolver(getFormSchema({ maxWords: delivery_note_words_limit }))
  });
  const { errors } = formState;
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const watchNoteMessage = watch('noteMessage');

  useEffect(() => {
    setDeliveryNoteReadiness(isValid());
    if (isValid()) {
      deliverySetNoteMessage({ noteMessage: watchNoteMessage.trim() });
    }
  }, [watchNoteMessage]);

  useEffect(() => {
    setDeliveryNoteReadiness(isValid());
  }, [errors]);

  const [expanded, setExpanded] = useState(!!noteMessage);
  const prevExpanded = usePrevious(expanded);
  useEffect(() => {
    if (!prevExpanded && expanded) {
      textArea.current.focus();
      scrollElement({ x: 0, y: window.document.body.clientHeight });
    }
  }, [expanded]);
  useEffect(() => {
    setDeliveryNoteReadiness(true);
    return () => setDeliveryNoteReadiness(true);
  }, []);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryNote.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.deliveryNote.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isValid = () => !Object.keys(errors).length;
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryNote.id;

  return (
    <>
      <div
        id={PAYMENT_PHASES.deliveryNote.id}
        className={classNames(
          style.deliveryNoteBlock,
          expanded && style.deliveryNoteBlockExpanded,
          isBlockValid || style.blockError
        )}
        ref={blockRef}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
          }
          if (!expanded) {
            trigger().then(() => {
              setDeliveryNoteReadiness(isValid());
              setExpanded(true);
              navigationTracking('block', 'Note');
            });
          }
        }}
        {...generateTestId({ name: 'delivery-note-block' })}
      >
        <div className={style.primarySection}>
          <div
            className={style.header}
            onClick={(e) => {
              if (expanded) {
                e.stopPropagation();
                setDeliveryNoteReadiness(true);
                deliverySetNoteMessage({ noteMessage: '' });
                setExpanded(false);
              }
            }}
          >
            <div className={style.status}>
              <SvgIcon name={expanded ? 'checkbox-checked' : 'checkbox-empty'} className={style.icon} />
            </div>
            <div className={style.title}>GHI CHÚ ĐƠN HÀNG</div>
          </div>
        </div>

        <div className={classNames(style.detailSection, errors.noteMessage && style.detailSectionWithError)}>
          <textarea
            name={'noteMessage'}
            className={classNames(style.entry, errors.noteMessage && style.entryError)}
            rows={5}
            placeholder="Nhập thông tin ghi chú, tối đa 75 từ..."
            ref={(ref) => {
              register(ref);
              textArea.current = ref;
            }}
          />
          {errors.noteMessage && <div className={style.errorMessage}>{errors.noteMessage.message}</div>}
        </div>
      </div>
    </>
  );
};

export default DeliveryNoteBlock;
