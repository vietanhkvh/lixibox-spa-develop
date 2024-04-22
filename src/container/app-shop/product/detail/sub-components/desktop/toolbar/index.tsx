import classNames from 'classnames';
import WrapLayout from 'container/layout/wrap/container';
import { currenyFormat } from 'utils';
import { Product } from 'types/api/shop';
import { CombinedProduct } from '../../../model';
import PrimaryButtonGroup from '../../generic/primary-button-group';
import Image from 'presentation-component/ui/image';
import styles from './style.module.scss';
import STYLE from './style';
import { getThumbImage } from 'utils/image';

interface ToolbarProps {
  product: Product;
  combinedProduct: CombinedProduct;
  isFixedToolbar: boolean;
  classes?: { container?: string };
}
const Toolbar = ({ product, combinedProduct, isFixedToolbar, classes }: ToolbarProps) => {
  const avatarProductUrl = getThumbImage(combinedProduct?.picture?.[0]);

  return (
    <div className={classNames(styles.container, !!isFixedToolbar && styles.containerVisible, classes?.container)}>
      <WrapLayout style={STYLE.wrap}>
        <div style={STYLE.info}>
          <div style={STYLE.info.imgWrap}>
            <Image src={avatarProductUrl} style={STYLE.info.imgWrap.productImg} />
          </div>
          <div style={STYLE.info.namePriceGroup}>
            <div style={STYLE.info.namePriceGroup.name}>{combinedProduct.name}</div>
            <div style={STYLE.info.namePriceGroup.priceGroup}>
              <div style={STYLE.info.namePriceGroup.priceGroup.price}>
                {currenyFormat(combinedProduct.currentPrice)}
              </div>
              {combinedProduct.oldPrice > combinedProduct.currentPrice && (
                <div style={STYLE.info.namePriceGroup.priceGroup.oldPrice}>
                  (trị giá {currenyFormat(combinedProduct.oldPrice)})
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={STYLE.btnGroup}>
          <PrimaryButtonGroup {...{ product, combinedProduct }} />
        </div>
      </WrapLayout>
    </div>
  );
};

export default Toolbar;
