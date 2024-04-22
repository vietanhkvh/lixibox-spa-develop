import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  email: 'Email'
};
const getFormSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .email(({ path }) => validationMessage.email(FieldTitle[path]))
  });

interface MainContainerProps {
  referrer: string;
  isSubmitButtonLoading: boolean;
  handleSubmit: () => void;
  handleInputOnFocus: () => void;
  inLineMessage: string;
  inLineMessageType: string;
}
const MainContainer = ({
  isSubmitButtonLoading,
  handleSubmit: handleFinalizedSubmit,
  handleInputOnFocus,
  inLineMessage,
  inLineMessageType
}: MainContainerProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(getFormSchema())
  });
  const prevErrorMessage = usePrevious(inLineMessage);
  const [errorModalVisible, setErrorModalVisibility] = useState(false);
  useEffect(() => {
    !prevErrorMessage && inLineMessage && setErrorModalVisibility(true);
  }, [inLineMessage]);
  const formEntries = [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'text',
      theme: 'rounded',
      focus: true,
      visibilityDelay: 350,
      classes: { container: styles.inputFieldEmail },
      dataTestId: 'email',
      dataTestErrorId: 'err-email'
    }
  ];

  const buttonSubmitProps = {
    title: 'Tiếp tục',
    loading: isSubmitButtonLoading,
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
