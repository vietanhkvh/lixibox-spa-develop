import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GeneralModal from 'presentation-component/modal/general-modal';
import StickyActionButton from 'components/ui/sticky-action-button';
import { validationMessage } from 'utils/validate';
import FormEntry from 'presentation-component/ui/form-entry';
import style from './style.module.scss';

const FieldTitle = {
  phone: 'số điện thoại'
};
const getFormSchema = () =>
  yup.object().shape({
    phone: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(10, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .max(10, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
      .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(FieldTitle[path]))
  });
interface BuyerPhoneFormModalProps {
  initialValue: string;
  isOpen: boolean;
  onSubmit: (data: any) => any;
  onRequestClose: () => any;
}
const BuyerPhoneFormModal = ({ isOpen, initialValue, onSubmit, onRequestClose }: BuyerPhoneFormModalProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { phone: initialValue },
    resolver: yupResolver(getFormSchema()),
    shouldUnregister: false
  });

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title="Thông tin người mua"
        leftTitle=""
        rightIcon={'close'}
        className={style.buyerPhoneFormModal}
        testId={{ name: 'buyer-phone-form-modal' }}
        onLeftActionClick={() => onRequestClose()}
        onRightActionClick={() => onRequestClose()}
        onRequestClose={() => onRequestClose()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.body}>
            <FormEntry
              {...{
                name: 'phone',
                title: 'Số điện thoại (nhận thông báo về đơn hàng)',
                placeholder: 'Nhập số điện thoại người mua',
                error: errors.phone,
                select: true,
                required: false,
                autoFocus: true,
                ref: register,
                classes: { container: style.entry }
              }}
            />
          </div>
          <StickyActionButton
            action={{ text: 'Cập nhật' }}
            buttonClass={style.primaryButton}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </GeneralModal>
    </>
  );
};

export default BuyerPhoneFormModal;
