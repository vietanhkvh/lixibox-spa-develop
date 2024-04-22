import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ROUTING_AUTH_FORGOT_PASSWORD } from 'routings/path';
import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import { validationMessage } from 'utils/validate';
import { isMobileVersion } from 'utils/responsive';
import * as VARIABLE from 'style/variable';
import { InLineMessageType } from '../constant';
import MobileConfirmation from 'components/ui/mobile-confirmation';
import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import componentStyles from 'style/component.module.scss';
import styles from './style.module.scss';

const FieldTitle = {
  phoneOrEmail: 'Email / Số điện thoại',
  password: 'Mật khẩu'
};
const getFormSchema = () =>
  yup.object().shape({
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
  referrer: string;
  loginSubmitLoading: boolean;
  handleSubmit: () => void;
  handleInputOnFocus: () => void;
  inLineMessage: string;
  inLineMessageType: string;
  onForgotPassword: (event: { referrer: string }) => void;
}
const MainContainer = ({
  phone,
  referrer,
  loginSubmitLoading,
  handleSubmit: handleFinalizedSubmit,
  handleInputOnFocus,
  inLineMessage,
  inLineMessageType,
  onForgotPassword
}: MainContainerProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { phoneOrEmail: phone || '', password: '' },
    resolver: yupResolver(getFormSchema())
  });
  const prevErrorMessage = usePrevious(inLineMessage);
  const [errorModalVisible, setErrorModalVisibility] = useState(false);
  useEffect(() => {
    !prevErrorMessage && inLineMessage && setErrorModalVisibility(true);
  }, [inLineMessage]);
  const formEntries = [
    {
      name: 'phoneOrEmail',
      placeholder: 'Email / Số điện thoại',
      type: 'text',
      theme: 'rounded',
      readOnly: loginSubmitLoading,
      focus: true,
      visibilityDelay: 350,
      classes: { container: styles.inputFieldEmail },
      dataTestId: 'phone-or-email',
      dataTestErrorId: 'err-phone-or-email'
    },
    {
      name: 'password',
      placeholder: 'Mật khẩu',
      type: 'password',
      theme: 'rounded',
      readOnly: loginSubmitLoading,
      classes: { container: styles.inputFieldPassword },
      dataTestId: 'password',
      dataTestErrorId: 'err-vuilongnhapmatkhau'
    }
  ];

  const buttonSubmitProps = {
    title: 'Đăng nhập',
    loading: loginSubmitLoading,
    onSubmit: handleSubmit(handleFinalizedSubmit),
    testId: { name: 'loginButton' },
    dataTestId: 'btn-signin'
  };

  const inlineMessageStyle = Object.assign(
    {},
    { lineHeight: '18px', minHeight: 10, opacity: 0 },
    inLineMessage && { minHeight: 28, opacity: 1 },
    isMobileVersion() && { color: VARIABLE.colorWhite }
  );

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFinalizedSubmit)} noValidate>
          {formEntries.map((entry) => (
            <FormEntry
              {...{
                key: entry.name,
                error: errors[entry.name],
                ref: register,
                onFocus: () => handleInputOnFocus(),
                dataTestId: entry.dataTestId,
                dataTestErrorId: entry.dataTestErrorId,
                ...entry,
                classes: Object.assign({}, entry.classes, isMobileVersion() && { error: styles.fieldErrorMobile })
              }}
            />
          ))}
          <input type="submit" className={styles.noDisplay} />
        </form>
        {!isMobileVersion() && (
          <div
            {...generateTestId({ name: 'err-mess' })}
            style={inlineMessageStyle}
            className={
              inLineMessageType === InLineMessageType.ERROR
                ? componentStyles.authBlockErrorMessage
                : componentStyles.authBlockSuccessMessage
            }
          >
            {inLineMessage}
          </div>
        )}
        <SubmitButton {...buttonSubmitProps} />
        <div
          className={
            isMobileVersion()
              ? componentStyles.authBlockRelatedLinkContainerMobile
              : componentStyles.authBlockRelatedLinkContainerDesktop
          }
        >
          <NavLink
            {...generateTestId({ name: 'btn-forgotpwd' })}
            className={
              isMobileVersion()
                ? componentStyles.authBlockRelatedLinkLinkMobile
                : componentStyles.authBlockRelatedLinkLinkDesktop
            }
            to={Object.assign({ pathname: ROUTING_AUTH_FORGOT_PASSWORD }, referrer && { state: { referrer } })}
            onClick={(event) => {
              if (onForgotPassword) {
                onForgotPassword({ referrer });
                event.preventDefault();
              }
            }}
          >
            Quên mật khẩu?
          </NavLink>
        </div>
      </div>
      {isMobileVersion() && (
        <MobileConfirmation
          isOpen={errorModalVisible}
          title={'Thông báo'}
          prompt={inLineMessage}
          confirmationButton={{ text: 'OK', icon: '' }}
          classes={{ container: styles.errorModal, prompt: styles.prompt, button: styles.button }}
          onCancel={() => setErrorModalVisibility(false)}
          onConfirm={() => setErrorModalVisibility(false)}
        />
      )}
    </>
  );
};

export default MainContainer;
