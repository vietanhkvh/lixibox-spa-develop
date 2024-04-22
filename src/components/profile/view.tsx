import classnames from 'classnames';
import SubmitButton from '../ui/submit-button';
import InputField from '../ui/input-field';
import SelectBox from '../ui/select-box';
import GeneralModal from '../../presentation-component/modal/general-modal';

import { VALIDATION } from '../../constants/application/global';
import { DATETIME_TYPE_FORMAT } from '../../constants/application/global';
import MobileAutoDisplayHeader from '../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../presentation-component/general/mobile-screen-header';
import LoadingOverlay from '../../presentation-component/ui/loading-overlay';
import SeparateLine from '../../presentation-component/ui/separate-line';
import SvgIcon from '../../presentation-component/ui/icon';
import FacebookIntegrator from '../auth/facebook-integrator';
import GoogleIntegrator from '../auth/google-integrator';
import AppleIntegrator from '../auth/apple-integrator';
import { convertUnixTimeDDMMYYYY, convertUnixTimeYYYYMMDD } from '../../utils/encode';
import { isMobileVersion } from '../../utils/responsive';
import { GENDER_TYPE } from '../../constants/application/gender';
import { IMAGE_SUPPORTED_MIME_TYPES } from '../../constants/application/file';

import { IState } from './model';
import styles from './style.module.scss';

const SectionTitle = ({ title }) => {
  return (
    <div className={classnames(styles.sectionTitle, isMobileVersion() || styles.sectionTitleDesktop)}>
      <div className={styles.content}>{title}</div>
    </div>
  );
};

const EmailVerification = ({ onClick }) => {
  return (
    <div className={styles.emailVerification} onClick={onClick}>
      <div className={styles.label}>Chưa xác thực</div>
      <div className={styles.action}>Xác thực ngay</div>
    </div>
  );
};

export function renderComponent() {
  const {
    user,
    handleUploadImage,
    onRequestChangeEmail,
    onRequestChangePhone,
    onRequestVerifyEmail,
    onRequestVerifyPhone,
    isChangingAvatar
  } = this.props;

  const { submitChangeUserProfileLoading, genderList, imagePreviewUrl, isOpenEditModalCode, editModalTitle } = this
    .state as IState;

  const fullNameProps = {
    title: 'Họ và tên',
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.NAME,
    validate: [VALIDATION.REQUIRED],
    readonly: submitChangeUserProfileLoading,
    onChange: ({ value, valid }) => this.handleInputOnChange(value, valid, 'inputFullName'),
    onFocus: this.handleInputOnFocus.bind(this),
    value: `${user.last_name} ${user.first_name}`,
    minLen: 5,
    maxLen: 50,
    testId: { name: 'full-name-field' },
    style: {
      paddingBottom: 4,
      marginBottom: 16
    }
  };

  const phoneProps = {
    title: 'Điện thoại',
    type: InputField.INPUT_TYPE.TEL,
    name: InputField.INPUT_NAME.PHONE,
    validate: [VALIDATION.PHONE_FORMAT],
    readonly: submitChangeUserProfileLoading,
    onChange: ({ value, valid }) => this.handleInputOnChange(value, valid, 'inputPhone'),
    onFocus: this.handleInputOnFocus.bind(this),
    minLen: 7,
    maxLen: 13,
    value: user.phone,
    testId: { name: 'phone-field' },
    style: {
      paddingBottom: 4,
      marginBottom: 16
    }
  };

  const genderProps = {
    title: 'Chọn giới tính',
    type: InputField.INPUT_TYPE.TEXT,
    validate: [VALIDATION.REQUIRED],
    disable: submitChangeUserProfileLoading,
    onFocus: this.handleInputOnFocus.bind(this),
    list: genderList,
    style: {},
    search: 'Tìm kiếm giới tính',
    onChange: this.handleOnChangeGender.bind(this),
    testId: { name: 'gender-field' }
  };

  const birthdayProps = {
    title: 'Ngày sinh',
    type: InputField.INPUT_TYPE.DATE,
    validate: [VALIDATION.REQUIRED],
    readonly: submitChangeUserProfileLoading,
    onChange: ({ value, valid }) => this.handleInputOnChange(value, valid, 'inputBirthday'),
    onFocus: this.handleInputOnFocus.bind(this),
    value: user.birthday ? convertUnixTimeYYYYMMDD(user.birthday, DATETIME_TYPE_FORMAT.SHORT_DATE) : '',
    preventTitleOnInput: true,
    testId: { name: 'birthday-field' },
    style: {
      paddingBottom: 4,
      marginBottom: 16
    }
  };

  const btnUpdateProfileProps = {
    title: 'Cập nhật',
    loading: submitChangeUserProfileLoading,
    onSubmit: function (e) {
      switch (isOpenEditModalCode) {
        case 'phone':
        case 'email': {
          this.setState({
            isOpenEditModalCode: '',
            editModalTitle: ''
          });
          break;
        }
        default: {
          this.handleUpdateProfileSubmit.bind(this)(e);
        }
      }
    }.bind(this),
    color: 'black',
    style: { marginBottom: 0 },
    testId: { name: 'submit-profile-update' }
  };

  const modalProps = {
    isOpen: !!isOpenEditModalCode.length,
    title: editModalTitle,
    rightIcon: 'close',
    onRightActionClick: () => {
      this.setState({
        isOpenEditModalCode: '',
        editModalTitle: ''
      });
    },
    onRequestClose: () => {
      this.setState({
        isOpenEditModalCode: '',
        editModalTitle: ''
      });
    },
    isDisableAnimation: true
  };

  const {
    email_update_required: emailUpdateRequired,
    email,
    email_verified: emailVerified,
    phone_verified: phoneVerified
  } = user;
  const hasSelectedGender = [GENDER_TYPE.FEMALE.id, GENDER_TYPE.MALE.id].includes(user.gender);

  return (
    <div className={classnames(styles.container, { [styles.desktop]: !isMobileVersion() })}>
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Chỉnh sửa thông tin cá nhân'} />
        </MobileAutoDisplayHeader>
      )}
      {!isMobileVersion() && <div className={styles.desktopHeading}>Chỉnh sửa thông tin cá nhân</div>}
      <div className={styles.container}>
        <Avatar
          imgUrl={imagePreviewUrl || ''}
          handleUploadImage={handleUploadImage}
          isChangingAvatar={isChangingAvatar}
        />
        <div className={styles.formProfile}>
          <div className={styles.row}>
            <div className={styles.col}>
              <RowData
                title={'Email đăng nhập'}
                value={!!emailUpdateRequired ? 'Cập nhật ngay' : user.email}
                isDisableValueText={!!emailUpdateRequired}
                isWithBorder={false}
                onClick={onRequestChangeEmail}
              />
              {!!email && !emailVerified && <EmailVerification onClick={onRequestVerifyEmail} />}
              <SeparateLine />
            </div>
            <div className={styles.col}>
              <RowData
                title={'Họ và tên'}
                value={`${user.last_name} ${user.first_name}`}
                onClick={() => {
                  this.setState({
                    isOpenEditModalCode: 'name',
                    editModalTitle: 'Thay đổi họ và tên'
                  });
                }}
              />
              <RowData title={'Số điện thoại'} value={user.phone} isWithBorder={false} onClick={onRequestChangePhone} />
              {!!user.phone && !phoneVerified && <EmailVerification onClick={onRequestVerifyPhone} />}
              <RowData withContent={false} />
              <RowData
                title={'Ngày sinh'}
                value={user.birthday ? convertUnixTimeDDMMYYYY(user.birthday, DATETIME_TYPE_FORMAT.SHORT_DATE) : ''}
                onClick={() => {
                  this.setState({
                    isOpenEditModalCode: 'birthday',
                    editModalTitle: 'Thay đổi ngày sinh'
                  });
                }}
              />
              <RowData
                title={'Giới tính'}
                value={hasSelectedGender ? genderList.find((gender) => gender.id === user.gender).title : ''}
                onClick={() => {
                  this.setState({
                    inputGender: { value: hasSelectedGender ? user.gender : '', valid: hasSelectedGender },
                    genderList: genderList.map((aGender) =>
                      Object.assign({}, aGender, { selected: aGender.id === user.gender })
                    )
                  });
                  this.setState({
                    isOpenEditModalCode: 'gender',
                    editModalTitle: 'Thay đổi giới tính'
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={classnames(styles.col, styles.hide)} />
            <div className={styles.col}>
              <SectionTitle title={'Kết nối'} />
              <FacebookIntegrator />
              <GoogleIntegrator />
              <AppleIntegrator />
            </div>
          </div>
        </div>
        <GeneralModal {...modalProps}>
          {/* TODO: Utilize hookform based form validation */}
          <div className={classnames(styles.editModal, { [styles.desktop]: !isMobileVersion() })}>
            {'email' === isOpenEditModalCode && (
              <div className={styles.errorNote}>{'Bạn không thể thay đổi thông tin Email'}</div>
            )}
            {'name' === isOpenEditModalCode && <InputField {...fullNameProps} />}
            {'phone' === isOpenEditModalCode && <InputField {...phoneProps} />}
            {'gender' === isOpenEditModalCode && <SelectBox {...genderProps} />}
            {'birthday' === isOpenEditModalCode && <InputField {...birthdayProps} />}
            <SubmitButton {...btnUpdateProfileProps} />
          </div>
        </GeneralModal>
      </div>
    </div>
  );
}

const RowData = ({
  title = '',
  value = '',
  onClick = () => {},
  isShowIcon = true,
  isWithBorder = true,
  isDisableValueText = false,
  isActionRequired = false,
  withContent = true
}) => {
  const iconProps = {
    name: 'angle-right',
    className: styles.icon
  };

  const rowDataProps = Object.assign(
    {},
    {
      className: classnames(styles.rowData, {
        [styles.rowDataWithContent]: withContent,
        [styles.desktop]: !isMobileVersion(),
        [styles.isWithBorder]: !!isWithBorder
      })
    },
    onClick && { onClick }
  );

  return (
    <div {...rowDataProps}>
      {withContent && (
        <>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>
            <div
              className={classnames(styles.text, {
                [styles.isDisabled]: !!isDisableValueText || !value || !value.length,
                [styles.isActionRequired]: isActionRequired
              })}
            >
              {value || 'Chưa thiết lập'}
            </div>
            {!!isShowIcon && <SvgIcon {...iconProps} />}
          </div>
        </>
      )}
    </div>
  );
};

const Avatar = ({ isChangingAvatar, imgUrl, handleUploadImage }) => {
  const avatarProps = {
    className: styles.avatar,
    style: { backgroundImage: `url(${imgUrl})` },
    htmlFor: isChangingAvatar ? '' : 'profile-user-avatar'
  };

  const inputFileProps = {
    type: 'file',
    id: 'profile-user-avatar',
    autoComplete: 'off',
    accept: IMAGE_SUPPORTED_MIME_TYPES.join(','),
    style: { display: 'none' },
    onChange: handleUploadImage
  };

  return (
    <>
      <div className={styles.avatarPanel}>
        <div className={styles.avatarContainer}>
          <label {...avatarProps} />
          {isChangingAvatar ? (
            <LoadingOverlay className={styles.loader} />
          ) : (
            <div className={styles.avatarOverlay}>
              <SvgIcon name="camera" className={styles.avatarEditIcon} />
            </div>
          )}
          <input {...inputFileProps} />
        </div>
      </div>
      <SeparateLine />
    </>
  );
};
