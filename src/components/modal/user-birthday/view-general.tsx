import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';

import { ROUTING_MEMBERSHIP } from 'routings/path';
import FormEntry from 'presentation-component/ui/form-entry';
import SubmitButton from 'presentation-component/ui/submit-button';
import { convertDateToDDMMYYY, isMobileVersion } from 'utils';
import { validationMessage } from 'utils/validate';

import styles from './style.module.scss';

export const InputForm: React.FC<{ inputValue; handleInputOnChange; handleSubmitForm }> = (props) => {
  const { handleInputOnChange, handleSubmitForm } = props;

  const birthdayFormTitle = 'Ngày sinh';

  const birthdayFormSchema = yup.object().shape({
    birthday: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = convertDateToDDMMYYY(originalValue);
        return result;
      })
      .typeError(validationMessage.dateValid(birthdayFormTitle))
  });

  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(birthdayFormSchema)
  });

  const buttonSubmitProps = {
    title: 'Cập nhật',
    onSubmit: handleSubmit(handleSubmitForm),
    classes: { container: classnames(styles.buttonContainer, isMobileVersion() && styles.mobile) }
  };

  const formEntryProps = {
    name: 'birthday',
    type: 'date',
    theme: 'rounded',
    classes: {
      container: classnames(styles.inputContainer, isMobileVersion() && styles.mobile),
      input: classnames(styles.inputInner, isMobileVersion() && styles.mobile),
      error: classnames(styles.errorContainer, isMobileVersion() && styles.mobile)
    },
    error: errors['birthday'],
    ref: register,
    onChange: handleInputOnChange
  };
  return (
    <form
      className={classnames(styles.formBirthdayContainer, isMobileVersion() && styles.mobile)}
      onSubmit={handleSubmit(handleSubmitForm)}
      noValidate
    >
      <FormEntry {...formEntryProps} />
      <SubmitButton {...buttonSubmitProps} />
    </form>
  );
};

export const MessageSettedBirthday = ({
  handleToggleMinial,
  message,
  buttonText,
  userBirthMonth,
  membership_level
}) => {
  const mothStr = userBirthMonth !== '' ? `${userBirthMonth.toLowerCase()}` : 'tháng này';
  return (
    <div className={styles.settedBirthDayMessage}>
      <div className={classnames(styles.message, isMobileVersion() && styles.mobile)}>{`${message} ${mothStr}${
        !membership_level ? ', sau khi hạng thành viên của bạn đạt "SILVER" hoặc cao hơn' : ''
      }`}</div>
      <DirectLinkButton link={ROUTING_MEMBERSHIP} handleClick={handleToggleMinial} textLink={buttonText} />
    </div>
  );
};

export const DirectLinkButton = ({
  link,
  handleClick,
  textLink,
  classNames
}: {
  link: string;
  handleClick: () => void;
  textLink: string;
  classNames?: string;
}) => (
  <div className={classnames(styles.directLink, isMobileVersion() && styles.mobile, classNames)}>
    <NavLink to={link} onClick={handleClick} className={styles.link}>
      {textLink}
    </NavLink>
  </div>
);
