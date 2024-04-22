import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from 'presentation-component/general/mobile-screen-header';
import { usePrevious } from 'utils/hook';
import { validationMessage } from 'utils/validate';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const FieldTitle = {
  phoneOrEmail: 'Email / Số điện thoại của bạn',
  otp: 'Mã xác thực',
  password: 'Mật khẩu mới',
  passwordconfirmation: 'Lại mật khẩu mới'
};
const getFormSchema = () =>
  yup.object().shape({
    phoneOrEmail: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .phoneOrEmail(({ path }) => validationMessage.phoneOrEmail(FieldTitle[path])),
    otp: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path])),
    password: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(8, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)),
    passwordconfirmation: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(8, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không đúng')
  });

const View = ({ phoneOrEmail, isOtpByPhone, isSubmitButtonLoading, isUpdatedPassword, onSubmit }: ViewProps) => {
  const wasSubmitButtonLoading = usePrevious(isSubmitButtonLoading);
  const { register, errors, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(getFormSchema())
  });
  useEffect(() => {
    wasSubmitButtonLoading && !isSubmitButtonLoading && isUpdatedPassword && reset();
  }, [isSubmitButtonLoading]);
  const formEntries = [
    {
      name: 'phoneOrEmail',
      title: isOtpByPhone ? 'Số điện thoại của bạn' : 'Email của bạn',
      placeholder: isOtpByPhone ? '0341234567' : 'name@gmail.com',
      type: 'text',
      readOnly: true,
      value: phoneOrEmail
    },
    {
      name: 'otp',
      title: 'Mã xác thực',
      placeholder: 'Nhập mã xác thực',
      type: 'text',
      autoComplete: 'false',
      autoFocus: true
    },
    {
      name: 'password',
      title: 'Mật khẩu mới',
      placeholder: 'Nhập mật khẩu mới',
      type: 'password',
      autoComplete: 'new-password'
    },
    {
      name: 'passwordconfirmation',
      title: 'Nhập lại mật khẩu mới',
      placeholder: 'Nhập lại mật khẩu mới',
      type: 'password',
      autoComplete: 'new-password'
    }
  ];

  const btnUpdatePasswordProps = {
    title: 'Hoàn tất',
    color: 'black',
    loading: isSubmitButtonLoading,
    onSubmit: handleSubmit(onSubmit),
    style: { margin: 0 }
  };

  return (
    <div className={styles.container}>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Đổi mật khẩu'} />
      </MobileAutoDisplayHeader>
      <div className={styles.clientArea}>
        <div className={styles.formPasswordUpdate}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formEntries.map((entry) => (
              <FormEntry
                {...{
                  key: entry.name,
                  error: errors[entry.name],
                  ref: register,
                  ...entry
                }}
              />
            ))}
            <input type="submit" className={styles.noDisplay} />
          </form>
        </div>
      </div>
      <div className={styles.bottomPanel}>
        <SubmitButton {...btnUpdatePasswordProps} />
      </div>
    </div>
  );
};

export default View;
