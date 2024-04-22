import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SubmitButton from 'components/ui/submit-button';
import FormEntry from 'presentation-component/ui/form-entry';
import { usePrevious } from 'utils/hook';
import { validationMessage } from 'utils/validate';
import { switchResolver } from 'utils/hook-form';
import { ViewMode, ViewModeType, ViewProps } from '../../component';
import styles from './style.module.scss';

const FieldTitle = {
  email: 'Email',
  phone: 'Số điện thoại'
};
const generateFormSchema = (viewMode: ViewModeType) => {
  return yup.object().shape(
    Object.assign(
      {},
      viewMode === ViewMode.VERIFY_PHONE && {
        phone: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .min(10, ({ path, min }) => validationMessage.minLength(FieldTitle[path], min))
          .max(10, ({ path, max }) => validationMessage.maxLength(FieldTitle[path], max))
          .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(FieldTitle[path]))
      },
      viewMode === ViewMode.VERIFY_EMAIL && {
        email: yup
          .string()
          .required(({ path }) => validationMessage.required(FieldTitle[path]))
          .email(({ path }) => validationMessage.email(FieldTitle[path]))
      }
    )
  );
};

const View = ({
  phone,
  email,
  emailVerificationLink,
  viewMode,
  isEmailVerified,
  isPhoneVerified,
  isSubmitButtonLoading,
  onSubmit
}: ViewProps) => {
  const prevViewMode = usePrevious(viewMode);
  const wasSubmitButtonLoading = usePrevious(isSubmitButtonLoading);
  const { register, errors, setValue, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues:
      viewMode === ViewMode.VERIFY_EMAIL
        ? { email: isEmailVerified ? '' : email }
        : viewMode === ViewMode.VERIFY_PHONE
        ? { phone: isPhoneVerified ? '' : phone }
        : {},
    context: { resolverSwitch: viewMode },
    resolver: switchResolver(generateFormSchema)
  });
  useEffect(() => {
    wasSubmitButtonLoading && !isSubmitButtonLoading && reset();
  }, [isSubmitButtonLoading]);
  useEffect(() => {
    prevViewMode !== viewMode && reset();
  }, [viewMode]);
  useEffect(() => {
    viewMode === ViewMode.VERIFY_EMAIL && setTimeout(() => setValue('email', email), 0);
    viewMode === ViewMode.VERIFY_PHONE && setTimeout(() => setValue('phone', phone), 0);
  }, [viewMode, phone, email]);
  const formEntries =
    viewMode === ViewMode.VERIFY_EMAIL
      ? [
          {
            name: 'email',
            title: 'Email của bạn',
            placeholder: 'Nhập email của bạn',
            type: 'email',
            required: true,
            autoFocus: true,
            readOnly: isSubmitButtonLoading
          }
        ]
      : viewMode === ViewMode.VERIFY_PHONE
      ? [
          {
            name: 'phone',
            title: 'Số điện thoại của bạn',
            placeholder: 'Nhập số điện thoại của bạn',
            type: 'tel',
            required: true,
            autoFocus: true,
            readOnly: isSubmitButtonLoading
          }
        ]
      : [{}];
  const btnVerifyUserProps = {
    title: viewMode === ViewMode.VERIFIED ? 'Gửi yêu cầu' : 'Tiếp tục',
    color: 'black',
    loading: isSubmitButtonLoading,
    onSubmit: viewMode === ViewMode.VERIFIED ? onSubmit : handleSubmit(onSubmit),
    style: { margin: 0 }
  };

  return (
    viewMode && (
      <div className={styles.container}>
        <div className={styles.desktopHeading}>Thay đổi mật khẩu</div>
        <div className={styles.clientArea}>
          {viewMode === ViewMode.VERIFIED ? (
            <>
              <div className={styles.emailVerifiedMessage}>
                Lixibox sẽ gửi một email có chứa mã xác thực đến địa chỉ email của bạn: <span>{email}</span>
              </div>
              <div className={styles.emailChangePrompt}>
                Bạn muốn sử dụng email khác?{' '}
                <NavLink className={styles.link} to={emailVerificationLink}>
                  Thay đổi email
                </NavLink>
              </div>
            </>
          ) : viewMode === ViewMode.VERIFY_EMAIL ? (
            <>
              {!isEmailVerified && (
                <div className={styles.emailVerificationWarning}>
                  Địa chỉ email của bạn chưa được xác thực. Hãy xác nhận lại email trước khi tiến hành đổi mật khẩu.
                </div>
              )}
              <div className={styles.formEmailVerification}>
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
                  <div className={styles.emailVerificationInstruction}>
                    Lixibox sẽ gửi một email có chứa mã xác thực đến địa chỉ email của bạn. Địa chỉ email này sẽ được
                    cập nhật vào tài khoản của bạn sau khi xác thực thành công.
                  </div>
                  <input type="submit" className={styles.noDisplay} />
                </form>
              </div>
            </>
          ) : (
            // ViewMode.VERIFY_PHONE
            <>
              {!isPhoneVerified && (
                <div className={styles.emailVerificationWarning}>
                  Số điện thoại của bạn chưa được xác thực. Hãy xác nhận lại số điện thoại trước khi tiến hành đổi mật
                  khẩu.
                </div>
              )}
              <div className={styles.formEmailVerification}>
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
                  <div className={styles.emailVerificationInstruction}>
                    Lixibox sẽ gửi một tin có chứa mã xác thực đến số điện thoại của bạn. Số điện thoại này sẽ được cập
                    nhật vào tài khoản của bạn sau khi xác thực thành công.
                  </div>
                  <input type="submit" className={styles.noDisplay} />
                </form>
              </div>
            </>
          )}
          <div className={styles.bottomPanel}>
            <SubmitButton {...btnVerifyUserProps} />
          </div>
        </div>
      </div>
    )
  );
};

export default View;
