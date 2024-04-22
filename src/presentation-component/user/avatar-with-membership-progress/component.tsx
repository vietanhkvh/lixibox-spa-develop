import { useEffect, useState } from 'react';
import { IMAGE_MAX_SIZE, IMAGE_SUPPORTED_EXTENSIONS } from 'constants/application/file';
import {
  ALERT_CHANGE_AVATAR_USER_ERROR,
  ALERT_IMAGE_FILE_NOT_CORRECT,
  ALERT_IMAGE_MAX_SUPPORTED_SIZE_EXCEEDED
} from 'constants/application/alert';
import { usePrevious } from 'utils/hook';
import { User } from 'types/api/auth';
import View from './view';
import { PropsFromRedux } from './store';

interface ViewProps {
  user: User;
  imagePreviewUrl: string;
  isChangingAvatar: boolean;
  onImageUpload?: (e: any) => void;
  classes?: { container?: string };
  isSmallView?: boolean;
}
interface AvatarWithMembershipProgressProps extends PropsFromRedux {
  /**
   * TODO: Remove this prop and fetch `user` from store after user state is deduplicated (currently, duplication exists from `userStore` and `authStore`)
   */
  user?: User;
  classes?: { container?: string };
  isSmallView?: boolean;
}
const AvatarWithMembershipProgress = ({
  user: _user,
  authStore: { userInfo: authStoreUserInfo, isChangingAvatar, isChangedAvatarSuccess },
  changeAvatarUserAction,
  openAlertAction,
  classes,
  isSmallView
}: AvatarWithMembershipProgressProps) => {
  const [user, setUser] = useState<User>(_user);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user?.avatar?.medium_url || '');
  const wasChangedAvatarSuccess = usePrevious(isChangedAvatarSuccess);

  useEffect(() => {
    setUser(_user);
    setImagePreviewUrl(_user?.avatar?.medium_url || '');
  }, [_user]);
  useEffect(() => {
    if (!wasChangedAvatarSuccess && isChangedAvatarSuccess) {
      setUser(authStoreUserInfo);
      setImagePreviewUrl(authStoreUserInfo?.avatar?.medium_url || '');
    }
  }, [authStoreUserInfo, isChangedAvatarSuccess, wasChangedAvatarSuccess]);

  const onImageUpload = (e) => {
    e.preventDefault();
    const resetValue = () => {
      if (e.target?.value) e.target.value = null;
    };
    const file = e.target.files[0];
    if ('undefined' === typeof file || null === file) {
      openAlertAction?.(ALERT_CHANGE_AVATAR_USER_ERROR);
      resetValue();
      return;
    }

    // Validate supported image format
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();
    if (IMAGE_SUPPORTED_EXTENSIONS.indexOf(fileExtension.toLowerCase()) === -1) {
      openAlertAction?.(ALERT_IMAGE_FILE_NOT_CORRECT);
      resetValue();
      return;
    }

    // Validate max. supported size
    if (file.size > IMAGE_MAX_SIZE) {
      openAlertAction?.(ALERT_IMAGE_MAX_SUPPORTED_SIZE_EXCEEDED);
      resetValue();
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      // Upload avatar file in server
      changeAvatarUserAction({
        avatar: reader.result
      });
    };

    reader.readAsDataURL(file);
    resetValue();
  };

  return (
    <View
      user={user}
      imagePreviewUrl={imagePreviewUrl}
      isChangingAvatar={isChangingAvatar}
      onImageUpload={onImageUpload}
      classes={classes}
      isSmallView={isSmallView}
    />
  );
};

export type { ViewProps, AvatarWithMembershipProgressProps };
export default AvatarWithMembershipProgress;
