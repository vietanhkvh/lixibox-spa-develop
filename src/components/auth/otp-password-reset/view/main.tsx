import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import MobileConfirmation from 'components/ui/mobile-confirmation';
import { validationMessage } from 'utils/validate';
import { usePrevious } from 'utils/hook';
import { isMobileVersion } from 'utils/responsive';
import { switchResolver } from 'utils/hook-form';
import { Phase } from '../model';
import styles from './style.module.scss';

const FieldTitle = {
  phoneOrEmail: 'Email / Số điện thoại',
  otp: 'OTP',
  password: 'Mật khẩu mới',
  passwordconfirmation: 'Xác nhận mật khẩu'
};
const generateFormSchema = (phase: Phase) =>
  yup.object().shape(
    Object.assign(
      {
        phoneOrEmail: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .phoneOrEmail(({ path }) => validationMessage.phoneOrEmail(FieldTitle[path]))
      },
      phase === Phase.OTPRequested && {
        otp: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(6, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .max(6, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max)),
        password: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(8, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min)),
        passwordconfirmation: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(8, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không đúng')
      }
    )
  );

interface MainContainerProps {
  phase: Phase;
  loading: boolean;
  handleSubmit: () => void;
  handleInputOnFocus: () => void;
  errorMessage: string;
}
const MainContainer = ({
  phase,
  loading,
  handleSubmit: handleFinalizedSubmit,
  handleInputOnFocus,
  errorMessage
}: MainContainerProps) => {
  const initialPhase = phase === Phase.Initial;
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    context: { resolverSwitch: phase },
    resolver: switchResolver(generateFormSchema)
  });
  const prevErrorMessage = usePrevious(errorMessage);
  const [errorModalVisible, setErrorModalVisibility] = useState(false);
  useEffect(() => {
    !prevErrorMessage && errorMessage && setErrorModalVisibility(true);
  }, [errorMessage]);
  let formEntries: any = [
    {
      name: 'phoneOrEmail',
      placeholder: 'Email / Số điện thoại',
      type: 'text',
      theme: 'rounded',
      readOnly: loading || phase === Phase.OTPRequested,
      focus: true,
      classes: { container: styles.inputField }
    }
  ];
  initialPhase ||
    formEntries.push(
      ...[
        {
          name: 'otp',
          placeholder: 'Mã xác thực',
          type: 'text',
          theme: 'rounded',
          autoComplete: 'false',
          focus: true,
          classes: { container: styles.inputField }
        },
        {
          name: 'password',
          placeholder: 'Mật khẩu mới',
          type: 'password',
          theme: 'rounded',
          autoComplete: 'new-password',
          classes: { container: styles.inputField }
        },
        {
          name: 'passwordconfirmation',
          placeholder: 'Nhập lại mật khẩu',
          type: 'password',
          theme: 'rounded',
          autoComplete: 'new-password',
          classes: { container: styles.inputField }
        }
      ]
    );

  const buttonSubmitProps = {
    title: initialPhase ? 'Xác nhận' : 'Cập nhật mật khẩu',
    loading: loading,
    onSubmit: handleSubmit(handleFinalizedSubmit),
    testId: { name: 'resetAndUpdatePasswordButton' }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFinalizedSubmit)} noValidate>
        {formEntries.map((entry) => (
          <FormEntry
            {...{
              key: entry.name,
              error: errors[entry.name],
              ref: register,
              onFocus: () => handleInputOnFocus(),
              ...entry,
              classes: Object.assign({}, entry.classes, isMobileVersion() && { error: styles.fieldErrorMobile })
            }}
          />
        ))}
        {!isMobileVersion() && !!errorMessage && (
          <div className={classNames('inline-message', errorMessage && 'inline-message-visible')}>{errorMessage}</div>
        )}
        <SubmitButton {...buttonSubmitProps} />
        <input type="submit" className={styles.noDisplay} />
      </form>
      {isMobileVersion() && (
        <MobileConfirmation
          isOpen={errorModalVisible}
          title={'Thông báo'}
          prompt={errorMessage}
          confirmationButton={{ text: 'OK', icon: '' }}
          classes={{ container: styles.errorModal, prompt: styles.prompt, button: styles.button }}
          onCancel={() => setErrorModalVisibility(false)}
          onConfirm={() => setErrorModalVisibility(false)}
        />
      )}
    </div>
  );
};

export default MainContainer;
