import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormEntry from '../../../../../presentation-component/ui/form-entry';
import SubmitButton from '../../../../../components/ui/submit-button';
import { validationMessage } from '../../../../../utils/validate';
import { isMobileVersion } from '../../../../../utils/responsive';
import styles from '../style.module.scss';

const VerifyPhoneFormFieldTitle = {
  otp: 'Mã xác thực'
};
const verifyPhoneFormSchema = yup.object().shape({
  otp: yup
    .string()
    .required(({ path }) => validationMessage.required(VerifyPhoneFormFieldTitle[path]))
    .integer(({ path }) => validationMessage.integer(VerifyPhoneFormFieldTitle[path]))
    .min(6, ({ path, min }) => validationMessage.minLength(VerifyPhoneFormFieldTitle[path], min))
    .max(6, ({ path, max }) => validationMessage.maxLength(VerifyPhoneFormFieldTitle[path], max))
});
const VerifyPhoneForm = ({ phoneInput, isVerifyPhoneLoading, handleVerifyPhone }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(verifyPhoneFormSchema)
  });
  const otpEntryProps = {
    title: 'Mã xác thực',
    placeholder: 'Nhập mã xác thực',
    type: 'text',
    name: 'otp',
    required: true,
    autoFocus: false
  };

  return (
    <div className={classNames(styles.modal, isMobileVersion() || styles.modalDesktop)}>
      <form onSubmit={handleSubmit(handleVerifyPhone)}>
        <FormEntry
          {...{
            key: otpEntryProps.name,
            error: errors[otpEntryProps.name],
            ref: register,
            ...otpEntryProps
          }}
        />
        <div className={styles.text}>
          Vui lòng kiểm tra số điện thoại <span className={styles.bold}>{phoneInput.value}</span> và nhập mã xác thực.
        </div>
        <div>
          <SubmitButton
            loading={!!isVerifyPhoneLoading}
            style={{ marginBottom: 0 }}
            onSubmit={handleSubmit(handleVerifyPhone)}
            title={'Xác nhận'}
            color={'black'}
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyPhoneForm;
