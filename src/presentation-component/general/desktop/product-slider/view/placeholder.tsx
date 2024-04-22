import LoadingPlaceholder from '../../../../ui/loading-placeholder';
import style from './style.module.scss';

const ProductPlaceholder = () => (
  <div className={style.product}>
    <LoadingPlaceholder className={style.image} />
    <LoadingPlaceholder className={style.text} />
    <LoadingPlaceholder className={style.text} />
    <LoadingPlaceholder className={style.lastText} />
  </div>
);

const Placeholder = ({ column }: { column: number }) => (
  <div className={style.placeholder}>
    {(Array(column) as any).fill().map((_, index) => (
      <ProductPlaceholder key={index} />
    ))}
  </div>
);

export default Placeholder;
