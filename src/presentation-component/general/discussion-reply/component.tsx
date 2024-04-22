import Image from 'presentation-component/ui/image';
import { SIGN_IN_STATE } from '../../../constants/application/global';
import InputField from '../../../components/ui/input-field';
import SubmitButton from '../../../components/ui/submit-button';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import styles from './style.module.scss';

interface IProps {
  userInfo: any;
  signInStatus: 'NO_LOGIN' | 'LOGIN_SUCCESS';
  newMessageContent: string;
  isSubmitLoading: boolean;
  onTextChange: any;
  onKeyUp: any;
  onRequestLogin: any;
  onSubmit: any;
}

const DiscussionReply = ({
  userInfo,
  signInStatus,
  newMessageContent,
  isSubmitLoading,
  onTextChange,
  onKeyUp,
  onRequestLogin,
  onSubmit
}: IProps) => {
  const isLoggedIn = SIGN_IN_STATE.LOGIN_SUCCESS === signInStatus;
  const textPlaceholder = isLoggedIn ? 'Nhập tin nhắn...' : 'Đăng nhập để gửi tin nhắn';
  const avatarUser =
    isLoggedIn && userInfo && userInfo.avatar
      ? userInfo.avatar.medium_url
      : CDN_ASSETS_PREFIX('/sample-data/avatar.jpg');

  const imgProps = {
    src: avatarUser,
    className: styles.avatar
  };

  const inputProps = {
    id: 'live-chat',
    autoComplete: 'off',
    disabled: !isLoggedIn,
    className: styles.input,
    placeholder: textPlaceholder,
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.CONTENT,
    style: !isLoggedIn ? { marginRight: 16 } : {},
    onChange: (e) => onTextChange(e),
    onKeyUp: (e) => !isSubmitLoading && onKeyUp(e),
    value: newMessageContent || ''
  };

  return (
    <div className={styles.container}>
      <Image {...imgProps} />
      <div className={styles.inputGroup}>
        <input {...inputProps} />
        {isLoggedIn ? (
          <SubmitButton
            loading={isSubmitLoading}
            title={'Gửi'}
            onSubmit={!isSubmitLoading ? onSubmit : undefined}
            className={styles.submit}
            color={'white'}
          />
        ) : (
          <div className={styles.overlay} onClick={onRequestLogin} />
        )}
      </div>
    </div>
  );
};

export default DiscussionReply;
