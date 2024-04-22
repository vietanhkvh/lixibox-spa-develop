export interface IProps {
  user?: any;
  showHeader?: boolean;
  editUserProfileForm?: any;
  changePasswordForm?: any;
  openAlertAction?: any;
  isChangedPasswordSuccess?: boolean;
  isChangedProfileSuccess?: boolean;
  isWaitingChangeProfile?: boolean;
  isChangingAvatar?: boolean;
}

export interface IState {
  errorMessage?: string;
  handleUploadImage?: any;
  submitChangeUserProfileLoading?: boolean;
  submitChangeUserPasswordLoading?: boolean;
  genderList?: any;

  inputFullName?: {
    value?: string;
    valid?: boolean;
  };

  inputEmail?: {
    value?: string;
    valid?: boolean;
  };

  inputPhone?: {
    value?: string;
    valid?: boolean;
  };

  inputGender?: {
    value?: string;
    valid?: boolean;
  };

  inputBirthday?: {
    value?: string;
    valid?: boolean;
  };

  inputPassword?: {
    value?: string;
    valid?: boolean;
  };

  inputPasswordNew?: {
    value?: string;
    valid?: boolean;
  };

  imagePreviewUrl: any;

  isOpenEditModalCode: string;
  editModalTitle: string;
}
