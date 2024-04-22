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
  fullname: 'Họ và tên',
  phoneOrEmail: 'Email / Số điện thoại',
  password: 'Mật khẩu'
};
const getFormSchema = () =>
  yup.object().shape({
    fullname: yup
      .string()
      .trim()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      // .matches(/(.+[ ]+)+.+/, ({ path }) => validationMessage.pattern(FieldTitle[path])) // FIXME: Apply "min 2 words" validation and sync with mobile
      .min(5, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)), // FIXME: Validation not unified with other forms
    phoneOrEmail: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .phoneOrEmail(({ path }) => validationMessage.phoneOrEmail(FieldTitle[path])),
    password: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .min(8, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
  });

interface MainContainerProps {
  phone?: string;
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
    defaultValues: { fullname: '', phoneOrEmail: phone || '', password: '' },
    resolver: yupResolver(getFormSchema())
  });
  const formEntries = [
    {
      name: 'fullname',
      placeholder: 'Họ và tên',
      type: 'text',
      theme: 'rounded',
      readOnly: submitLoading,
      focus: true,
      classes: { container: styles.inputField },
      dataTestId: 'vuilongnhaphovaten',
      dataTestErrorId: 'err-vuilongnhaphovaten'
    },
    {
      name: 'phoneOrEmail',
      placeholder: 'Email / Số điện thoại',
      type: 'text',
      theme: 'rounded',
      readOnly: submitLoading,
      classes: { container: styles.inputField },
      dataTestId: 'vuilongnhapemail',
      dataTestErrorId: 'err-vuilongnhapemail'
    },
    {
      name: 'password',
      placeholder: 'Mật khẩu',
      type: 'password',
      theme: 'rounded',
      readOnly: submitLoading,
      classes: { container: styles.inputField },
      dataTestId: 'vuilongnhapmatkhau',
      dataTestErrorId: 'err-vuilongnhapmatkhau'
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
            title: 'Tạo Tài khoản',
            loading: submitLoading,
            onSubmit: handleSubmit(handleFinalizedSubmit),
            testId: { name: 'signupButton' },
            style: { marginTop: 0 },
            dataTestId: 'btn-create-new-acc'
          }}
        />
        <input type="submit" className={styles.noDisplay} />
      </form>
    </div>
  );
};

export default MainContainer;
