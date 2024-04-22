import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider';
import SampleItemWithAction from '../../product/sample-item-with-action';
import { generateTestId } from 'utils/test-utils';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
}

const SamplesSlider = ({
  onItemClick,
  cartStore: {
    cartSampleList,
    cartDetail: { subtotal_price },
    constants: { threshold_to_pick_sample }
  }
}: IProps) => {
  const dataProps = cartSampleList.map((product, index) => ({
    key: product.id,
    product,
    onClickProductItem: () => onItemClick?.(product, index)
  }));

  const cartValue = subtotal_price || 0;

  const thresholdToPickSample =
    typeof threshold_to_pick_sample === 'number' && !Number.isNaN(threshold_to_pick_sample)
      ? threshold_to_pick_sample
      : 1000000;
  const selectableSampleCount = cartValue < thresholdToPickSample ? 1 : 2;

  return (
    <div className={style.samplesSlider} {...generateTestId({ name: 'samples-slider' })}>
      <div className={style.titleSection}>{`Bạn được tặng ${selectableSampleCount} sản phẩm dùng thử`}</div>
      <ProductSlider column={4} data={dataProps} template={SampleItemWithAction} className={style.sliderSection} />
    </div>
  );
};

export default SamplesSlider;
