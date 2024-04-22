import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames';

import GeneralModal from 'presentation-component/modal/general-modal';
import StickyActionButton from 'components/ui/sticky-action-button';
import FormEntry from 'presentation-component/ui/form-entry';
import { validationMessage } from 'utils/validate';
import { debounceEvent } from 'utils/rate-limiter';
import { usePrevious } from 'utils/hook';
import { isMobileVersion } from 'utils';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

const formEntries = [
  {
    name: 'code',
    title: 'Mã số thuế',
    placeholder: 'Nhập mã số thuế',
    autoComplete: 'off',
    type: 'text',
    required: true,
    focus: true,
    select: true,
    autoFocus: true
  },
  {
    name: 'name',
    title: 'Tên công ty',
    placeholder: 'Nhập tên công ty',
    required: true,
    type: 'text'
  },
  {
    name: 'address',
    title: 'Địa chỉ',
    placeholder: 'Nhập địa chỉ công ty',
    required: true,
    type: 'text'
  },
  {
    name: 'email',
    title: 'Email',
    placeholder: 'Nhập email nhận hóa đơn',
    required: true,
    type: 'email'
  }
];

const FieldTitle = {
  code: 'Mã số thuế',
  name: 'Tên công ty',
  address: 'Địa chỉ',
  email: 'Email'
};
const getFormSchema = () =>
  yup.object().shape({
    code: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path])),
    name: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(3, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)),
    address: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(5, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)),
    email: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .email(({ path }) => validationMessage.email(FieldTitle[path]))
  });
interface InvoiceFormModalProps extends PropsFromRedux {
  isOpen: boolean;
  onSubmit: (data: any) => any;
  onRequestClose: () => any;
}
const InvoiceFormModal = ({
  authStore: { profile },
  cartStore: {
    invoice: { info: invoice, loaded: invoiceLoaded },
    taxCode: { index: taxCodeIndex }
  },
  fetchTaxCodeDetail,
  isOpen,
  onSubmit,
  onRequestClose
}: InvoiceFormModalProps) => {
  const { register, errors, getValues, setValue, watch, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(getFormSchema()),
    shouldUnregister: false
  });

  const watchCode = watch('code', '');
  const previousTaxCodeIndex = usePrevious(taxCodeIndex);

  useEffect(() => {
    if (isOpen && invoiceLoaded) {
      setValue('code', invoice.code);
      setValue('name', invoice.name);
      setValue('address', invoice.address);
      if (!invoice.email) {
        const userEmail = profile?.email || '';
        userEmail && !userEmail.match(/@facebook.com$/) && setValue('email', userEmail);
      } else {
        setValue('email', invoice.email);
      }
    }
  }, [isOpen]);

  const findTaxCodeAndUpdateForm = (newCode?: string) => {
    const currentCode = newCode ? newCode : getValues('code');
    const currentName = getValues('name');
    const currentAddress = getValues('address');
    const currentCodeDetail = taxCodeIndex.find((entry) => entry.code === currentCode);
    if (currentCodeDetail && (currentName !== currentCodeDetail.name || currentAddress !== currentCodeDetail.address)) {
      setValue('name', currentCodeDetail.name);
      setValue('address', currentCodeDetail.address);
    }
    return !!currentCodeDetail;
  };

  useEffect(() => {
    if (watchCode) {
      debounceEvent()((watchCode) => {
        findTaxCodeAndUpdateForm(watchCode) || fetchTaxCodeDetail(watchCode);
      })(watchCode);
    }
  }, [watchCode]);

  const onClose = () => {
    reset();
    onRequestClose();
  };

  Array.isArray(previousTaxCodeIndex) &&
    previousTaxCodeIndex.length !== taxCodeIndex.length &&
    findTaxCodeAndUpdateForm();

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title="Thông tin xuất hóa đơn"
        leftTitle=""
        rightIcon={'close'}
        className={classNames(style.invoiceFormModal, !isMobileVersion() && style.invoiceFormModalDesktop)}
        testId={{ name: 'invoice-form-modal' }}
        onLeftActionClick={onClose}
        onRightActionClick={onClose}
        onRequestClose={onClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.body}>
            {formEntries.map((entry) => (
              <FormEntry
                {...{
                  key: entry.name,
                  classes: { container: style.entry },
                  error: errors[entry.name],
                  ref: register,
                  ...entry
                }}
              />
            ))}
            <div className={style.notes}>
              <div>Lưu ý:</div>
              Hóa đơn điện tử sẽ được gửi qua email khi đơn hàng được giao và thanh toán thành công.
            </div>
          </div>
          <StickyActionButton
            action={{ text: 'Hoàn tất' }}
            buttonClass={style.primaryButton}
            onClick={handleSubmit(onSubmit)}
          />
          <input type="submit" className={style.noDisplay} />
        </form>
      </GeneralModal>
    </>
  );
};

export default InvoiceFormModal;
