import styles from './style.module.scss';

const ProductNote = ({ note }) => {
  if (!note || !note.length) return null;

  return (
    <div className={styles.container}>
      <div className={styles.panel}>{note}</div>
    </div>
  );
};

export default ProductNote;
