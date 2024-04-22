import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { isMobileVersion } from 'utils';
import Image from 'presentation-component/ui/image';
import SubmitButton from 'presentation-component/ui/submit-button';
import { ROUTING_COMMUNITY_PATH, ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW } from 'routings/path';
import styles from './style.module.scss';

interface UnboxingGuidelineProps {
  classes?: { container?: string };
}
const UnboxingGuideline = ({ classes }: UnboxingGuidelineProps) => {
  const instructionIllustration1 = CDN_ASSETS_PREFIX('/unboxing-guide-line/tiktok_unboxing_instruction_1.png');
  const instructionIllustration2 = CDN_ASSETS_PREFIX('/unboxing-guide-line/tiktok_unboxing_instruction_2.png');

  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={styles.step}>
        <div className={styles.paragraph}>
          <span className={styles.semiBold}>Bước 1:</span> Quay Video "đập hộp" đơn hàng của bạn và đăng tải ở{' '}
          <span className={styles.regular}>chế độ công khai</span> trên trang Tiktok cá nhân kèm hashtag{' '}
          <span className={styles.regular}>#Lixibox #unboxing #LixiboxGWP</span>
        </div>
        <div className={styles.paragraph}>
          Sau đó, nhấn vào nút “ba chấm” ở bên phải màn hình và{' '}
          <span className={styles.regular}>sao chép liên kết</span> (Copy Link) của video.
        </div>
      </div>
      <Image className={styles.illustration} alt="" src={instructionIllustration1} />
      <div className={styles.step}>
        <div className={styles.paragraph}>
          <span className={styles.semiBold}>Bước 2:</span> Trở lại trang{' '}
          <NavLink to={ROUTING_COMMUNITY_PATH} className={styles.link}>
            Lixibox Feeds
          </NavLink>
          , dán link video của bạn vào ô ”chia sẻ link video đập hộp”.
        </div>
      </div>
      <Image className={styles.illustration} alt="" src={instructionIllustration2} />
      <div className={styles.step}>
        <div className={styles.paragraph}>
          <span className={styles.semiBold}>Bước 3:</span> Lixibox sẽ kiểm duyệt video và bạn sẽ được nhận thưởng trong
          vòng 48 giờ làm việc (không tính Thứ 7, Chủ nhật)
        </div>
      </div>
      {isMobileVersion() || (
        <SubmitButton
          icon={{ name: 'message-heart' }}
          title="Tham gia ngay"
          color="black"
          type="link"
          link={{ to: ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW }}
          classes={{ container: styles.submitButton }}
        />
      )}
    </div>
  );
};

export default UnboxingGuideline;
