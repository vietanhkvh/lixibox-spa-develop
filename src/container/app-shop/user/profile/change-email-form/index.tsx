import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormEntry from '../../../../../presentation-component/ui/form-entry';
import SubmitButton from '../../../../../components/ui/submit-button';
import { validationMessage } from '../../../../../utils/validate';
import { isMobileVersion } from '../../../../../utils/responsive';
import styles from '../style.module.scss';

const ChangeEmailFormFieldTitle = {
  email: 'Email mới'
};
const changeEmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .required(({ path }) => validationMessage.required(ChangeEmailFormFieldTitle[path]))
    .email(({ path }) => validationMessage.email(ChangeEmailFormFieldTitle[path]))
});
const ChangeEmailForm = ({ isRequestChangeEmailLoading, handleRequestChangeEmail }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(changeEmailFormSchema)
  });
  const emailEntryProps = {
    title: 'Email',
    placeholder: 'Nhập email',
    type: 'email',
    name: 'email',
    autoFocus: false,
    required: true
  };

  return (
    <div className={classNames(styles.modal, isMobileVersion() || styles.modalDesktop)}>
      <form onSubmit={handleSubmit(handleRequestChangeEmail)}>
        <FormEntry
          {...{
            key: emailEntryProps.name,
            error: errors[emailEntryProps.name],
            ref: register,
            ...emailEntryProps
          }}
        />
        <div className={styles.text}>Lixibox sẽ gửi một email có chứa mã xác thực đến địa chỉ email của bạn.</div>
        <div>
          <SubmitButton
            loading={!!isRequestChangeEmailLoading}
            style={{ marginBottom: 0 }}
            onSubmit={handleSubmit(handleRequestChangeEmail)}
            title={'Xác nhận'}
            color={'black'}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeEmailForm;
