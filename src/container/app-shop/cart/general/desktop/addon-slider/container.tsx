import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider';
import AddonItemWithAction from '../../product/addon-item-with-action';
import { generateTestId } from 'utils/test-utils';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
}

const AddonSlider = ({ onItemClick, cartStore: { addOnList } }: IProps) => {
  const dataProps = addOnList.map((product, index) => ({
    key: product.id,
    product,
    onClickProductItem: () => onItemClick?.(product, index)
  }));

  return (
    <div id={'AddOnSlider'} className={style.addonSlider} {...generateTestId({ name: 'addon-slider' })}>
      <div className={style.titleSection}>Ưu đãi cho bạn</div>
      <ProductSlider column={4} data={dataProps} template={AddonItemWithAction} className={style.sliderSection} />
    </div>
  );
};

export default AddonSlider;
