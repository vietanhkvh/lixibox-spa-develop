import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import FormEntry from '../../../../../../../presentation-component/ui/form-entry';
import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import { usePrevious } from '../../../../../../../utils/hook';
import { validationMessage } from '../../../../../../../utils/validate';
import { debounceEvent } from '../../../../../../../utils/rate-limiter';
import { generateTestId } from 'utils/test-utils';
import { navigationTracking } from '../../../tracking';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

const formEntries = [
  {
    name: 'code',
    title: 'Mã số thuế',
    placeholder: 'Nhập mã số thuế',
    autoComplete: 'off',
    type: 'text',
    required: true
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

interface IProps extends PropsFromRedux {}

const InvoiceBlock = ({
  cartStore: {
    cartDetail: { invoice_requested },
    invoice: { info: invoice, loaded: invoiceLoaded },
    taxCode: { index: taxCodeIndex, adding: taxCodeAdding, errored: taxCodeErrored },
    phaseReadiness: {
      payment: { address: addressReady, invoice: invoiceReady }
    },
    paymentHighlightErrorBlock
  },
  authStore: { profile },
  fetchCartInvoiceAction,
  fetchRecentInvoiceAction,
  updateInvoiceAction,
  deleteInvoiceAction,
  fetchTaxCodeDetail,
  setInvoiceReadiness
}: IProps) => {
  const { register, errors, getValues, setValue, formState, trigger, watch } = useForm({
    mode: 'onChange',
    defaultValues: { code: invoice.code, name: invoice.name, address: invoice.address, email: invoice.email },
    resolver: yupResolver(getFormSchema())
  });
  const previousTaxCodeIndex = usePrevious(taxCodeIndex);
  const prevTaxCodeAdding = usePrevious(taxCodeAdding);
  useEffect(() => {
    invoice_requested ? fetchCartInvoiceAction() : fetchRecentInvoiceAction();
    return () => {
      setInvoiceReadiness(true);
    };
  }, []);
  const [invoiceRequestedState, setInvoiceRequestedState] = useState(invoice_requested);
  const { code: watchCode, name: watchName, address: watchAddress, email: watchEmail } = watch();
  useEffect(() => {
    invoiceRequestedState &&
      isFormValid() &&
      debounceEvent()(() => {
        updateInvoice();
      })();
  }, [watchCode, watchName, watchAddress, watchEmail]);

  useEffect(() => {
    if (watchCode) {
      debounceEvent()((watchCode) => {
        findTaxCodeAndUpdateForm(watchCode) || fetchTaxCodeDetail(watchCode);
      })(watchCode);
    }
  }, [watchCode]);
  useEffect(() => {
    const emailField = getValues('email');
    if (invoiceLoaded && !emailField) {
      const userEmail = profile?.email || '';
      userEmail && !userEmail.match(/@facebook.com$/) && setValue('email', userEmail);
    }
  }, [invoiceLoaded]);
  useEffect(() => {
    if (invoiceRequestedState && prevTaxCodeAdding && !taxCodeAdding && !taxCodeErrored && isFormValid()) {
      updateInvoice();
    }
  }, [taxCodeAdding]);
  useEffect(() => {
    const isValid = isFormValid();
    if (invoiceRequestedState && invoiceReady !== isValid) setInvoiceReadiness(isValid);
  }, [formState]);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.invoice.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.invoice.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.invoice.id;
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
  Array.isArray(previousTaxCodeIndex) &&
    previousTaxCodeIndex.length !== taxCodeIndex.length &&
    findTaxCodeAndUpdateForm();

  const isFormValid = () => !Object.keys(errors).length;
  const updateInvoice = () => updateInvoiceAction(getValues());

  return (
    <>
      <div
        id={PAYMENT_PHASES.invoice.id}
        ref={blockRef}
        className={classNames(
          style.invoiceBlock,
          (!addressReady || !invoiceRequestedState) && style.invoiceBlockCollapsed,
          isBlockValid || style.blockError
        )}
        {...generateTestId({ name: 'invoice-block' })}
      >
        <div
          className={style.header}
          onClick={() => {
            if (!addressReady) {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              return;
            }
            navigationTracking('block', 'Invoice');
            if (invoiceRequestedState) {
              setInvoiceRequestedState(false);
              deleteInvoiceAction();
              setInvoiceReadiness(true);
            } else {
              setInvoiceRequestedState(true);
              trigger();
              isFormValid() && updateInvoice();
            }
          }}
        >
          <div className={style.status}>
            <SvgIcon name={invoiceRequestedState ? 'checkbox-checked' : 'checkbox-empty'} className={style.icon} />
          </div>
          <div className={style.title}>THÔNG TIN XUẤT HOÁ ĐƠN</div>
        </div>
        <form>
          <div className={style.body}>
            <div className={style.form}>
              {formEntries.map((entry) => (
                <FormEntry
                  {...{
                    key: entry.name,
                    classes: { container: style.field },
                    error: errors[entry.name],
                    ref: register,
                    ...entry
                  }}
                />
              ))}
            </div>
            <div className={style.notes}>
              <span>Lưu ý:</span>
              Hóa đơn điện tử sẽ được gửi qua email khi đơn hàng được giao và thanh toán thành công.
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceBlock;
