import { ProductBox } from 'types/api/shop';
import ItemCarousel from '../../../../../presentation-component/item-list-hoc/item-carousel';
import AddonItemWithAction from '../product/addon-item-with-action';
import style from './style.module.scss';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
}

const AddonSlider = ({ onItemClick, cartStore: { addOnList } }: IProps) => {
  return (
    <ItemCarousel
      id={'AddOnSlider'}
      title="Ưu đãi cho bạn"
      className={style.addonSlider}
      testId={{ name: 'addon-slider' }}
    >
      {addOnList.map((product, index) => (
        <AddonItemWithAction
          key={product.id}
          product={product}
          className={style.addonItemWithAction}
          onClickProductItem={() => onItemClick?.(product, index)}
        />
      ))}
    </ItemCarousel>
  );
};

export default AddonSlider;
