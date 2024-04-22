import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GeneralModal from '../../../../presentation-component/modal/general-modal';
import FormEntry from '../../../../presentation-component/ui/form-entry';
import StickyActionButton from '../../../../components/ui/sticky-action-button';
import { validationMessage } from '../../../../utils/validate';
import styles from './style.module.scss';

const FieldTitle = {
  quantity: 'Nhập số lượng'
};

const generateFormSchema = ({ min, max }: { min: number; max: number }) =>
  yup.object().shape({
    quantity: yup
      .number()
      .typeError(({ path }) => validationMessage.required(FieldTitle[path]))
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(min, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .max(max, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
  });
const formEntry = {
  name: 'quantity',
  title: 'Nhập số lượng',
  placeholder: 'Nhập số lượng',
  required: true,
  type: 'number',
  autoFocus: true,
  focus: true,
  select: true
};
interface QuantityEditModalProps {
  value: number;
  isOpen: boolean;
  minCartItemQuantity: number;
  maxCartItemQuantity: number;
  onClose: () => any;
  onSubmit: (quantity: number) => any;
}
const QuantityEditModal = ({
  value,
  isOpen,
  minCartItemQuantity,
  maxCartItemQuantity,
  onClose,
  onSubmit
}: QuantityEditModalProps) => {
  const { register, reset, formState, setValue, handleSubmit } = useForm<{ quantity: string }>({
    defaultValues: { quantity: String(value) },
    mode: 'onTouched',
    resolver: yupResolver(generateFormSchema({ min: minCartItemQuantity, max: maxCartItemQuantity })),
    shouldUnregister: false
  });
  useEffect(() => {
    setValue('quantity', value);
  }, [value, isOpen]);
  const { errors } = formState;
  const onCloseRequest = () => {
    onClose();
    reset();
  };
  const onSubmitRequest = ({ quantity }) => {
    onSubmit(Number(quantity));
    reset();
  };

  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Số lượng'}
      leftTitle=""
      rightIcon={'close'}
      className={styles.popupModal}
      onRightActionClick={onCloseRequest}
      onRequestClose={onCloseRequest}
    >
      <form onSubmit={handleSubmit(onSubmitRequest)}>
        <div className={styles.body}>
          <FormEntry
            {...{
              key: formEntry.name,
              error: errors[formEntry.name],
              ref: register,
              classes: { input: styles.input },
              ...formEntry
            }}
          />
        </div>
        <StickyActionButton
          action={{ text: 'Nhập số lượng' }}
          buttonClass={styles.popupButton}
          onClick={handleSubmit(onSubmitRequest)}
        />
      </form>
    </GeneralModal>
  );
};

export default QuantityEditModal;
