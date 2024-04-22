import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider';
import FreeDeliveryItemWithAction from '../../product/free-delivery-item-with-action';
import { generateTestId } from 'utils/test-utils';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
}

const FreeDeliverySlider = ({ onItemClick, cartStore: { boxesToFreeship } }: IProps) => {
  const dataProps = boxesToFreeship.map((product, index) => ({
    key: product.id,
    product,
    onClickProductItem: () => onItemClick?.(product, index)
  }));

  return (
    <div className={style.addonSlider} {...generateTestId({ name: 'free-delivery-slider' })}>
      <div className={style.titleSection}>MUA THÊM ĐỂ ĐƯỢC MIỄN PHÍ GIAO HÀNG</div>
      <ProductSlider
        column={4}
        data={dataProps}
        template={FreeDeliveryItemWithAction}
        className={style.sliderSection}
      />
    </div>
  );
};

export default FreeDeliverySlider;
