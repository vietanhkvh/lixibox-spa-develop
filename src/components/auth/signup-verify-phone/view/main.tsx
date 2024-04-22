import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import { validationMessage } from 'utils/validate';
import { isMobileVersion } from 'utils/responsive';
import componentStyles from 'style/component.module.scss';
import styles from './style.module.scss';

const FieldTitle = {
  phone: 'Số điện thoại',
  otp: 'Nhập mã xác thực'
};
const getFormSchema = () =>
  yup.object().shape({
    phone: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(10, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .max(10, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
      .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(FieldTitle[path])),
    otp: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(6, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
      .max(6, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
  });

interface MainContainerProps {
  phone: string;
  submitLoading: boolean;
  handleSubmit: () => void;
  handleFinalizedSubmit?: () => void;
  handleInputOnFocus: () => void;
  errorMessage: string;
}
const MainContainer = ({
  phone,
  submitLoading,
  handleSubmit: handleFinalizedSubmit,
  handleInputOnFocus,
  errorMessage
}: MainContainerProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { phone, otp: '' },
    resolver: yupResolver(getFormSchema())
  });
  const formEntries = [
    {
      name: 'phone',
      placeholder: 'Nhập số điện thoại người nhận',
      type: 'tel',
      theme: 'rounded',
      title: 'Số điện thoại',
      required: true,
      readOnly: true,
      inputMode: 'numeric',
      classes: { container: styles.inputField },
      dataTestId: 'phone-field',
      dataTestErrorId: 'err-phone-field'
    },
    {
      name: 'otp',
      placeholder: 'Nhập mã xác thực',
      type: 'text',
      theme: 'rounded',
      autoComplete: 'false',
      focus: true,
      required: true,
      classes: { container: styles.inputField },
      dataTestId: 'phone-field',
      dataTestErrorId: 'err-phone-field'
    }
  ];

  const errorMessageStyle = Object.assign(
    {},
    { lineHeight: '18px', minHeight: 10, opacity: 0 },
    errorMessage && { minHeight: 28, opacity: 1 }
  );

  return (
    <div>
      <form onSubmit={handleSubmit(handleFinalizedSubmit)} noValidate>
        {formEntries.map((entry) => (
          <FormEntry
            {...{
              key: entry.name,
              error: errors[entry.name],
              ref: register,
              onFocus: () => handleInputOnFocus?.(),
              ...entry,
              classes: Object.assign({}, entry.classes, isMobileVersion() && { error: styles.fieldErrorMobile })
            }}
          />
        ))}
        <div className={componentStyles.authBlockErrorMessage} style={errorMessageStyle}>
          {errorMessage}
        </div>
        <SubmitButton
          {...{
            title: 'Xác minh và Đăng ký',
            loading: submitLoading,
            onSubmit: handleSubmit(handleFinalizedSubmit),
            testId: { name: 'phoneVerifyButton' },
            style: { marginTop: 0 },
            dataTestId: 'btn-phone-verify-button'
          }}
        />
        <input type="submit" className={styles.noDisplay} />
      </form>
    </div>
  );
};

export default MainContainer;
