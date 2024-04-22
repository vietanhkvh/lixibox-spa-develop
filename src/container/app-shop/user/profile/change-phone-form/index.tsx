import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormEntry from '../../../../../presentation-component/ui/form-entry';
import SubmitButton from '../../../../../components/ui/submit-button';
import { validationMessage } from '../../../../../utils/validate';
import { isMobileVersion } from '../../../../../utils/responsive';
import styles from '../style.module.scss';

const ChangePhoneFormFieldTitle = {
  phone: 'Số điện thoại mới'
};
const changePhoneFormSchema = yup.object().shape({
  phone: yup
    .string()
    .required(({ path }) => validationMessage.required(ChangePhoneFormFieldTitle[path]))
    .min(10, ({ path, min }) => validationMessage.minLength(ChangePhoneFormFieldTitle[path], min))
    .max(10, ({ path, max }) => validationMessage.maxLength(ChangePhoneFormFieldTitle[path], max))
    .matches(/0[0-9]{9}/, ({ path }) => validationMessage.pattern(ChangePhoneFormFieldTitle[path]))
});
const ChangePhoneForm = ({ phone, isRequestChangePhoneLoading, handleRequestChangePhone }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(changePhoneFormSchema),
    defaultValues: {
      phone
    }
  });
  const phoneEntryProps = {
    title: 'Số điện thoại',
    placeholder: 'Nhập số điện thoại',
    type: 'phone',
    name: 'phone',
    autoFocus: false,
    required: true
  };

  return (
    <div className={classNames(styles.modal, isMobileVersion() || styles.modalDesktop)}>
      <form onSubmit={handleSubmit(handleRequestChangePhone)}>
        <FormEntry
          {...{
            key: phoneEntryProps.name,
            error: errors[phoneEntryProps.name],
            ref: register,
            ...phoneEntryProps
          }}
        />
        <div className={styles.text}>
          Lixibox sẽ gửi một số điện thoại có chứa mã xác thực đến địa chỉ số điện thoại của bạn.
        </div>
        <div>
          <SubmitButton
            loading={!!isRequestChangePhoneLoading}
            style={{ marginBottom: 0 }}
            onSubmit={handleSubmit(handleRequestChangePhone)}
            title={'Xác nhận'}
            color={'black'}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePhoneForm;
