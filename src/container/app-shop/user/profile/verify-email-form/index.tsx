import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormEntry from '../../../../../presentation-component/ui/form-entry';
import SubmitButton from '../../../../../components/ui/submit-button';
import { validationMessage } from '../../../../../utils/validate';
import { isMobileVersion } from '../../../../../utils/responsive';
import styles from '../style.module.scss';

const VerifyEmailFormFieldTitle = {
  otp: 'Mã xác thực'
};
const verifyEmailFormSchema = yup.object().shape({
  otp: yup
    .string()
    .required(({ path }) => validationMessage.required(VerifyEmailFormFieldTitle[path]))
    .integer(({ path }) => validationMessage.integer(VerifyEmailFormFieldTitle[path]))
    .min(6, ({ path, min }) => validationMessage.minLength(VerifyEmailFormFieldTitle[path], min))
    .max(6, ({ path, max }) => validationMessage.maxLength(VerifyEmailFormFieldTitle[path], max))
});
const VerifyEmailForm = ({ emailInput, isVerifyEmailLoading, handleVerifyEmail }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(verifyEmailFormSchema)
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
      <form onSubmit={handleSubmit(handleVerifyEmail)}>
        <FormEntry
          {...{
            key: otpEntryProps.name,
            error: errors[otpEntryProps.name],
            ref: register,
            ...otpEntryProps
          }}
        />
        <div className={styles.text}>
          Vui lòng kiểm tra email <span className={styles.bold}>{emailInput.value}</span> và nhập mã xác thực.
        </div>
        <div>
          <SubmitButton
            loading={!!isVerifyEmailLoading}
            style={{ marginBottom: 0 }}
            onSubmit={handleSubmit(handleVerifyEmail)}
            title={'Xác nhận'}
            color={'black'}
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
