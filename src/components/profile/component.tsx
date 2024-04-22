import { PureComponent } from 'react';

import { DATETIME_TYPE_FORMAT } from '../../constants/application/global';
import { convertDateToDDMMYYY, convertUnixTimeYYYYMMDD } from '../../utils/encode';
import { getFirstName, getLastName } from '../../utils/validate';
import { GENDER_TYPE } from '../../constants/application/gender';

import { renderComponent } from './view';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IState, IProps } from './model';

class UserProfile extends PureComponent<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE(props);
  }

  handleUpdateProfileSubmit() {
    const { inputFullName, inputPhone, inputGender, inputBirthday, isOpenEditModalCode } = this.state as IState;

    const { editUserProfileForm, user } = this.props as IProps;

    /* istanbul ignore next */
    // TOOD: Remove the following statement once `InputField` is refactored with full typescript coverage
    if (!(inputFullName && inputFullName.valid)) {
      return;
    }

    this.setState({ submitChangeUserProfileLoading: true } as any);

    const name = {
      firstName: getFirstName(inputFullName.value) || user.first_name,
      lastName: getLastName(inputFullName.value) || user.last_name
    };

    const birthday =
      inputBirthday && inputBirthday.value && 0 !== inputBirthday.value.length
        ? convertDateToDDMMYYY(inputBirthday.value)
        : '';

    const phone = inputPhone && inputPhone.value && 0 !== inputPhone.value.length ? inputPhone.value : user.phone || '';

    const gender =
      inputGender && [GENDER_TYPE.FEMALE.id, GENDER_TYPE.MALE.id].includes(parseInt(inputGender.value))
        ? parseInt(inputGender.value)
        : user.gender || '';

    const submitData = Object.assign(
      {},
      'name' === isOpenEditModalCode && { ...name },
      'birthday' === isOpenEditModalCode && { birthday },
      'phone' === isOpenEditModalCode && { phone },
      'gender' === isOpenEditModalCode && { gender }
    );

    editUserProfileForm(submitData);
  }

  handleChangePasswordSubmit() {
    const { inputPassword, inputPasswordNew } = this.state as IState;

    /* istanbul ignore next */
    // TOOD: Remove the following statement once `InputField` is refactored with full typescript coverage
    if (
      !(
        inputPassword &&
        inputPassword.valid &&
        inputPasswordNew &&
        inputPasswordNew.valid &&
        inputPassword.value === inputPasswordNew.value
      )
    ) {
      return;
    }

    this.setState({ submitChangeUserPasswordLoading: true } as any);

    const { changePasswordForm } = this.props as IProps;
    changePasswordForm({
      password: inputPassword.value
    });
  }

  handleInputOnChange(value, valid, target) {
    const updateInputValue = { errorMessage: '' };
    updateInputValue[target] = { value, valid };

    this.setState(updateInputValue as any);
  }

  handleInputOnFocus() {
    this.setState({ errorMessage: '' } as any);
  }

  /**
   * Handle select gender event
   *
   * @param {*} gender data received from select box
   */
  handleOnChangeGender(gender) {
    this.setState((state) => ({
      genderList: state.genderList.map((aGender) => Object.assign({}, aGender, { selected: aGender.id === gender.id })),
      inputGender: { value: gender.id, valid: true }
    }));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (false === this.props.isChangedPasswordSuccess && true === nextProps.isChangedPasswordSuccess) {
      this.setState({
        submitChangeUserPasswordLoading: false
      } as any);
    }

    if (true === this.props.isWaitingChangeProfile && false === nextProps.isWaitingChangeProfile) {
      true === nextProps.isChangedProfileSuccess
        ? this.setState({
            submitChangeUserProfileLoading: false,
            isOpenEditModalCode: '',
            editModalTitle: ''
          })
        : this.setState({ submitChangeUserProfileLoading: false });
    }
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      imagePreviewUrl: user?.avatar?.medium_url || ''
    });
  }

  componentDidUpdate(prevProps, prevState): void {
    const { user } = this.props;
    if (!prevState.isOpenEditModalCode && this.state.isOpenEditModalCode) {
      const birthday = user.birthday ? convertUnixTimeYYYYMMDD(user.birthday, DATETIME_TYPE_FORMAT.SHORT_DATE) : '';
      this.setState({
        inputBirthday: {
          value: birthday,
          valid: !!birthday
        }
      });
    }

    if (prevProps.user?.avatar?.medium_url !== user?.avatar?.medium_url) {
      this.setState({
        imagePreviewUrl: user?.avatar?.medium_url || ''
      });
    }
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default UserProfile;
