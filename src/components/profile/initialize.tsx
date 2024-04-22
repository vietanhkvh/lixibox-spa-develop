import { IState, IProps } from './model';
import { GENDER_TYPE } from '../../constants/application/gender';

export const DEFAULT_PROPS = {
  user: [],
  showHeader: true,
  isChangedPasswordSuccess: false,
  isChangedProfileSuccess: false
} as IProps;

export const INITIAL_STATE = (props) =>
  ({
    errorMessage: '',
    submitChangeUserProfileLoading: false,
    submitChangeUserPasswordLoading: false,
    genderList: [
      {
        id: GENDER_TYPE.FEMALE.id,
        title: GENDER_TYPE.FEMALE.title,
        selected: props.user.gender === GENDER_TYPE.FEMALE.id ? true : false
      },
      {
        id: GENDER_TYPE.MALE.id,
        title: GENDER_TYPE.MALE.title,
        selected: props.user.gender === GENDER_TYPE.MALE.id ? true : false
      }
    ],

    inputFullName: {
      value: '',
      valid: true
    },

    inputEmail: {
      value: '',
      valid: true
    },

    inputPhone: {
      value: '',
      valid: false
    },

    inputGender: {
      value: '',
      valid: false
    },

    inputBirthday: {
      value: '',
      valid: false
    },

    inputPassword: {
      value: '',
      valid: false
    },

    inputPasswordNew: {
      value: '',
      valid: false
    },
    imagePreviewUrl: '',

    isOpenEditModalCode: '',
    editModalTitle: ''
  } as IState);
