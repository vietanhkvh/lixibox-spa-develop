import ImageSliderItem from '../image-slider-item';
import styles from './style.module.scss';

const Component = ({ title, list }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div>
        {list &&
          list.map((item) => (
            <ImageSliderItem item={Object.assign({}, item, { author: undefined })} type={''} column={1} />
          ))}
      </div>
    </div>
  );
};

export default Component;
