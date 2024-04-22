import { NavLink } from 'react-router-dom';
import Image from 'presentation-component/ui/image';
import SvgIcon from 'presentation-component/ui/icon';
import SubmitButton from 'components/ui/submit-button';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import { ROUTING_COMMUNITY_UNBOXING_GUIDE_LINE } from 'routings/path';
import { ViewProps } from './component';
import STYLE from './style';
import styles from './style.module.scss';

const Note = ({ content }: { content: string }) => {
  return (
    <div className={styles.note}>
      <SanitizedAndPreprocessedHTMLContent content={content} isSantitizeHtml={false} />
    </div>
  );
};

const User = ({ userInfo }) => {
  if (!userInfo) return;

  return (
    <div style={STYLE.unboxingUser.container}>
      <Image alt={''} style={STYLE.unboxingUser.img} src={userInfo.avatar && userInfo.avatar.medium_url} />
      <div style={STYLE.unboxingUser.name}>{userInfo.name}</div>
    </div>
  );
};

const View = ({
  authStore,
  sharedLink,
  unboxingDescription,
  isLoading,
  handleSharingLinkChange: onSharingLinkChange,
  handleSubmitShareLink: onSubmit
}: ViewProps) => {
  const { userInfo } = authStore;
  const inputProps = {
    value: sharedLink,
    placeholder: 'Dán link chia sẻ của bạn đã copy ở đây',
    onChange: onSharingLinkChange,
    style: STYLE.sharingForm.input,
    inputStyle: STYLE.sharingForm.innerInput,
    resize: 'none'
  };

  const buttonProps = {
    color: 'black',
    title: 'Chia sẻ',
    icon: 'next-link',
    disabled: !sharedLink.length,
    loading: isLoading,
    onSubmit: onSubmit,
    style: STYLE.sharingForm.button,
    styleIcon: STYLE.sharingForm.buttonIcon
  };

  return (
    <div style={STYLE.container}>
      <div style={STYLE.editContainer}>
        <div style={STYLE.sharingForm.container}>
          <User userInfo={userInfo} />
          <textarea {...inputProps} />
          <NavLink to={ROUTING_COMMUNITY_UNBOXING_GUIDE_LINE} className={styles.linkToGuideline}>
            <SvgIcon name={'book'} className={styles.icon} />
            <div className={styles.text}>Hướng dẫn cách tham gia thử thách đập hộp</div>
          </NavLink>
          {!!unboxingDescription && <Note content={unboxingDescription} />}
          <div style={STYLE.submitButtonGroup}>
            <div style={STYLE.submitButtonGroup.fixed}>
              <SubmitButton {...buttonProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
