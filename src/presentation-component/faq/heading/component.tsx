import styles from './style.module.scss';

interface FAQHeadingProps {
  title: string;
  description: string;
}
const FAQHeading = ({ title, description }: FAQHeadingProps) => {
  return (
    <div className={styles.container}>
      {!!title && <div className={styles.title}>{title}</div>}
      {!!description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default FAQHeading;
