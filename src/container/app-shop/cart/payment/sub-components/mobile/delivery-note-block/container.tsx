import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GeneralModal from 'presentation-component/modal/general-modal';
import StickyActionButton from 'components/ui/sticky-action-button';
import { PAYMENT_PHASES } from 'constants/application/payment';
import { usePrevious } from 'utils/hook';
import { isMobileVersion } from 'utils';
import SvgIcon from 'presentation-component/ui/icon';
import { validationMessage } from 'utils/validate';
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
      .maxWords(maxWords, ({ path, maxWords }) => validationMessage.maxWords(FieldTitle[path], maxWords))
  });
interface ModalProps {
  currentNote: string;
  isOpen: boolean;
  wordLimit: number;
  onSubmit: (val: string) => any;
  onRequestClose: () => any;
}
// TODO: Display error on max word limit
const DeliveryNoteModal = ({ currentNote, wordLimit, isOpen, onSubmit, onRequestClose }: ModalProps) => {
  const { register, setValue, formState, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { noteMessage: currentNote },
    resolver: yupResolver(getFormSchema({ maxWords: wordLimit })),
    shouldUnregister: false
  });
  const { errors } = formState;
  const noteTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const isValid = () => !Object.keys(errors).length;
  const onClose = () => {
    onRequestClose();
  };
  const onSubmitRequest = ({ noteMessage }) => {
    onSubmit(noteMessage);
    onRequestClose();
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout = null;
    if (isOpen) {
      setValue('noteMessage', currentNote);
      timeoutId = setTimeout(() => {
        if (noteTextAreaRef && noteTextAreaRef.current) {
          noteTextAreaRef.current.focus();
          noteTextAreaRef.current.select();
        }
      });
    }
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [isOpen]);

  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Ghi chú đơn hàng'}
      leftTitle=""
      rightIcon={'close'}
      className={classNames(style.deliveryNoteModal, !isMobileVersion() && style.deliveryNoteModalDesktop)}
      testId={{ name: 'delivery-note-modal' }}
      onRightActionClick={() => onClose()}
      onRequestClose={() => onClose()}
    >
      <form onSubmit={handleSubmit(onSubmitRequest)}>
        <div className={classNames(style.body, isValid() || style.bodyErred)}>
          <div className={style.entryTitle}>Ghi chú cho bộ phận đóng gói và giao hàng</div>
          <textarea
            name={'noteMessage'}
            className={classNames(style.entry, errors.noteMessage && style.entryError)}
            rows={5}
            placeholder="Nhập thông tin ghi chú, tối đa 75 từ..."
            ref={(ref) => {
              noteTextAreaRef.current = ref;
              register(ref);
            }}
            autoFocus
          />
          {errors.noteMessage && <div className={style.errorMessage}>{errors.noteMessage.message}</div>}
        </div>
        <StickyActionButton
          action={{ text: 'Hoàn tất' }}
          buttonClass={style.primaryButton}
          onClick={handleSubmit(onSubmitRequest)}
        />
      </form>
    </GeneralModal>
  );
};

interface IProps {
  cartStore: any;
  deliverySetNoteMessage: (data: any) => any;
}

const DeliveryNoteBlock = ({
  cartStore: {
    constants: { delivery_note_words_limit },
    deliveryConfig: { noteMessage },
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  },
  deliverySetNoteMessage
}: IProps) => {
  const [isModalOpen, setModalVisibility] = useState(false);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryNote.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.deliveryNote.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryNote.id;

  return (
    <>
      <div
        id={PAYMENT_PHASES.deliveryNote.id}
        ref={blockRef}
        className={classNames(style.deliveryNoteBlock, isBlockValid || style.blockError)}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
          }
          navigationTracking('block', 'Note');
          setModalVisibility(true);
        }}
        {...generateTestId({ name: 'delivery-note-block' })}
      >
        <div className={style.header}>
          <div
            className={style.status}
            onClick={(e) => {
              if (noteMessage) {
                e.stopPropagation();
                deliverySetNoteMessage({ noteMessage: '' });
              }
            }}
          >
            <SvgIcon name={noteMessage ? 'checkbox-checked' : 'checkbox-empty'} className={style.icon} />
          </div>
          <div className={style.title}>GHI CHÚ ĐƠN HÀNG</div>
          {noteMessage && <div className={style.action}>Thay đổi</div>}
        </div>

        {noteMessage && <div className={style.preview}>{noteMessage}</div>}
      </div>
      <DeliveryNoteModal
        isOpen={isModalOpen}
        currentNote={noteMessage}
        wordLimit={delivery_note_words_limit}
        onSubmit={(note) => {
          deliverySetNoteMessage({ noteMessage: note.trim() });
        }}
        onRequestClose={() => setModalVisibility(false)}
      />
    </>
  );
};

export default DeliveryNoteBlock;
