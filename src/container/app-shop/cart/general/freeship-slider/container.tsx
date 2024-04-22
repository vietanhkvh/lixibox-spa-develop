import ItemCarousel from '../../../../../presentation-component/item-list-hoc/item-carousel';
import { PURCHASE_TYPE } from '../../../../../constants/application/purchase';
import ItemWithAction from '../item-with-action';
import style from './style.module.scss';
import { ProductBox } from 'types/api/shop';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
}

const FreeshipSlider = ({ onItemClick, cartStore: { boxesToFreeship } }: IProps) => {
  return (
    <ItemCarousel
      title="Mua thêm để được miễn phí giao hàng"
      className={style.freeshipSlider}
      testId={{ name: 'freeship-slider' }}
    >
      {boxesToFreeship.map((product, index) => (
        <ItemWithAction
          key={product.id}
          product={product}
          action={{ title: 'Chọn', icon: 'plus' }}
          purchaseType={PURCHASE_TYPE.NORMAL}
          isShowPricing
          onClickProductItem={() => onItemClick?.(product, index)}
        />
      ))}
    </ItemCarousel>
  );
};

export default FreeshipSlider;
