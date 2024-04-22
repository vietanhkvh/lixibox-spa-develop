import { useState, useEffect, MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames';

import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import { validationMessage } from 'utils/validate';
import { isMobileVersion } from 'utils/responsive';
import * as VARIABLE from 'style/variable';
import { InLineMessageType } from '../constant';
import MobileConfirmation from 'components/ui/mobile-confirmation';
import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import { ROUTING_AUTH_ATTACH_PHONE_STEP_1 } from 'routings/path';
import { SubmitButtonState } from '../model';
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
  phone?: string;
  referrer: string;
  submitButtonState: SubmitButtonState;
  handleSubmit: () => void;
  handleInputOnFocus: () => void;
  isSetToRetry?: MutableRefObject<boolean>;
  onRetry?: (event: { referrer: string }) => void;
  inLineMessage: string;
  inLineMessageType: string;
}
const MainContainer = ({
  phone,
  referrer,
  submitButtonState,
  handleSubmit: handleFinalizedSubmit,
  handleInputOnFocus,
  isSetToRetry,
  onRetry,
  inLineMessage,
  inLineMessageType
}: MainContainerProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { phone: phone || '', otp: '' },
    resolver: yupResolver(getFormSchema())
  });
  const prevErrorMessage = usePrevious(inLineMessage);
  const [errorModalVisible, setErrorModalVisibility] = useState(false);
  useEffect(() => {
    !prevErrorMessage && inLineMessage && setErrorModalVisibility(true);
  }, [inLineMessage]);
  const formEntries = [
    {
      name: 'phone',
      placeholder: 'Số điện thoại',
      type: 'text',
      theme: 'rounded',
      readOnly: true,
      visibilityDelay: 350,
      classes: { container: styles.inputFieldEmail },
      dataTestId: 'phone',
      dataTestErrorId: 'err-phone'
    },
    {
      name: 'otp',
      placeholder: 'Mã xác thực',
      type: 'text',
      theme: 'rounded',
      readOnly: submitButtonState.disabled,
      focus: true,
      classes: { container: styles.inputFieldPassword },
      dataTestId: 'otp',
      dataTestErrorId: 'err-otp'
    }
  ];

  const buttonSubmitProps = {
    title: 'Xác thực và Đăng nhập',
    loading: submitButtonState.loading,
    disabled: submitButtonState.disabled,
    onSubmit: handleSubmit(handleFinalizedSubmit),
    testId: { name: 'verifyButton' },
    dataTestId: 'btn-verify'
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
        {!!submitButtonState.disabled && (
          <div className={styles.retryButtonContainer}>
            <NavLink
              to={Object.assign({ pathname: ROUTING_AUTH_ATTACH_PHONE_STEP_1 }, referrer && { state: { referrer } })}
              onClick={(event) => {
                isSetToRetry && (isSetToRetry.current = true);
                if (onRetry) {
                  onRetry({ referrer });
                  event.preventDefault();
                }
              }}
              className={classNames(styles.retryButton, isMobileVersion() && styles.retryButtonMobile)}
            >
              Thử lại
            </NavLink>
          </div>
        )}
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
