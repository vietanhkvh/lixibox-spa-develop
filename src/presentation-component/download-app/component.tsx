import styles from './style.module.scss';

const Component = () => {
  return (
    <div className={styles.container}>
      <div className={styles.fixedPanel}>
        <a target={'_blank'} href={'https://lixibox.app.link'} className={styles.link} rel="noreferrer">
          <img src={process.env.REACT_APP_ICON} alt="" />
          <div className={styles.info}>
            <div className={styles.title}>Lixibox</div>
            <div className={styles.desc}>Giảm 500K khi mua trên App</div>
          </div>
          <div className={styles.cta}>Mở</div>
        </a>
      </div>
    </div>
  );
};

export default Component;
