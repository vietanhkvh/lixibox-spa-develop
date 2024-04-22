import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import style from './style.module.scss';

const PlaceholderSummary = () => {
  return (
    <div className={style.placeholder}>
      <div className={style.placeholderSummary}>
        <LoadingPlaceholder className={style.title} />
        <LoadingPlaceholder className={style.price} />
        <LoadingPlaceholder className={style.rate} />
        <LoadingPlaceholder className={style.summary} />
        <LoadingPlaceholder className={style.summary} />
        <LoadingPlaceholder className={style.summary} />
        <div className={style.btnGroup}>
          <LoadingPlaceholder className={style.btn} />
          <LoadingPlaceholder className={style.btn} />
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSummary;
