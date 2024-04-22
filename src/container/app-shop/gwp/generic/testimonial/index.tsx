import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import { Testimonial as TestimonialType } from 'types/api/gwp';
import Image from 'presentation-component/ui/image';
import StarRating from 'presentation-component/ui/star-rating';
import styles from './style.module.scss';

interface TestimonialProps {
  testimonial: TestimonialType;
  classes?: { container?: string };
}
const Testimonial: React.FC<TestimonialProps> = ({ testimonial, classes }) => {
  return (
    <div className={classNames(styles.container, !isMobileVersion() && styles.desktopLayout, classes?.container)}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={testimonial.picture?.large_url} />
      </div>
      <div className={styles.info}>
        <div className={styles.author}>{testimonial?.author?.name}</div>
        <StarRating rating={testimonial?.rating} classes={{ container: styles.rating, star: styles.star }} />
        <div className={styles.content}>{testimonial.review}</div>
      </div>
    </div>
  );
};

export default Testimonial;
